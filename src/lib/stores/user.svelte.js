import { apiEndpoint } from '$lib/api'

class UserStore {
  #user = $state(null)

  get user() {
    return this.#user
  }

  async load() {
    // const res = await fetch(`${apiEndpoint}/users/current`)
    // const user = await res.json()

    // this.#user = user
    this.#user = {
      id: 1,
      username: 'admin',
      avatar_url: 'https://avatars.githubusercontent.com/u/101927351?v=4',
    }
  }

  async login({ email, password }) {
    const user = await fetch(`${apiEndpoint}/login`, {
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

    const user = await res.json()
    this.#user = user
  }
}

export const userStore = new UserStore()
