export const propRequests = 'requests'
export const propBookings = 'bookings'
export const propCancellations = 'cancellations'
export const propTotal = 'total'

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
  }
})
