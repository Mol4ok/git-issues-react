import {
  SET_AUTHORIZATION,
  SET_USER_DATA,
  SET_ISSUES,
  SET_REPOS
} from "actions/gitActions"

const initialState = {
  auth: {},
  user: {},
  repos: {},
  issues: {}
}

const reducer = (
  state = initialState,
  {
    type,
    authData,
    userData,
    reposArr,
    reposPagesQuant,
    issuesPagesQuant,
    issuesArr,
    login,
    repoName,
    repoPage,
    issuePage
  }
) => {
  switch (type) {
    case SET_AUTHORIZATION: {
      return {
        ...state,
        auth: authData
      }
    }
    case SET_USER_DATA: {
      return {
        ...state,
        user: userData
      }
    }
    case SET_REPOS: {
      const repos = { ...state.repos }
      if (reposArr.length) {
        if (reposPagesQuant > 1) {
          repos[login] = {
            pages: new Array(reposPagesQuant).fill(null)
          }
        } else {
          repos[login] = repos[login] || {
            pages: []
          }
        }
        repos[login].pages[repoPage] = reposArr
      } else {
        repos[login] = false
      }
      return {
        ...state,
        repos
      }
    }
    case SET_ISSUES: {
      const issues = { ...state.issues }
      if (issuesArr.length) {
        if (!issues[login] || !issues[login][repoName]) {
          if (issues[login]) {
            issues[login][repoName] = {
              pages: new Array(issuesPagesQuant).fill(null)
            }
          } else {
            issues[login] = {
              [repoName]: {
                pages: new Array(issuesPagesQuant).fill(null)
              }
            }
          }
        }
        issues[login][repoName].pages[issuePage] = issuesArr
      } else {
        issues[login][repoName] = false
      }
      return {
        ...state,
        issues
      }
    }
    default:
      return state
  }
}

export default reducer
