<script>
  import { goto } from '$app/navigation'
  import { userStore } from '$lib/stores/user.svelte'
  import { onMount } from 'svelte'

  onMount(() => {
    if (!userStore.user) goto('/login')
  })
</script>

<div class="col-12 text-center">
  <h1>Добро пожаловать в ваш аккаунт</h1>
  <div id="user-info"></div>
  <button id="logout" class="btn btn-danger" onclick={() => userStore.logout()}>Выйти</button>
</div>
