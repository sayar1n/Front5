document.addEventListener('DOMContentLoaded', () => {
  const API_URL = 'http://localhost:5000/api';
  
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  const registerForm = document.getElementById('register-form');
  const loginForm = document.getElementById('login-form');
  const authContainer = document.getElementById('auth-container');
  const userContainer = document.getElementById('user-container');
  const usernameSpan = document.getElementById('username');
  const getProtectedBtn = document.getElementById('get-protected');
  const logoutBtn = document.getElementById('logout');
  const protectedDataDiv = document.getElementById('protected-data');
  const messageDiv = document.getElementById('message');
  
  checkAuth();
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === tabId) {
          content.classList.add('active');
        }
      });
    });
  });
  
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        showMessage('Регистрация успешна!', 'success');
        checkAuth();
      } else {
        showMessage(data.message || 'Ошибка регистрации', 'error');
      }
    } catch (err) {
      showMessage('Ошибка сервера', 'error');
    }
  });
  
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        showMessage('Вход выполнен успешно!', 'success');
        checkAuth();
      } else {
        showMessage(data.message || 'Ошибка входа', 'error');
      }
    } catch (err) {
      showMessage('Ошибка сервера', 'error');
    }
  });
  
  getProtectedBtn.addEventListener('click', async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      showMessage('Вы не авторизованы', 'error');
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/protected`, {
        headers: {
          'x-auth-token': token
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        protectedDataDiv.textContent = JSON.stringify(data, null, 2);
      } else {
        showMessage(data.message || 'Ошибка доступа к защищенным данным', 'error');
        if (response.status === 401) {
          logout();
        }
      }
    } catch (err) {
      showMessage('Ошибка сервера', 'error');
    }
  });
  
  logoutBtn.addEventListener('click', () => {
    logout();
    showMessage('Вы вышли из системы', 'success');
  });
  
  function checkAuth() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (token && user.username) {
      authContainer.style.display = 'none';
      userContainer.style.display = 'block';
      usernameSpan.textContent = user.username;
      protectedDataDiv.textContent = '';
    } else {
      authContainer.style.display = 'block';
      userContainer.style.display = 'none';
      usernameSpan.textContent = '';
      protectedDataDiv.textContent = '';
    }
  }
  
  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    checkAuth();
  }
  
  function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = type;
    
    setTimeout(() => {
      messageDiv.textContent = '';
      messageDiv.className = '';
    }, 3000);
  }
}); 