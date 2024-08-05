import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('../database/db.sqlite')

const randomText = () => {
  const text = []
  for (let i = 0; i < 100; i++) {
    text.push(Math.random().toString(36).substring(2, 15))
  }
  return text.join('')
}

const randomInt = () => {
  return Math.floor(Math.random() * 100)
}

db.run('DROP TABLE IF EXISTS users', function (err) {
  if (err) throw err
  db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER, email TEXT)', function (err) {
    if (err) throw err
    const stmt = db.prepare('INSERT INTO users VALUES (?, ?, ?, ?)')
    for (let i = 0; i < 1000000; i++) {
      stmt.run(i, randomText(), randomInt(), randomText())
    }
    stmt.finalize()
  })
})

db.close()
