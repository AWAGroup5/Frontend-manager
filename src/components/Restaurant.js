import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from './modules/Restaurant.module.css'

export default class Restaurant extends Component {
    render() {
        let str = "$";
        let path = this.props.name.toString();
        path = path.toLowerCase().replace(" ", "");
        return (
            <Link to={path}>
            <div className={ styles.container }>
                <img src="Food.jpg" alt="food" className={ styles.image }/>
                    <div className={ styles.headercontainer }>
                        <div className={ styles.header }>
                            { this.props.name }
                        </div>
                        <div className={ styles.greytext }>
                            { this.props.description }
                        </div>
                        <div className={ styles.greytext }>
                            { str.repeat(this.props.price) }
                        </div>
                    </div>
            </div>
            </Link>
        )
    }
}
