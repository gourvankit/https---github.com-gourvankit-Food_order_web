import { useContext,useEffect,useState } from 'react';

import CartIcon from '../Cart/Carticon';
import CartContext from '../../Store/Cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const[buttonIsHighlighted,setButtonIsHighlighted]= useState(false)
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  const buttonClasses=`${classes.button} ${buttonIsHighlighted ? classes.bump:''}`
  const {items}=cartCtx
  useEffect(()=>{
    if(items.length===0){
      return;
    }
    setButtonIsHighlighted(true)
    const timer=setTimeout(()=>{
      setButtonIsHighlighted(false)
    },300)
    return(()=>{
      clearTimeout(timer);

    })
  },[items])

  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;