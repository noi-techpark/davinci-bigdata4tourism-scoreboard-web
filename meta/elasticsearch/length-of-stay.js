// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export const propLengthOfStay = 'lengthOfStay'
export const propTotal = 'total'

export const query = {
  aggs: {
    [propLengthOfStay]: {
      terms: {
        field: 'length_of_stay',
        size: 20,
        order: { _key: 'asc' }
      }
    }
  },
  size: 0
}

export const resultBuilder = (response) => ({
  [propLengthOfStay]: response.aggregations[propLengthOfStay].buckets.reduce(
    (prev, curr) => {
      return [
        ...prev,
        {
          days: curr.key,
          count: curr.doc_count
        }
      ]
    },
    []
  ),
  [propTotal]: {
    value: response.hits.total
  }
})
