export const propAreaCount = 'areaCount'
export const propTopAreas = 'topAreas'
export const propTotal = 'total'

export const query = {
  aggs: {
    [propAreaCount]: {
      cardinality: {
        field: 'destination.name'
      }
    },
    [propTopAreas]: {
      terms: {
        field: 'destination.name',
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
  [propAreaCount]: {
    value: response.aggregations[propAreaCount].value
  },
  [propTopAreas]: {
    value: response.aggregations[propTopAreas].buckets
  },
  [propTotal]: {
    value: response.hits.total
  }
})
