const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { auth, JWT_SECRET } = require('../middleware/auth');

const router = express.Router();

const users = [];

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: 'Пользователь уже существует' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      id: users.length + 1,
      username,
      password: hashedPassword
    };

    users.push(newUser);

    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: newUser.id,
        username: newUser.username
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(400).json({ message: 'Неверные учетные данные' });
  }

  try {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Неверные учетные данные' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.get('/protected', auth, (req, res) => {
  res.json({
    message: 'Это защищенные данные!',
    user: req.user
  });
});

module.exports = router; 