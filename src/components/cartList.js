import React from 'react';
import AppContext from './AppContext'
import './styles/cartList.scss'

class CartList extends React.Component {
  static contextType = AppContext

  numberWithCommas = (x) => (
      x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  )


  render() {
    const modelsInCart = this.context.models.filter(model => model.qty > 0)
    return (
        <div>
          <table className="cart_table">
            <thead>
            <tr>
              <th>Machine</th>
              <th>Unit cost</th>
              <th>Qty</th>
              <th>Total Cost</th>
            </tr>
            </thead>
            <tbody>
            {/* {this.props.shopCart.map(item => ( */}
            {modelsInCart.map(item => (
                // <tr key={item.server.model}>
                <tr key={item.model}>
                  <td>{item.manufacturer} {item.family} {item.model}</td>
                  {/* <td>${this.numberWithCommas(item.price)}</td> */}
                  <td>${this.numberWithCommas(Number(item.price.replace(/[^0-9.-]+/g, "")).toFixed(2))}</td>
                  <td>{item.qty}</td>
                  {/* <td>${this.numberWithCommas((item.price*item.qty).toFixed(2))}</td> */}
                  <td>${this.numberWithCommas((Number(item.price.replace(/[^0-9.-]+/g, "") * item.qty).toFixed(2)))}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
    );

  };


}

export default CartList;