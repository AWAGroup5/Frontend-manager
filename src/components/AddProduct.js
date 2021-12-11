import React, { useState, useEffect } from 'react'
import styles from './modules/addProduct.module.css'
import axios from 'axios';
import Loading from './Loading';
import { useParams } from 'react-router-dom'

function AddProduct() {             //Add imageUrl field to product table in database

    const { restaurantId } = useParams();

    const [showAddCategory, setShowAddCategory] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState(null);
    const [nameE, setNameE] = useState(false);
    const [descriptionE, setDescriptionE] = useState(false);
    const [priceE, setPriceE] = useState(false);
    const [formatE, setFormatE] = useState(false);
    const [sizeE, setSizeE] = useState(false);
    const [tempCat, setTempCat] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        axios.get('https://awaproject5db.herokuapp.com/category/' + restaurantId)
            .then(res => {
                setCategories(res.data);
                setCategory(res.data[0].idcategory);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [restaurantId, showAddCategory])

    const toggleAddCategory = () => {
        setShowAddCategory(!showAddCategory);
    }
    const onChangeAddCategory = (e) => {
        setTempCat(e.target.value)
    }

    const handleAddCategory = () => {
        if (tempCat !== '') {
            const temp = { 
                idrestaurant: restaurantId,
                name: tempCat 
            }
            setIsLoading(true);
            axios.post('https://awaproject5db.herokuapp.com/category', temp)
                .then(res => {
                    console.log(res)
                    setIsLoading(false);
                    toggleAddCategory();
                })
                
                .catch(function (error) {
                    setIsLoading(false);
                    console.log(error);
                })
        }
    }
    const onChangeName = (e) => {
        setName(e.target.value)
    }
    const onChangeDescription = (e) => {
        setDescription(e.target.value)
    }
    const onChangePrice = (e) => {
        setPrice(e.target.value)
    }
    const onChangeIMG = (e) => {
        setImage(e.target.files[0])
    }
    const onChangeCategory = (e) => {
        setCategory(e.target.value)
    }

    const onSubmit = (e) => {
        const file = image;

        if (file !== undefined && file !== null) {
            const types = ['image/png', 'image/jpeg']

            if (types.every(type => file.type !== type)) {
                return setFormatE(true)
            } else setFormatE(false)
        
            if (file.size > 1500000) {
                return setSizeE(true)
            } else setSizeE(false)
        }
        
        if (name === ''){
            setNameE(true)
        } else setNameE(false)

        if (description === ''){
            setDescriptionE(true)
        } else setDescriptionE(false)

        if (price === '' || price < 0){
            setPriceE(true)
        } else setPriceE(false , sendToAPI())
        
    }

    const sendToAPI = () => {
        if (nameE !== true && descriptionE !== true && priceE !== true) {
            let productObject = {
                idcategory: category,
                name: name,
                description: description,
                price: price,
                imageUrl: ''
            }
            //console.log(productObject)

            if (image !== null) {
                const formData = new FormData();
                formData.append('image', image);
                const config ={
                    headers: { 'content-type': 'multipart/form-data'}
                }
                
                setIsLoading(true);
                axios.post('https://awaproject5db.herokuapp.com/upload', formData, config)
                .then((res) => {
                    productObject.imageUrl = res.data

                    axios.post('https://awaproject5db.herokuapp.com/product', productObject)
                        .then((res) => {
                            setIsLoading(false);
                            console.log(res.data)
                            resetValues();
                        }).catch((error) => {
                            setIsLoading(false);
                            console.log(error)
                            resetValues();
                        });

                    var var4 = document.getElementById("single");
                    setImage(null);
                    var4.value = null;
                }).catch((error) => {
                    setIsLoading(false);
                    console.log("image upload error")
                    console.log(error)
                });
            } 
            else {
                console.log("Toinen yritys")
                setIsLoading(true);
                axios.post('https://awaproject5db.herokuapp.com/product', productObject)
                    .then((res) => {
                        setIsLoading(false);
                        console.log("Product added with no picture")
                        resetValues();
                    }).catch((error) => {
                        setIsLoading(false);
                        console.log(error)
                        resetValues();
                    });
            }
            
        }
    }

    const resetValues = () => {
        var var1 = document.getElementById("name");
        var var2 = document.getElementById("description");
        var var3 = document.getElementById("price");
        
        var1.value = '';
        var2.value = '';
        var3.value = '';
        

        setName('');
        setDescription('');
        setPrice('');
    }

    return (
        <div>
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
                            onChange={ onChangeName.bind(this) }>
                        </input>
                    </div>
                    {
                        nameE ? <div className={ styles.error }>Insert name</div>: null
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
                            onChange={ onChangeDescription.bind(this) }>
                        </input>
                    </div>
                    {
                        descriptionE ? <div className={ styles.error }>Insert description</div>: null
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
                            onChange={ onChangePrice.bind(this) }>
                        </input>
                    </div>
                    {
                        priceE === true ? <div className={ styles.error }>Input positive number</div>: null
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
                            onChange={ onChangeIMG.bind(this) }>
                        </input>
                    </div>
                    {
                        formatE ? <div className={ styles.error }>Wrong format</div>: null
                    }
                    {
                        sizeE ? <div className={ styles.error }>Too big file</div>: null
                    }
                    <div className={ styles.container }>
                        <label 
                            htmlFor="category">
                            Category:
                        </label>
                        <select 
                            name="category"
                            className={ styles.selectField }
                            id="select"
                            onChange={ onChangeCategory.bind(this) }>
                                {categories.map((option) => (
                                    <option key={ option.idcategory } value={option.idcategory} >{ option.name }</option>
                                ))}
                        </select>
                        <button className={ styles.addnewBtn } onClick={ toggleAddCategory.bind(this) }>Add new</button>
                    </div>
                </div>
                <div className={ styles.buttoncontainer }>
                    <button 
                        className={ styles.button }
                        onClick={ onSubmit.bind(this) }>
                        Submit
                    </button>
                </div>
            </div>
            { showAddCategory ?
                <div className={ styles.addPopup }>
                    <input 
                        type="text" 
                        placeholder="Add new Category"
                        onChange={ onChangeAddCategory.bind(this) }>
                    </input>
                    <button onClick={ handleAddCategory.bind(this) }>
                        Submit
                    </button>
                </div>
            : null }
            <div className={ styles.spacer }></div>
            {
                isLoading ? <Loading /> : null
            }
        </div>
    )
}

export default AddProduct;