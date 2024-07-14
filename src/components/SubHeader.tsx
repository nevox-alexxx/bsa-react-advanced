import { Link } from "react-router-dom"

export function SubHeader() {
  return (
    <header className="header">
      <div className="header__inner">
        <Link data-test-id="header-logo" to="/" className="header__logo">
          Travel App
        </Link>
      </div>
    </header>
  )
}