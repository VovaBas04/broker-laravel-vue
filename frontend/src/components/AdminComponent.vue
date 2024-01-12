<script>

import AdminTableComponent from "@/components/AdminTableComponent.vue";
import GridComponent from "@/components/GridComponent.vue";
export default {
  name: "AdminComponent",
  components: {AdminTableComponent},
  data() {
    return {
      searchQuery: '',
      gridColumns: ['Имя', 'Количество денег'],
      gridData: [],
      stocks: []
    }
  },
  created() {
    fetch(process.env.VUE_APP_BACK_URL + 'stocks', {
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => res.json()).then(data => {
      this.stocks = data.map(item => {
        return {id: item.id, company: item.company.companyName}
      })
      this.gridColumns = [...this.gridColumns, ...this.stocks.map(item => item.company)]
      console.log(this.gridColumns)
    }).then(() => this.getStocks())
  },
  methods: {
    getStocks() {
      fetch(process.env.VUE_APP_BACK_URL + 'stock-user', {
        mode: "cors",
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(res => res.json()).then(data => {
        // this.gridData = []
        // for (let el of data) {
        //   let obj = {
        //     'Имя': el.fullName,
        //     'Количество денег': el.money,
        //   }
        //   for (let stock of el.stocks) {
        //     let myStock = this.stocks.find(item => stock.stock === item.id)
        //     obj[myStock.company] = {count:stock.count,wasted:-stock.wasted}
        //   }
        //   this.gridData.push(obj)
        // }
        this.gridData = data
        console.log(this.gridData)
      })
    }
  }
}
</script>
<template>
  <admin-table-component
    :heroes = "gridData"
    :columns = "gridColumns"
    :filter-key="searchQuery"
  ></admin-table-component>
</template>

<style scoped>

</style>