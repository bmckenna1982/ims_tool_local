import React from 'react'
import { Route, withRouter, Switch, NavLink } from 'react-router-dom'
import Family from './components/family'
import LandingPage from './components/landingpage'
import ModelStore from './newModelsData'
import AppContext from './components/AppContext'
import './App.scss';
import PriceList from './components/price_list';
import Cart from './components/cart'
import Breadcrumbs from './components/breadcrumbs'
import Popup from './components/popup'

class App extends React.Component {
  state = {
    models: [],
    shopCart: [{
      server: {
        manufacturer: "",
        family: "",
        model: "",
        price: 0,
        qty: 0
      },
      qty: 0

    }],
    showPopup: false
  }

  componentDidMount() {
    const modelsWithQty = ModelStore.models.map(model => ({ ...model, qty: '' }))
    this.setState({ models: modelsWithQty })
  }

  changeQty = (value, model) => {
    const val = value
      ? Number(value, 10) > 0
        ? Number(value, 10)
        : ''
      : ''
    let modelArray = [...this.state.models]
    console.log(model)
    const objIndex = modelArray.findIndex((item => item.model === model.model))
    console.log(objIndex)
    modelArray[objIndex].qty = val

    this.setState({
      models: modelArray
    })
  }

  emptyCart = (e) => {
    e.preventDefault()
    const modelArray = this.state.models.map(model => {
      model.qty = ''
      return model
    })
    this.setState({
      models: modelArray
    })
  }

  numberWithCommas = (x) => (
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  )

  scrollToCart = (e) => {
    e.preventDefault()
    console.log('scroll')
    const element = document.getElementsByClassName('Cart')
    element[0].scrollIntoView()
  }
  
  togglePopup = () => {
    this.setState({showPopup: !this.state.showPopup})
  }

  render() {
    let printString = `View your cart then use the print features of your browser to capture your results. 
  If a printer isn't handy, just capture a screen shot.`
    const contextValue = {
      models: this.state.models,
      shopCart: this.state.shopCart,
      handleChange: this.changeQty,
      emptyCart: this.emptyCart
    }
    return (
      <AppContext.Provider
        value={contextValue}>
        <div className="App">
          <header className="App-header">
            <img className="img-logo" src="https://imstool.s3.us-east-2.amazonaws.com/logo.jpg" alt="logo"></img>
            <nav className='NavMenu'>
              <ul className='NavMenu_List'>
                <li>
                  <NavLink className='NavMenu_Link' to={'/'}>Home</NavLink>
                </li>
                <li onClick={this.scrollToCart}>Product Cart</li>
                <li onClick={this.emptyCart}>Clear Product Cart</li>
              </ul>
            </nav>
          </header>
          <main>
            <div className="layout">
              <Route exact path='/api/mfg/:manufacturer' component={Breadcrumbs} />
              <Route exact path='/api/mfg/:manufacturer/:family' component={Breadcrumbs} />
              <div className='list-container'>
                <Switch>
                  <Route exact path='/' component={LandingPage} />
                  <Route exact path='/api/mfg/:manufacturer' component={Family} />
                  <Route exact path='/api/mfg/:manufacturer/:family' component={PriceList} />
                </Switch>
                <Cart />
              </div>
            </div>
          </main>
        </div>
      </AppContext.Provider>
    );
  }
}

export default withRouter(App)
