import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import styles from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://my-http-bd4b7-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
      );
      const responseData = await response.json();

      const mappedMeals = Object.entries(responseData).map(([key, value]) => ({
        id: key,
        ...value,
      }));

      setMeals(mappedMeals);
    };

    fetchMeals();
  }, []);

  const mealsList = meals.map(meal => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
