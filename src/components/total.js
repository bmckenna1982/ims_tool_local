import React from 'react';
import AppContext from './AppContext'
// import { CSVLink } from 'react-csv'
import { numberWithCommas } from './utils/number-utils'
import PrintButton from './print_pdf'

class Total extends React.Component {
  state = {
    csvData: []
  }

  static contextType = AppContext

  componentDidMount() {
    const csvData = [
      { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
      { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
      { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" }
    ];

    this.setState({
      csvData: csvData
    })
  }

  render() {
    let total = this.context.models.reduce(
      (sum, model) => (
        sum + (model.qty * (Number(model.price.replace(/[^0-9.-]+/g, ""))))), 0)
    return (
      <div className="summary__total">
        <div className="summary__total__label">
          Grand total for all machines ${numberWithCommas(total.toFixed(2))}
        </div>
        {/* <button className='bttn' onClick={e => this.context.printCart(e)}>
            Print
          </button> */}
        {/* <CSVLink data={this.context.models.filter(model => model.qty > 0)}
                   className='bttn' filename={`ims-tool-output.csv`}>
            Save CSV
          </CSVLink> */}
        <PrintButton id={"cartPrices"} label={"Print cart"} />
        <button className='bttn' id='emptyCartButton' onClick={e => this.context.emptyCart(e)}>
          Empty Cart
          </button>
      </div>
    )
  }
}

export default Total;