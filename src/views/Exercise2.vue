<template>
  <div class="container">
  <h1>Register From</h1>
  <div class="row text-left" >
    <div class="col-6">
        <div class="card">
            <div class="card-body">

          <div class="form-group">
            <label for="name">ชื่อ</label>
            <input type="text" class="form-control" id="name"  v-model="name" placeholder="ชื่อ">
          </div>

          <div class="form-group">
            <label for="phone">เบอร์โทร</label>
            <input type="number" class="form-control" id="phone"  v-model="phone" placeholder="เบอร์โทร">
          </div>

          <div class="form-group">
            <label for ="addres">ที่อยู่</label>
            <textarea id="addres"  class="form-control" name="addres"  v-model="addres" placeholder="เช่น 38/123 ถ.วังตอ ต.ทับเที่ยง อ.เมือง จ.ตรัง"> </textarea>
          </div>

          <div class="form-group">
            <label for = "gender">เพศ</label> <br>
            <input type="radio" id="m" value="ชาย" v-model="gender">
            <label for="w">ชาย</label>
            <br>
            <input type="radio" id="w" value="หญิง" v-model="gender">
            <label for="m">หญิง</label>
          </div>

          <div class="form-group">
            <label for = "education">ระดับการศึกษา</label>
          <select class="form-control" id="education"  v-model="education">
               <option value="null">โปรดเลือกการศึกษาด้วยครับ</option>
            <option value="ประถมศึกษา">ประถมศึกษา</option>
            <option value="มัธยมศึกษา">มัธยมศึกษา</option>
            <option value="ปริญญาตรี">ปริญญาตรี</option>
            <option value="ปริญญาโท">ปริญญาโท</option>
            <option value="ปริญญาเอก">ปริญญาเอก</option>
          </select>

          </div>

         <button class="btn btn-primary" @click="submit()">Go</button>

   </div>
   </div>
   </div>

   <div class="col-6">
   <div v-if= "checkNo === '1'">
    <div class="card">
          <div class="card-body">
           ชื่อ:{{name}} <br>
           เบอร์โทร:{{phone}} <br>
           ที่อยู่:{{addres}} <br>
           เพศ:{{gender}} <br>
           ระดับการศึกษา:{{education}} <br>
      <button class="btn btn-outline-danger" @click="clear()">Clear</button>
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
      name: null,
      phone: null,
      addres: null,
      gender: null,
      education: null,
      checkNo: null

    }
  },
  methods: {
    submit () {
      let alertInput = null

      if (this.name === null) {
        alertInput = 'โปรดใส่ชื่อด้วยครับ'
      } else if (this.phone === null) {
        alertInput = 'โปรดใส่เบอรโทรด้วยครับ'
      } else if (this.addres === null || this.addres === '') {
        alertInput = 'โปรดใส่ที่อยู่ด้วยครับ'
      } else if (this.gender === null) {
        alertInput = 'โปรดเลือกเพศด้วยครับ'
      } else if (this.education === null) {
        alertInput = 'โปรดเลือกการศึกษาด้วยครับ'
      } else {
        this.checkNo = '1'
      }

      if (alertInput !== null) {
        alert(alertInput)
      }
    },
    clear () {
      this.name = null
      this.phone = null
      this.addres = null
      this.gender = null
      this.education = null
      this.checkNo = null
    }
  }
}

</script>
