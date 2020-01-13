import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAuthorizationData } from "actions/gitActions"

const GitAutorization = () => {
  const [login, setLogin] = useState()
  const [password, setPassword] = useState()
  const auth = useSelector(state => state.git.auth)
  const dispatch = useDispatch()

  function changeLogin({ target }) {
    setLogin(target.value)
  }

  function changePassword({ target }) {
    setPassword(target.value)
  }

  function submitHandler(e) {
    e.preventDefault()
    dispatch(getAuthorizationData(login, password))
  }

  return (
    <>
      {auth.login ? (
        <p>Доброго времени суток {auth.login}</p>
      ) : (
        <div>
          <h2>Авторизация</h2>
          <form onSubmit={submitHandler}>
            <div className="row">
              <div className="input-field col s6">
                <span>User</span>
                <input type="text" onChange={changeLogin} />
              </div>
              <div className="input-field col s6">
                <span>Password</span>
                <input type="password" onChange={changePassword} />
              </div>
            </div>
            <input type="submit" value="Отправить" />
          </form>
        </div>
      )}
    </>
  )
}

export default GitAutorization
