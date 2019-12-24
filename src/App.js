import React from 'react';
import {Route, withRouter, Switch} from 'react-router-dom'
// import utils
import AppContext from './utils/appContext'
import ModelStore from './utils/modelsData'
// import components
import LandingPage from './components/landingPage'
// import styles
import './App.scss';

class App extends React.Component {
  state = {
    models: [],
    cart: [{
      server: {
        manufacturer: '',
        family: '',
        model: '',
        price: 0,
        qty: 0
      },
      qty: 0
    }]
  };

  componentDidMount() {
    const modelsWithQty = ModelStore.models.map(model => ({ ...model, qty: '' }))
    this.setState({ models: modelsWithQty })
  }

  changeQty = (value, model) => {
    const val = value ? Number(value, 10) > 0 ? Number(value, 10) : '' : '';
    let modelArray = [...this.state.models];
    console.log(model);
    const objIndex = modelArray.findIndex((item => item.model === model.model));
    console.log(objIndex);
    modelArray[objIndex].qty = val;

    this.setState({
      models: modelArray
    })
  };

  emptyCart = (e) => {
    e.preventDefault();
    const modelArray = this.state.models.map(model => {
      model.qty = '';
      return model;
    });
    this.setState({
      models: modelArray
    })
  };

  render() {
    const contextValue = {
      models: this.state.models,
      cart: this.state.cart,
      handleChange: this.changeQty,
      emptyCart: this.emptyCart
    };
    return (
        <AppContext.Provider value={ contextValue }>
          <div className="App">
            <header className="App-header">
              <img className="img-logo" src="https://imstool.s3.us-east-2.amazonaws.com/logo.png" alt="logo"></img>
            </header>
            <main>
              <div className="layout">
                <Switch>
                  <Route exact path='/' component={LandingPage}/>
                </Switch>
              </div>
            </main>
          </div>
        </AppContext.Provider>
    );
  }
}

export default withRouter(App);
