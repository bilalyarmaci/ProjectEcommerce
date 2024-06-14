import React, { useContext, useState, useEffect } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'
import axios from 'axios'

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
  const [promoCode, setPromoCode] = useState('');
  const [products, setProducts] = useState([]);
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/product');
      setProducts(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePromoSubmit = () => {
    if (promoCode === 'Team 16') {
      alert('Promo code applied. You get 50% discount!');
      setIsPromoApplied(true);
    } else {
      alert('Invalid promo code');
    }
  };

  const getDiscountedAmount = () => {
    let amount = getTotalCartAmount();
    if (promoCode === 'Team 16' && isPromoApplied) {
      amount /= 2;
    }
    return amount;
  };

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e._id] > 0) {
          return <div key={e._id}>
            <div className="cartitems-format cartitems-format-main">
              <img src={e.imageCover} alt="" className='carticon-product-icon' />
              <p>{e.title}</p>
              <p>${e.priceAfterDiscount}</p>
              <button className='cartitems-quantity'>{cartItems[e._id]}</button>
              <p>${e.priceAfterDiscount * cartItems[e._id]}</p>
              <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeFromCart(e._id) }} alt="" />
            </div>
            <hr />
          </div>
        }
        return null;
      })}
      {products.map((e) => {
        if (cartItems[e._id]) {
          return <div key={e._id}>
            <div className="cartitems-format cartitems-format-main">
              <img src={e.imageCover} alt="" className='carticon-product-icon' />
              <p>{e.title}</p>
              <p>${e.priceAfterDiscount}</p>
              <button className='cartitems-quantity'>{cartItems[e._id]}</button>
              <p>${e.priceAfterDiscount * cartItems[e._id]}</p>
              <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeFromCart(e._id) }} alt="" />
            </div>
            <hr />
          </div>
        }
        return null;
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            {isPromoApplied && promoCode === 'Team 16' && (
              <div className="cartitems-total-item">
                <p>Discount</p>
                <p>50%</p>
              </div>
            )}
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getDiscountedAmount()}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promobox">
          <input type="text" placeholder='promo code' value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
          <button onClick={handlePromoSubmit}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default CartItems
