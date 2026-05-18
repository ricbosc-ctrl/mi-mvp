const express = require('express');
const cors = require('cors');
const nano = require('nano')('http://admin:1234@127.0.0.1:5984');

const app = express();
const PORT = 5050;
const usersDb = nano.db.use('users');

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'register-api' });
});

app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ ok: false, message: 'name, email y password son obligatorios' });
    }

    const userDoc = {
      name,
      email,
      password,
      role: 'user',
      createdAt: new Date().toISOString(),
    };

    const result = await usersDb.insert(userDoc);
    return res.status(201).json({ ok: true, id: result.id, rev: result.rev });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error guardando usuario en CouchDB',
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});
