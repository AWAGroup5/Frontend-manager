import React, { Component } from 'react'
import styles from './modules/register.module.css'
import NavBar from './NavBar'
import Footer from './Footer'
import axios from 'axios';

export default class RegisterRestaurant extends Component {
  constructor(props) {
    super(props);

    // this.onChangeName = this.onChangeName.bind(this);
    // this.onChangeAddress = this.onChangeAddress.bind(this);
    // this.onChangePhone = this.onChangePhone.bind(this);
    // this.onChangeOperetingHours = this.onChangeOperetingHours.bind(this);
    // this.onChangeType = this.onChangeType.bind(this);
    // this.submitRegister = this.submitRegister.bind(this);

    this.state = {
        name: '',
        address: '',
        phone: '',
        operatingHours: '',
        type: '',
        price: '',
        image: null,
        nameE: false,
        addressE: false,
        phoneE: false,
        operatingHoursE: false,
        typeE: false,
        priceE: false,
        formatE: false,
        sizeE: false,
    };
}


onChangeName = (e) => {
    this.setState({ name: e.target.value })
}

onChangeAddress = (e) => {
    this.setState({ address: e.target.value })
}

onChangePhone = (e) => {
   this.setState({ phone: e.target.value })
}

onChangeOperetingHours = (e) => {
    this.setState({ operatingHours: e.target.value })
}

onChangeType = (e) => {
    this.setState({ type: e.target.value })
}


handleChange = e => {
    const { value } = e.target;

    this.setState({ price: value });
}

// submitRegister(e) {
//     e.preventDefault();
//     const restaurantObject = {

//         name: this.state.name,
//         address: this.state.address,
//         phone: this.state.phone,
//         operatingHours: this.state.operatingHours,
//         type: this.state.type,
//         price: this.state.price
//     };
//     console.log(restaurantObject);

    // axios.post('http://localhost:4000/users/create', userObject)
    //     .then((res) => {
    //         console.log(res.data)
    //     }).catch((error) => {
    //         console.log(error)
    // });

//     this.setState({ name: '', adress: '', phone: '',operatingHours: '', type: '', price: ''})  
    
// };

onSubmit = (event) => {
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

        if (this.state.address === ''){
            this.setState({ addressE: true })
        } else this.setState({ addressE: false })

        if (this.state.operatingHours === ''){
            this.setState({ operatingHoursE: true })
        } else this.setState({ operatingHoursE: false })

        if (this.state.type === ''){
            this.setState({ typeE: true })
        } else this.setState({ typeE: false }, () => this.sendToAPI())

}

sendToAPI() {
  if (this.state.nameE !== true && this.state.address !== true && this.state.phone !== true && 
    this.state.operatingHours !==true && this.state.type !== true &&  this.state.price !== true) {
        let restaurantObject = {
            name: this.state.name,
            description: this.state.address,
            phone: this.state.phone,
            operatingHours: this.state.operatingHours,
            type:this.state.type,
            price: this.state.price  
        }
        console.log(restaurantObject)

        axios.post('https://awaproject5db.herokuapp.com/restaurant/create', restaurantObject)
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
    var var2 = document.getElementById("address");
    var var3 = document.getElementById("phone");
    var var4 = document.getElementById("operatingHours");
    var var5 = document.getElementById("type");
    document.getElementById("price1").checked = false;
    document.getElementById("price2").checked = false;
    document.getElementById("price3").checked = false;
    var var6 = document.getElementById("image");

    var1.value = '';
    var2.value = '';
    var3.value = '';
    var4.value = '';
    var5.value = '';
    var6.value = null;

    this.setState({ name: '' });
    this.setState({ address: '' });
    this.setState({ phone: '' });
    this.setState({ operatingHours: '' });
    this.setState({ type: '' });
    this.setState({ price: '' });
    this.setState({ image: null });
}





    render() {
        return (
            <div>
                <NavBar />
                    <div className={ styles.container }>
                        <div className={ styles.registerContainer }>

                            <div className={ styles.row }>
                                <div className={ styles.cell }>
                                    Name:
                                </div>
                                <div className={ styles.cell }>
                                    <input 
                                    className={ styles.inputStyle} 
                                    type="text" 
                                    id="name" 
                                    placeholder="Name" 
                                    onChange={ this.onChangeName }>
                                    </input>
                                </div>
                            </div>

                            <div className={ styles.row }>
                                <div className={ styles.cell }>
                                    Address:
                                </div>
                                <div className={ styles.cell }>
                                    <input 
                                        className={ styles.inputStyle} 
                                        type="text" 
                                        id="address" 
                                        placeholder="Address" 
                                        onChange={ this.onChangeAddress }>
                                    </input>
                                </div>
                            </div>

                            <div className={ styles.row }>
                                <div className={ styles.cell }>
                                    Phone:
                                </div>
                                <div className={ styles.cell }>
                                    <input 
                                        className={ styles.inputStyle} 
                                        type="text" 
                                        id="phone" 
                                        placeholder="Phone" 
                                        onChange={ this.onChangePhone }>
                                    </input>
                                </div>
                            </div>

                            <div className= { styles.row }>
                                <div className={ styles.cell }>
                                    Type:
                                </div>
                                <div className={ styles.cell }>
                                    <input 
                                        className={ styles.inputStyle} 
                                        type="text" 
                                        id="type" 
                                        placeholder="Type" 
                                        onChange={ this.onChangeType }>
                                    </input>
                                </div>
                            </div>    

                            <div className={ styles.row }>
                                  <div className={ styles.cell }>
                                        Price:
                                  </div>
                                  <div className={ styles.cell }>
                                      <input 
                                            type="radio" 
                                            id="price1" 
                                            value="1" 
                                            onChange={ this.handleChange }>
                                      </input>
                                            <label htmlFor="priceLevel">$</label>
                                      <input 
                                            type="radio" 
                                            id="price2" 
                                            value="2" 
                                            onChange={ this.handleChange }>
                                      </input>
                                            <label htmlFor="priveLevel">$$</label>
                                      <input 
                                            type="radio" 
                                            id="price3" 
                                            value="3" 
                                            onChange={ this.handleChange }>
                                    </input>
                                            <label htmlFor="priceLevel">$$$</label>
                                  </div>
                            </div>

                            <div className={ styles.row }>
                                <div className={ styles.cell }>
                                    Operating hours:
                                </div>
                                <div className={ styles.cell }>
                                  
                                    <input 
                                        className={ styles.inputTimeStyle}  
                                        type="text" 
                                        id="operatingHours" 
                                        placeholder="O-C" 
                                        onChange={ this.onChangeOperetingHours }>
                                    </input> 
                                    {/* Close<input className={ styles.inputTimeStyle} type="text" name="closingTime" placeholder="Close" />  */}

                                </div>
                            </div>

                            <div className={ styles.row }>
                                  <div className={ styles.cell }>
                                        Image:
                                  </div>
                                <div className={ styles.cell }>
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg"
                                        id="image">
                                    </input>
                                </div>
                            </div>

                            <button 
                                className={ styles.btns} 
                                onClick={ this.onSubmit}>
                                    Register Restaurant
                            </button>
                                      
                            </div>
                            <img 
                                  src="BigFood.png" 
                                  alt="Food" 
                                  className={ styles.imageRestaurant }/>
                    </div>  
                <Footer />
            </div>
        )
    }
}
