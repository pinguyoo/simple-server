const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(':memory:')

db.serialize(() => {
  db.run('CREATE TABLE tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, completed BOOLEAN, createdAt TEXT)')

  const stmt = db.prepare('INSERT INTO tasks (title, description, completed, createdAt) VALUES (?, ?, ?, ?)')
  // stmt.run('Task 1', 'Description 1', false, '2024-06-24T00:01:00.000Z')
  // stmt.run('Task 2', 'Description 2', false, '2024-06-24T00:02:00.000Z')
  stmt.finalize()
})

module.exports = db
