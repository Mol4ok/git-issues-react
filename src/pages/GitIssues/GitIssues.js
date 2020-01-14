import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { getIssues } from "actions/gitActions"
import Issues from "componets/Issues"
import Loader from "componets/Loader"

const GitIssues = () => {
  const { login, repoName } = useParams()
  const dispatch = useDispatch()
  const issues = useSelector(state => state.git.issues)
  let issuesArr = issues[login] ? issues[login][repoName] : null
  const issuesLoader =
    !issues[login] || issues[login][repoName] === undefined ? true : false
  useEffect(() => {
    dispatch(getIssues(login, repoName))
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <h2>
        Issues of <span>"{repoName}"</span>
      </h2>
      {issuesLoader ? (
        <Loader />
      ) : (
        issuesArr && (
          <Issues login={login} repoName={repoName} issues={issuesArr} />
        )
      )}
    </div>
  )
}

export default GitIssues
