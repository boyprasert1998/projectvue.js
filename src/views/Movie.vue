<template>
  <div class="container">
    <div class="form-group">
      <input type="text" @keyup.enter="submitData" class="form-control" placeholder="Search movie name..." v-model="keyword" />
      <button class="btn btn-primary mt-3" @click="submitData">Search movies</button>
    </div>
    <movie-list ref="movieList" :displayData="displayData"></movie-list>
  </div>
</template>

<script>
import MovieList from '@/components/movie/MovieList.vue'

export default {
  components: {
    MovieList
  },

  data () {
    return {
      displayData: {
        type: 'popular',
        style: 'column'
      },
      keyword: null,
      key: null
    }
  },
  methods: {
    submitData () {
      // const keyword = 'war'

      console.log('check component')
      this.$refs.movieList.searchMovie(this.keyword)
    }
  }
}
</script>
