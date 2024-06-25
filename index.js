const express = require('express')
const cors = require('cors')
const db = require('./database')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get('/api/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json(rows)
  })
})

app.post('/api/tasks', (req, res) => {
  const { title, description, completed, createdAt } = req.body
  const sql = 'INSERT INTO tasks (title, description, completed, createdAt) VALUES (?, ?, ?, ?)'
  const params = [title, description, completed ? 1 : 0, createdAt]

  db.run(sql, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.status(201).json({ id: this.lastID, title, description, completed })
  })
})

app.put('/api/tasks/:id', (req, res) => {
  const { title, description, completed, createdAt } = req.body
  const sql = 'UPDATE tasks SET title = ?, description = ?, completed = ?, createdAt = ? WHERE id = ?'
  const params = [title, description, completed ? 1 : 0, createdAt, req.params.id]

  db.run(sql, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ id: req.params.id, title, description, completed })
  })
})

app.delete('/api/tasks/:id', (req, res) => {
  const sql = 'DELETE FROM tasks WHERE id = ?'
  const params = [req.params.id]

  db.run(sql, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.status(204).send()
  })
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
