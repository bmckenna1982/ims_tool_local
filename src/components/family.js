import React from 'react'
import {Link} from 'react-router-dom'
import AppContext from './AppContext'
// import { API_BASE_URL } from '../config';

import './styles/family.scss'

export default class Family extends React.Component {
  state = {
    manufacturer: '',
    families: []
  }

  static contextType = AppContext

  componentDidMount() {
    const manufacturer = this.props.location.pathname.slice(9)
    const mfgList = this.context.models.filter(model => model.manufacturer === manufacturer)
    const families = [...new Set(mfgList.map(model => model.family))]

    this.setState({
      manufacturer: manufacturer,
      families: families
    })
  }

  // getData = async () => {
  //   const manufacturer = this.props.location.pathname.slice(9)
  //   const response = await fetch(`${API_BASE_URL}/mfg/${manufacturer}`)
  //   const json = await response.json()
  //   this.setState({
  //     manufacturer: manufacturer,
  //     families: json
  //   })
  // }

  render() {
    const path = this.props.location.pathname
    const mfg = this.state.manufacturer
    return (
        <div className="family">
          <div className="heading">
            <h1>
              {mfg}
            </h1>
          </div>
          <ul className="family-list">
            {this.state.families.map(fam => (
                <li key={fam}>
                  <Link to={{
                    pathname: `${path}/${fam}`,
                    params: {
                      manufacturer: {mfg},
                      family: {fam}
                    }
                  }}>{fam}</Link>
                </li>
            ))}
          </ul>
        </div>
    )
  }
}