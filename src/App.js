import {Component} from 'react'

import Context from './context'
import Home from './components/Home'
import './App.css'

class App extends Component {
  state = {cartItems: {}}

  updateCart = (dishId, change) => {
    this.setState(prevState => {
      const currentCount = prevState.cartItems[dishId] || 0
      const newCount = Math.max(currentCount + change, 0)
      return {
        cartItems: {
          ...prevState.cartItems,
          [dishId]: newCount,
        },
      }
    })
  }

  render() {
    const {cartItems} = this.state

    return (
      <Context.Provider value={{cartItems, updateCart: this.updateCart}}>
        <Home />
      </Context.Provider>
    )
  }
}

export default App
