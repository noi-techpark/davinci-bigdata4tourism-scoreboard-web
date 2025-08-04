<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script>
import { HorizontalBar, mixins } from 'vue-chartjs'
import {
  AXES_FONT_FAMILY,
  AXES_FONT_COLOR,
  AXES_FONT_SIZE,
  AXES_PADDING
} from '@/components/charts/config'
const { reactiveProp } = mixins

export default {
  extends: HorizontalBar,
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
                const label =
                  dataset.label === undefined
                    ? data.labels[tooltipItems.index]
                    : dataset.label

                return label + ': ' + value.toLocaleString('de-DE')
              }
            }
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                  drawBorder: false
                },
                ticks: {
                  beginAtZero: true,
                  fontFamily: AXES_FONT_FAMILY,
                  fontColor: AXES_FONT_COLOR,
                  fontSize: AXES_FONT_SIZE,
                  padding: AXES_PADDING,
                  callback(value, index, values) {
                    return value.toLocaleString('de-DE')
                  }
                },
                stacked: true
              }
            ],
            yAxes: [
              {
                gridLines: {
                  display: false,
                  drawBorder: false
                },
                ticks: {
                  fontFamily: AXES_FONT_FAMILY,
                  fontColor: AXES_FONT_COLOR,
                  fontSize: AXES_FONT_SIZE,
                  padding: AXES_PADDING
                },
                stacked: true
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
