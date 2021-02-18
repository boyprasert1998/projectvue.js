<template>
  <div class="container">
    <div class="row  mt-3">
      <h2>แผนก</h2>
      <div class="col d-flex justify-content-end">
        <b-button v-b-modal.modal-1 variant="primary m-2"><i class="fas fa-user-plus"></i></b-button>
      </div>
      <b-modal ref="my-modal" id="modal-1" title="เพิ่มแผนก" mt-2 hide-footer>
        <form @submit.prevent="addDeparment">
          <div class="form-group">
            ชื่อแผนก
            <label for="name"></label>
            <input type="text" class="form-control" v-model="name"  required/>
          </div>
          <button type="submit" class="btn btn-primary">เพิ่มข้อมูล</button>
        </form>
      </b-modal>
      <div class="table-responsive mt-5">
      <table class="table table-bordered  text-center">
          <thead>
            <th>ลำดับ</th>
            <th>ชื่อแผนก</th>
            <th>จำนวนพนักงาน</th>
            <th>แก้ไข/ลบ</th>
          </thead>
          <tbody v-for="(deparment, index) in deparmentData.data" :key="deparment.id">{{deparment.title}}
            <td>{{ index + 1 }}</td>
            <td>{{ deparment.name }}</td>
            <td>{{ deparment.n }}</td>
            <td>
              <b-button
                v-b-modal.modal-2
                variant="warning m-1"
                @click.prevent="showUpdate(deparment.id)"
                ><i class="fas fa-user-edit"></i></b-button
              >
              <button
                class="btn btn-danger"
                @click="deleteDeparment(deparment.id)"
              >
               <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tbody>
        </table>
      </div>
      <b-modal ref="my-modal" id="modal-2" title="แก้ไข" mt-2 hide-footer>
        <form @submit.prevent="addDeparment">
          <div class="form-group">
            ชื่อแผนก
            <label for="name"></label>
            <input type="text" class="form-control" v-model="nameUpdate" />
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            @click.prevent="updateDeparment()"
          >
            แก้ไขข้อมูล
          </button>
        </form>
      </b-modal>
         <pagination :data="deparmentData" @pagination-change-page="showDeparment"></pagination>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  data () {
    return {
      deparmentData: {},
      all: [],
      name: null,

      nameUpdate: null,
      selectedId: null
    }
  },
  methods: {
    showDeparment (page = 1) {
      const url = 'http://127.0.0.1:8000/deparment?page=' + page
      axios.get(url).then((response) => {
        this.deparmentData = response.data
        console.log('showDeparmet', response)
      })
    },
    addDeparment () {
      const url = 'http://127.0.0.1:8000/deparment'
      axios
        .post(url, {
          name: this.name
        })
        .then((response) => {
          this.deparment = response.data
          this.showDeparment()
          this.$refs['my-modal'].hide()
          this.reset()
          console.log('addDeparment', response)
          Swal.fire('สำเร็จ!', 'เพิ่มข้อมูลสำเร็จ', 'success')
        })
    },
    showUpdate (id) {
      this.selectedId = id
      const url = 'http://127.0.0.1:8000/deparment/' + this.selectedId
      axios.get(url).then((response) => {
        this.nameUpdate = response.data.name
        console.log('showUpdate', response)
      })
    },
    updateDeparment (id) {
      const url = 'http://127.0.0.1:8000/deparment/' + this.selectedId
      axios
        .put(url, {
          name: this.nameUpdate
        })
        .then((response) => {
          this.deparmentData = response.data
          this.showDeparment()
          this.$refs['my-modal'].hide()
          console.log('updateDeparment', response)
          Swal.fire('สำเร็จ!', 'แก้ไขข้อมูลสำเร็จ', 'success')
        })
    },
    deleteDeparment (id) {
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
          const url = 'http://127.0.0.1:8000/deparment/' + id
          axios.delete(url).then((response) => {
            this.deparmentData = response.data
            this.showDeparment()
            console.log('deleteDeparment', response)
            Swal.fire('สำเร็จ!', 'คุณลบข้อมูลสำเร็จ', 'success')
          })
        }
      })
    },
    reset () {
      this.name = null
    }
  },
  created () {
    this.showDeparment()
  }
}
</script>
