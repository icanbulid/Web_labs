<script>
  import { goto } from '$app/navigation'
  import { userStore } from '$lib/stores/user.svelte'
  import { page } from '$app/stores'

  let activeLink = $state(null)
  page.subscribe((p) => {
    activeLink = p.url.pathname
  })

  let user = $derived(userStore.user)
  let search = $state('')

  const links = [
    { name: 'Главная', url: '/' },
    { name: 'О нас', url: '/about' },
    { name: 'Каталог', url: '/catalog' },
    { name: 'Контакты', url: '/contacts' },
  ]

  const performSearch = (event) => {
    event.preventDefault()
    goto(`/catalog?search=${encodeURIComponent(search)}`)
  }
</script>

<header class="container">
  <div class="row">
    <div class="container">
      <div class="row bg-white text-center py-3 align-items-center">
        <div class="col-md-3">
          <div style="width: 150px; height: auto; background-color: #e0e0e0;"></div>
        </div>
        <div class="col-md-6" style="margin-bottom: 30px;">
          <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container-fluid d-flex justify-content-between align-items-center">
              <ul class="navbar-nav mx-auto">
                {#each links as link}
                  <li class="nav-item">
                    <a class="nav-link" href={link.url} class:active-link={activeLink === link.url}>{link.name}</a>
                  </li>
                {/each}
              </ul>
            </div>
          </nav>
        </div>

        {#if !user}
          <div class="col-md-3">
            <a href="/login" id="loginButton" type="button" class="btn btn-primary me-2" style="margin-top: 10px;"
              >Войти</a
            >
            <a id="registerButton" type="button" href="/register" class="btn btn-primary" style="margin-top: 10px;"
              >Регистрация</a
            >
          </div>
        {:else}
          <div class="col-md-3" style="margin-top: -35px;">
            <nav class="navbar navbar-expand-lg navbar-light">
              <div class="container-fluid">
                <div class="collapse navbar-collapse" id="navbarNav">
                  <ul class="navbar-nav ms-auto">
                    <li class="nav-item dropdown">
                      <button
                        class="nav-link dropdown-toggle account-link"
                        id="userDropdown"
                        type="button"
                        data-toggle="dropdown"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <img
                          id="avatar"
                          src={user.avatar_url}
                          alt="Аватар"
                          style="width: 50px; height: 50px; border-radius: 50%;"
                        />
                        <span id="username">{user.username}</span>
                      </button>
                      <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                        <li><a class="dropdown-item" href="/upload" id="uploadIconButton">Загрузить иконку</a></li>
                        <li>
                          <button class="dropdown-item active" id="logoutButton" onclick={() => userStore.logout()}
                            >Выйти
                          </button>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        {/if}
      </div>
    </div>

    <div class="row align-items-center">
      <div class="col-md-3 text-center">
        <img src="/images/Mastercard.png" alt="Телефон" style="width: 80px; height: auto;" />
        <img src="/images/Maestro.png" alt="Телефон" style="width: 80px; height: auto;" />
        <img src="/images/mir.png" alt="Телефон" style="width: 80px; height: auto;" />
      </div>

      <div class="col-6">
        <a href="/">
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
            <a href="/" class="logo">
              <span class="logo-text">ЗОЛОТАЯ СЕРЕДИНА</span>
            </a>
          </div>
          <div class="col-md-3 text-center">
            <img src="/images/phone.png" alt="Телефон" style="width: 30px; height: auto;" />
            <span>8(495)223-92-76 (многоканальный)</span>
          </div>
          <form onsubmit={performSearch} class="w-100">
            <div class="mt-3 input-group">
              <input bind:value={search} type="text" class="form-control" placeholder="Что ищем?" />
              <button type="submit" class="btn btn-primary">Поиск</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</header>
