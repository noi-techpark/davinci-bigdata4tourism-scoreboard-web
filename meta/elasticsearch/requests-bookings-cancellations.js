import dayjs from 'dayjs'

export const propRequests = 'requests'
export const propBookings = 'bookings'
export const propCancellations = 'cancellations'
export const propTotal = 'total'
export const propDateHistogram = 'dateHistogram'

const propByType = 'byType'

export const query = {
  aggs: {
    reqBookCancel: {
      filters: {
        filters: {
          [propRequests]: {
            query_string: {
              query: 'booking:false',
              analyze_wildcard: true,
              default_field: '*'
            }
          },
          [propBookings]: {
            query_string: {
              query: 'booking:true AND cancellation:false',
              analyze_wildcard: true,
              default_field: '*'
            }
          },
          [propCancellations]: {
            query_string: {
              query: 'booking:true AND cancellation:true',
              analyze_wildcard: true,
              default_field: '*'
            }
          }
        }
      }
    },
    [propDateHistogram]: {
      date_histogram: {
        field: 'submitted_on',
        interval: '1w',
        time_zone: 'Europe/Berlin',
        min_doc_count: 1
      },
      aggs: {
        [propByType]: {
          filters: {
            filters: {
              [propRequests]: {
                query_string: {
                  query: 'booking:false',
                  analyze_wildcard: true,
                  default_field: '*'
                }
              },
              [propBookings]: {
                query_string: {
                  query: 'booking:true AND cancellation:false',
                  analyze_wildcard: true,
                  default_field: '*'
                }
              },
              [propCancellations]: {
                query_string: {
                  query: 'booking:true AND cancellation:true',
                  analyze_wildcard: true,
                  default_field: '*'
                }
              }
            }
          }
        }
      }
    }
  },
  size: 0
}

export const resultBuilder = (response) => ({
  [propRequests]: {
    value: response.aggregations.reqBookCancel.buckets[propRequests].doc_count
  },
  [propBookings]: {
    value: response.aggregations.reqBookCancel.buckets[propBookings].doc_count
  },
  [propCancellations]: {
    value:
      response.aggregations.reqBookCancel.buckets[propCancellations].doc_count
  },
  [propTotal]: {
    value: response.hits.total
  },
  [propDateHistogram]: (() => {
    const result = {
      labels: [],
      [propRequests]: [],
      [propBookings]: [],
      [propCancellations]: []
    }
    response.aggregations[propDateHistogram].buckets.map((bucket) => {
      const buckets = bucket[propByType].buckets
      const label = dayjs(bucket.key).format('DD.MM.YYYY')

      result.labels.push(label)
      result[propRequests].push(buckets[propRequests].doc_count)
      result[propBookings].push(buckets[propBookings].doc_count)
      result[propCancellations].push(buckets[propCancellations].doc_count)
    })
    return result
  })()
})
