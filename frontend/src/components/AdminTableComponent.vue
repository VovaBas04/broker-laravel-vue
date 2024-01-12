<script>

export default {
  name: "AdminTableComponent",
  props:{
    heroes: Array,
    columns: Array,
    filterKey: String
  },
  data() {
    const sortOrders = {};
    this.columns.forEach(function(key) {
      sortOrders[key] = 1;
    });
    return {
      sortKey: '',
      sortOrders,
    }
  },
  computed: {
    filteredHeroes() {
      const sortKey = this.sortKey
      const order = this.sortOrders[sortKey] || 1
      let heroes = this.heroes
      if (sortKey) {
        heroes = heroes.sort(function(a, b)  {
          return (a[sortKey]-b[sortKey])*order
        })
      }
      return heroes
    },
    sortOrders() {
      const columnSortOrders = {}
      console.log(this.columns,this.heroes)
      this.columns.forEach(function(key) {
        columnSortOrders[key] = 1
      })

      return columnSortOrders
    },
  },
  methods: {
    sortBy(key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    isStock(key){
      return key !=='Имя' && key!=='Количество денег'
    }
  },
}
</script>

<template>
  <table class="main">
    <thead>
    <tr>
      <th v-for="key in columns"
          @click="sortBy(key)"
          :class="{ active: sortKey == key }">
        {{ (key) }}
        <table v-if="isStock(key)">
          <tr class="back">
            <td>Количество</td>
            <td>Прибыль/убыток</td>
          </tr>
        </table>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="entry in filteredHeroes" :key="entry.id">
      {{console.log(entry)}}
      <td>{{entry["fullName"]}}</td>
      <td>{{entry["money"]}}</td>
      <td v-for="stock in columns" :key="stock.id">
      <table>
        <tr class="back">
          <td>{{stock["count"]??0}}</td>
          <td>{{stock["wasted"]??0}}</td>
        </tr>
      </table>
      </td>
    </tr>
    </tbody>

  </table>
</template>

<style scoped>
body {
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 18px;
  color: #444;
}

table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}
.main{
  position: relative;
  left: -18%;
}
.back{
  color: #42b983;
}
th {
  background-color: #42b983;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;;
}

td {
  background-color: #f9f9f3;
  text-align: center;
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>