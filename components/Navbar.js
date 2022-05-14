import { useState } from "react"
import Link from 'next/link'

export default function Navbar (){
  const [isActive, setIsActive] = useState(false)
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link href='/'>
          <a className="navbar-item is-size-4">
            ShesterBot
          </a>
        </Link>
        

        <a role="button" 
          className={`navbar-burger ${isActive ? 'is-active' : null}`} 
          aria-label="menu" aria-expanded="false" 
          data-target="navbarBasicExample"
          onClick={e => setIsActive(!isActive)}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className={`navbar-menu ${isActive ? 'is-active' : null}`}>
        <div className="navbar-start">
          <a className="navbar-item">
            Home
          </a>

          <a className="navbar-item">
            Documentation
          </a>

          <a className="navbar-item">
            Servers
          </a>
        </div>
      </div>
    </nav>  
    )
}