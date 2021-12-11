import React from 'react'
import styles from './modules/loading.module.css'

export default function Loading() {
    return (
        <div>
            <div className={ styles.blocker }></div>
            <div className={ styles.popup_inner }>
                <h1 className={ styles.header }> Loading... </h1>
                <div className={ styles.loader }>Loading...</div>
            </div>
        </div>
    )
}
