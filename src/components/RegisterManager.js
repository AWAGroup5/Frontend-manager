import React, { Component } from 'react'
import styles from './modules/register.module.css'
import NavBar from './NavBar'
import Footer from './Footer'
import axios from 'axios';

export default class RegisterRestaurant extends Component {
    constructor(props) {
        super(props);

        // this.onChangeUsername = this.onChangeUsername.bind(this);
        // this.onChangePassword = this.onChangePassword.bind(this);
        // this.submitRegister = this.submitRegister.bind(this);

        this.state = {
            username: '',
            password: '',
            usernameE: false,
            passwordE: false
        };
    }


    onChangeUsername = (e) => {
        this.setState({ username: e.target.value })
    }

    onChangePassword = (e) => {
        this.setState({ password: e.target.value })
    }

    // submitRegister(e) {
    //     e.preventDefault();
    //     const userObject = {
    //         username: this.state.username,
    //         password: this.state.password,
            
    //     };
    //     console.log(userObject);

    // axios.post('http://localhost:4000/users/create', userObject)
    //     .then((res) => {
    //         console.log(res.data)
    //     }).catch((error) => {
    //         console.log(error)
    // });

    //   this.setState({ username: '', password: ''})  
    
    // };



    onSubmit = (e) => {

        if(this.state.username === '') {
            this.setState({ usernameE: true })
        } else this.setState ({ usernameE: false})

        if(this.state.password === '') {
            this.setState({ passwordE: true })
        }else this.setState({ passwordE: false}, () => this.sendToAPI());
    }

    sendToAPI() {
        if(this.state.usernameE !== true && this.state.passwordE !== true){
            let managerObject = {
                username: this.state.username,
                password: this.state.password

            }
            console.log(managerObject);

            axios.post('https://awaproject5db.herokuapp.com/manager/create', managerObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });

        }
        this.resetValues();
    }

    resetValues() {
        var var1 = document.getElementById("username");
        var var2 = document.getElementById("password");

        var1.value = '';
        var2.value = '';
        this.setState({ username: ''});
        this.setState({ password: ''});
    }



    render() {
        return (
            <div>
                <NavBar />
                    <div className={ styles.container }>
                        <img src="BigFood.png" alt="Food" className={ styles.imageUser }/>
                            <div className={ styles.registerContainer }>

                                <div className={styles.row}>
                                      <div className={ styles.cell }>
                                            Username:
                                      </div>
                                      <div className={ styles.cell }>
                                                <input 
                                                className={ styles.inputStyle} 
                                                type="text" 
                                                id="username"
                                                placeholder="Username" 
                                                onChange={ this.onChangeUsername }>
                                            </input>
                                      </div>
                                </div>
                                {
                                 this.state.usernameE ? <div className={ styles.error }>Insert name</div>: null
                                }
                                <div className={styles.row}>
                                    <div className={ styles.cell }>
                                          Password:
                                    </div>
                                    <div className={ styles.cell }>
                                            <input 
                                            className={ styles.inputStyle} 
                                            type="password" 
                                            id="password"
                                            placeholder="Password" 
                                            onChange={ this.onChangePassword }>
                                            </input>
                                    </div>
                                </div >
                                {
                                 this.state.passwordE ? <div className={ styles.error }>Insert password</div>: null
                                } 
                                <div>
                                     <button 
                                            className={ styles.btns } 
                                            onClick={ this.onSubmit}>
                                              Register manager
                                      </button>
                                </div>
                            </div>
                      </div>
                <Footer />
            </div>
              )
    }
}