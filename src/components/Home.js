import React, {useState, useEffect} from 'react'
import axios from 'axios'
import AllRestaurants from './AllRestaurants'
import styles from './modules/Home.module.css'
import jwt from "jsonwebtoken";

function Home() {

    const [items, setItems] = useState([]);
    const [findString, setFindString] = useState('');

    const decodedJwt = jwt.decode(window.localStorage.getItem('appAuthData'));
    let idmanager = null;
    if (decodedJwt != null) {
        idmanager = decodedJwt.user.id
    } else {
        idmanager = null
    }

    useEffect(() => {
        console.log(idmanager)
        if (idmanager != null) {
        
            axios.get('https://awaproject5db.herokuapp.com/restaurant/' + idmanager)
                .then(res => {
                    console.log(res.data)
                    if (res.data.errno) {
                        console.log("No restaurants found")
                    }
                    else if (res.data == null) {
                        console.log("database error")
                    }
                    else { 
                        setItems(res.data);
                        console.log(items) 
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const whenSearching = (event) => {
        setFindString(event.target.value);
    }

    return (
        <>
        <div className={ styles.search }>
            <div className={ styles.searchText }>
            Search <div className={ styles.bar }><input 
                        className={ styles.innerbar }
                        type="text" 
                        placeholder="Search for restaurant"
                        onChange={ whenSearching } 
                        value={ findString }
                    /></div>
            </div>
            <img src="BigFood.png" alt="Food" className={ styles.image }/>
        </div>
        <AllRestaurants items={ items.filter((item) => item.name.toLowerCase().includes(findString.toLowerCase())) }/>
        </>
    )
}

export default Home;