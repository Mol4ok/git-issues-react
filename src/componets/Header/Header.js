import React from "react"
import logo from "assets/images/octocat.png"
import { Link, NavLink } from "react-router-dom"
import { useSelector } from "react-redux"

const Header = () => {
  const auth = useSelector(state => state.git.auth)
  const { login, avatar_url } = auth
  return (
    <nav className="header">
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">
          <img src={logo} alt="" />
        </Link>
        <ul className="right">
          <li>
            {login ? (
              <span className="header__user">
                <img src={avatar_url} alt="" />
                <span>{login}</span>
              </span>
            ) : (
              <NavLink to="/">Авторизация</NavLink>
            )}
          </li>
          <li>
            <NavLink to="/repos">Repos</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
