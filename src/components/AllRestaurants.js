import React from 'react';
import styles from './modules/Home.module.css';
import Restaurant from './Restaurant';

export default function AllItems(props) {

  return (
    <div>
      <div className={ styles.restaurantContainer }>
      {
        props.items.map((item, index) => <Restaurant key={index} {...item} />)
      }
      </div>
    </div>
  )
}