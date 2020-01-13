import React from "react"

const User = ({ userData }) => {
  const isUser = userData && Object.keys(userData).length > 0
  return (
    <>
      {isUser ? (
        <div className="user col s12">
          <div className="user__img">
            <img src={userData.avatar_url} alt="avatar" />
          </div>
          <div className="user__info">
            <div className="user__name">{userData.name}</div>
            <div className="user__location">{userData.location}</div>
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="user__link"
            >
              Git page
            </a>
          </div>
        </div>
      ) : (
        "Пользователь не загружен"
      )}
    </>
  )
}

export default User
