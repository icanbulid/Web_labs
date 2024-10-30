import { userStore } from '$lib/stores/user.svelte'

export const handle = async ({ event, resolve }) => {
  $effect(() => {
    if (userStore.status === 'succeed' || userStore.status === 'failed') resolve(event)
  })
}