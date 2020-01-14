import React from 'react';
import AppContext from './AppContext'
import { numberWithCommas } from './utils/number-utils'

class Total extends React.Component {
  static contextType = AppContext

  render() {
    let total = this.context.models.reduce(
        (sum, model) => (
            sum + (model.qty * (Number(model.price.replace(/[^0-9.-]+/g, ""))))), 0)
    return (
        <div className="summary__total">
          <div className="summary__total__label">
            Grand total for all machines ${numberWithCommas(total.toFixed(2))}
          </div>
          <button className='emptyCart_button' onClick={e => this.context.emptyCart(e)}>
            Empty Cart
          </button>
        </div>
    )
  }
}

export default Total;