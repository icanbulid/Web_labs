import { apiEndpoint } from '$lib/api'

class ToursStore {
  #tours = $state([])
  #status = $state('idle')

  get tours() {
    return this.#tours
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
      const res = await fetch(`${apiEndpoint}/tours`)
      if (!res.ok) throw new Error('Failed to load tours')

      const tours = await res.json()
      this.#tours = tours

      this.#status = 'succeed'
    } catch (error) {
      console.error(error)
      this.#status = 'failed'
    }
  }

  getById(id) {
    return this.#tours.find((tour) => tour.id === id)
  }
}

export const toursStore = new ToursStore()