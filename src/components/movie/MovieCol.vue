<template>
<div class="row mb-12">
    <div class="col-4" v-for="(movie, index) in movies" :key="index">
        <div class="card">
            <img class="card-img-top" :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="Card imge cap">
          <router-link :to="'/movie/'+ movie.id" class='no-style'>
            <div class="card-body">
                <h1> {{movie.original_title}} <br></h1>
                {{movie.overview}} <br>

                วันที่เข้าฉาย : {{movie.release_date}}
                <!-- <a :href="movie.release_date" target="_blank" class="btn btn-primary">

            </a> -->
            </div>
          </router-link>
        </div>

    </div>
</div>
</template>

<script>
export default {
  props: {
    movies: Array
  }
}
</script>

<style scoped>
a.no-style{
  color: black!important;
  text-decoration: none;
}

</style>
