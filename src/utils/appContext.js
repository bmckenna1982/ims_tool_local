import React from 'react'

const AppContext = React.createContext({
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
  }],
  handleChange: () => {
  },
  emptyCart: () => {
  }
})

export default AppContext