import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = props => {
  const onRenderAll = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <nav className="header-container">
      <Link to="/">
        <img
          onClick={onRenderAll}
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
          alt="website logo"
        />
      </Link>
    </nav>
  )
}

export default withRouter(Header)
