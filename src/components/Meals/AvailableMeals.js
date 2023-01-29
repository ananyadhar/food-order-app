import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Chicken Biryani',
    description: 'This is a delectable dish prepared out of rice, chicken, and curry!',
    price: 350,
  },
  {
    id: 'm2',
    name: 'Samosa',
    description: 'A fried Indian delicacy with a savory filling, including ingredients such as spiced potatoes, onions, and peas.',
    price: 15,
  },
  {
    id: 'm3',
    name: 'Gulab Jamun',
    description: 'It is a sweet confectionary or dessert, originating in the Indian subcontinent.',
    price: 25,
  },
  {
    id: 'm4',
    name: 'Pav Bhaji',
    description: 'Pav bhaji is a fast food dish from India consisting of a thick vegetable curry (bhaji) served with a soft bread roll (pav).',
    price: 120,
  },
];

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
      <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;