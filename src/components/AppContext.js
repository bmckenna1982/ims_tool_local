import React from 'react'

const AppContext = React.createContext({
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
  handleChange: () => {
  },
  emptyCart: () => {
  },
  printCart: () => {
  }
})

export default AppContext