<script>
  import { goto } from '$app/navigation'
  import { userStore } from '$lib/stores/user.svelte'
  import { onMount } from 'svelte'

  onMount(() => {
    if (!userStore.user) goto('/login')
  })

  let user = $derived(userStore.user)
  let message = $state('')

  const onsubmit = async (event) => {
    event.preventDefault()
    if (!user) return
    message = ''

    const formData = new FormData(event.target)
    try {
      const res = await userStore.createComment(formData.get('message'))
      console.log(res)
      if ('message' in res) {
        message = res.message
      }
    } catch (error) {
      console.error('Ошибка:', error)
      message = 'Ошибка при отправке сообщения'
    }
  }
</script>

<div class="col-12">
  <h1 class="text-center">Обратная связь</h1>
</div>
<div class="col-12 text-center">
  <form {onsubmit} style="display: flex; flex-direction: column; width: 600px">
    <div class="form-group">
      <textarea class="form-control" name="message" placeholder="Ваше сообщение" id="message" rows="5"></textarea>
    </div>
    <button style="width: fit-content;" type="submit" class="btn btn-primary">Отправить</button>
    {message}
  </form>
</div>
