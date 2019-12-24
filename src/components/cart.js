import React from 'react';
import './styles/cart.scss'
import CartList from './cartList'
import Total from './total'
import AppContext from '../components/AppContext'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowUp} from '@fortawesome/free-solid-svg-icons'

class Cart extends React.Component {
  static contextType = AppContext

  handleClick(event) {
    event.preventDefault()
    const element = document.getElementsByClassName('App-header')

    if (element.length > 0) {
      element[0].scrollIntoView()
    }
  }

  render() {
    // const cartContents = this.props.shopCart.length > 0
    //   ? <div className='Cart_contents'>
    //       <CartList shopCart={this.props.shopCart} />
    //         <hr />
    //       <Total shopCart={this.props.shopCart} />
    //     </div>
    //   : <div className='Cart_contents'>
    //       <span>You're cart is empty</span>
    //     </div>
    // console.log(this.context.models.filter(model => model.qty > 0))
    const cartContents = this.context.models.find(model => model.qty > 0)
        ? <div className='Cart_contents'>
          <CartList shopCart={this.props.shopCart}/>
          <hr/>
          <Total shopCart={this.props.shopCart}/>
        </div>
        : <div className='Cart_contents'>
          <span>Your cart is empty</span>
        </div>

    return (
        <section className="Cart">
          <div className="cart-title">
            <h2>Your cart</h2>
            <span className="icon" onClick={this.handleClick}>
            <FontAwesomeIcon icon={faArrowUp}/>
          </span>
          </div>
          {cartContents}
        </section>
    )
    // return (
    //   <section className="cart">
    //     <h2>Your cart</h2>
    //     <CartList shopCart={this.props.shopCart} USCurrencyFormat={this.props.USCurrencyFormat}/>
    //     <hr />
    //   </section>
    // )

  }
}

export default Cart;