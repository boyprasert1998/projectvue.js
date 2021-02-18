<template>
  <div class="container">
   <h2>Register</h2>
    <div class="row text-left">
      <div class="col-6 offset-3">
        <div class="card">
          <div class="card-body">
            <form>
              <label for="email"></label>
              <input
                type="text"
                class="form-control"
                name="email"
                v-model="email"
                placeholder="email"
              />

              <label for="password"></label>
              <input
                type="password"
                class="form-control"
                name="password"
                v-model="password"
                placeholder="Password"
              />
            </form>
            <div class="text-right m-2">
              <button class="btn btn-primary" @click="register()">Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <button type="submit" class="btn btn-primary" @click="test">Submit</button> -->
    <!-- {{ user}}
    {{getName}} -->
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import firebase from 'firebase'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    }),
    ...mapGetters({
      getName: 'user/getName'
    })
  },
  methods: {
    ...mapActions('user', [
      'LOGIN'
    ]),
    register: function () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          alert('สมัครสมาชิกสำเร็จ')

          this.$router.push('/login')
        },
        (error) => {
          alert('Error' + error.message)
        }
      )
    },
    test () {
      console.log('test')
      const myUser = null
      this.LOGIN(myUser)
    }
  }
}
</script>
