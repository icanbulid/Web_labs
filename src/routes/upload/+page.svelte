<script>
  import { goto } from '$app/navigation'
  import { userStore } from '$lib/stores/user.svelte'
  import { onMount } from 'svelte'

  onMount(() => {
    if (!userStore.user) goto('/login')
  })

  let user = $derived(userStore.user)

  const onsubmit = async (event) => {
    event.preventDefault()
    if (!user) return
    const formData = new FormData(event.target)

    formData.append('userId', user.id)

    try {
      const response = await fetch('http://localhost:5502/upload-avatar', {
        method: 'POST',
        body: formData,
      })
      const result = await response.json()
      document.getElementById('message').innerText = result.message
      if (response.ok) {
        // Обновление аватара пользователя в локальном хранилище
        user.avatar_url = result.avatarUrl // Убедитесь, что ключ совпадает с тем, что возвращает сервер
        localStorage.setItem('user', JSON.stringify(user))

        // Обновление аватара на странице login.html
        const avatarElement = document.getElementById('avatar')
        if (avatarElement) {
          avatarElement.src = result.avatarUrl // Устанавливаем новый URL аватара
        }
      }
    } catch (error) {
      console.error('Ошибка:', error)
      document.getElementById('message').innerText = 'Ошибка при загрузке аватара'
    }
  }
</script>

<form id="avatar-upload-form" enctype="multipart/form-data" {onsubmit}>
  <input type="file" name="avatar" required />
  <button type="submit">Загрузить аватар</button>
</form>
