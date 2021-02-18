<template>
<div class="card mb-4">
    <div class="card-body">

        <div class="row mb-8">
            <div class="row-4" v-for="(movie, index) in movies" :key="index">
              <router-link :to="'/movie/'+ movie.id" class='no-style'>
                  <div class="card">
                      <div class="row">
                          <div class="col-2">
                              <img class="card-img-top" :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="Card imge cap">
                          </div>
                          <div class="col-10">
                              <div class="card-body">
                                  <h1> {{movie.original_title}} <br></h1>
                                  {{movie.overview}} <br>
                                  วันที่เข้าฉาย : {{movie.release_date}}
                              </div>
                          </div>

                      </div>
                  </div>
                </router-link>
            </div>
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
