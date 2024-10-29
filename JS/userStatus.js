// Пример функции, которая проверяет, зарегистрирован ли пользователь
function checkUserStatus() {
  // Здесь вы можете использовать ваш метод проверки состояния пользователя
  // Например, проверка локального хранилища
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' // или любое другое условие

  // Получаем кнопки по их ID
  const loginButton = document.getElementById('loginButton')
  const registrationButton = document.getElementById('registrationButton')

  // Если пользователь не зарегистрирован, блокируем кнопки
  if (!isLoggedIn) {
    loginButton.disabled = true
    registrationButton.disabled = true
  } else {
    loginButton.disabled = false
    registrationButton.disabled = false
  }
}

// Вызываем функцию при загрузке страницы
window.onload = checkUserStatus
