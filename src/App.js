import React from 'react';
import AppContext from './utils/appContext'
import './App.scss';

class App extends React.Component {

  render() {
    const contextValue = {
    };
    return (
        <AppContext.Provider value={contextValue}>
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
