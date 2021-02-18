<template>
  <div class="container">
    <div class="row">
       <h2>ระบบลางาน</h2>
    <div class="col d-flex justify-content-end">
        <b-button v-b-modal.modal-1 variant="primary m-2">กรอกข้อมูลขอลางาน</b-button>
        <b-modal
          ref="my-modal"
          id="modal-1"
          title="กรอบข้อมูลขอลางาน"
          mt-2
          hide-footer
        >
          <form @submit.prevent="addMyProfile">
            <div class="form-group">
              <label for="name">ชื่อ</label>
              <input
                type="text"
                class="form-control"
                placeholder="ชื่อ"
                v-model="name"
                required
              />
              <label for="off">ขอลา</label> <br />
              <input
                type="radio"
                name="one"
                value="one"
                v-model="userOff"
              />วันเดียว <br />
              <input
                type="radio"
                name="two"
                value="two"
                v-model="userOff"
              />หลายวัน <br />
              <div v-if="userOff">
                <div v-if="userOff === 'one'">
                  <b-form-datepicker
                    id="example-datepicker"
                    v-model="datepicker"
                    class="mb-2"
                  ></b-form-datepicker>
                </div>
                <div v-else>
                  <b-form-datepicker
                    id="example-datepicker"
                    v-model="datepicker"
                    class="mb-2"
                  ></b-form-datepicker>
                  ถึง
                  <b-form-datepicker
                    id="example-datepicker"
                    v-model="datepicker1"
                    class="mb-2"
                  ></b-form-datepicker>
                </div>
              </div>
              <h2></h2>
              <label for="cause">สาเหตุการลา</label>
              <b-form-textarea
                id="textarea"
                v-model="cause"
                rows="5"
                max-rows="6"
              ></b-form-textarea>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </b-modal>
    </div>
    <table class="table text-center">
      <thead>
        <tr>
          <th scope="col">ลำดับ</th>
          <th scope="col">ชื่อ</th>
          <th scope="col">วันลาเริ่มต้น</th>
          <th scope="col">วันลาสิ้นสุด</th>
          <th scope="col">เหตุผลของการลา</th>
          <th scope="col">สถานะการลา</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(profile, index) in myProfile" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ profile.name }}</td>
          <td>{{ profile.start_date | prettyDate }}</td>
          <td>{{ profile.eng_date | prettyDate }}</td>
          <td>{{ profile.cause }}</td>
          <td>
            <span v-html="$options.filters.statusColor(profile.status)"></span>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      myProfile: [],
      search: null,
      name: null,
      userOff: null,
      datepicker: null,
      datepicker1: null,
      cause: null
    }
  },
  methods: {
    showMyProfile () {
      const url = 'http://127.0.0.1:8000/leave'
      axios
        .get(url, {
          params: {
            keyword: this.search
          }
        })
        .then((response) => {
          this.myProfile = response.data
          console.log('แสดงข้อมูล', response)
        })
    },
    addMyProfile () {
      const url = 'http://127.0.0.1:8000/leave'
      axios
        .post(url, {
          name: this.name,
          datepicker: this.datepicker,
          datepicker1: this.datepicker1,
          cause: this.cause
        })
        .then((response) => {
          this.myProfile = response.data
          this.$refs['my-modal'].hide()
          this.showMyProfile()
          this.reset()
          console.log('เพิ่มข้อมูล', response)
        })
    },
    reset () {
      this.name = null
      this.datepicker = null
      this.datepicker1 = null
      this.cause = null
    }
  },
  created () {
    this.showMyProfile()
  }
}
</script>
