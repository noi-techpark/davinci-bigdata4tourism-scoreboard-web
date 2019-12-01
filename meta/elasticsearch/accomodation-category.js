export const propFarms = 'farms'
export const propHotel1to3 = 'hotel1to3'
export const propHotel4to5 = 'hotel4to5'
export const propPrivate = 'private'
export const propOthers = 'others'
export const propTotal = 'total'

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
  }
})
