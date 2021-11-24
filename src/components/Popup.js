import React from 'react'
import styles from './modules/popup.module.css'
import { Link } from 'react-router-dom'

class Popup extends React.Component {
    render() {
      return (
        <>
        <div className={ styles.blocker } onClick={this.props.closePopup}></div>
            <div className={ styles.popup_inner }>
                <h1 className={ styles.header }> {this.props.text} </h1>
                <div className={ styles.buttons }>
                    <Link to="userReg" >
                        <button className={ styles.button }>User</button>
                    </Link>
                    <Link to="manReg">
                        <button className={ styles.button }>Manager</button>
                    </Link>
                </div>
            </div>
        </>
      );
    }
  }

  export default Popup;