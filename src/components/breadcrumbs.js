import React from 'react'
import {Link} from 'react-router-dom'
import AppContext from './AppContext'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import './styles/breadcrumbs.scss'

export default class Breadcrumbs extends React.Component {

  static contextType = AppContext

  handleClick(event) {
    event.preventDefault()
    const element = document.getElementsByClassName('Cart')
    element[0].scrollIntoView()
  }

  * intersperse(a, delim) {
    let first = true
    for (const x of a) {
      if (!first) yield delim
      first = false
      yield x
    }
  }

  render() {
    const crumbArray = [<Link key={'AllManufacturersPath'} to={{pathname: "/"}}>Manufacturers</Link>]
    if (this.props.match.params.family) {
      crumbArray.push(<Link key={'manufacturerPath'}
                            to={{pathname: `/api/mfg/${this.props.match.params.manufacturer}`}}>{this.props.match.params.manufacturer}</Link>)
      crumbArray.push(this.props.match.params.family)
    } else {
      crumbArray.push(this.props.match.params.manufacturer)
    }

    let crumbs = [...this.intersperse(crumbArray, ` > `)]

    return (
        <div className='Breadcrumb_container'>
          <div className='Breadcrumbs'>
            {" > "}
            {crumbs.map(crumb => (
                crumb
            ))}
          </div>
          <span className="icon icon_cart" onClick={this.handleClick}>
            <FontAwesomeIcon icon={faShoppingCart}/>
            <p className="icon_text">Scroll to Cart</p>            
          </span>

        </div>
    )
  }
}