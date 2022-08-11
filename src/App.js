import {Switch, Route} from 'react-router-dom'
import TechnologiesList from './components/TechnologiesList'
import TechnologiesDetails from './components/TechnologiesDetails'
import NotFound from './components/NotFound'
import './App.css'

// Replace your code here

const App = () => (
  <Switch>
    <Route exact path="/" component={TechnologiesList} />
    <Route exact path="/courses/:id" component={TechnologiesDetails} />
    <Route component={NotFound} />
  </Switch>
)

export default App
