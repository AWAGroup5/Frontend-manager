import React, { Component } from 'react'
import styles from './modules/register.module.css'
import axios from 'axios';

export default class RegisterRestaurant extends Component {
  constructor(props) {
    super(props);

    this.state = {
        name: '',
        address: '',
        operatingHours: '',
        type: '',
        price: '',
        image: null,
        nameE: false,
        addressE: false,
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


onChangeOperetingHours = (e) => {
    this.setState({ operatingHours: e.target.value })
}

onChangeType = (e) => {
    this.setState({ type: e.target.value })
}


handleChange = e => {
    const { value } = e.target;

    this.setState({ price: value });
    this.setState({ priceE: false });
}


onSubmit = () => {
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

        if (this.state.price === ''){
            this.setState({ priceE: true })
        } else this.setState({ priceE: false })

        if (this.state.operatingHours === ''){
            this.setState({ operatingHoursE: true })
        } else this.setState({ operatingHoursE: false })

        if (this.state.type === ''){
            this.setState({ typeE: true })
        } else this.setState({ typeE: false }, () => this.sendToAPI())

}

sendToAPI() {
  if (this.state.nameE !== true && this.state.addressE !== true && 
    this.state.operatingHoursE !==true && this.state.typeE !== true &&  this.state.priceE !== true) {
        let restaurantObject = {
            idmanager: 5,                      //Get the manager id from jwt somehow
            name: this.state.name,
            description: this.state.address,
            openInfo: this.state.operatingHours,
            type:this.state.type,
            priceLevel: this.state.price,         //Pass image after database changes  
            //imageUrl: ""
        }
        console.log(restaurantObject)

        if (this.state.image !== null) {
            const formData = new FormData();
            formData.append('image', this.state.image);
            const config ={
                headers: { 'content-type': 'multipart/form-data'}
            }

            axios.post('https://awaproject5db.herokuapp.com/upload', formData, config)
            .then((res) => {
                console.log(res.data)
                //restaurantObject.imageUrl = res.data.url

                axios.post('https://awaproject5db.herokuapp.com/restaurant', restaurantObject)
                    .then((res) => {
                        console.log(res.data)
                    }).catch((error) => {
                        console.log(error)
                    });

            }).catch((error) => {
                console.log(error)
            });
        }
        
        else {
            axios.post('https://awaproject5db.herokuapp.com/restaurant', restaurantObject)
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
    var var3 = document.getElementById("operatingHours");
    var var4 = document.getElementById("type");
    document.getElementById("price1").checked = false;
    document.getElementById("price2").checked = false;
    document.getElementById("price3").checked = false;
    var var5 = document.getElementById("image");

    var1.value = '';
    var2.value = '';
    var3.value = '';
    var4.value = '';
    var5.value = null;
   
    this.setState({ name: '' });
    this.setState({ address: '' });
    this.setState({ operatingHours: '' });
    this.setState({ type: '' });
    this.setState({ price: '' });
    this.setState({ image: null });
}

    render() {
        return (
            <div>
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
                            {
                                this.state.nameE ? <div className={ styles.error }>Insert name</div>: null
                            }
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
                            {
                                this.state.addressE ? <div className={ styles.error }>Insert address</div>: null
                            }    
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
                            {
                                this.state.typeE ? <div className={ styles.error }>Insert type</div>: null
                            }
                            <div className={ styles.row }>
                                  <div className={ styles.cell }>
                                        Price level:
                                  </div>
                                  <div className={ styles.cell }>
                                    <input 
                                        name="price"
                                        type="radio" 
                                        id="price1" 
                                        value="1" 
                                        onChange={ this.handleChange }>
                                    </input>
                                        <label htmlFor="priceLevel">€</label>
                                    <input 
                                        name="price"
                                        type="radio" 
                                        id="price2" 
                                        value="2" 
                                        onChange={ this.handleChange }>
                                    </input>
                                        <label htmlFor="priveLevel">€€</label>
                                    <input 
                                        name="price"
                                        type="radio" 
                                        id="price3" 
                                        value="3" 
                                        onChange={ this.handleChange }>
                                    </input>
                                            <label htmlFor="priceLevel">€€€</label>
                                </div>
                                {
                                this.state.priceE ? <div className={ styles.error }>Insert price</div>: null
                                }
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
                                        placeholder="Open-C" 
                                        onChange={ this.onChangeOperetingHours }>
                                    </input> 
                                    {/* Close<input className={ styles.inputTimeStyle} type="text" name="closingTime" placeholder="Close" />  */}

                                </div>
                            </div>
                            {
                                this.state.operatingHoursE ? <div className={ styles.error }>Insert operating hours</div>: null
                            }
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
                                className={ styles.btns } 
                                onClick={ this.onSubmit }>
                                    Register Restaurant
                            </button>                                  
                            </div>
                            <img 
                                  src="/BigFood.png" 
                                  alt="Food" 
                                  className={ styles.imageRestaurant }/>
                    </div>  
            </div>
        )
    }
}
