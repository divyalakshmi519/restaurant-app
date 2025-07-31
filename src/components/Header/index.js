import {IoCartOutline} from 'react-icons/io5'
import Context from '../../context'

import './index.css'

const Header = () => (
  <Context.Consumer>
    {value => {
      const {cartItems} = value
      const totalCount = Object.values(cartItems).reduce(
        (sum, quantity) => sum + quantity,
        0,
      )

      return (
        <div className="header-container">
          <h1 className="heading">UNI Resto Cafe</h1>
          <div className="cart-items">
            <h2 className="cart-heading">My Orders</h2>
            <IoCartOutline size={35} />
            {totalCount > 0 && <span className="cart-count">{totalCount}</span>}
          </div>
        </div>
      )
    }}
  </Context.Consumer>
)
export default Header
