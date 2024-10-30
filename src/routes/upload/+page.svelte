<script>
  import { goto } from '$app/navigation'
  import { apiEndpoint } from '$lib/api'
  import { userStore } from '$lib/stores/user.svelte'
  import { onMount } from 'svelte'

  onMount(() => {
    if (!userStore.user) goto('/login')
  })

  let user = $derived(userStore.user)
  let errorMessage = $state('')

  const onsubmit = async (event) => {
    event.preventDefault()
    if (!user) return
    errorMessage = ''
    const formData = new FormData(event.target)

    try {
      const response = await fetch(`${apiEndpoint}/upload-avatar`, {
        method: 'POST',
        body: formData,
      })
      const result = await response.json()

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(user))
      }
    } catch (error) {
      console.error('Ошибка:', error)
      errorMessage = 'Ошибка при загрузке аватара'
    }
  }
</script>

<form id="avatar-upload-form" enctype="multipart/form-data" {onsubmit}>
  <input type="file" name="avatar" required />
  <button type="submit">Загрузить аватар</button>
  <div class="">{errorMessage}</div>
</form>
