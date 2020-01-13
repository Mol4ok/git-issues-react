import React, { useState } from "react"
import { useDispatch } from "react-redux"
import ReactMarkdown from "react-markdown"
import PagesButtons from "componets/PagesButtons"
import { getIssuesPage } from "actions/gitActions"
import Loader from "componets/Loader"

const Issues = ({ issues, login, repoName }) => {
  const pages = issues.pages.length
  const dispatch = useDispatch()
  const [page, setPage] = useState(0)

  const getIssuesPageHandler = page => () => {
    dispatch(getIssuesPage(login, repoName, page))
    setPage(page)
  }
  return (
    <div className="issues">
      {pages > 1 && (
        <PagesButtons
          pages={pages}
          changePage={getIssuesPageHandler}
          currentPage={page}
        />
      )}
      {issues.pages[page] ? (
        issues.pages[page].map(issue => (
          <div className="issues__item" key={issue.id}>
            <div className="issues__user">
              <img src={issue.user.avatar_url} alt="" />
              <div className="issues__login">{issue.user.login}</div>
            </div>
            <p className="issues__date">{issue.created_at}</p>
            <ReactMarkdown source={issue.body} />
            <a href={issue.html_url} target="_blank" rel="noopener noreferrer">
              link to issue
            </a>
          </div>
        ))
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default Issues
