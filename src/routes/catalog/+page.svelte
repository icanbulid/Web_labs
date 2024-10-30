<script>
  import { toursStore } from '$lib/stores/tours.svelte'
  import { page } from '$app/stores'

  let search = $state(decodeURIComponent($page.url.searchParams.get('search') || ''))
  let catalog = $derived(toursStore.tours)
  let status = $derived(toursStore.status)

  $effect(() => {
    search = decodeURIComponent($page.url.searchParams.get('search') || '')
  })

  let filteredCatalog = $derived.by(() => {
    if (!search) return catalog
    return catalog.filter((tour) => tour.title.toLowerCase().includes(search.toLowerCase()))
  })

  const rows = $derived.by(() => {
    const rows = []
    for (let i = 0; i < filteredCatalog.length; i++) {
      if (i % 4 === 0) rows.push([filteredCatalog[i]])
      else rows.at(-1)?.push(filteredCatalog[i])
    }
    return rows
  })
</script>

<div class="container-fluid">
  <div class="row justify-content-center">
    <div class="col-md-9">
      <h1 class="display-4 text-center lead mt-20 mb-20">КАТАЛОГ</h1>
    </div>
  </div>
</div>
{#if status === 'loading'}
  <main style="display: flex; justify-content: center; align-items: center;">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </main>
{:else if status === 'succeed'}
  <main class="container mt-4">
    {#each rows as row}
      <div class="row">
        {#each row as item}
          <a href={`\\catalog\\${item.id}`} class="col-md-3 mb-4">
            <div class="card text-center hover-effect">
              <img src={item.img_url} class="card-img-top" alt="Псков" />
              <div class="card-body">
                <h5 class="card-title">{item.title}</h5>
                <span>{item.price} руб.</span>
              </div>
            </div>
          </a>
        {/each}
      </div>
    {/each}
  </main>
{/if}
