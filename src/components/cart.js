import React from 'react';
import CartList from './cartList'
import Total from './total'
import AppContext from '../components/AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

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
        <div className='Cart_contents__prices' id='cartPrices'>
          <CartList shopCart={this.props.shopCart} />
          <hr />
          <Total shopCart={this.props.shopCart} />
          <p className="Cart_disclaimer">Prices are to be used for budget and planning discussions with the client and were good when published. A final IMS ISAT quote must be obtain from TechData R20. Final prices could be lower or higher.</p>
        </div>
        <div className='Cart_contents__disclaimer' id='cartDisclaimer'>
          <img className='disclaimer_img' crossOrigin='anonymous' id='disclaimer' alt='disclaimer' src='https://imstool-client.s3.us-east-2.amazonaws.com/disclaimer.png' />
        </div>
      </div>
      : <div className='Cart_contents'>
        <p>Your cart is empty</p>
      </div>

    return (
      <section className="Cart" id='cart'>
        <div className="cart-title">
          <h2>Your cart</h2>
          <span className="icon icon_arrow" onClick={this.handleClick}>
            <FontAwesomeIcon icon={faArrowUp} />
            <p className="icon_arrow_text">Return to Top</p>
          </span>
        </div>
        {cartContents}
      </section>
    )
  }
}

export default Cart;