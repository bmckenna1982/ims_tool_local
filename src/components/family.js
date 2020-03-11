import React from 'react'
import { Link } from 'react-router-dom'
import AppContext from './AppContext'

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

  render() {
    const path = this.props.location.pathname
    const mfg = this.state.manufacturer
    return (
      <div className="family">
        <div className="heading">
          <h1>
            {mfg} Product Families
            </h1>
        </div>
        <ul className="family-list">
          {this.state.families.map(fam => (
            <li key={fam}>
              <Link to={{
                pathname: `${path}/${fam}`,
                params: {
                  manufacturer: { mfg },
                  family: { fam }
                }
              }}>{fam}</Link>
            </li>
          ))}
          <li key='all'>
            <Link to={{
              pathname: `${path}/all-models`,
              params: {
                manufacturer: { mfg }
              }
            }}>All {mfg} Models</Link>
          </li>
        </ul>
        <p>Searching by family is quicker. If you don't know the family, select "All Models" and scroll through an alphabetical list</p>
      </div>
    )
  }
}