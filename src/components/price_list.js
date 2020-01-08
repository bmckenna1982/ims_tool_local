import React from 'react'
import AppContext from './AppContext'
import './styles/price_list.scss'

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
    const family = this.props.match.params.family
    const prices = this.context.models.reduce((filtered, item) => {
      if (item.family === family) {
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
    return prices
  }

  numberWithCommas = (x) => (
      x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  )

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
              <th>Price</th>
              <th>Qty</th>
            </tr>
            </thead>
            <tbody>
            {this.filterModels().map(item => (
                <tr key={item.model}>
                  <td>{item.model}</td>
                  <td>${this.numberWithCommas(item.price)}</td>
                  <td>
                    <input
                        type="text"
                        id={`${item.model}_qty`}
                        name={`${item.model}_qty`}
                        value={item.qty}
                        onChange={e => this.context.handleChange(e.target.value, item)}/>
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