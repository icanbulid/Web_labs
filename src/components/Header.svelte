<script>
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'

  import { userStore } from '$lib/stores/user.svelte'

  const user = $derived(userStore.user)

  function highlightActiveLink() {
    const currentUrl = window.location.pathname // Получаем текущий путь
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link')

    navLinks.forEach((link) => {
      // Если href заканчивается на текущий URL и не является ссылкой на аккаунт
      if (link.href.includes(currentUrl) && !link.classList.contains('account-link')) {
        link.classList.add('active-link')
      }
    })
  }

  function buttonlock() {
    const currentPage = window.location.pathname.split('/').pop() // Получаем имя текущей страницы

    // Получаем кнопки
    const loginButton = document.getElementById('loginButton')
    const registerButton = document.getElementById('registerButton')

    // Проверяем, на какой странице мы находимся и скрываем соответствующие кнопки
    if (currentPage === 'Login.html') {
      if (loginButton) {
        loginButton.style.display = 'none' // Скрыть кнопку "Войти"
      }
    } else if (currentPage === 'Register.html') {
      if (registerButton) {
        registerButton.style.display = 'none' // Скрыть кнопку "Регистрация"
      }
    }
  }

  function displayAccountInfo(user) {
    // Убедитесь, что элементы существуют
    const loggedOutHeader = document.getElementById('header-logged-out')
    const loggedInHeader = document.getElementById('header-logged-in')

    if (loggedOutHeader && loggedInHeader) {
      loggedOutHeader.style.display = 'none'
      loggedInHeader.style.display = 'block'
    }

    // Обновляем информацию о пользователе
    const usernameElement = document.getElementById('username')
    const avatarElement = document.getElementById('avatar')

    if (usernameElement && avatarElement) {
      usernameElement.innerText = user.username
      avatarElement.src = user.avatar_url // Используйте src для изображения
    }

    // Добавляем обработчик события для кнопки выхода
    const logoutButton = document.getElementById('logoutButton')
    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        localStorage.removeItem('user')
        location.reload() // Перезагрузить страницу
      })
    }
  }
</script>

{#if !user}
  <header id="header-logged-out">
    <div class="row">
      <div class="container">
        <div class="row bg-white text-center py-3">
          <div class="col-md-3">
            <div style="width: 150px; height: auto; background-color: #e0e0e0;"></div>
          </div>
          <div class="col-md-6" style="margin-bottom: 30px;">
            <nav class="navbar navbar-expand-lg navbar-light">
              <div class="container-fluid d-flex justify-content-between align-items-center">
                <ul class="navbar-nav mx-auto">
                  <li class="nav-item">
                    <a class="nav-link" href="/">Главная</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/about">О нас</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/catalog">Каталог</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/contacts">Контакты</a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div class="col-md-3">
            <button
              id="loginButton"
              type="button"
              class="btn btn-primary me-2"
              style="margin-top: 10px;"
              onclick={() => goto('/login')}>Войти</button
            >
            <button
              id="registerButton"
              type="button"
              class="btn btn-primary"
              style="margin-top: 10px;"
              onclick={() => goto('/register')}>Регистрация</button
            >
          </div>
        </div>
      </div>

      <div class="row align-items-center">
        <div class="col-md-3 text-center">
          <img src="/images/Mastercard.png" alt="Телефон" style="width: 80px; height: auto;" />
          <img src="/images/Maestro.png" alt="Телефон" style="width: 80px; height: auto;" />
          <img src="/images/mir.png" alt="Телефон" style="width: 80px; height: auto;" />
        </div>

        <div class="col-6">
          <a href="index.html">
            <img
              alt=""
              src="/images/Logo.png"
              class="mx-auto d-block"
              style="width: 170px; height: auto; margin-top: -50px; margin-bottom: -45px;"
            />
          </a>
        </div>
        <div class="col-md-3 text-center">
          <a class="nav-link" href="https://vk.com/rutravelexpert" style="display: inline-block; margin-right: 10px;">
            <img src="/images/vk.png" alt="ВКонтакте" style="width: 80px; height: auto;" />
          </a>
          <a class="nav-link" href="Mail.html" style="display: inline-block;">
            <img src="/images/mail.png" alt="Почта" style="width: 80px; height: auto;" />
          </a>
        </div>

        <div class="container">
          <div class="row bg-white text-center py-3 align-items-center">
            <div class="col-md-3 text-center">
              <img src="/images/time.png" alt="Часы" style="width: 30px; height: auto;" />
              <span>Пн-пт:с 9 до 19 ч. пн-пт</span>
            </div>

            <div class="col-md-6">
              <a href="/pages/index.html" class="logo">
                <span class="logo-text">ЗОЛОТАЯ СЕРЕДИНА</span>
              </a>
            </div>
            <div class="col-md-3 text-center">
              <img src="/images/phone.png" alt="Телефон" style="width: 30px; height: auto;" />
              <span>8(495)223-92-76 (многоканальный)</span>
            </div>
            <form onsubmit={performSearch(event)} class="w-100">
              <div class="mt-3 input-group">
                <input type="text" class="form-control" placeholder="Что ищем?" />
                <button type="submit" class="btn btn-primary">Поиск</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </header>
{:else}
  <header id="header-logged-in" style="display: none;">
    <div class="row">
      <div class="container">
        <div class="row bg-white text-center py-3 align-items-center">
          <!-- Добавлено align-items-center -->
          <div class="col-md-3">
            <div style="width: 150px; height: auto; background-color: #e0e0e0;"></div>
          </div>
          <div class="col-md-6" style="margin-bottom: 30px;">
            <nav class="navbar navbar-expand-lg navbar-light">
              <div class="container-fluid d-flex justify-content-between align-items-center">
                <ul class="navbar-nav mx-auto">
                  <ul class="navbar-nav mx-auto">
                    <li class="nav-item">
                      <a class="nav-link" href="index.html">Главная</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="About.html">О нас</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="Catalog.html">Каталог</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="Contacts.html">Контакты</a>
                    </li>
                  </ul>
                </ul>
              </div>
            </nav>
          </div>

          <div class="col-md-3" style="margin-top: -35px;">
            <nav class="navbar navbar-expand-lg navbar-light">
              <div class="container-fluid">
                <div class="collapse navbar-collapse" id="navbarNav">
                  <ul class="navbar-nav ms-auto">
                    <li class="nav-item dropdown">
                      <a
                        class="nav-link dropdown-toggle account-link"
                        href="#"
                        id="userDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img
                          id="avatar"
                          src={user.avatar_url}
                          alt="Аватар"
                          style="width: 50px; height: 50px; border-radius: 50%;"
                        />
                        <span id="username">{user.username}</span>
                      </a>
                      <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                        <li><a class="dropdown-item" href="Upload.html" id="uploadIconButton">Загрузить иконку</a></li>
                        <input
                          type="file"
                          id="iconUpload"
                          accept="image/*"
                          style="display: none;"
                          onchange={uploadIcon()}
                        />
                        <li>
                          <a class="dropdown-item active" href="#" id="logoutButton" onclick={() => userStore.logout()}
                            >Выйти</a
                          >
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <div class="row align-items-center">
        <div class="col-md-3 text-center">
          <img src="/images/Mastercard.png" alt="Телефон" style="width: 80px; height: auto;" />
          <img src="/images/Maestro.png" alt="Телефон" style="width: 80px; height: auto;" />
          <img src="/images/mir.png" alt="Телефон" style="width: 80px; height: auto;" />
        </div>

        <div class="col-6">
          <a href="index.html">
            <img
              alt=""
              src="/images/Logo.png"
              class="mx-auto d-block"
              style="width: 170px; height: auto; margin-top: -50px; margin-bottom: -45px;"
            />
          </a>
        </div>
        <div class="col-md-3 text-center">
          <a class="nav-link" href="https://vk.com/rutravelexpert" style="display: inline-block; margin-right: 10px;">
            <img src="/images/vk.png" alt="ВКонтакте" style="width: 80px; height: auto;" />
          </a>
          <a class="nav-link" href="Mail.html" style="display: inline-block;">
            <img src="/images/mail.png" alt="Почта" style="width: 80px; height: auto;" />
          </a>
        </div>

        <div class="container">
          <div class="row bg-white text-center py-3 align-items-center">
            <div class="col-md-3 text-center">
              <img src="/images/time.png" alt="Часы" style="width: 30px; height: auto;" />
              <span>Пн-пт:с 9 до 19 ч. пн-пт</span>
            </div>

            <div class="col-md-6">
              <a href="/pages/index.html" class="logo">
                <span class="logo-text">ЗОЛОТАЯ СЕРЕДИНА</span>
              </a>
            </div>
            <div class="col-md-3 text-center">
              <img src="/images/phone.png" alt="Телефон" style="width: 30px; height: auto;" />
              <span>8(495)223-92-76 (многоканальный)</span>
            </div>
            <form onsubmit={performSearch(event)} class="w-100">
              <div class="mt-3 input-group">
                <input type="text" class="form-control" placeholder="Что ищем?" />
                <button type="submit" class="btn btn-primary">Поиск</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </header>
{/if}
