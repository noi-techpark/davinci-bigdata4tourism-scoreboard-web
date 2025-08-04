// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import dayjs from 'dayjs'

export const propFarms = 'farms'
export const propHotel1to3 = 'hotel1to3'
export const propHotel4to5 = 'hotel4to5'
export const propPrivate = 'private'
export const propOthers = 'others'
export const propTotal = 'total'
export const propDateHistogram = 'dateHistogram'

const propByType = 'byType'

const percentage = (total, value) =>
  (total !== 0 ? (100.0 / total) * value : 0).toFixed(2)

export const query = {
  aggs: {
    accomodations: {
      filters: {
        filters: {
          [propFarms]: {
            match: {
              'category.name': 'agriturismi'
            }
          },
          [propHotel1to3]: {
            match: {
              'category.name': 'hotel 1-3 stelle'
            }
          },
          [propHotel4to5]: {
            match: {
              'category.name': 'hotel 4-5 stelle'
            }
          },
          [propPrivate]: {
            match: {
              'category.name': 'accomodations privati'
            }
          },
          [propOthers]: {
            match: {
              'category.name': 'altro'
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
              [propFarms]: {
                query_string: {
                  query: 'category.name:"agriturismi"',
                  analyze_wildcard: true,
                  default_field: '*'
                }
              },
              [propHotel1to3]: {
                query_string: {
                  query: 'category.name:"hotel 1-3 stelle"',
                  analyze_wildcard: true,
                  default_field: '*'
                }
              },
              [propHotel4to5]: {
                query_string: {
                  query: 'category.name:"hotel 4-5 stelle"',
                  analyze_wildcard: true,
                  default_field: '*'
                }
              },
              [propPrivate]: {
                query_string: {
                  query: 'category.name:"accomodations privati"',
                  analyze_wildcard: true,
                  default_field: '*'
                }
              },
              [propOthers]: {
                query_string: {
                  query: 'category.name:"altro"',
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
  [propFarms]: {
    value: response.aggregations.accomodations.buckets[propFarms].doc_count
  },
  [propHotel1to3]: {
    value: response.aggregations.accomodations.buckets[propHotel1to3].doc_count
  },
  [propHotel4to5]: {
    value: response.aggregations.accomodations.buckets[propHotel4to5].doc_count
  },
  [propPrivate]: {
    value: response.aggregations.accomodations.buckets[propPrivate].doc_count
  },
  [propOthers]: {
    value: response.aggregations.accomodations.buckets[propOthers].doc_count
  },
  [propTotal]: {
    value: response.hits.total
  },
  [propDateHistogram]: (() => {
    const result = {
      labels: [],
      [propFarms]: [],
      [propHotel1to3]: [],
      [propHotel4to5]: [],
      [propPrivate]: [],
      [propOthers]: []
    }
    response.aggregations[propDateHistogram].buckets.map((bucket) => {
      const buckets = bucket[propByType].buckets
      const label = dayjs(bucket.key).format('DD.MM.YYYY')

      result.labels.push(label)

      const farmsCount = buckets[propFarms].doc_count
      const hotel1to3Count = buckets[propHotel1to3].doc_count
      const hotel4to5Count = buckets[propHotel4to5].doc_count
      const privateCount = buckets[propPrivate].doc_count
      const othersCount = buckets[propOthers].doc_count
      const total = bucket.doc_count

      result[propFarms].push(percentage(total, farmsCount))
      result[propHotel1to3].push(percentage(total, hotel1to3Count))
      result[propHotel4to5].push(percentage(total, hotel4to5Count))
      result[propPrivate].push(percentage(total, privateCount))
      result[propOthers].push(percentage(total, othersCount))
    })
    return result
  })()
})
