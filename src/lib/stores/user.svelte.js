class UserStore {
  #user = $state(null)

  async load() {
    const user = await fetch('/api/users/current')
    this.#user = user
  }

  async login(email, password) {
    try {
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
    } catch (e) {
      console.log(e)
    }
  }

  async logout() {
    await fetch('/api/users/logout')
    this.#user = null
  }

  get user() {
    return this.#user
  }

  // async register(email, username, password) {
  //   try {
  //     const user = await fetch('/api/users/register', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         email,
  //         username,
  //         password,
  //       }),
  //     })
  //     this.user = user
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
}

export const userStore = new UserStore()