const gitApi = ({ path, params, headers, auth = {} }) => {
  const api = process.env.REACT_APP_GIT_URL
  let code
  let link
  const { login, password } = auth
  if (login && password) {
    headers = new Headers({
      Authorization: `Basic ${btoa(`${login}:${password}`)}`
    })
  }
  return fetch(`${api}/${path}`, { headers }, params)
    .then(res => {
      link = res.headers.get("Link")
      code = res.status
      return res.json()
    })
    .then(result => ({
      result,
      code,
      link
    }))
}

export default gitApi
