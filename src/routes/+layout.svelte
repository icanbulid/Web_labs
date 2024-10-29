<script>
  import { userStore } from '$lib/stores/user.svelte'
  import '$lib/style.css'
  import Footer from '../components/Footer.svelte'
  import Header from '../components/Header.svelte'

  const { children } = $props()

  userStore.load()
</script>

<div class="">
  <Header />
  {@render children()}
  <Footer />
</div>
