import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { serveStatic } from '@hono/node-server/serve-static'
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'
import { db } from '../db/index.js'
import fs from 'node:fs/promises'
import path from 'node:path'

export const app = new Hono().basePath('/api')
app.use(logger())
app.use('/uploads/*', serveStatic({ root: './public/' }))
// app.get('/ui', swaggerUI())

app.get('/', (c) => c.text('Hono!'))
const port = 3000


serve({
  fetch: app.fetch,
  port,
})

const userRepo = {
  getAll: () => db.prepare('SELECT * FROM users').all(),

  getById: (id) => db.prepare('SELECT * FROM users WHERE id = ?').get(id),

  getByEmail: (email) => db.prepare('SELECT * FROM users WHERE email = ?').get(email),

  create(user) {
    const { email, username, first_name, last_name, password } = user
    const res = db
      .prepare('INSERT INTO users (email, username, first_name, last_name, password) VALUES (?, ?, ?, ?, ?)')
      .run(email, username, first_name, last_name, password)
    return this.getById(res.lastInsertRowid)
  },

  updateAvatar(userId, avatarFilename) {
    const res = db.prepare('UPDATE users SET avatar_filename = ? WHERE id = ?').run([avatarFilename, userId])
    return this.getById(userId)
  }
}

const userMapper = {
  toDto: (user) => {
    return {
      id: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      avatar_url: user.avatar_filename
        ? `http://localhost:5173/uploads/${user.avatar_filename}`
        : 'http://localhost:5173/default-user-icon.png',
    }
  }
}

const tourRepo = {
  getAll: () => db.prepare('SELECT * FROM tours').all(),
}

const tourMapper = {
  toDto: (tour) => {
    return {
      id: tour.id,
      title: tour.title,
      description: tour.description,
      price: tour.price,
      img_url: `/images/tours/${tour.img_filename}`,
    }
  }
}

const setUserCookie = (c, user) => {
  setCookie(c, 'user', JSON.stringify(user), { 'expires': new Date(Date.now() + 1000 * 60 * 60 * 24), httpOnly: true })
}

app.post('/users/current/upload-avatar', async (c) => {
  try {
    const userCookie = getCookie(c, 'user')
    if (!userCookie) return c.json({ message: 'Не авторизован' }, 401)
    const user = JSON.parse(userCookie)
    const formdata = await c.req.formData()
    const { avatar } = Object.fromEntries(formdata.entries())
    const ext = avatar.type.split('/')[1]
    const newFilename = Date.now() + '.' + ext
    const filePath = path.resolve('./static/uploads/', newFilename)

    await fs.writeFile(filePath, Buffer.from(await avatar.arrayBuffer()))
    const updatedUser = userRepo.updateAvatar(user.id, newFilename)

    return c.json(userMapper.toDto(updatedUser))
  } catch (error) {
    console.error(error)
    return c.json({ message: 'Ошибка сервера' })
  }
})

app.post('/login', async (c) => {
  try {
    const { email, password } = await c.req.json()

    const user = userRepo.getByEmail(email)

    if (!user) return c.json({ message: 'Неверный email или пароль' }, 400)
    if (password !== user.password) return c.json({ message: 'Неверный email или пароль' }, 400)

    const dto = userMapper.toDto(user)
    setUserCookie(c, dto)
    return c.json(dto)
  } catch (error) {
    console.error(error)
    return c.json({ message: 'Ошибка сервера' })
  }
})

app.post('/register', async (c) => {
  try {
    const body = await c.req.json()
    if (body.password !== body.confirm_password) return c.json({ message: 'Пароли не совпадают' }, 400)

    const existingUser = userRepo.getByEmail(body.email)
    if (existingUser) return c.json({ message: 'Этот email уже зарегистрирован' }, 400)
    const user = userRepo.create(body)

    const dto = userMapper.toDto(user)
    setUserCookie(c, dto)
    return c.json(dto)
  } catch (error) {
    console.error(error)
    return c.json({ message: 'Ошибка сервера' }, 500)
  }
})


app.get('/logout', async (c) => {
  deleteCookie(c, 'user')
  return c.json({ ok: true })
})

app.get('/users/current', async (c) => {
  try {
    const userString = getCookie(c, 'user')
    if (!userString) return c.notFound()
    const userCookie = JSON.parse(userString)
    const user = userRepo.getById(userCookie.id)
    const dto = userMapper.toDto(user)
    setUserCookie(c, dto)
    return c.json(dto)
  } catch (error) {
    console.error(error)
    return c.json({ message: 'Ошибка сервера' }, 500)
  }
})


app.get('/users', async (c) => {
  try {
    const users = userRepo.getAll()
    const dtos = users.map(userMapper.toDto)
    return c.json(dtos)
  } catch (error) {
    console.error(error)
    return c.json({ message: 'Ошибка сервера' }, 500)
  }
})

app.get('/tours', async (c) => {
  try {
    const tours = tourRepo.getAll()
    const dtos = tours.map(tourMapper.toDto)
    return c.json(dtos)
  } catch (error) {
    console.error(error)
    return c.json({ message: 'Ошибка сервера' }, 500)
  }
})