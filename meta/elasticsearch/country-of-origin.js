export const propCountryCount = 'countryCount'
export const propTopCountries = 'topCountries'
export const propTotal = 'total'

export const query = {
  aggs: {
    [propCountryCount]: {
      cardinality: {
        field: 'country.name'
      }
    },
    [propTopCountries]: {
      terms: {
        field: 'country.name',
        size: 15,
        order: {
          _count: 'desc'
        }
      }
    }
  },
  size: 0
}

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
