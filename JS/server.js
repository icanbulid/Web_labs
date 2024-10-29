const express = require('express')
const bodyParser = require('body-parser')
const { Pool } = require('pg')
const cors = require('cors')
const multer = require('multer')
const path = require('path')

const app = express()
const port = 5502
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))) // Измените путь здесь
app.use(express.static(path.join(__dirname, '../pages'))) // Замените на вашу папку со статическими файлами

app.use(cors())
app.use(bodyParser.json())

// Настройка хранилища для multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads')) // Измените путь здесь
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) // Уникальное имя файла
    },
})

const upload = multer({ storage: storage })

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'golden_middle',
    password: 'admin',
    port: 5432,
})

app.get('/seed-table', async () => {
    await pool.query(`
DROP TABLE users;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar_url VARCHAR DEFAULT 'default-user-icon.png'
)
`)
})

// Route для загрузки аватарки
app.post('/upload-avatar', upload.single('avatar'), async (req, res) => {
    const { userId } = req.body // Предполагается, что вы передаете userId в теле запроса
    const avatarUrl = `http://localhost:${port}/uploads/${req.file.filename}` // URL загруженного аватара

    try {
        await pool.query('UPDATE users SET avatar_url = $1 WHERE id = $2', [avatarUrl, userId])
        res.status(200).json({ message: 'Аватарка успешно загружена', avatarUrl })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Ошибка сервера' })
    }
})

// Registration route
app.post('/register', async (req, res) => {
    const { email, username, first_name, last_name, password } = req.body

    try {
        const result = await pool.query(
            'INSERT INTO users (email, username, first_name, last_name, password, avatar_url) VALUES ($1, $2, $3, $4, $5, DEFAULT) RETURNING *',
            [email, username, first_name, last_name, password],
        )

        res.status(201).json({ message: 'Пользователь успешно зарегистрировался', user: result.rows[0] })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Ошибка сервера' })
    }
})

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body

    try {
        const result = await pool.query('SELECT * FROM users WHERE (username = $1 OR email = $1) AND password = $2', [
            username,
            password,
        ])

        if (result.rows.length > 0) {
            // User found, return user data including avatar_url
            res.status(200).json({ message: 'Успешный вход', user: result.rows[0] })
        } else {
            // User not found
            res.status(401).json({ message: 'Неверный логин или пароль' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Ошибка сервера' })
    }
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})

// Route для получения информации о пользователе
app.get('/user/:id', async (req, res) => {
    const { id } = req.params

    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id])

        if (result.rows.length > 0) {
            res.status(200).json({ user: result.rows[0] })
        } else {
            res.status(404).json({ message: 'Пользователь не найден' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Ошибка сервера' })
    }
})

app.get('/index.html', (req, res) => {
    console.log('Запрос к /index.html')
    res.sendFile(path.join(__dirname, '../pages/index.html'), (err) => {
        if (err) {
            console.error('Ошибка при отправке файла:', err)
            res.status(err.status).end()
        }
    })
})

app.get('/Catalog.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/Catalog.html'))
})
