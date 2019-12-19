export const propAreaCount = 'areaCount'
export const propAreas = 'areas'
export const propIstat = 'istat'
export const propTopAreas = 'topAreas'
export const propTotal = 'total'

const topResultCount = 15

export const query = {
  aggs: {
    [propAreaCount]: {
      cardinality: {
        field: 'destination.name'
      }
    },
    [propAreas]: {
      terms: {
        field: 'destination.name',
        size: 150,
        order: {
          _count: 'desc'
        }
      },
      aggs: {
        [propIstat]: {
          terms: {
            field: 'destination.code'
          }
        }
      }
    }
  },
  size: 0
}

export const resultBuilder = (response) => {
  const areas = buildAreas(response)
  const topAreas = areas.slice(0, topResultCount)
  const topTotal = topAreas.reduce((prev, curr) => prev + curr.value, 0)
  const others = areas
    .slice(topResultCount)
    .reduce((prev, curr) => prev + curr.value, 0)
  topAreas.push({
    name: 'Others',
    value: others
  })

  return {
    [propAreaCount]: response.aggregations[propAreaCount].value,
    [propAreas]: areas,
    [propTopAreas]: topAreas,
    [propTotal]: topTotal
  }
}

const buildAreas = (response) =>
  response.aggregations[propAreas].buckets.map((c) => ({
    istat: c[propIstat].buckets[0].key,
    name: c.key,
    value: c.doc_count
  }))
