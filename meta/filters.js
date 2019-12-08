export default [
  {
    name: 'years',
    values: (() => {
      const currentYear = new Date().getFullYear()

      const years = []
      for (let i = 2016; i < currentYear + 2; i++) {
        const value = '' + i
        years.push({ text: value, value })
      }
      return years
    })()
  },
  {
    name: 'types',
    values: [
      { text: 'Requests', value: 'booking:false' },
      { text: 'Bookings', value: 'booking:true AND cancellation:false' },
      { text: 'Cancellations', value: 'booking:true AND cancellation:true' }
    ]
  },
  {
    name: 'categories',
    values: [
      { text: 'Hotel 1-3 stars', value: 'hotel 1-3 stelle' },
      { text: 'Hotel 4-5 stars', value: 'hotel 4-5 stelle' },
      { text: 'Private accomodations', value: 'accomodations privati' },
      { text: 'Farms', value: 'agriturismi' },
      { text: 'Others', value: 'altro' }
    ]
  },
  {
    name: 'families',
    values: [
      { text: 'Unaccompanied', value: 'adults:1 AND children:0' },
      { text: 'Groups without children', value: 'adults:>2 AND children:0' },
      { text: 'Couples without children', value: 'adults:2 AND children:0' },
      { text: 'Singles with children', value: 'adults:1 AND children:>0' },
      { text: 'Families', value: 'adults:>1 AND children:>0' },
      {
        text: 'Others',
        value:
          'NOT (adults:1 AND children:0) AND NOT (adults:>2 AND children:0) AND NOT (adults:2 AND children:0) AND NOT (adults:1 AND children:>0) AND NOT (adults:>1 AND children:>0)'
      }
    ]
  },
  {
    name: 'countries',
    values: [
      { text: 'Italy', value: 'country.name:Italy' },
      { text: 'Germany', value: 'country.name:Germany' },
      { text: 'Austria', value: 'country.name:Austria' },
      { text: 'Switzerland', value: 'country.name:Switzerland' },
      {
        text: 'Others',
        value:
          'NOT country.name:Italy AND NOT country.name:Germany AND NOT country.name:Austria AND NOT country.name:Switzerland'
      }
    ]
  }
]

export const applyQueryFilters = ({ query, globalFilters }) => {
  if (globalFilters == null) {
    return query
  }

  const resultQuery = {
    ...query,
    query: {
      bool: {
        must: [],
        filter: []
      }
    }
  }

  const years = globalFilters.years != null ? globalFilters.years : []
  if (years.length) {
    const min = Math.min(...years)
    const max = Math.max(...years)

    resultQuery.query.bool.must.push({
      range: {
        submitted_on: {
          gte: new Date(0).setFullYear(min),
          lte: new Date(0).setFullYear(max + 1) - 1,
          format: 'epoch_millis'
        }
      }
    })
  }

  const categories =
    globalFilters.categories != null ? globalFilters.categories : []
  if (categories.length) {
    resultQuery.query.bool.filter.push({
      terms: { 'category.name': categories }
    })
  }

  const types = globalFilters.types != null ? globalFilters.types : []
  if (types.length) {
    resultQuery.query.bool.must.push({
      query_string: {
        query: `(${types.join(') OR (')})`,
        analyze_wildcard: true,
        default_field: '*'
      }
    })
  }

  const families = globalFilters.families != null ? globalFilters.families : []
  if (families.length) {
    resultQuery.query.bool.must.push({
      query_string: {
        query: `(${families.join(') OR (')})`,
        analyze_wildcard: true,
        default_field: '*'
      }
    })
  }

  const countries =
    globalFilters.countries != null ? globalFilters.countries : []
  if (countries.length) {
    resultQuery.query.bool.must.push({
      query_string: {
        query: `(${countries.join(') OR (')})`,
        analyze_wildcard: true,
        default_field: '*'
      }
    })
  }

  return resultQuery
}
