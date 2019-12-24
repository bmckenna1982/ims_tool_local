import React from 'react';
import AppContext from './utils/appContext'
import ModelStore from './utils/modelsData'
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

  render() {
    const contextValue = {};
    return (
        <AppContext.Provider value={ contextValue }>
          <div className="App">
            <header className="App-header">
              <img className="img-logo" src="https://imstool.s3.us-east-2.amazonaws.com/logo.png" alt="logo"></img>
            </header>
            <main>
              <div className="layout">

              </div>
            </main>
          </div>
        </AppContext.Provider>
    );
  }
}

export default App;
