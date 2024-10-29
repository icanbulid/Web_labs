<script>
  import Footer from '../components/Footer.svelte'
  import Header from '../components/Header.svelte'
  import '$lib/style.css'

  const { children } = $props()
</script>

<div class="">
  <Header />

  {@render children()}

  <Footer />
</div>
