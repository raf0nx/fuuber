import styles from "./Header.module.css";
import mealsImage from "../../assets/meals.jpeg";
import HeaderCardButton from "./HeaderCardButton";

const Header = props => {
  return (
    <>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderCardButton onClick={props.onOpenModal} />
      </header>
      <div className={styles["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious meals!" />
      </div>
    </>
  );
};

export default Header;
