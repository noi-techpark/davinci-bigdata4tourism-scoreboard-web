export const propCountryCount = 'countryCount'
export const propCountryCodes = 'codes'
export const propCountries = 'countries'
export const propTopCountries = 'topCountries'
export const propTotal = 'total'

export const query = {
  aggs: {
    [propCountryCount]: {
      cardinality: {
        field: 'country.name'
      }
    },
    [propCountries]: {
      terms: {
        field: 'country.name',
        size: 300,
        order: {
          _count: 'desc'
        }
      },
      aggs: {
        [propCountryCodes]: {
          terms: {
            field: 'country.code'
          }
        }
      }
    }
  },
  size: 0
}

export const resultBuilder = (response) => {
  const countries = buildCountries(response)
  const topCountries = countries.slice(0, 15)
  const topTotal = topCountries.reduce((prev, curr) => prev + curr.value, 0)
  const others = topCountries.reduce((prev, curr) => prev + curr.value, 0)
  topCountries.push({
    name: 'Others',
    value: others
  })

  return {
    [propCountryCount]: response.aggregations[propCountryCount].value,
    [propCountries]: countries,
    [propTopCountries]: topCountries,
    [propTotal]: topTotal
  }
}

const buildCountries = (response) =>
  response.aggregations[propCountries].buckets.map((c) => ({
    code: c[propCountryCodes].buckets[0].key.toUpperCase(),
    name: c.key,
    value: c.doc_count
  }))
