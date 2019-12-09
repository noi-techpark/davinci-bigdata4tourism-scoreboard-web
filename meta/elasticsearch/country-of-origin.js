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

export const resultBuilder = (response) => {
  const topCountries = buildTopCountries(response)
  const total = topCountries.reduce((prev, curr) => prev + curr.value, 0)

  return {
    [propCountryCount]: response.aggregations[propCountryCount].value,
    [propTopCountries]: topCountries,
    [propTotal]: total
  }
}

const buildTopCountries = (response) => {
  const result = response.aggregations[propTopCountries].buckets.map((c) => ({
    name: c.key,
    value: c.doc_count
  }))
  result.push({
    name: 'Others',
    value: response.aggregations[propTopCountries].sum_other_doc_count
  })
  return result
}
