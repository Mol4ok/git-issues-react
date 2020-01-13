import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUser } from "actions/gitActions"

const Inputs = () => {
  const [login, setLogin] = useState("")
  const user = useSelector(state => state.git.user)
  const dispatch = useDispatch()
  function changeLogin({ target }) {
    setLogin(target.value)
  }
  function submitHandler(e) {
    e.preventDefault()
    dispatch(getUser(login))
  }
  return (
    <form onSubmit={submitHandler}>
      <span>Select Git User</span>
      <input
        autoComplete="on"
        type="text"
        defaultValue={user.login}
        onChange={changeLogin}
      />
    </form>
  )
}

export default Inputs
