export const propAvg = 'avg'
export const propMax = 'max'
export const propTotal = 'total'

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
    [propMax]: {
      max: {
        script: {
          inline:
            "(doc['arrival'].date.millis - doc['submitted_on'].date.millis)/86400000",
          lang: 'painless'
        }
      }
    }
  },
  size: 0
}

export const resultBuilder = (response) => ({
  [propAvg]: {
    value: response.aggregations.propAvg.value
  },
  [propMax]: {
    value: response.aggregations.propMax.value
  },
  [propTotal]: {
    value: response.hits.total
  }
})
