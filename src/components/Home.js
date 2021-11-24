import React from 'react'
import axios from 'axios'
import NavBar from './NavBar'
import AllRestaurants from './AllRestaurants'
import Footer from './Footer'
import styles from './modules/Home.module.css'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            findString: ""
        }
    }

    componentDidMount() {
        axios.get('https://awaproject5db.herokuapp.com/restaurants')
            .then(res => {
                this.setState({ items: res.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    whenSearching = (event) => {
        this.setState({ findString: event.target.value });
    }

    render() {
        return (
            <><NavBar register login/>
            <div className={ styles.search }>
                <div className={ styles.searchText }>
                Search <div className={ styles.bar }><input 
                            className={ styles.innerbar }
                            type="text" 
                            placeholder="Search for restaurant"
                            onChange={ this.whenSearching } 
                            value={ this.state.findString }
                        /></div>
                </div>
                <img src="BigFood.png" alt="Food" className={ styles.image }/>
            </div>
            <AllRestaurants items={ this.state.items.filter((item) => item.name.toLowerCase().includes(this.state.findString.toLowerCase())) }/>
            <Footer />
            </>
        )
    }
}

export default Home;