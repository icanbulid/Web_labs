<script>
  import { page } from '$app/stores'
  import { toursStore } from '$lib/stores/tours.svelte'
  // $effect(() => {
  console.log($page.params)

  // })

  let id = $derived(Number($page.params.id))
  let tour = $derived(toursStore.getById(id))
  let status = $derived(toursStore.status)
</script>

{#if status === 'loading'}
  <main style="display: flex; justify-content: center; align-items: center;">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </main>
{:else if tour}
  <main>
    <div class="container my-5">
      <div class="row">
        <div class="col-md-6">
          <img src={tour.img_url} alt="Городской тур" class="img-fluid rounded" style="width: 100%;" />
        </div>
        <div class="col-md-6">
          <h1 class="display-5 fw-bold">{tour.title}</h1>

          <p class="mt-4">
            {tour.description}
          </p>

          <div class="d-flex align-items-center mt-4">
            <h3 class="fw-bold text-primary mb-0">Цена: {tour.price} ₽</h3>
          </div>

          <button class="btn btn-primary mt-4 px-4 py-2">Забронировать тур</button>
        </div>
      </div>
    </div>
  </main>
{/if}
