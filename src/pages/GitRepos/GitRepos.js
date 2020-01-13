import React from "react"
import { useSelector } from "react-redux"
import UserForm from "componets/UserForm"
import UserCard from "componets/UserCard"
import Repos from "componets/Repos"

const GitRepos = () => {
  const user = useSelector(state => state.git.user)
  const { login } = user
  const repos = useSelector(state => state.git.repos)[login]
  return (
    <>
      <h2>Git Repos</h2>
      <div className="row">
        <div className="input-field col s6">
          <UserForm />
        </div>
        <div className="col s6">
          <UserCard userData={user} />
        </div>
      </div>
      <div className="row">{repos && <Repos repos={repos} />}</div>
    </>
  )
}

export default GitRepos
