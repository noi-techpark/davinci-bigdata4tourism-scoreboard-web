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

export const resultBuilder = (response) => {
  const topAreas = buildTopAreas(response)
  const total = topAreas.reduce((prev, curr) => prev + curr.value, 0)

  return {
    [propAreaCount]: response.aggregations[propAreaCount].value,
    [propTopAreas]: topAreas,
    [propTotal]: total
  }
}

const buildTopAreas = (response) => {
  const result = response.aggregations[propTopAreas].buckets.map((c) => ({
    name: c.key,
    value: c.doc_count
  }))
  result.push({
    name: 'Others',
    value: response.aggregations[propTopAreas].sum_other_doc_count
  })
  return result
}
