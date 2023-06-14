import { Link, Outlet } from "react-router-dom"

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"
import './navigation.styles.scss'

export default function Navigation()
{
  return (
    <>
      <nav className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">Shop</Link>
        </div>
      </nav>
      <Outlet />
    </>
  )
}