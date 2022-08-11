import {Component} from 'react'
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

class TechnologiesDetails extends Component {
  state = {detailedView: {}, apiState: apiStatusContent.initial}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({apiState: apiStatusContent.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const responseData = await fetch(apiUrl, options)
    if (responseData.ok === true) {
      const getData = await responseData.json()
      const data = {
        id: getData.course_details.id,
        name: getData.course_details.name,
        description: getData.course_details.description,
        imageUrl: getData.course_details.image_url,
      }
      console.log(data)
      this.setState({apiState: apiStatusContent.success, detailedView: data})
    } else {
      this.setState({apiState: apiStatusContent.failure})
    }
  }

  renderCases = () => {
    const {apiState} = this.state
    switch (apiState) {
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
    const {detailedView} = this.state
    const {name, description, imageUrl} = detailedView
    return (
      <div>
        <Header />
        <div className="detailed-container">
          <div className="card-container">
            <img className="card-image" src={imageUrl} alt={name} />
            <div className="card-div">
              <h1 className="card-name">{name}</h1>
              <p className="card-description">{description}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  onUpdateTechnology = () => {
    this.getDetails()
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
    return <div>{this.renderCases()}</div>
  }
}

export default TechnologiesDetails
