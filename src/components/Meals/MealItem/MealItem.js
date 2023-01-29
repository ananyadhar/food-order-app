import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = props => {
    //first Rs. is for rupees and 2nd dollar is for dynamic price coming in
    //2 is 2 decimal places
    const price = `Rs. ${props.price.toFixed(2)}`;

    return (
      <li className={classes.meal}>
        <div>
          <h3>{props.name}</h3>
          <div className={classes.description}>{props.description}</div>
          <div className={classes.price}>{price}</div>
        </div>
        <div>
            <MealItemForm />
        </div>
      </li>
    );
};

export default MealItem;
