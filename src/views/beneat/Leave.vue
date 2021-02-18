<template>
    <div class="container">
      <v-tabs>
        <v-tab>ปัจจุบัน</v-tab>
        <!-- <v-tab>ประวัติ</v-tab> -->
        <v-tab-item>
<div class="row mt-5">
        <h2>จัดการวันลา</h2>
        <div class="col d-flex justify-content-end">
          <b-button v-b-modal.modal-1 variant="primary m-2"
            ><i class="fas fa-plus-square"></i> เพิ่มวันลา</b-button
          >
          <b-button
            variant="danger m-2"
            class="textcolor"
            router-link
            to="/homeadmin/leave/leavehistory"
            ><i class="fas fa-history"></i> History</b-button>
        </div>
        <b-modal ref="my-modal" id="modal-1" title="AddLeaves" mt-2 hide-footer>
          <form @submit.prevent="addLeave">
            <div class="form-group">
              <label>ชื่อ</label>
              <select class="form-control" v-model="name" required>
                <option
                  v-for="(user, index) in dataUser"
                  :key="index"
                  :value="user.id"
                >
                  {{ user.name }}
                </option>
              </select>
              <label for="off">จำนวนวันลา</label><br />
              <input type="radio" name="one" value="one" v-model="userOff" />
              วันเดียว<br />
              <input type="radio" name="two" value="two" v-model="userOff" />
              หลายวัน<br />
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
              <label>ประเภทการลา</label>
              <select class="form-control" v-model="type" required>
                <option>ลาพักร้อน</option>
                <option>ลากิจ</option>
                <option>ทำงานที่บ้าน</option>
                <option>ลาป่วย</option>
                <option>ลาคลอด</option>
              </select>
              <label for="cause">สาเหตุ</label>
              <b-form-textarea
                id="textarea"
                v-model="description"
                rows="5"
                max-rows="6"
                required
              ></b-form-textarea>
            </div>
            <button type="submit" class="btn btn-primary">เพิ่มข้อมูล</button>
          </form>
        </b-modal>
      </div>
      <div class="table-responsive mt-5">
        <table class="table table-bordered text-center">
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th scope="col">ชื่อ</th>
              <th scope="col">วันเริ่มต้น</th>
              <th scope="col">วันสิ้นสุด</th>
              <th scope="col">ประเภทการลา</th>
              <th scope="col">สาเหตุ</th>
              <th scope="col">สถานะ</th>
              <th scope="col">ผู้อนุมัติ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(profile, index) in myLeave.data" :key="index">{{profile.title}}
              <td>{{ index + 1 }}</td>
              <td>{{ profile ? profile.nameuser : '' }}</td>
              <td>
                <span v-if="profile">
                  {{ profile.start_date | prettyDate  }}
                </span>
              </td>
              <td>
                <span v-if="profile">
                  {{ profile.end_date ? profile.end_date : profile.start_date | prettyDate  }}
                </span>
              </td>
              <td>{{ profile ? profile.leave_type : '' }}</td>
              <td>{{ profile ? profile.leave_description : '' }}</td>
              <td>
                <template v-if="profile && profile.leave_status == 'อยู่ระหว่างการอนุมัติ'">
                  <button
                    type="button"
                    class="btn btn-success m-2"
                    @click="updateStatus(profile.id, 'อนุมัติ')"
                  >
                    <i class="fas fa-check"></i> อนุมัติ
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    @click="updateStatus(profile.id, 'ไม่อนุมัติ')"
                  >
                    <i class="fas fa-times"></i> ไม่อนุมัติ
                  </button>
                </template>
                <template
                  v-else-if="profile && profile.leave_status == 'อนุมัติ'"
                >
                  <span v-html="$options.filters.statusColor('อนุมัติ')"></span>
                </template>
                <template v-else>
                  <span
                    v-html="$options.filters.statusColor('ไม่อนุมัติ')"
                  ></span>
                </template>
              </td>
              <td>{{ profile ? profile.nameadmin : '' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
       <pagination :data="myLeave" @pagination-change-page="showLeave"></pagination>
        </v-tab-item>
         <!-- <v-tab-item>
            <div class="row mt-5">
        <h2>ประวัติการลา</h2>
      </div>
        <div class="col d-flex justify-content-end">
           <form class="form-inline">
          <input
            class="form-control mr-sm-2"
            placeholder="Search.."
            v-model="search"
          />
           <b-button  variant="success "  @click.prevent="showLeavehistory"><i class="fas fa-search"></i></b-button>
         </form>
      </div>
      <div class="table-responsive">
           <table class="table table-bordered  text-center">
            <thead>
              <tr>
               <th>ลำดับ</th>
              <th scope="col">ชื่อ</th>
              <th scope="col">วันเริ่มต้น</th>
              <th scope="col">วันสิ้นสุด</th>
              <th scope="col">ประเภทการลา</th>
              <th scope="col">สาเหตุ</th>
              <th scope="col">สถานะ</th>
              <th scope="col">ผู้อนุมัติ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(history, index) in myHistory.data" :key="index">{{history.title}}
                <td>{{ index + 1 }}</td>
                <td>{{ history ? history.nameuser : '' }}</td>
                <td>
                  <span v-if="history">
                    {{ history.start_date  }}
                  </span>
                </td>
                <td>
                  <span v-if="history">
                    {{ history.end_date ? history.end_date : history.start_date }}
                  </span>
                </td>
                <td>{{ history ? history.leave_type : '' }}</td>
                <td>{{ history ? history.leave_description : '' }}</td>
                <td>
                  <template
                    v-if="history && history.leave_status == 'อนุมัติ'"
                  >
                    <span
                      v-html="$options.filters.statusColor('อนุมัติ')"
                    ></span>
                  </template>
                  <template v-else>
                    <span
                      v-html="$options.filters.statusColor('ไม่อนุมัติ')"
                    ></span>
                  </template>
                </td>
                <td>{{ history ? history.nameadmin : '' }}</td>
              </tr>
            </tbody>
          </table>
      </div>
       <pagination :data="myHistory" @pagination-change-page="showLeavehistory"></pagination>
         </v-tab-item> -->
      </v-tabs>
    </div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      dataUser: [],
      myLeave: {},
      // myHistory: {},
      search: null,
      // ขอลา
      name: null,
      userOff: null,
      datepicker: null,
      datepicker1: null,
      type: null,
      description: null
    }
  },
  computed: {
    ...mapState({
      admin: (state) => state.admin.dataAdmin
    })
  },
  methods: {
    showUser () {
      const url = 'http://127.0.0.1:8000/user'
      axios.get(url, {
        params: {
          from: 1
        }
      })
        .then((response) => {
          this.dataUser = response.data
          console.log('showUser', response)
        })
    },
    showLeave (page = 1) {
      const url = 'http://127.0.0.1:8000/leave?page=' + page
      axios
        .get(url, {
          params: {
            keyword: this.search
          }
        })
        .then((response) => {
          this.myLeave = response.data
          console.log('showLeave', response.data)
        })
    },
    updateStatus (id, status) {
      const url = 'http://127.0.0.1:8000/leave/' + id
      axios
        .put(url, {
          statusUpdate: status,
          admin_id: this.admin.id
        })
        .then((response) => {
          this.showLeave()
          this.showLeavehistory()
          console.log('updateStatus', response)
        })
    },
    addLeave () {
      const url = 'http://127.0.0.1:8000/leave'
      axios
        .post(url, {
          name: this.name,
          datepicker: this.datepicker,
          datepicker1: this.datepicker1,
          type: this.type,
          description: this.description
        })
        .then((response) => {
          this.$refs['my-modal'].hide()
          this.showLeave()
          this.reset()
          console.log('addLeave', response)
        })
    },
    reset () {
      this.name = null
      this.userOff = null
      this.datepicker = null
      this.datepicker1 = null
      this.type = null
      this.description = null
    }
    // showLeavehistory (page = 1) {
    //   const url = 'http://127.0.0.1:8000/leavehistory?page= + page'
    //   axios
    //     .get(url, {
    //       params: {
    //         keyword: this.search
    //       }
    //     })
    //     .then((response) => {
    //       this.myHistory = response.data
    //       console.log('showLeavehistory', response.data)
    //     })
    // }
  },
  created () {
    this.showLeave()
    this.showUser()
    // this.showLeavehistory()
  }
}
</script>
<style scoped>
.textcolor {
  color: white !important;
}
.v-application a {
  text-decoration: none !important;
  color: white !important;
}
.v-application a:hover {
    color: white !important;
    background-color: #FF0033;
}
</style>
