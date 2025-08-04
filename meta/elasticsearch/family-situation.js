// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import dayjs from 'dayjs'
export const propSingleAdult = 'singleAdult'
export const propCouplesWithoutChildren = 'couplesWithoutChildren'
export const propGroupsWithoutChildren = 'groupsWithoutChildren'
export const propSinglesWithChildren = 'singlesWithChildren'
export const propFamilies = 'families'
export const propTotal = 'total'
export const propDateHistogram = 'dateHistogram'

const propByType = 'byType'

export const query = {
  aggs: {
    familySituation: {
      filters: {
        filters: {
          [propSingleAdult]: {
            query_string: {
              query: 'adults:1 AND children:0',
              analyze_wildcard: true,
              default_field: '*'
            }
          },
          [propCouplesWithoutChildren]: {
            query_string: {
              query: 'adults:2 AND children:0',
              analyze_wildcard: true,
              default_field: '*'
            }
          },
          [propGroupsWithoutChildren]: {
            query_string: {
              query: 'adults:>2 AND children:0',
              analyze_wildcard: true,
              default_field: '*'
            }
          },
          [propSinglesWithChildren]: {
            query_string: {
              query: 'adults:1 AND children:>0',
              analyze_wildcard: true,
              default_field: '*'
            }
          },
          [propFamilies]: {
            query_string: {
              query: 'adults:>1 AND children:>0',
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
              [propSingleAdult]: {
                query_string: {
                  query: 'adults:1 AND children:0',
                  analyze_wildcard: true,
                  default_field: '*'
                }
              },
              [propCouplesWithoutChildren]: {
                query_string: {
                  query: 'adults:2 AND children:0',
                  analyze_wildcard: true,
                  default_field: '*'
                }
              },
              [propGroupsWithoutChildren]: {
                query_string: {
                  query: 'adults:>2 AND children:0',
                  analyze_wildcard: true,
                  default_field: '*'
                }
              },
              [propSinglesWithChildren]: {
                query_string: {
                  query: 'adults:1 AND children:>0',
                  analyze_wildcard: true,
                  default_field: '*'
                }
              },
              [propFamilies]: {
                query_string: {
                  query: 'adults:>1 AND children:>0',
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
  [propSingleAdult]: {
    value:
      response.aggregations.familySituation.buckets[propSingleAdult].doc_count
  },
  [propCouplesWithoutChildren]: {
    value:
      response.aggregations.familySituation.buckets[propCouplesWithoutChildren]
        .doc_count
  },
  [propGroupsWithoutChildren]: {
    value:
      response.aggregations.familySituation.buckets[propGroupsWithoutChildren]
        .doc_count
  },
  [propSinglesWithChildren]: {
    value:
      response.aggregations.familySituation.buckets[propSinglesWithChildren]
        .doc_count
  },
  [propFamilies]: {
    value: response.aggregations.familySituation.buckets[propFamilies].doc_count
  },
  [propTotal]: {
    value: response.hits.total
  },
  [propDateHistogram]: (() => {
    const result = {
      labels: [],
      [propSingleAdult]: [],
      [propCouplesWithoutChildren]: [],
      [propGroupsWithoutChildren]: [],
      [propSinglesWithChildren]: [],
      [propFamilies]: []
    }
    response.aggregations[propDateHistogram].buckets.map((bucket) => {
      const buckets = bucket[propByType].buckets
      const label = dayjs(bucket.key).format('DD.MM.YYYY')

      result.labels.push(label)

      result[propSingleAdult].push(buckets[propSingleAdult].doc_count)
      result[propCouplesWithoutChildren].push(
        buckets[propCouplesWithoutChildren].doc_count
      )
      result[propGroupsWithoutChildren].push(
        buckets[propGroupsWithoutChildren].doc_count
      )
      result[propSinglesWithChildren].push(
        buckets[propSinglesWithChildren].doc_count
      )
      result[propFamilies].push(buckets[propFamilies].doc_count)
    })

    return result
  })()
})
