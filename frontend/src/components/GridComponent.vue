<script>

import ModalGraph from "@/components/ModalGraph.vue";

export default {
  name: "GridComponent",
  components: {ModalGraph},
  props: {
    heroes: Array,
    columns: Array,
    isOpen:Array,
    filterKey: String,
    count:Number,
    date:String
  },
  emits:["update:count"],
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

      this.columns.forEach(function(key) {
        columnSortOrders[key] = 1
      })

      return columnSortOrders
    }
  },
  methods: {
    sortBy(key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    show(id){
      this.isOpen[id] = true
      this.$emit('update',this.isOpen)
    },
    closeModal() {
      this.$emit('update',this.isOpen.fill(false))
    }
  }
}
</script>

<template>
  <table>
    <thead>
    <tr>
      <th v-for="key in columns"
          @click="sortBy(key)"
          :class="{ active: sortKey == key }">
        {{ (key) }}
        <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
              </span>
      </th>
      <th>Соверши действие</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="entry in filteredHeroes">
      <td v-for="key in columns">
        {{ entry[key] }}
      </td>
      <td>
        <button class="btn btn-outline-warning" :id="entry['id']+'buy'" @click="$emit('buy',this.count,entry['Текущая стоимость'],entry['id'])">Купить</button>
        <button class="btn btn-outline-danger" :id="entry['id']+'sell'" @click="$emit('sell',this.count,entry['Текущая стоимость'],entry['id'])">Продать</button>
        <button class="btn btn-outline-info" @click="show(entry['id'])">Посмотреть</button>
        <ModalGraph :date=date @closeModal = "closeModal" :isOpen="isOpen" :stock-id="entry['id']"/>
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