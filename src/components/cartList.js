import React from 'react';
import AppContext from './AppContext'
import { numberWithCommas } from './utils/number-utils'
import './styles/cartList.scss'

class CartList extends React.Component {
  static contextType = AppContext

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
            {modelsInCart.map(item => (
                <tr key={item.model}>
                  <td>{item.manufacturer} {item.family} {item.model}</td>
                  <td>${numberWithCommas(Number(item.price.replace(/[^0-9.-]+/g, "")).toFixed(2))}</td>
                  <td>{item.qty}</td>
                  <td>${numberWithCommas((Number(item.price.replace(/[^0-9.-]+/g, "") * item.qty).toFixed(2)))}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
    );
  };
}

export default CartList;