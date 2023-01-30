import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import { useContext, useEffect, useState}  from 'react';
import CartContext from '../../store/cart-context';


const HeaderCartButton = props => {

    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

    const cartCtx = useContext(CartContext);

    const { items } = cartCtx;

    //reduce() is used to transform an array into a single number
    //it takes two arguments
    //first is a function, second is a starting value
    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${btnIsHighlighted ?  classes.bump : ''}`;

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);

        //after 300ms, button highlight will go away
        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        //cleanup function
        return () => {
            clearTimeout(timer);
        };
    }, [items]);


    return (
    <button className={btnClasses} onClick={props.onClick}>
        <span>
            <CartIcon />
        </span>
        <span>
            Your Cart
        </span>
        <span className={classes.badge}>
            {numberOfCartItems}
        </span>
    </button> 
    );
};

export default HeaderCartButton;