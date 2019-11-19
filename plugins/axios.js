export default function({ $axios, app }) {
  $axios.onError((error) => Promise.reject(error))
}
