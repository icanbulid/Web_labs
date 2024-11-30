<script>
  import { goto } from '$app/navigation'
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
      const res = await userStore.uploadAvatar(formData)
      if ('message' in res) {
        errorMessage = res.message
      }
    } catch (error) {
      console.error('Ошибка:', error)
      errorMessage = 'Ошибка при загрузке аватара'
    }
  }
</script>

<!-- make forn with bootstrap -->
<div class="col-12 text-center">
  <h1 class="text-center">Загрузить аватар</h1>
</div>
<div class="col-12 text-center">
  <form
    id="avatar-upload-form"
    style="display: flex; justify-content: center;"
    enctype="multipart/form-data"
    {onsubmit}
  >
    <input class="input form-control mx-0" type="file" name="avatar" required />
    <button class="form-button btn btn-primary" type="submit">Загрузить аватар</button>
    <div class="">{errorMessage}</div>
  </form>
</div>
