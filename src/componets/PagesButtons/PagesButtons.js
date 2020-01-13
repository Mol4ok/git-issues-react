import React from "react"

const PagesButtons = ({ pages, changePage, currentPage }) => {
  let cont = []
  let page = 0
  const getBtnClass = page => {
    return page === currentPage ? "active" : ""
  }
  while (page < pages) {
    cont.push(
      <button
        key={page}
        onClick={changePage(page)}
        className={getBtnClass(page)}
      >
        {page + 1}
      </button>
    )
    page++
  }

  return <div className="pages">{cont}</div>
}

export default PagesButtons
