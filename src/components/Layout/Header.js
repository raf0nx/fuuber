import styles from "./Header.module.css";
import mealsImage from "../../assets/meals.jpeg";

const Header = props => {
  return (
    <>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <button>Cart</button>
      </header>
      <div className={styles["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious meals!" />
      </div>
    </>
  );
};

export default Header;
