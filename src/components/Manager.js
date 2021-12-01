import React, { useState, useEffect } from 'react'
import styles from './modules/Manager.module.css'
import Order from './Order';
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

export default function Manager() {
    
    const { restaurantId } = useParams();

    const [history, setHistory] = useState(false);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('https://awaproject5db.herokuapp.com/order/restaurant/' + restaurantId)
        .then(res => {
            console.log(res.data)
            setOrders(res.data)
        }).catch(function(error) {
            console.log(error)
        })

    }, [])
                //Needs a check if status is done
    const orderHistory = orders.map((orders,index) => 
        {if (orders.status === "done") {
            return(
            <div key={index} className={ styles.orderbuttons }>
                <div>Order ID: { orders.idorder }</div>
                <div>Status: { orders.status }</div>
             </div> )
        }}
    ) 
    
    return (
        <div>
            <div className={ styles.buttonfield }>
                <div className={ styles.leftbuttonscontainer }>
                    <Link to="newproduct">
                        <button className={ styles.leftbuttons }>New product</button>
                    </Link>
                    

                </div> 
                <div className={ styles.textnbuttons }>
                    <div className={ styles.textField }>
                        <div className={ styles.listHeader}>
                            List of orders
                        </div>
                        <div className={ styles.content }>
                            { 
                                history ?
                                    orderHistory
                                : orders.map((item, index) => <Order key={index} {...item}/> )
                            }
                        </div>
                    </div>
                    <div className={ styles.orderbuttons }>
                        <button className={ styles.btns } onClick={() => setHistory(true)}>History</button>
                        <button className={ styles.btns } onClick={() => setHistory(false)}>Current</button>
                    </div>
                </div>
            </div>
            <div className={ styles.spacer }>
                All categories and products of the restaurant goes here. If products are clicked from here, it takes you to edit that product
            </div>
        </div>
    )
    
}
