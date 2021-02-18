<template>
  <div class="container">
    <div class="from-group">
      <!-- <input type="text" class="from-control" placeholder="ค้นหาจากชื่อหนัง" v-model="keyword"> <br>
      <button class="btn btn-primary mt-3">ค้นหา</button> -->
    </div>

    <!-- {{displayType}}
     {{displayStyle}}
     {{ movies }} -->
    <!-- <button
     class="btn btn-primary mt-4" @click="loadMovies()"> LoadMovies
     </button> -->
    <div v-if="displayData.style === 'column'">
      <template>
        <movie-col :movies="movies"></movie-col>
      </template>
    </div>
    <template v-else>
<!--     -->
      <movie-row :movies="movies"></movie-row>
    </template>

  </div>
</template>

<script>
import MovieCol from '@/components/movie/MovieCol.vue'

// import PeopleCol from '@/components/movie/PeopleCol.vue'

import axios from 'axios'
import MovieRow from '@/components/movie/MovieRow.vue'

export default {
  props: {
    displayData: Object
  },
  components: {
    MovieRow,
    MovieCol

    // 'people-col': PeopleCol
  },
  data () {
    return {
      movies: null,
      peoples: null,
      keyword: null,
      key: null,
      searchFrom: 'movie'
    }
  },

  methods: {
    loadMovies () {
      console.log('check')
      this.searchFrom = 'movie'
      const url = 'https://api.themoviedb.org/3/movie/' + this.displayData.type
      const queryparams = {
        api_key: '7c13e8a9302bd189c9017bb61e799251'
      }
      axios
        .get(url, {
          params: queryparams
        })
        .then((response) => {
          const status = response.status
          if (status === 200) {
            this.movies = response.data.results
          }
          console.log('reponse', response)
        })
        .catch((error) => {
          console.log('error', error)
        })
    },
    searchMovie (keyword) {
      console.log('check')
      this.searchFrom = 'movie'
      const url = 'https://api.themoviedb.org/3/search/movie'
      const queryparams = {
        api_key: '7c13e8a9302bd189c9017bb61e799251',
        query: keyword
      }
      axios
        .get(url, {
          params: queryparams
        })
        .then((response) => {
          const status = response.status
          if (status === 200) {
            this.movies = response.data.results
          }
          console.log('reponse', response)
        })
        .catch((error) => {
          console.log('error', error)
        })
    },
    searchPeople (key) {
      console.log('searchPeople')
      this.searchFrom = 'people'
      const url = 'https://api.themoviedb.org/3/search/person'
      const queryparams = {
        api_key: '7c13e8a9302bd189c9017bb61e799251',
        query: key
      }
      axios
        .get(url, {
          params: queryparams
        })
        .then((response) => {
          const status = response.status
          if (status === 200) {
            this.peoples = response.data.results
          }
          console.log('reponse', response)
        })
        .catch((error) => {
          console.log('error', error)
        })
    }
  },
  created () {
    console.log('created component')
  },
  mounted () {
    console.log('mounted and loadMovies component')
    this.loadMovies()
  },
  destroyed () {
    console.log('destroyed component')
  }
}
</script>
