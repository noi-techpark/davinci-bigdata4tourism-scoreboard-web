export const propUnaccompanied = 'unaccompanied'
export const propCouplesWithoutChildren = 'couplesWithoutChildren'
export const propGroupsWithoutChildren = 'groupsWithoutChildren'
export const propSinglesWithChildren = 'singlesWithChildren'
export const propFamilies = 'families'
export const propTotal = 'total'

export const query = {
  aggs: {
    familySituation: {
      filters: {
        filters: {
          [propUnaccompanied]: {
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
  },
  size: 0
}

export const resultBuilder = (response) => ({
  [propUnaccompanied]: {
    value:
      response.aggregations.familySituation.buckets[propUnaccompanied].doc_count
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
  }
})
