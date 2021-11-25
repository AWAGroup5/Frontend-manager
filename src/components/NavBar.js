import React from 'react'
import styles from './modules/navBar.module.css'
import Userlogin from './Userlogin';
import { Link } from 'react-router-dom'
import {UserAuthContext} from '../Contexts'

class NavBar extends React.Component {   
    constructor(props) {
        super(props);
        this.state = {
            showLogin: false,
            
        };
    }

    static contextType = UserAuthContext;



    toggleLogin() {
        this.setState({ showLogin: !this.state.showLogin });
    }

    toggleLogout() {
        this.context.logout();
    }

    render() {
    return (
        <>
        <div className={ styles.container }>
            <div className={ styles.TopBar }>
                <Link to="/" className={styles.header }>
                    FoodApp Manager Page
                </Link>
                <div className={ styles.buttons }>
                    {
                        this.props.Managerview ?
                            <button className={ styles.leftbuttons } >
                               <Link to="/restaurant" className={ styles.leftbuttons}>
                                     Manager view
                                </Link>
                            </button>
                        : null
                    }
                    {
                        this.props.AddRestaurant ?
                            <button className={ styles.leftbuttons } >
                                <Link to="/restaurant/addrestaurant" className={ styles.leftbuttons}>
                                    Add restaurant
                                </Link>
                            </button>
                        : null
                    }
                    {
                        this.props.register ? 
                            <button className={ styles.leftbuttons } >
                                <Link to="/manReg" className={ styles.leftbuttons }>
                                    Register
                                </Link>
                            </button>
                        : null
                    }
                    {
                        this.props.login ?
                            <button className={ styles.leftbuttons } onClick= { this.toggleLogin.bind(this)}>
                                Login
                            </button>
                        : null
                    }
                    {
                        this.props.logout ?
                            <button className={ styles.leftbuttons } onClick= { this.toggleLogout.bind(this)}>
                                Logout
                            </button>
                        : null
                    }                 
                   
                    { this.state.showLogin ? <Userlogin closePopup={ this.toggleLogin.bind(this) } /> : null }
                </div>
            </div>
        </div>
        <div className={ styles.spacer }></div>
        </>
    )
    }
}

export default NavBar;