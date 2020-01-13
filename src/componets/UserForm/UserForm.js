import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { getUser } from "actions/gitActions"

const Inputs = () => {
  const [login, setLogin] = useState("")
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
      <input autoComplete="on" type="text" onChange={changeLogin} />
    </form>
  )
}

export default Inputs
