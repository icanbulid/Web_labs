<script>
  const onsubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData.entries())

    try {
      const response = await fetch('http://localhost:5502/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const userData = await response.json()
        localStorage.setItem('user', JSON.stringify(userData.user))
        displayAccountInfo(userData.user)
      } else {
        const errorData = await response.json()
        document.getElementById('login-error-message').innerText = errorData.message || 'Ошибка входа'
      }
    } catch (error) {
      document.getElementById('login-error-message').innerText = 'Ошибка сервера'
    }
  }
</script>

<div class="col-12">
  <h1 class="text-center">Логин</h1>
</div>

<div class="col-12 text-center" id="login-container">
  <form id="loginForm" {onsubmit}>
    <div class="form-login">
      <input type="text" class="form-control" placeholder="Логин или почта" name="username" required />
    </div>
    <div class="form-login">
      <input type="password" class="form-control" placeholder="Пароль" name="password" required />
    </div>
    <div id="login-error-message" class="mt-2"></div>
    <button type="submit" class="btn btn-primary">Войти</button>
  </form>
</div>
<div class="col-12 text-center" id="account-info" style="display: none;">
  <h2>Добро пожаловать, <span id="account-username"></span>!</h2>
</div>
<div class="col-12 text-center">
  <a class="nav-flex-link" href="/register">Нет Аккаунта? Регистрация</a>
</div>
