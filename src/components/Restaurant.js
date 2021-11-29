import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from './modules/Restaurant.module.css'

export default class Restaurant extends Component {
    render() {
        let str = "$";
        return (
            <Link to={{ pathname: '/restaurant/' + this.props.idrestaurant }}>
            <div className={ styles.container }>
                <img src="Food.jpg" alt="food" className={ styles.image }/>
                    <div className={ styles.headercontainer }>
                        <div className={ styles.header }>
                            { this.props.name }
                        </div>
                        <div className={ styles.greytext }>
                            { this.props.type }
                        </div>
                        <div className={ styles.greytext }>
                            { str.repeat(this.props.priceLevel) }
                        </div>
                    </div>
            </div>
            </Link>
        )
    }
}
