import React, { useState, useEffect } from 'react'
import styles from './modules/Manager.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

export default function Manager() {
    
    const { restaurantId } = useParams();

    const [history, setHistory] = useState(false);
    const [orderStatus, setOrderStatus] = useState('');
/*
    useEffect(() => {
        axios.get('/orders/' + restaurantId)
        .then(res => {

        })

    }, [])
   */ 
    const handleChange = (e) => {
        setOrderStatus(e.target.id)
    }

    const orderStatusfunc = () => {
        if (history === false)
            return <>
                <div className={ styles.orderBox }>
                    <label name="order">Order goes here</label>
                    <input className={ styles.radio } type="radio" id="received" name="order" onChange={ handleChange.bind(this) }></input>
                    <input className={ styles.radio } type="radio" id="cooking" name="order" onChange={ handleChange.bind(this) }></input>
                    <input className={ styles.radio } type="radio" id="delivery" name="order" onChange={ handleChange.bind(this) }></input>
                    <input className={ styles.radio } type="radio" id="done" name="order" onChange={ handleChange.bind(this) }></input>
                    { orderStatus }
                </div>
            </>
        else return "order history"
    }

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
                            { orderStatusfunc() }
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
