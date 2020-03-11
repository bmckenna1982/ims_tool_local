import React from 'react'
import AppContext from './AppContext'
import { numberWithCommas } from './utils/number-utils'

export default class PriceList extends React.Component {
  state = {
    models: [],
    shopCart: [{
      server: {
        manufacturer: "",
        family: "",
        model: "",
        price: 0
      },
      qty: 0
    }]
  }

  static contextType = AppContext

  filterModels() {
    const { manufacturer, family } = this.props.match.params
    const category = (family !== "all-models")
      ? 'family'
      : 'manufacturer'
    // const family = this.props.match.params.family    
    const prices = this.context.models.reduce((filtered, item) => {
      if (item[category] === this.props.match.params[category]) {
        const newPrice = Number(item.price.replace(/[^0-9.-]+/g, "")).toFixed(2)
        let newObj = {
          manufacturer: item.manufacturer,
          family: item.family,
          model: item.model,
          price: newPrice,
          qty: item.qty
        }
        filtered.push(newObj)
      }

      return filtered
    }, [])
    prices.sort((a, b) => (a.model > b.model) ? 1 : -1)
    console.log('prices', prices)
    return prices
  }

  render() {
    return (
      <div className="price_list">
        <h1>
          Models in this {this.props.match.params.manufacturer} family
          </h1>
        <table className="price_list__table">
          <thead>
            <tr>
              <th>Model</th>
              <th>Price 1yr PP</th>
              <th>Qty</th>
            </tr>
          </thead>
          <tbody>
            {this.filterModels().map(item => (
              <tr key={item.model}>
                <td>{item.model}</td>
                <td>${numberWithCommas(item.price)}</td>
                <td>
                  <input
                    type="text"
                    id={`${item.model}_qty`}
                    name={`${item.model}_qty`}
                    value={item.qty}
                    onChange={e => this.context.handleChange(e.target.value, item)} />
                  <button className='Increment_minusOne' name={item.model}
                    onClick={e => this.context.handleChange(item.qty - 1, item)}> -
                    </button>
                  <button className='Increment_plusOne' name={item.model}
                    onClick={e => this.context.handleChange(item.qty + 1, item)}> +
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}