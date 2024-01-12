<script>
// import BarChart from "@/components/BarChart.vue"

import BarChart from "@/components/BarChart.vue";
import * as io from "socket.io-client";

export default {
  components: {BarChart},
  props:{
    stockId:Number,
    isOpen:Array,
    date:String
  },

  data(){
    return{
      labels:[],
      data:[],
      dateIndex:0
    }
  },
  beforeMount() {
    fetch(`http://localhost:3030/stock/${this.stockId}`, {
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(data => {
      this.labels = data.priceDate.map(item=>item.date.substring(0,2)+'.'+item.date.substring(3,5)+'.'+item.date.substring(6))
      // this.labels = data.priceDate.map((item,index)=>index);
      this.data = data.priceDate.map(item=>item.open)
      this.dateIndex = this.labels.findIndex(item=>item==this.date)
      console.log("Выведи дату",this.date)
    })
  },
}
</script>

<template>

    <div v-if="isOpen[stockId]" id="modal">
      <div class="modal-content">
        <span class="close" @click="$emit('closeModal')">&times;</span>
          <BarChart :key="dateIndex" :label="labels.slice(dateIndex)" :data="data.slice(dateIndex)"/>
      </div>
    </div>


</template>


<style scoped>
#modal {
  //display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 10%);
}

.modal-content {
  background-color: #fff;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>