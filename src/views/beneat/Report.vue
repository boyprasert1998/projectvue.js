<template>
  <div class="container">
    <v-tabs>
      <v-tab>รายงานวันลา</v-tab>
      <v-tab>รายงานเข้าออกงาน</v-tab>
      <v-tab-item>
        <div class="row">
          <div class="col mt-5">
            <div class="col d-flex justify-content-end">
              <button type="button" class="btn btn-info">
                <a target="_blank" href="http://127.0.0.1:8000/exportleaveall">
                  <i class="fas fa-download"></i> รายงานวันลารวม</a
                >
              </button>
            </div>
            <div class="table-responsive mt-10">
              <table class="table table-bordered text-center">
                <thead>
                  <th>ลำดับ</th>
                  <th>ชื่อ</th>
                  <th>แผนก</th>
                  <th>ระดับ</th>
                  <th>รายงาน</th>
                </thead>
                <tbody v-for="(empolyee, index) in empolyeeData.data" :key="empolyee.id">{{empolyee.title}}
                  <td>{{ index + 1 }}</td>
                  <td>{{ empolyee.name }}</td>
                  <td>{{ empolyee.namedepartment }}</td>
                  <td>{{ empolyee.user_level }}</td>
                  <td>
                    <button type="button" class="btn btn-primary m-1">
                      <a
                        target="_blank"
                        :href="
                          'http://127.0.0.1:8000/exportleave?id=' + empolyee.id
                        "
                      >
                        <i class="fas fa-download"></i> วันลา</a
                      >
                    </button>
                  </td>
                </tbody>
              </table>
            </div>
          </div>
        </div>
          <pagination :data="empolyeeData" @pagination-change-page="showUser"></pagination>
      </v-tab-item>
      <v-tab-item>
        <div class="row">
          <div class="col mt-5">
            <div class="col d-flex justify-content-end">
              <button type="button" class="btn btn-info">
                <a
                  target="_blank"
                  href="http://127.0.0.1:8000/exportcheckinall"
                >
                  <i class="fas fa-download"></i> รายงานเข้าออกงานรวม</a
                >
              </button>
            </div>
            <div class="table-responsive mt-10">
              <table class="table table-bordered text-center">
                <thead>
                  <th>No</th>
                  <th>Name</th>
                  <th>Teams</th>
                  <th>Employee type</th>
                  <th>Report</th>
                </thead>
                <tbody v-for="(empolyee, index) in empolyeeData.data" :key="empolyee.id">{{empolyee.title}}
                  <td>{{ index + 1 }}</td>
                  <td>{{ empolyee.name }}</td>
                  <td>{{ empolyee.namedepartment }}</td>
                  <td>{{ empolyee.user_level }}</td>
                  <td>
                    <button type="button" class="btn btn-primary m-1">
                      <a
                        target="_blank"
                        :href="
                          'http://127.0.0.1:8000/exportcheckin?id=' +
                          empolyee.id
                        "
                      >
                        <i class="fas fa-download"></i> เข้าออกงาน</a
                      >
                    </button>
                  </td>
                </tbody>
              </table>
            </div>
          </div>
        </div>
         <pagination :data="empolyeeData" @pagination-change-page="showUser"></pagination>
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      empolyeeData: {}
    }
  },
  methods: {
    showUser (page = 1) {
      const url = 'http://127.0.0.1:8000/user?page=' + page
      axios
        .get(url, {
          params: {
            keyword: this.search
          }
        })
        .then((response) => {
          this.empolyeeData = response.data
          console.log('showUserReport', response)
        })
    }
  },
  created () {
    this.showUser()
  }
}
</script>
<style scoped>
.v-application a {
  text-decoration: none !important;
  color: white !important;
}
</style>
