<template>
  <Line :data="chartData" />
</template>

<script>
// DataPage.vue
import {Bar, Line} from 'vue-chartjs'
import {
  Chart,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from 'chart.js'

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export default {
  name: 'BarChart',
  components: { Line },
  props:{
    data:Array,
    label:Array
  },
  data() {
    return {
      chartData: {
        labels: this.label,
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: this.data
          }
        ]
      }
    }
  },
}
</script>