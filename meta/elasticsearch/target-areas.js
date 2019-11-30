export const propAreaCount = 'areaCount'
export const propTopAreas = 'topAreas'
export const propTotal = 'total'

export const queryBuilder = ({ from, to, size }) => ({
  aggs: {
    [propAreaCount]: {
      cardinality: {
        field: 'destination.name'
      }
    },
    [propTopAreas]: {
      terms: {
        field: 'destination.name',
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
