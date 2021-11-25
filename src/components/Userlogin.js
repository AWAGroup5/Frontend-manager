import React, { useState, useContext } from 'react'
import styles from './modules/userlogin.module.css'
import axios from 'axios';
import {UserAuthContext} from '../Contexts'

export default function Userlogin(props) {
    
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ passE, setPassE ] = useState(false);
    const [ userE, setUserE ] = useState(false);
    const [ error, setError ] = useState(false);
    
    const UserAuthContextValue = useContext(UserAuthContext);

    const onChangeUsername = (e) => {
        setUsername(e.target.value)
        setUserE(false)
        setError(false)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
        setPassE(false)
        setError(false)
    }

    const submitLogin = async (evt) => {
        evt.preventDefault();

        if (username === ''){
            setUserE(true)
        } else setUserE(false)

        if (password === ''){
            setPassE(true)
        } else setPassE(false)

        if (username !== '' && password !== '') {
            
            console.log("Sending request");
            console.log(username)
            console.log(password)

            try {
                const result = await axios.post('https://awaproject5db.herokuapp.com/login/manager', null, {
                    auth: {
                        username: username,
                        password: password
                    }
                })
                console.log(result);
                setTimeout(() => {
                    UserAuthContextValue.login(result.data.jwt);
                    setUsername('')
                    setPassword('')
                    props.closePopup();
                }, 1500);
            } catch (error) {
                console.error(error.message);
                setTimeout(() => {
                    setError(true)
                    setUsername('')
                    setPassword('')
                }, 1000);
            }  
        }
    };

    
    return (
        <>
        <div className={ styles.blocker } onClick={props.closePopup}></div>
        <div className={ styles.popup }>
            <form onSubmit={submitLogin}>
            <div className={ styles.container}>
                <label 
                    htmlFor="username" 
                    className={ styles.text }>
                    Username:
                </label>
                <input 
                    type="text" 
                    name="username" 
                    value= {username}
                    placeholder={ userE ? "Enter username!" : "Username" }
                    style={{ color: userE ? 'red' : ''}}
                    onChange={ e => onChangeUsername(e) }>
                </input>
            </div>
            <div className={ styles.container}>
                <label 
                    htmlFor="password" 
                    className={ styles.text }>
                    Password:
                </label>
                <input 
                    type="password" 
                    name="password" 
                    value= {password}
                    placeholder={ passE ? "Enter password!" : "Password" }
                    style={{ color: passE ? 'red' : ''}}
                    onChange={e => onChangePassword(e) }>
                </input>
            </div>
            <div className={ styles.buttoncontainer }>
                <input type="submit" value="Login" className={ styles.button }/>
                {
                    error ? <div style={{ color: 'red' }}>Incorrect credentials</div> : null
                }
            </div>
            </form>
        </div>
        </>
    )
    
}