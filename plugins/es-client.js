const msearchHeaders = { headers: { 'Content-Type': 'application/x-ndjson' } }
const searchHeaders = { headers: { 'Content-Type': 'application/json' } }

export default function(ctx, inject) {
  if (!ctx.$axios) {
    // eslint-disable-next-line
    console.error('Please make sure $axios module is added')
  } else {
    const esClient = {
      msearch: (body) => ctx.$axios.post('_msearch', body, msearchHeaders),
      search: (body) => ctx.$axios.post('_search', body, searchHeaders)
    }
    inject('esClient', esClient)
  }
}
