<script>
import Header from "@/components/Header.vue";

export default {
  name: "Login",
  components: {Header},
  data(){
    return {
      brockers:null,
      selected:null
    }
  },
  methods:{
    login(){
      console.log(this.selected)
      this.$router.push(`/broker/${this.selected}`)
    }
  },
  created() {
    console.log(process.env.VUE_APP_BACK_URL)
    fetch(process.env.VUE_APP_BACK_URL + "users",{
      headers:{
        'Content-Type':'application/json'
      },
      mode:"cors"
    }).then(res=>res.json())
        .then((data)=>{
          this.brockers = data
          this.selected = this.brockers[0].id
        })
  }
}
</script>

<template>
  <Header></Header>
  <form @submit.prevent="login">
 <select class="select-css" v-model="selected">
   <option v-for="brocker in brockers" :value="brocker.id"  :key="brocker.id">
     {{brocker.fullName}}
   </option>
 </select>
    <button class="btn" type="submit">Войти</button>
  </form>
</template>

<style scoped>
.select-css {
  display: block;
  font-size: 20px;
  font-family: sans-serif;
  font-weight: 700;
  color: #444;
  line-height: 1.3;
  padding: .6em 1.4em .5em .8em;
  width: 200%;
  box-sizing: border-box;
  margin: .6em;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
  border-radius: .5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'), linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
  background-repeat: no-repeat, repeat;
  background-position: right .7em top 50%, 0 0;
  background-size: .65em auto, 100%;
}
.select-css::-ms-expand { display: none; }
.select-css:hover { border-color: #888; }
.select-css:focus { border-color: #aaa;
  box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
  box-shadow: 0 0 0 3px -moz-mac-focusring;
  color: #222;
  outline: none;
}
.select-css option { font-weight:normal; }
*[dir="rtl"] .select-css, :root:lang(ar) .select-css, :root:lang(iw) .select-css {
  background-position: left .7em top 50%, 0 0;
  padding: .6em .8em .5em 1.4em;
}
.btn {
  position: relative;
  left:120px;
  display: inline-block;
  box-sizing: border-box;
  padding: 0 20px;
  margin: 0 15px 15px 0;
  outline: none;
  border: none;
  border-radius: 4px;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  color: #fff;
  background-color: #3775dd;
  box-shadow: 0 2px #21487f;
  cursor: pointer;
  user-select: none;
  appearance: none;
  touch-action: manipulation;
  vertical-align: top;
}
.btn:hover {
  background-color: #002fed;
}
.btn:active {
  background-color: #2f599e !important;
}
</style>