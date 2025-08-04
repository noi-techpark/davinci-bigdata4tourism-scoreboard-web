<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script>
import { Line, mixins } from 'vue-chartjs'
import {
  AXES_FONT_FAMILY,
  AXES_FONT_COLOR,
  AXES_FONT_SIZE,
  AXES_PADDING
} from '@/components/charts/config'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default() {
        return {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          tooltips: {
            callbacks: {
              label(tooltipItems, data) {
                const dataset = data.datasets[tooltipItems.datasetIndex]
                const value = dataset.data[tooltipItems.index]
                const label = dataset.label

                return label + ': ' + value.toLocaleString('de-DE')
              }
            }
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: true,
                  drawBorder: false
                },
                ticks: {
                  beginAtZero: true,
                  fontColor: AXES_FONT_COLOR,
                  fontFamily: AXES_FONT_FAMILY,
                  fontSize: AXES_FONT_SIZE,
                  padding: AXES_PADDING
                }
              }
            ],
            yAxes: [
              {
                gridLines: {
                  display: true,
                  drawBorder: false
                },
                ticks: {
                  fontColor: AXES_FONT_COLOR,
                  fontFamily: AXES_FONT_FAMILY,
                  fontSize: AXES_FONT_SIZE,
                  padding: AXES_PADDING,
                  callback(value, index, values) {
                    return value.toLocaleString('de-DE')
                  }
                }
              }
            ]
          }
        }
      }
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
