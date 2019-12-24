import React from 'react'
import {Link} from 'react-router-dom'
import AppContext from '../components/AppContext'
import './styles/landingpage.scss'

export default class LandingPage extends React.Component {
  state = {
    manufacturers: []
  }

  static contextType = AppContext

  render() {
    const mfgs = [...new Set(this.context.models.map(model => model.manufacturer))]

    return (
        <div className="landing-page">
          <h1>Manufacturers</h1>
          <ul className="mfg-list">
            {mfgs.map(mfg => (
                <li key={mfg}>
                  <Link to={{
                    pathname: `/api/mfg/${mfg}`
                  }}>{mfg}</Link>
                </li>
            ))}
          </ul>
        </div>

    )
  }
}