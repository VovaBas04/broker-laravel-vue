<script>
import GridComponent from "@/components/GridComponent.vue";
import * as io from "socket.io-client";
import ModalGraph from "@/components/ModalGraph.vue";
import BarChart from "@/components/BarChart.vue";
export default {
  name: "Table",
  components: {BarChart, ModalGraph, GridComponent},
  created() {
    // io.io(`http://127.0.0.1:3030/`).on('date', (date) => {
    //   this.date = date.substring(8,10) + '.' + date.substring(5,7)+'.'+date.substring(2,4)
    //   console.log(this.date,date)
    //   this.isActive = true
    // })
    // io.io(`http://127.0.0.1:3030/`).on('end', () => {
    //   this.isActive = false
    // })
    fetch(process.env.VUE_APP_BACK_URL + 'users' + this.$route.params.id,{
      mode:"cors",
      headers:{
        'Content-Type':'application/json'
      },
    }).then(res=>res.json()).then(data=>{
      this.brocker = data
      this.stockInfo = data.stocks
    })
    fetch(`http://localhost:3030/stock`,{
      mode:"cors",
      headers:{
        'Content-Type':'application/json'
      }
    }).then(res=>res.json()).then(data=>{
        this.stocks = data
        console.log(data)
    })
  },
  computed:{
    getData(){
      this.gridData = []
      for (let stock of this.stocks){
        let stockHave = this.stockInfo.find(item=>item.stock===stock.id)
        let count =stockHave?stockHave.count:0
        let price = stock.priceDate.find(item=>item.date===this.date).open
        this.gridData.push({
          'id':stock.id,
          'Название':stock.company,
          'Текущая стоимость':price,
          'Количество':count,
          'Прибыль/убыток':stockHave?price*count-stockHave.wasted:0,
        })
      }
      return this.gridData
    }
  },
  methods: {
    buy(count, price, id) {
      console.log("Ошибка",this.count)
      if (this.count<0) {
        this.errorMessage = "Введите положительное число"
        return
      }
      fetch(process.env.VUE_APP_BACK_URL + 'users'  + this.$route.params.id + '/buy', {
        mode: "cors",
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          "count": Number(this.count),
          "price": price,
          "stockId": id
        })
      }).then(res => res.json()).then(data => {
        if (data['Message'])
          this.errorMessage = data['Message']
        else {
          let index  = this.stockInfo.findIndex(item=>item.stock===id)
          if (index===-1){
            console.log(data)
            this.stockInfo.push({
              stock:id,
              count:data.count,
              wasted:data.wasted
            })
          }
          else {
            this.stockInfo[index].count = data.count
            this.stockInfo[index].wasted = data.wasted
          }
            this.brocker.money = data.money
          this.errorMessage = null
        }
      })
    },
    sell(count, price, id) {
      console.log("Ошибка")
      if (this.count<0) {
        this.errorMessage = "Введите положительное число"
        return
      }
      fetch(process.env.VUE_APP_BACK_URL + 'users'  + this.$route.params.id + '/sell', {
        mode: "cors",
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          "count": Number(this.count),
          "price": price,
          "stockId": id
        })
      }).then(res => res.json()).then(data => {
        if (data['Message'])
          this.errorMessage = data['Message']
        else {
          let index  = this.stockInfo.findIndex(item=>item.stock===id)
          this.stockInfo[index].count = data.count
          this.stockInfo[index].wasted = data.wasted
          this.brocker.money = data.money
          this.errorMessage = null
        }
      })
    },
    update(value){
      this.isOpen = value
    }
  },
  data(){
  return {
    isActive:false,
    count:0,
    errorMessage:null,
    brocker:null,
    date:"23.06.23",
    stockInfo:[],
    isOpen:Array(8).fill(false),
    stocks:[],
    searchQuery: '',
    gridColumns: ['Название', 'Текущая стоимость','Количество','Прибыль/убыток'],
    gridData: [
    ]
  }
}
}
</script>

<template>
  <div class="topSome" v-if="isActive">
  <span>Дата:{{date}}</span>
  <span :key="brocker">Мои деньги:{{brocker?brocker.money:0}}</span>
    <br>
    <span>Количество </span>
    <input type="number" name="count" v-model="count" min=0>
    <span v-if="errorMessage" id="errorMessage">{{errorMessage}}</span>
  <grid-component
      :heroes="getData"
      :columns="gridColumns"
      :filter-key="searchQuery"
      @count=count
      @buy="buy"
      @sell="sell"
      @update="update"
      :date = "date"
      :key="gridData"
      :is-open="isOpen"
  >
  </grid-component>
  </div>
  <h1 v-else>Нет данных</h1>
</template>
<style scoped>
.topSome{
  position: relative;
  top:10%
}
</style>