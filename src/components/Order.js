import axios from 'axios';
import React, {useState} from 'react'
import styles from './modules/order.module.css'

export default function Order(props) {          //Needs more styling

    const [orderStatus, setOrderStatus] = useState('');

    const handleChange = (e) => {
        setOrderStatus(e.target.id)
    }

    const onSubmit = () => {
        let updatedOrder = {
            idrestaurant: props.idrestaurant,
            idcustomer: props.idcustomer,
            status: orderStatus,
            cost: props.cost,
        }

        axios.put('https://awaproject5db.herokuapp.com/order/' + props.idorder, updatedOrder)
        .then(res => {
            console.log(res.data)
            window.location = '/restaurant/' + props.idrestaurant;
        }).catch(function(error) {
            console.log(error)
        })
    }

    if(props.status !== "done") {
        return (
            <>
            <div className={ styles.orderBox }>
                <label name={ props.idorder }>Order ID: { props.idorder }</label>
                <input className={ styles.radio } type="radio" id="received" name={ props.idorder } onChange={ handleChange.bind(this) }></input>Received
                <input className={ styles.radio } type="radio" id="cooking" name={ props.idorder } onChange={ handleChange.bind(this) }></input>Cooking
                <input className={ styles.radio } type="radio" id="delivery" name={ props.idorder } onChange={ handleChange.bind(this) }></input>Delivery
                <input className={ styles.radio } type="radio" id="delivered" name={ props.idorder } onChange={ handleChange.bind(this) }></input>Delivered
                <button onClick={ onSubmit }> Update </button>
            </div>
        </>
        )
    } else return null
}
