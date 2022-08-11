import {Component} from 'react'
import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import './index.css'

const apiStatusContent = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class TechnologiesList extends Component {
  state = {technologiesList: [], apiStatus: apiStatusContent.initial}

  componentDidMount() {
    this.getTechnology()
  }

  getTechnology = async () => {
    this.setState({apiStatus: apiStatusContent.loading})
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)

      const updateData = data.courses.map(eachData => ({
        id: eachData.id,
        name: eachData.name,
        logoUrl: eachData.logo_url,
      }))

      this.setState({
        apiStatus: apiStatusContent.success,
        technologiesList: updateData,
      })
    } else {
      this.setState({apiStatus: apiStatusContent.failure})
    }
  }

  renderCases = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContent.success:
        return this.renderSuccessTechnology()
      case apiStatusContent.failure:
        return this.renderFailureTechnology()
      case apiStatusContent.loading:
        return this.renderLoadTechnology()
      default:
        return null
    }
  }

  renderSuccessTechnology = () => {
    const {technologiesList} = this.state
    return (
      <div className="success-container">
        <h1>Courses</h1>
        <ul className="ul-container">
          {technologiesList.map(eachItem => (
            <Link
              key={eachItem.id}
              className="link-el"
              to={`/courses/${eachItem.id}`}
            >
              <li key={eachItem.id} className="li-container">
                <img
                  className="li-image"
                  src={eachItem.logoUrl}
                  alt={eachItem.name}
                />
                <p className="li-title">{eachItem.name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }

  onUpdateTechnology = () => {
    this.getTechnology()
  }

  renderLoadTechnology = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureTechnology = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        className="failure-btn"
        type="button"
        onClick={this.onUpdateTechnology}
      >
        Retry
      </button>
    </div>
  )

  render() {
    return (
      <>
        <Header />
        {this.renderCases()}
      </>
    )
  }
}

export default TechnologiesList
