// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export const propAvg = 'avg'
export const propMin = 'min'
export const propMax = 'max'
export const propTotal = 'total'
export const propDays = 'days'

export const query = {
  aggs: {
    [propAvg]: {
      avg: {
        script: {
          inline:
            "(doc['arrival'].date.millis - doc['submitted_on'].date.millis)/86400000",
          lang: 'painless'
        }
      }
    },
    [propMin]: {
      min: {
        script: {
          inline:
            "(doc['arrival'].date.millis - doc['submitted_on'].date.millis)/86400000",
          lang: 'painless'
        }
      }
    },
    [propMax]: {
      max: {
        script: {
          inline:
            "(doc['arrival'].date.millis - doc['submitted_on'].date.millis)/86400000",
          lang: 'painless'
        }
      }
    },
    [propDays]: {
      terms: {
        script: {
          inline:
            "(doc['arrival'].date.millis - doc['submitted_on'].date.millis)/86400000",
          lang: 'painless'
        },
        size: 1000
      }
    }
  },
  size: 0
}

export const resultBuilder = (response) => {
  const days = response.aggregations[propDays].buckets.map((c) => ({
    name: parseInt(c.key, 10),
    value: c.doc_count
  }))
  days.sort((a, b) => a.name - b.name)

  return {
    [propAvg]: response.aggregations[propAvg].value,
    [propMin]: response.aggregations[propMin].value,
    [propMax]: response.aggregations[propMax].value,
    [propDays]: days,
    [propTotal]: response.hits.total
  }
}
