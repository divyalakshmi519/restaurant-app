import React from 'react'

const CartContext = React.createContext({
  cartItems: {},
  incrementItem: () => {},
  decrementItem: () => {},
})

export default CartContext
