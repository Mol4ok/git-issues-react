import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getReposPage } from "actions/gitActions"
import PagesButtons from "componets/PagesButtons"
import Loader from "componets/Loader"

const Repos = ({ repos }) => {
  const pages = repos.pages.length
  const [page, setPage] = useState(0)
  const user = useSelector(state => state.git.user)
  const dispatch = useDispatch()
  const getReposPageHandler = page => () => {
    dispatch(getReposPage(user.login, page))
    setPage(page)
  }
  return (
    <>
      <h2>Repositories</h2>
      {pages > 1 && (
        <PagesButtons
          pages={pages}
          changePage={getReposPageHandler}
          currentPage={page}
        />
      )}
      {repos.pages[page] ? (
        <ul className="repos">
          {repos.pages[page].map(repo => (
            <li className="repos__item" key={repo.name}>
              {repo.open_issues > 0 ? (
                <>
                  <Link to={`/issues/${user.login}/${repo.name}`}>
                    {repo.name}
                  </Link>
                  <span>{repo.open_issues} opened issues</span>
                </>
              ) : (
                <>
                  <span>{repo.name}</span>
                  <span>none</span>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default Repos
