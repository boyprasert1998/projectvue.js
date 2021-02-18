<template>
  <div class="container-fluid">
    <nav class="navbar navbar-dark bg-primary">
      <a class="navbar-brand" href="#">ข่าวใหม่</a>
      <a class="navbar-brand text-rigth">รายชื่อเพือน</a>
      <div class="collapse navbar-collapse" id="navbarNav"></div>
    </nav>
    <div class="row mt-3">
      <div class="col-12 col-md-10">
        <div class="card">
          <div class="card-body">
            <template>
              <div>
                <b-form-textarea
                  id="textarea"
                  v-model="text"
                  placeholder="คุณกำลังคิดอะไร..."
                  rows="5"
                  max-rows="6"
                ></b-form-textarea>
              </div>
            </template>
            <div class="text-right">
              <button class="btn btn-primary mt-3" @click="addText">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 col-md-2">
        <div class="card">
          <div class="card-body">
            <div v-for="(data, index) in dataPeople" :key="index">
              <b-list-group-item class="d-flex align-items-center">
                <b-avatar
                  variant="info"
                  img
                  :src="data.profile_image"
                  class="mr-3"
                ></b-avatar>
                <span class="mr-auto">{{ data.name }}</span>
              </b-list-group-item>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-for="(get, index) in textGet" :key="index">
      <div class="row mt-3">
        <div class="col-4 offset-4">
          <div class="card">
            <div class="text-right">
              <b-button-group>
                <b-dropdown variant="primary">
                  <b-dropdown-item>
                    <b-button
                      v-b-modal.modal-2
                      variant="warning"
                      @click.prevent="show(get.id)"
                    >
                      Edit
                    </b-button>
                  </b-dropdown-item>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-item>
                    <button
                      type="bunton"
                      class="btn btn-danger"
                      @click.prevent="deleteData(get.id)"
                    >
                      Delete
                    </button>
                  </b-dropdown-item>
                </b-dropdown>
              </b-button-group>
            </div>

            <div class="card">
              <div class="text-left">
                <b-list-group-item class="d-flex align-items-center">
                  <b-avatar
                    variant="info"
                    img
                    :src="get.profile_image"
                    class="mr-3"
                  ></b-avatar>
                  <span class="mr-auto">
                    {{ get.name }} <br />
                    {{ moment(get.created_at).fromNow() }}</span
                  >
                </b-list-group-item>
              </div>
            </div>
            <div class="text-left">
              <div class="card-body">
                {{ get.feed }}
                <hr />
                <div class="row">
                  <div class="col-3">
                    <div v-if="get.like_user_id">
                      <div @click="clickLike(get.id)">
                       <i class="far fa-thumbs-up"></i>
                       1 {{ get.name }}
                      </div>
                    </div>
                    <div v-else>
                      <div @click="clickLike(get.id)">
                        <i class="far fa-thumbs-up"></i>
                      </div>
                    </div>
                  </div>

                  <div class="col-7">
                    <b-button variant="light">แสดงความคิดเห็น</b-button>
                  </div>
                  <div class="col-2">
                    <p class="pointer">
                      <i class="fas fa-share"></i>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal ref="my-modal" id="modal-2" title="แก้ไขสถานะ" hide-footer>
      <form>
        <div class="form-group">
          <b-form-textarea
            id="textarea"
            v-model="textShow"
            rows="5"
            max-rows="6"
          ></b-form-textarea>
        </div>
        <div class="text-right">
          <button
            type="submit"
            class="btn btn-primary"
            @click.prevent="textUpdate()"
          >
            Submit
          </button>
        </div>
      </form>
    </b-modal>
  </div>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'
const moment = require('moment')

export default {
  data () {
    return {
      moment: moment,
      dataPeople: [],
      // ชื่อเพือน
      textGet: [],
      //  เอาข้อมูล feel ทั้งหมดมาแสดง
      text: null,
      // v-model
      id: null,
      selectedId: null,

      textShow: null
    }
  },
  methods: {
    setSelectedData (get) {
      this.selectedData = get
    },
    dataName () {
      const url = '/user'
      axios.get(url).then((response) => {
        this.dataPeople = response.data.users
        console.log('name ', response)
      })
    },
    addText () {
      const url = '/feed'
      axios
        .post(url, {
          textSent: this.text
        })
        .then((response) => {
          console.log('textpost', response)
          this.getText()
          this.text = null
        })
    },
    getText () {
      const url = '/feed'
      axios.get(url).then((response) => {
        console.log('getText', response)
        this.textGet = response.data.news_feed
        // console.log('textget', this.textGet)
      })
    },
    show (id) {
      this.selectedId = id
      console.log('Id', this.selectedId)
      const url = '/feed/' + this.selectedId
      axios.get(url).then((response) => {
        this.textShow = response.data.feed
        console.log('show', response)
      })
    },
    textUpdate () {
      const url = '/feed/' + this.selectedId
      axios
        .put(url, {
          textUpdate: this.textShow
        })
        .then((response) => {
          this.$refs['my-modal'].hide()
          this.getText()
          console.log('Update ', response)
        })
    },
    deleteData (id) {
      Swal.fire({
        title: 'คุณแน่ใจที่จะลบข้อมูล?',
        // text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then((result) => {
        if (result.isConfirmed) {
          const url = '/feed/' + id
          axios.delete(url).then((response) => {
            Swal.fire('สำเร็จ!', 'คุณลบข้อมูลสำเร็จ.', 'success')

            this.getText()
            console.log('delete ', response)
          })
        }
      })
    },
    clickLike (feedid) {
      const url = '/feed/' + feedid + '/update-like'
      axios
        .put(url, {
          likeUserId: 1
        })
        .then((response) => {
          this.$refs['my-modal'].hide()
          this.getText()
          console.log('like ', response)
        })
    }
  },
  created () {
    this.dataName()
    this.getText()
  }
}
</script>
<style scoped>
.pointer {
  cursor: pointer;
}
</style>
