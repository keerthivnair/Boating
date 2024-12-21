import React from 'react'
import { Link } from 'react-router-dom'

const Entry = () => {
  return (
    <div className="entry">
       <Link to="/login"  classname="login">login</Link>
       <Link to="/register" classname="register" >register</Link>
    </div>
  )
}

export default Entry