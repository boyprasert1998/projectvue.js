<template>
  <div>
    <h1>Animals</h1>
    <div class="row mt-6">
      <div class="col-3">
        <button class="btn btn-outline-primary" @click="animals = 'dog'">
          Dog
        </button>
      </div>
      <div class="col-3">
        <button
          class="btn btn-outline-success"
          @click="animals = 'cat'"
          name="cat"
        >
          Cats
        </button>
      </div>
      <div class="col-3">
        <button
          class="btn btn-outline-secondary"
          @click="animals = 'bird'"
          name="bird"
        >
          Birds
        </button>
      </div>
      <div class="col-3">
        <button
          class="btn btn-outline-danger"
          @click="animals = 'rabbit'"
          name="rabbit"
        >
          Rabbits
        </button>
      </div>
    </div>

    <div class="row- mt-4">
      <div class="col-md-4 offset-4">
        <div class="card">
          <div v-if="animals">
            <div v-if="animals === 'dog'">
              <img
                class="card-img"
                src="https://www.dogsclip.com/img/upload/02Articles/CoverImg/dsc_artiCoverImg7431631557701007.jpg"
              />
              <h5 class="card-title">{{ animals }}</h5>
            </div>
            <div v-if="animals === 'cat'">
              <img
                class="card-img"
                src="https://i1.wp.com/shopee.co.th/blog/wp-content/uploads/2020/03/%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B9%81%E0%B8%A1%E0%B8%A7.jpg?fit=1200%2C801&ssl=1&resize=1280%2C720"
              />
              <h5 class="card-title">{{ animals }}</h5>
            </div>
            <div v-if="animals === 'bird'">
              <img
                class="card-img"
                src="https://www.thairath.co.th/media/dFQROr7oWzulq5FZX9zsi7MqIhWEJc78sd7ZHDrMVkwEZ9tHyHLDqfjh0TZpfJD9hPP.webp"
              />
              <h5 class="card-title">{{ animals }}</h5>
            </div>
            <div v-if="animals === 'rabbit'">
              <img
                class="card-img"
                src="https://i2.wp.com/shopee.co.th/blog/wp-content/uploads/2019/08/%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5%E0%B9%80%E0%B8%A5%E0%B8%B5%E0%B9%89%E0%B8%A2%E0%B8%87%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%95%E0%B9%88%E0%B8%B2%E0%B8%A2.jpg?fit=1200%2C800&ssl=1&resize=1280%2C720"
              />
              <h5 class="card-title">{{ animals }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      animals: false
    }
  }
}
</script>
<style lang="less" scoped></style>
