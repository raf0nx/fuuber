import { useState } from "react";

import CartIcon from "../Cart/CartIcon";
import Cart from "../Cart/Cart";
import styles from "./HeaderCardButton.module.css";

const HeaderCardButton = props => {
  const [showModal, setShowModal] = useState(false);

  const openModalHandler = () => setShowModal(true);

  return (
    <>
      {showModal && <Cart />}
      <button className={styles.button} onClick={openModalHandler}>
        <span className={styles.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={styles.badge}>3</span>
      </button>
    </>
  );
};

export default HeaderCardButton;
