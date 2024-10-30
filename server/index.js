import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { serveStatic } from '@hono/node-server/serve-static'
import { getCookie, setCookie } from 'hono/cookie'
// import { swaggerUI } from '@hono/swagger-ui'
import { db } from './db/index.js'

const app = new Hono()
app.use(logger)
app.use('/uploads/*', serveStatic({ root: './public/' }))
// app.get('/ui', swaggerUI())

app.get('/', (c) => c.text('Hono!'))
const port = 3000

serve({
  fetch: app.fetch,
  port,
})

app.post('/upload-avatar', async (c) => {
  try {
    const { file, userId } = c.req.parseBody()
    console.log(file, userId)

    const avatarUrl = `http://localhost:${port}/uploads/${c.req.file.filename}`
    const res = db.prepare('UPDATE users SET avatar_url = $1 WHERE id = $2').run([avatarUrl, userId])
    console.log(res)
    return c.json({ message: 'Аватарка успешно загружена', avatarUrl })
  } catch (error) {
    console.error(error)
    return c.json({ message: 'Ошибка сервера' })
  }
})

app.post('/login', async (c) => {
  const { email, password } = await c.req.json()

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)

  if (!user) c.req.json({ message: 'Неверный email или пароль' }, 401)
  if (password !== user.password) c.req.json({ message: 'Неверный email или пароль' }, 401)

  setCookie(c, 'user', JSON.stringify(user))
  return c.json(user)
})

app.post('/register', async (c) => {
  const { email, username, first_name, last_name, password, confirm_password } = await c.req.json()

  if (password !== confirm_password) return c.json({ message: 'Пароли не совпадают' }, 401)

  try {
    const create = db.prepare(
      'INSERT INTO users (email, username, first_name, last_name, password) VALUES (?, ?, ?, ?, ?)',
    )
    const res = await create(email, username, first_name, last_name, password)
    console.log(res)
    return c.json({ message: 'Пользователь успешно зарегистрировался', user: user })
  } catch (error) {
    console.error(error)
    return c.json({ message: 'Ошибка сервера' }, 500)
  }
})

app.get('/users', async (c) => {
  console.log('get users')
  const users = db.prepare('SELECT * FROM users').all()
  return users
})

app.get('/users/current', async (c) => {
  const userId = getCookie(c, 'userId')
  if (!userId) return c.notFound()

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId)
  console.log(user)
  return c.json(user)
})
