<template>
  <div>
    <div class="container">
      <div class="row">
        <h2>รายชื่อพนักงานที่ขอทำงานที่บ้าน</h2>
        <div class="col d-flex justify-content-end">
          <b-button v-b-modal.modal-1 variant="primary m-2"
            >กรอกข้อมูล</b-button
          >
        </div>
        <b-modal
          ref="my-modal"
          id="modal-1"
          title="กรอกข้อมูลทำงานที่บ้าน"
          mt-2
          hide-footer
        >
          <form @submit.prevent="addWFH">
            <div class="form-group">
              <label for="name">ชื่อ</label>
              <input
                type="text"
                class="form-control"
                placeholder="ชื่อ"
                v-model="name"
                required
              />
              <label for="off">ทำงานที่บ้าน</label> <br />
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
              <label for="cause">สาเหตุ</label>
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
      <div class="row text-center">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ลำดับ</th>
              <th scope="col">ชื่อ</th>
              <th scope="col">เริ่มต้น</th>
              <th scope="col">วันสิ้นสุด</th>
              <th scope="col">เหตุผลของการลา</th>
              <th scope="col">สถานะ</th>
              <th scope="col">อัพเดจสถานะโดย</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(showdata, index) in show" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ showdata ? showdata.name : '' }}</td>
              <td>
                <span v-if="showdata">
                  {{ showdata.start_date | prettyDate }}
                </span>
              </td>
              <td>
                <span v-if="showdata">
                  {{ showdata.eng_date | prettyDate }}
                </span>
              </td>
              <td>{{ showdata ? showdata.cause : '' }}</td>

              <td>
                <template v-if="showdata && showdata.status == 'รออนุมัติ'">
                  <button
                    type="button"
                    class="btn btn-success m-2"
                    @click="updateStatus(showdata.id, 'อนุมัติ')"
                  >
                    อนุมัติ
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    @click="updateStatus(showdata.id, 'ไม่อนุมัติ')"
                  >
                    ไม่อนุมัติ
                  </button>
                </template>
                <template v-else-if="showdata && showdata.status == 'อนุมัติ'">
                  <button
                    type="button"
                    class="btn btn-success"
                    @click="updateStatus(showdata.id, 'อนุมัติ')"
                  >
                    อนุมัติ
                  </button>
                </template>
                <template v-else>
                  <button
                    type="button"
                    class="btn btn-danger"
                    @click="updateStatus(showdata.id, 'ไม่อนุมัติ')"
                  >
                    ไม่อนุมัติ
                  </button>
                </template>
              </td>
               <td>{{ showdata ? showdata.nameadmin : '' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      name: null,
      userOff: null,
      datepicker: null,
      datepicker1: null,
      cause: 'ทำงานที่บ้าน',
      show: []
    }
  },
  computed: {
    ...mapState({
      admin: state => state.admin.dataAdmin
    })
  },
  methods: {
    addWFH () {
      const url = 'http://127.0.0.1:8000/workfromhome'
      axios
        .post(url, {
          name: this.name,
          datepicker: this.datepicker,
          datepicker1: this.datepicker1,
          cause: this.cause
        })
        .then((response) => {
          this.$refs['my-modal'].hide()
          this.reset()
          this.showWFH()
          console.log('addWFH', response)
        })
    },
    showWFH () {
      const url = 'http://127.0.0.1:8000/workfromhome'
      axios.get(url, {}).then((response) => {
        this.show = response.data
        console.log('showWFH', response)
      })
    },
    updateStatus (id, status) {
      const url = 'http://127.0.0.1:8000/workfromhome/' + id
      axios
        .put(url, {
          statusUpdate: status,
          admin_id: this.admin.id
        })
        .then((response) => {
          this.showWFH()
          console.log('updateStatus', response)
        })
    },
    reset () {
      this.name = null
      this.userOff = null
      this.datepicker = null
      this.datepicker1 = null
    }
  },
  created () {
    this.showWFH()
  }
}
</script>
