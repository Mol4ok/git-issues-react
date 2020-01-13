import gitApi from "utils/gitApi"

const SET_AUTHORIZATION = "SET_AUTHORIZATION"
const SET_ISSUES = "SET_ISSUES"
const SET_REPOS = "SET_REPOS"
const SET_USER_DATA = "SET_USER_DATA"

const setIssues = (
  login,
  repoName,
  issuesArr,
  issuePage = 0,
  issuesPagesQuant = 1
) => ({
  type: SET_ISSUES,
  login,
  repoName,
  issuesArr,
  issuePage,
  issuesPagesQuant
})

const setAuthorization = authData => ({
  type: SET_AUTHORIZATION,
  authData
})

const setRepos = (login, reposArr, repoPage = 0, reposPagesQuant = 1) => ({
  type: SET_REPOS,
  login,
  reposArr,
  repoPage,
  reposPagesQuant
})

const setUser = userData => ({
  type: SET_USER_DATA,
  userData
})

// ####  async actions ####

const getIssues = (login, repoName) => async (dispatch, getState) => {
  const path = `repos/${login}/${repoName}/issues`
  const params = {
    state: "open"
  }
  const { git } = getState()
  const { auth } = git
  if (git.issues[login] && git.issues[login][repoName]) {
    return false
  }
  const { result: issues, code, link } = await gitApi({ path, params, auth })
  if (code === 200) {
    let issuesPagesQuant = link
      ? Number(link.match(/page=(\d*)>; rel="last"/)[1])
      : undefined
    dispatch(getUser(login))
    dispatch(setIssues(login, repoName, issues, undefined, issuesPagesQuant))
  }
}

const getIssuesPage = (login, repoName, page) => async (dispatch, getState) => {
  const path = `repos/${login}/${repoName}/issues?page=${page + 1}`
  const { git } = getState()
  const { auth } = git
  if (git.issues[login] && git.issues[login][repoName].pages[page]) {
    return false
  }
  const { result: issues, code } = await gitApi({ path, auth })
  if (code === 200) {
    dispatch(setIssues(login, repoName, issues, page))
  }
}

const getRepos = login => async (dispatch, getState) => {
  const path = `users/${login}/repos`
  const { git } = getState()
  const { auth } = git
  if (git.repos[login]) {
    return false
  }
  const { result: repos, code, link } = await gitApi({ path, auth })
  if (code === 200) {
    let reposPagesQuant = link
      ? Number(link.match(/page=(\d*)>; rel="last"/)[1])
      : undefined
    dispatch(setRepos(login, repos, undefined, reposPagesQuant))
  }
}

const getReposPage = (login, page) => async (dispatch, getState) => {
  const path = `users/${login}/repos?page=${page + 1}`
  const { git } = getState()
  const { auth } = git
  if (git.repos[login].pages[page]) {
    return false
  }
  const { result: repos, code } = await gitApi({ path, auth })
  if (code === 200) {
    dispatch(setRepos(login, repos, page))
  }
}

const getUser = login => async (dispatch, getState) => {
  const path = `users/${login}`
  const { git } = getState()
  const { auth } = git
  if (git.user.login === login) {
    return false
  }
  const { result: user, code } = await gitApi({ path, auth })
  user.login = login
  if (code === 200) {
    dispatch(setUser(user))
    dispatch(getRepos(login))
  }
}

const getAuthorizationData = (login, password) => async dispatch => {
  const path = "user"
  const headers = new Headers({
    Authorization: `Basic ${btoa(`${login}:${password}`)}`
  })
  const { result: authData, code } = await gitApi({ path, headers })
  if (code === 200) {
    authData.password = password
    dispatch(setAuthorization(authData))
  }
}

export {
  SET_AUTHORIZATION,
  SET_USER_DATA,
  SET_ISSUES,
  SET_REPOS,
  getIssues,
  getIssuesPage,
  getUser,
  getRepos,
  getReposPage,
  getAuthorizationData
}
