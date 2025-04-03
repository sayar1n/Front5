const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret_key';

function auth(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ message: 'Нет токена, авторизация отклонена' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Токен недействителен' });
  }
}

module.exports = { auth, JWT_SECRET }; 