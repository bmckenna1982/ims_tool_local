import React from 'react';
import CartList from './cartList'
import Total from './total'
import AppContext from '../components/AppContext'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowUp} from '@fortawesome/free-solid-svg-icons'

class Cart extends React.Component {
  static contextType = AppContext

  handleClick(event) {
    event.preventDefault()
    const element = document.getElementsByClassName('Breadcrumb_container')

    if (element.length > 0) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    const cartContents = this.context.models.find(model => model.qty > 0)
        ? <div className='Cart_contents'>
          <CartList shopCart={this.props.shopCart}/>
          <hr/>
          <Total shopCart={this.props.shopCart}/>
          <p className="Cart_disclaimer">These prices were good when published. They can be used in discussions with the
            customer. However, ensure the customer knows that a final price must be obtained from IBM. Final prices
            could be lower or higher.</p>
        </div>
        : <div className='Cart_contents'>
          <p>Your cart is empty</p>
        </div>

    return (
        <section className="Cart">
          <div className="cart-title">
            <h2>Your cart</h2>
            <span className="icon icon_arrow" onClick={this.handleClick}>
            <FontAwesomeIcon icon={faArrowUp}/>
            <p className="icon_arrow_text">Return to Top</p>
          </span>
          </div>
          {cartContents}
        </section>
    )
  }
}

export default Cart;