const countHeaders = { headers: { 'Content-Type': 'application/json' } }
const msearchHeaders = { headers: { 'Content-Type': 'application/x-ndjson' } }
const searchHeaders = { headers: { 'Content-Type': 'application/json' } }

const msearchIndex = (indexName) => ({
  index: indexName,
  ignore_unavailable: true,
  timeout: 30000
})

export default function(ctx, inject) {
  if (!ctx.$axios) {
    // eslint-disable-next-line
    console.error('Please make sure $axios module is added')
  } else {
    const indexName = ctx.env && ctx.env.esIndex ? ctx.env.esIndex : ''
    const index = indexName.length ? `${indexName}/` : ''
    const msearchIndexAsString = JSON.stringify(msearchIndex(indexName)) + '\n'

    const esClient = {
      count: (body) => ctx.$axios.post(`${index}_count`, body, countHeaders),
      msearch: (bodies) => {
        const body = bodies.reduce(
          (prev, curr) =>
            prev + msearchIndexAsString + JSON.stringify(curr) + '\n',
          ''
        )

        return ctx.$axios.post('_msearch', body, msearchHeaders)
      },
      search: (body) => ctx.$axios.post(`${index}_search`, body, searchHeaders)
    }
    inject('esClient', esClient)
  }
}
