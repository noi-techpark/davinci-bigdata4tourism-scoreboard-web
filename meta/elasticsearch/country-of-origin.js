export const propCountryCount = 'countryCount'
export const propTopCountries = 'topCountries'
export const propTotal = 'total'

export const queryBuilder = ({ from, to, size }) => ({
  aggs: {
    [propCountryCount]: {
      cardinality: {
        field: 'country.name'
      }
    },
    [propTopCountries]: {
      terms: {
        field: 'country.name',
        size,
        order: {
          _count: 'desc'
        }
      }
    }
  },
  size: 0,
  query: {
    bool: {
      must: [
        {
          range: {
            submitted_on: {
              gte: from,
              lte: to,
              format: 'epoch_millis'
            }
          }
        }
      ]
    }
  }
})

export const resultBuilder = (response) => ({
  [propCountryCount]: {
    value: response.aggregations[propCountryCount].value
  },
  [propTopCountries]: {
    value: response.aggregations[propTopCountries].buckets
  },
  [propTotal]: {
    value: response.hits.total
  }
})
