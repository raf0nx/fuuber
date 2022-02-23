import { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = props => {
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = id => cartCtx.removeItem(id);

  const cartItemAddHandler = item => cartCtx.addItem({ ...item, amount: 1 });

  const orderHandler = () => setIsCheckout(true);

  const submitOrderHandler = async userData => {
    fetch(
      'https://my-http-bd4b7-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
      {
        method: 'POST',
        body: JSON.stringify({ user: userData, orderedMeals: cartCtx.items }),
      }
    );
  };

  const cartItems = (
    <ul className={styles['cart-items']}>
      {cartCtx.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles['button--alt']} onClick={props.onCloseModal}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClose={props.onCloseModal}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onCancel={props.onCloseModal}
          onConfirm={submitOrderHandler}
        />
      )}
      {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;
