<script>
  import { goto } from '$app/navigation'
  import { userStore } from '$lib/stores/user.svelte'

  let errorMessage = $state('')

  const onsubmit = async (event) => {
    event.preventDefault()
    errorMessage = ''

    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData.entries())

    if (data.password !== data.confirm_password) {
      errorMessage = 'Пароли не совпадают'
      return
    }

    try {
      const res = await userStore.register(data)
      if ('message' in res) {
        errorMessage = res.message
      } else goto('/register-success')
    } catch (_e) {
      errorMessage = 'Ошибка сервера'
    }
  }
</script>

<div class="col-12">
  <h1 class="text-center">Регистрация</h1>
</div>
<div class="col-12 text-center">
  <form id="registrationForm" {onsubmit}>
    <div class="form-group">
      <input type="email" name="email" placeholder="Email" class="register-input" required />
    </div>
    <div class="form-group">
      <input type="text" name="username" class="form-control" placeholder="Логин" required />
    </div>
    <div class="form-group">
      <input type="text" name="first_name" class="form-control" placeholder="Имя" required />
    </div>
    <div class="form-group">
      <input type="text" name="last_name" class="form-control" placeholder="Фамилия" required />
    </div>
    <div class="form-group">
      <input type="password" name="password" class="form-control" placeholder="Пароль" required />
    </div>
    <div class="form-group">
      <input type="password" name="confirm_password" class="form-control" placeholder="Повторите пароль" required />
    </div>
    <div id="registration-error-message" class="mt-2">{errorMessage}</div>
    <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
  </form>
</div>

<div class="col-12 text-center">
  <a class="nav-flex-link" href="/login">Уже зарегистрированы? Логин</a>
</div>
