<template>

<div class="row mb-12">
    <div class="col-4" v-for="(people, index) in persons" :key="index">
        <div class="card">
        <!--<img class="card-img-top" :src="'https://image.tmdb.org/t/p/w500' + people.poster_path" alt="Card imge cap"> -->

            <div class="card-body">
              <h1> {{people.name}} <br></h1>
              เพศ : {{people.gender}} <br>
              ความนิยม :{{people.popularity}}

              <!-- <a :href="movie.release_date" target="_blank" class="btn btn-primary">

          </a> -->
            </div>

        </div>

    </div>
</div>
</template>

<script>
export default {
  props: {
    persons: Array
  }
}
</script>

<style lang="less" scoped>

</style>
