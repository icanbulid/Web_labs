import { apiEndpoint } from '$lib/api'

class UserStore {
  #user = $state(null)

  async load() {
    const user = await fetch('/api/users/current')
    this.#user = user
  }

  async login(email, password) {
    const user = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    this.#user = user
  }

  async logout() {
    await fetch('/api/users/logout')
    this.#user = null
  }

  get user() {
    return this.#user
  }

  async register({ email, username, first_name, last_name, password, confirm_password }) {
    const res = await fetch(`${apiEndpoint}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        username,
        password,
        confirm_password,
        first_name,
        last_name,
      }),
    })

    const user = await res.json()
    this.#user = user
  }
}

export const userStore = new UserStore()
