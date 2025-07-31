import {Component} from 'react'
import Header from '../Header'
import Context from '../../context'
import './index.css'

class Home extends Component {
  state = {
    list: [],
    selectedCategoryId: '',
  }

  componentDidMount() {
    this.StartFetch()
  }

  StartFetch = async () => {
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    try {
      if (response.ok) {
        const rawList = data[0].table_menu_list

        const camelCaseList = rawList.map(item => ({
          menuCategory: item.menu_category,
          menuCategoryId: item.menu_category_id,
          menuCategoryImage: item.menu_category_image,
          categoryDishes: item.category_dishes.map(each => ({
            dishId: each.dish_id,
            dishName: each.dish_name,
            dishPrice: each.dish_price,
            dishImage: each.dish_image,
            dishCurrency: each.dish_currency,
            dishCalories: each.dish_calories,
            dishDescription: each.dish_description,
            dishAvailability: each.dish_Availability,
            dishType: each.dish_Type,
            nextUrl: each.nexturl,
            addonCat: each.addonCat,
          })),
        }))
        this.setState({
          list: camelCaseList,
          selectedCategoryId: camelCaseList[0].menuCategoryId,
        })
      }
    } catch (e) {
      console.log(`${e} Error`)
    }
  }

  renderMenuItems = () => {
    const {list, selectedCategoryId} = this.state
    const selectedCategory = list.find(
      each => each.menuCategoryId === selectedCategoryId,
    )
    if (!selectedCategory) return null

    return (
      <div key={selectedCategory.menuCategoryId} className="category-section">
        {selectedCategory.categoryDishes.map(dish => (
          <div key={dish.dishId} className="dish-container">
            <div className="dish-details">
              <div className="dish-type">
                <span className={dish.dishType === 1 ? 'non-veg' : 'veg'} />
              </div>
              <div className="dish-col-align">
                {dish.dishAvailability ? '' : ''}
                <h2 className="dish-heading">{dish.dishName}</h2>
                <div className="dishes-row-align">
                  <h4 className="dish-currency">{dish.dishCurrency}</h4>
                  <h4 className="dish-currency">{dish.dishPrice}</h4>
                </div>
                <div className="dishes-row-align">
                  <p className="dish-description">{dish.dishDescription}</p>
                </div>
                {dish.dishAvailability ? (
                  <Context.Consumer>
                    {value => {
                      const {cartItems, updateCart} = value
                      const count = cartItems[dish.dishId] || 0

                      return (
                        <div className="quantity-buttons">
                          <button
                            className="buttons"
                            type="button"
                            onClick={() => updateCart(dish.dishId, -1)}
                          >
                            -
                          </button>
                          <span>{count}</span>
                          <button
                            className="buttons"
                            type="button"
                            onClick={() => updateCart(dish.dishId, 1)}
                          >
                            +
                          </button>
                        </div>
                      )
                    }}
                  </Context.Consumer>
                ) : (
                  <p className="no-customization">Not Available</p>
                )}
                {dish.addonCat.length > 0 ? (
                  <p className="customization">Customizations available</p>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="dishes-row-align">
              <p className="dish-calories">{dish.dishCalories} calories</p>
              <img src={dish.dishImage} className="dish-image" alt="dish" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  render() {
    const {selectedCategoryId, list} = this.state

    return (
      <div className="container">
        <Header />
        <div className="tabs-container">
          {list.map(each => {
            const isActive = each.menuCategoryId === selectedCategoryId
            const tabClass = isActive ? 'tab-active' : 'tab-inactive'

            return (
              <button
                key={each.menuCategoryId}
                onClick={() => {
                  this.setState({selectedCategoryId: each.menuCategoryId})
                }}
                className={tabClass}
                type="button"
              >
                {each.menuCategory}
              </button>
            )
          })}
        </div>
        {this.renderMenuItems()}
      </div>
    )
  }
}

export default Home
