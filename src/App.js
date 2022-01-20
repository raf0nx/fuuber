import { useState } from "react";

import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [showModal, setShowModal] = useState(false);

  const openModalHandler = () => setShowModal(true);

  const closeModalHandler = () => setShowModal(false);

  return (
    <CartProvider>
      {showModal && <Cart onCloseModal={closeModalHandler} />}
      <Header onOpenModal={openModalHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
