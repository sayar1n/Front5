## Функциональность

- Регистрация пользователей
- Вход в систему
- Доступ к защищенным ресурсам с использованием JWT
- Выход из системы

## Технологии

- **Бэкенд**: Node.js, Express, JWT
- **Фронтенд**: HTML, CSS, JavaScript

## Установка и запуск

### Шаги по установке

1. Клонировать репозиторий:
   ```
   git clone https://github.com/ваш-username/jwt-auth-app.git
   cd jwt-auth-app
   ```

2. Установить зависимости для бэкенда:
   ```
   cd backend
   npm install
   ```

3. Запустить бэкенд:
   ```
   npm start
   ```
   Сервер будет запущен на порту 5000.

4. Открыть файл `frontend/index.html` в браузере.

## Использование

1. **Регистрация**: Создайте нового пользователя, заполнив форму регистрации.
2. **Вход**: Войдите в систему, используя созданные учетные данные.
3. **Защищенные данные**: Нажмите кнопку "Получить защищенные данные", чтобы получить доступ к защищенной информации.
4. **Выход**: Нажмите кнопку "Выйти", чтобы завершить сеанс.

## API Endpoints

### POST /api/register - Регистрация нового пользователя
- **Тело запроса**: `{ "username": "user", "password": "pass" }`
- **Ответ**: `{ "token": "jwt_token", "user": { "id": 1, "username": "user" } }`

### POST /api/login - Вход в систему и получение JWT токена
- **Тело запроса**: `{ "username": "user", "password": "pass" }`
- **Ответ**: `{ "token": "jwt_token", "user": { "id": 1, "username": "user" } }`

### GET /api/protected - Защищенный маршрут (требует аутентификации)
- **Заголовок**: `x-auth-token: jwt_token`
- **Ответ**: `{ "message": "Это защищенные данные!", "user": { "id": 1, "username": "user" } }`

