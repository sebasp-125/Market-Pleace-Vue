<template lang="en">
  <div>
    <b-carousel 
      id="carousel-no-animation"
      class="custom-carousel"
      no-animation
      indicators
      img-width="1024"
      img-height="480"
    >
      <b-carousel-slide
        img-src="https://res.cloudinary.com/dbwgsrqgm/image/upload/v1718413094/Zapatos/Post_de_instagram_zapatos_elegante_naranja_1_se983w.png"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="https://res.cloudinary.com/dbwgsrqgm/image/upload/v1718413094/Zapatos/Post_de_instagram_zapatos_elegante_naranja_q2bb0r.png"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="https://picsum.photos/1024/480/?image=22"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="https://picsum.photos/1024/480/?image=23"
      ></b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.custom-carousel {
  max-width: 800px;
  max-height: 400px; 
  margin: 0 auto;
}

.custom-carousel img {
  width: 100%;
  height: auto;
}
</style>
