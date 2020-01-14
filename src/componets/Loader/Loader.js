import React from "react"

const Loader = ({ type = "linear" }) => {
  const isLinear = type === "linear"
  const isCircle = type === "circle"
  return (
    <div>
      {isLinear && (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      )}
      {isCircle && (
        <div className="preloader-wrapper big active">
          <div className="spinner-layer spinner-blue">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Loader
