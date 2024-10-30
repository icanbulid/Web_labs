import { apiEndpoint } from '$lib/api'

class UserStore {
  #user = $state()
  #status = $state('idle')


  get user() {
    return this.#user
  }

  get status() {
    return this.#status
  }

  constructor() {
    this.load()
  }

  async load() {
    try {
      this.#status = 'loading'
      const res = await fetch(`${apiEndpoint}/users/current`)
      const user = await res.json()
      if (res.ok) this.#user = user
      this.#status = 'succeed'
    } catch (error) {
      console.error(error)
      this.#status = 'failed'
    }
  }

  async login({ email, password }) {
    const res = await fetch(`${apiEndpoint}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    const data = await res.json()
    if (res.ok) this.#user = data
    return data
  }

  async logout() {
    await fetch(`${apiEndpoint}/logout`)
    this.#user = null
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

    const data = await res.json()
    if (res.ok) this.#user = data
    return data
  }

  async uploadAvatar(formData) {
    const res = await fetch(`${apiEndpoint}/users/current/upload-avatar`, {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    if (res.ok) this.#user = data
    return data
  }
}

export const userStore = new UserStore()
