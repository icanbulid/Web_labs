<script>
  const catalog = $state([
    {
      title: 'Тур в Псков',
      img: '/images/tours/Pskov.png',
    },
    {
      title: 'Тур в Беларусь',
      img: '/images/tours/Belarus.png',
    },
    {
      title: 'Джиптур по Дагестану',
      img: '/images/tours/Dagestan.png',
    },
    {
      title: 'Тур в Калининград',
      img: '/images/tours/Kaliningrad.png',
    },
    {
      title: 'Тур в Карелию',
      img: '/images/tours/Karelia.png',
    },
    {
      title: 'Тур в Марокко',
      img: '/images/tours/Marokko.png',
    },
    {
      title: 'Тур в Смоленск',
      img: '/images/tours/smolensk.png',
    },
    {
      title: 'Тур в Узбекистан',
      img: '/images/tours/Uzbekistan.png',
    },
  ])

  const rows = $derived.by(() => {
    const rows = []
    for (let i = 0; i < catalog.length; i++) {
      if (i % 4 === 0)
        rows.push([
          {
            title: catalog[i].title,
            img: catalog[i].img,
          },
        ])
      else
        rows.at(-1)?.push({
          title: catalog[i].title,
          img: catalog[i].img,
        })
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
<main class="container mt-4">
  {#each rows as row}
    <div class="row">
      {#each row as item}
        <div class="col-md-3 mb-4">
          <div class="card text-center hover-effect">
            <img src={item.img} class="card-img-top" alt="Псков" />
            <div class="card-body">
              <h5 class="card-title">{item.title}</h5>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/each}
</main>
