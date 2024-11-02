import { db } from './index.js'

const tours = [
  {
    title: 'Тур в Псков',
    description: 'Волшебный тур в Пскове с приключениями и культурой местного населения.',
    price: 36000,
    img_filename: 'Pskov.png',
  },
  {
    title: 'Тур в Беларусь',
    description: 'Волшебный тур в Беларусь приключениями и культурой местного населения.',
    price: 45000,
    img_filename: 'Belarus.png',
  },
  {
    title: 'Джиптур по Дагестану',
    description: 'Волшебный тур в Дагестане с приключениями и культурой местного населения.',
    price: 65000,
    img_filename: 'Dagestan.png',
  },
  {
    title: 'Тур в Калининград',
    description: 'Волшебный тур в Пскове с приключениями и культурой местного населения.',
    price: 45000,
    img_filename: 'Kaliningrad.png',
  },
  {
    title: 'Тур в Карелию',
    description: 'Волшебный тур в Пскове с приключениями и культурой местного населения.',
    price: 60000,
    img_filename: 'Karelia.png',
  },
  {
    title: 'Тур в Марокко',
    description: 'Волшебный тур в Пскове с приключениями и культурой местного населения.',
    price: 40000,
    img_filename: 'Marokko.png',
  },
  {
    title: 'Тур в Смоленск',
    description: 'Волшебный тур в Пскове с приключениями и культурой местного населения.',
    price: 30000,
    img_filename: 'smolensk.png',
  },
  {
    title: 'Тур в Узбекистан',
    description: 'Волшебный тур в Пскове с приключениями и культурой местного населения.',
    price: 100000,
    img_filename: 'Uzbekistan.png',
  },
]


const seedTables = () => {
  db.exec("DROP TABLE IF EXISTS users")
  db.exec("DROP TABLE IF EXISTS tours")
  db.exec("DROP TABLE IF EXISTS comments")

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      username TEXT NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      password TEXT NOT NULL,
      avatar_filename TEXT
    )`)

  db.exec(`
      CREATE TABLE IF NOT EXISTS tours (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        price INTEGER NOT NULL,
        img_filename TEXT NOT NULL
      )`
  )

  db.exec(
    `
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      text TEXT NOT NULL
    )
    `
  )
}


const seedData = () => {
  db.exec(`
    INSERT INTO users (email, username, first_name, last_name, password, avatar_filename) VALUES
    ('admin@example.com', 'admin', 'Admin', 'Admin', 'admin', 'XD.png'),
    ('user@example.com', 'user', 'User', 'User', 'user', NULL)
`)

  const insert = db.prepare(`
  INSERT INTO tours (title, description, price, img_filename)
  VALUES (@title, @description, @price, @img_filename)
  `
  )

  const transaction = db.transaction(() => {
    for (const tour of tours) {
      insert.run(tour)
    }
  })

  transaction()

  db.exec(`
    INSERT INTO comments (user_id, text) VALUES
    (1, 'Привет, это мой первый комментарий!')`
  )
}

const seed = () => {
  seedTables()
  seedData()
  db.close()
}

seed()

console.log('Seeding complete')
