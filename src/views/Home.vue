<template>
<div class="home">
    <h2>Hello Movie</h2>
    <movie-list :displayData="displayData"></movie-list>
</div>
</template>

<script>
import MovieList from '@/components/movie/MovieList.vue'

export default {
  name: 'Home',
  components: {
    MovieList
  },
  data () {
    return {
      displayData: {
        type: 'upcoming',
        style: 'row'
      }
    }
  }
}
</script>
