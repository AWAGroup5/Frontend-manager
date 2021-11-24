import React, { Component } from 'react'
import styles from './modules/addProduct.module.css'
import NavBar from './NavBar'
import Footer from './Footer';
import axios from 'axios';

export default class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddCategory: false,
            name: '',
            description: '',
            price: '',
            category: '',
            categories: [
                "Fast food",
                "Chinese",
                "Fine dining",
                "Wololoo"
            ],   //Clear categories when connecting to API, categories will be fetched from database
            image: null,
            nameE: false,
            descriptionE: false,
            priceE: false,
            formatE: false,
            sizeE: false,
            tempCat: ''
        };
    }

    toggleAddCategory() {
        this.setState({ showAddCategory: !this.state.showAddCategory });
    }
    onChangeAddCategory(e) {
        this.setState({ tempCat: e.target.value })
    }
    handleAddCategory = () => {
        if (this.state.tempCat !== '') {
            this.state.categories.push(this.state.tempCat);
            this.setState({ showAddCategory: !this.state.showAddCategory });
            this.setState({ tempCat: '' });
        }
    }
    onChangeName(e) {
        this.setState({ name: e.target.value })
    }
    onChangeDescription(e) {
        this.setState({ description: e.target.value })
    }
    onChangePrice(e) {
        this.setState({ price: e.target.value })
    }
    onChangeIMG = (e) => {
        this.setState({ image: e.target.files[0] })
    }
    onChangeCategory(e) {
        this.setState({ category: e.target.value })
    }

    onSubmit = (e) => {
        const errs = [] 
        const file = this.state.image;

        if (file !== undefined && file !== null) {
            const types = ['image/png', 'image/jpeg']

            if (types.every(type => file.type !== type)) {
                errs.push(`'${file.type}' is not a supported format`)
                return this.setState({ formatE: true })
            } else this.setState({ formatE: false })
        
            if (file.size > 150000) {
                errs.push(`'${file.name}' is too large, please pick a smaller file`)
                return this.setState({ sizeE: true })
            } else this.setState({ sizeE: false })
        }
        
        if (this.state.name === ''){
            this.setState({ nameE: true })
        } else this.setState({ nameE: false })

        if (this.state.description === ''){
            this.setState({ descriptionE: true })
        } else this.setState({ descriptionE: false })

        if (this.state.price === '' || this.state.price < 0){
            this.setState({ priceE: true })
        } else this.setState({ priceE: false }, () => this.sendToAPI())
        
    }

    sendToAPI() {
        if (this.state.nameE !== true && this.state.descriptionE !== true && this.state.priceE !== true) {
            let productObject = {
                name: this.state.name,
                description: this.state.description,
                price: this.state.price,
                category: this.state.category
            }
            console.log(productObject)

            axios.post('https://awaproject5db.herokuapp.com/products/create', productObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });

            if (this.state.image !== null) {
                const formData = new FormData();
                formData.append('image', this.state.image);
                const config ={
                    headers: { 'content-type': 'multipart/form-data'}
                }

                axios.post('https://awaproject5db.herokuapp.com/upload', formData, config)
                .then((res) => {
                    console.log(res.data)
                }).catch((error) => {
                    console.log(error)
                });
            }
            this.resetValues();
        }
    }

    resetValues() {
        var var1 = document.getElementById("name");
        var var2 = document.getElementById("description");
        var var3 = document.getElementById("price");
        var var4 = document.getElementById("single");

        var1.value = '';
        var2.value = '';
        var3.value = '';
        var4.value = null;
        this.setState({ name: '' });
        this.setState({ description: '' });
        this.setState({ price: '' });
        this.setState({ image: null });
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className={ styles.page }>
                    <div className={ styles.flexbox }>
                        <div className={ styles.container }>
                            <label 
                                htmlFor="name">
                                Product name:
                            </label>
                            <input 
                                className={ styles.inputField }
                                type="text" 
                                id="name" 
                                placeholder="Product name" 
                                onChange={ this.onChangeName.bind(this) }>
                            </input>
                        </div>
                        {
                            this.state.nameE ? <div className={ styles.error }>Insert name</div>: null
                        }
                        <div className={ styles.container }>
                            <label 
                                htmlFor="description">
                                Description:
                            </label>
                            <input 
                                className={ styles.inputField }
                                type="text" 
                                id="description" 
                                placeholder="Description" 
                                onChange={ this.onChangeDescription.bind(this) }>
                            </input>
                        </div>
                        {
                            this.state.descriptionE ? <div className={ styles.error }>Insert description</div>: null
                        }
                        <div className={ styles.container }>
                            <label 
                                htmlFor="price">
                                Price:
                            </label>
                            <input 
                                className={ styles.inputField }
                                type="number" 
                                id="price" 
                                placeholder="Price"
                                onChange={ this.onChangePrice.bind(this) }>
                            </input>
                        </div>
                        {
                            this.state.priceE === true ? <div className={ styles.error }>Input positive number</div>: null
                        }
                        <div className={ styles.container }>
                            <label 
                                htmlFor="single">
                                Image:
                            </label>
                            <input 
                                className={ styles.fileUpload }
                                type="file" 
                                accept="image/png, image/jpeg"
                                id="single"
                                onChange={ this.onChangeIMG.bind(this) }>
                            </input>
                        </div>
                        {
                            this.state.formatE ? <div className={ styles.error }>Wrong format</div>: null
                        }
                        {
                            this.state.sizeE ? <div className={ styles.error }>Too big file</div>: null
                        }
                        <div className={ styles.container }>
                            <label 
                                htmlFor="category">
                                Category:
                            </label>
                            <select 
                                className={ styles.selectField }
                                value={ this.state.category }
                                onChange={ this.onChangeCategory.bind(this) }>
                                    {this.state.categories.map((option) => (
                                        <option key={ option }>{ option }</option>
                                    ))}
                            </select>
                            <button className={ styles.addnewBtn } onClick={ this.toggleAddCategory.bind(this) }>Add new</button>
                        </div>
                    </div>
                    <div className={ styles.buttoncontainer }>
                        <button 
                            className={ styles.button }
                            onClick={ this.onSubmit.bind(this) }>
                            Submit
                        </button>
                    </div>
                </div>
                { this.state.showAddCategory ?
                    <div className={ styles.addPopup }>
                        <input 
                            type="text" 
                            placeholder="Add new Category"
                            onChange={ this.onChangeAddCategory.bind(this) }>
                        </input>
                        <button onClick={ this.handleAddCategory.bind(this) }>
                            Submit
                        </button>
                    </div>
                : null }
                <div className={ styles.spacer }></div>
                <Footer />
            </div>
        )
    }
}