import dayjs from 'dayjs'

export const propTotal = 'total'
export const propMax = 'max'
export const propMin = 'min'
export const propDateHistogram = 'dateHistogram'

const propSources = 'sources'

export const query = {
  aggs: {
    [propDateHistogram]: {
      date_histogram: {
        field: 'submitted_on',
        interval: '1w',
        time_zone: 'Europe/Berlin',
        min_doc_count: 1
      },
      aggs: {
        [propSources]: {
          cardinality: {
            field: 'agenzia.keyword'
          }
        }
      }
    }
  },
  size: 0
}

export const resultBuilder = (response) => {
  const result = {
    [propTotal]: response.hits.total,
    [propMin]: Infinity,
    [propMax]: 0,
    [propDateHistogram]: {
      labels: [],
      data: []
    }
  }

  const buckets = response.aggregations[propDateHistogram].buckets
  for (let i = 0; i < buckets.length; i++) {
    const bucket = buckets[i]

    const label = dayjs(bucket.key).format('DD.MM.YYYY')
    result[propDateHistogram].labels.push(label)

    const value = bucket[propSources].value
    result[propDateHistogram].data.push(value)

    result[propMin] = Math.min(value, result[propMin])
    result[propMax] = Math.max(value, result[propMax])
  }

  return result
}
