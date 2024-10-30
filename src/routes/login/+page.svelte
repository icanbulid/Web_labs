<script>
  import { userStore } from '$lib/stores/user.svelte'

  let errorMessage = $state('')

  const onsubmit = async (event) => {
    event.preventDefault()
    errorMessage = ''

    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData.entries())

    try {
      await userStore.login(data)
    } catch (_e) {
      errorMessage = 'Ошибка входа'
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
    <span>{errorMessage}</span>
  </form>
</div>
<div class="col-12 text-center" id="account-info" style="display: none;">
  <h2>Добро пожаловать, <span id="account-username"></span>!</h2>
</div>
<div class="col-12 text-center">
  <a class="nav-flex-link" href="/register">Нет Аккаунта? Регистрация</a>
</div>
