<template>
  <div class="container">
     <!-- <h2>Movie Detail ID: {{ movieId }}</h2>
      {{ movieDetail }} -->
    <section class="container">
      <section class="movie-detail" v-if="movieDetail">
        <div class="row">
          <div class="col-3">
            <img
              class="img-fluid rounded"
              :src="'https://image.tmdb.org/t/p/w500' + movieDetail.poster_path"
              alt=""
            />
          </div>

          <div class="col-9 text-left">
            <h4>{{ movieDetail.title }} {{ this.movieYear }}</h4>

            <div class="row text-left">
              <span
                v-for="(typesMovie, index) in movieDetail.genres"
                :key="index"
              >
                <div v-if="index + 1 < movieDetail.genres.length">
                  {{ typesMovie.name }},
                </div>
                <div v-else>
                  {{ typesMovie.name }}
                </div>
              </span>
              <div class="text-left">
                <h3>Overview</h3>
                {{ movieDetail.overview }}
              </div>
              <div class="col-4">
                <!--            <a href="https://www.google.com">Goole</a> <br>-->
                <br />
                <button class="btn btn-primary">
                  <a :href="movieDetail.homepage">Go to Home</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
    <section class="movie-videos" v-if="movieVideos">
      <h2>VIDEOS</h2>
      <!--      {{ movieVideos }}-->
      <div class="row">
        <div
          class="col-4 p-2"
          v-for="(video, index) in movieVideos"
          :key="index"
        >
          <div class="embed-responsive embed-responsive-16by9">
            <youtube :video-id="video.key"></youtube>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      movieId: null,
      movieDetail: null,
      movieVideos: null
    }
  },
  computed: {
    movieYear () {
      const arr = this.movieDetail.release_date.split('-')
      const movieYear = arr[0]
      return movieYear
    }
  },

  methods: {
    loadMovieDetail () {
      const url = 'https://api.themoviedb.org/3/movie/' + this.movieId
      const queryparams = {
        api_key: '7c13e8a9302bd189c9017bb61e799251'
      }
      axios
        .get(url, { params: queryparams })
        .then((response) => {
          if (response.status === 200) {
            this.movieDetail = response.data
            // const data = response.data
            // console.log('response,data', data)
          }
        })
        .catch((error) => {
          console.log('error', error)
        })
    },
    loadMovieVideos () {
      const url =
        'https://api.themoviedb.org/3/movie/' + this.movieId + '/videos'
      const queryparams = {
        api_key: '7c13e8a9302bd189c9017bb61e799251'
      }
      axios
        .get(url, { params: queryparams })
        .then((response) => {
          if (response.status === 200) {
            this.movieVideos = response.data.results
            console.log('response videos', response)
          }
        })
        .catch((error) => {
          console.log('error videos', error)
        })
    }
  },
  mounted () {
    this.movieId = this.$route.params.id
    this.loadMovieDetail()
    this.loadMovieVideos()
  }
}
</script>
<style scoped>
a {
  color: black;
}
</style>
