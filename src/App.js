import React, { Component } from 'react';
import './App.css';

const required = fieldValue => fieldValue ? undefined : "Please enter a value";
const lessThanValue = value => fieldValue =>
  fieldValue < value ? undefined : `Value must be less than ${value}`;

const greaterThanField = (fieldName) => (fieldValue,state) =>
  fieldValue > state[fieldName] ? undefined : `Value must be less that ${fieldName}`;


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      form :{
        price:100,
        quantity:2,
        totalPrice:200
      },
      validations:{
        quantity: [required,lessThanValue(100)],
        totalPrice:[greaterThanField("price")]
      },
      error:{}
    }
  }

  validateField = (fieldValue, fieldName) =>{
    let errorMessage;
    this.state.validations[fieldName].forEach( (validation)=>{
      errorMessage = validation(fieldValue,this.state);
      if(errorMessage)return;
    });
    this.setState({
      error:{
        ...this.state.error,
        [fieldName]:errorMessage
      }
    })
  }

  handleChange(e, fieldName){
    let fieldValue = Number(e.target.value);
    if(this.state.validations[fieldName]){
      this.validateField(fieldValue, fieldName);
    }
    this.setState({
      form: {
        ...this.state.form,
        [fieldName]: fieldValue
      }
    })
  }
  render() {
    return (
      <div className="App">
        <form>
        <div className="input-field">
          <label htmlFor="Price">Price</label>
          <input type="number" name="Price" value={this.state.price}
            onChange={(e)=> this.handleChange(e,"price")}/>
            <span className="error-message">{this.state.error.price}</span>
        </div>
        <div className="input-field">
          <label htmlFor="Quantity">Quantity</label>
          <input type="number" name="Quantity" value={this.state.quantity}
            onChange={(e)=> this.handleChange(e,"quantity")}/>
            <span className="error-message">{this.state.error.quantity}</span>
        </div>
        <div className="input-field">
            <label htmlFor="Total Price">Total Price</label>
            <input type="number" name="Total Price" value={this.state.totalPrice}
            onChange={(e)=> this.handleChange(e,"totalPrice")}/>
            <span className="error-message">{this.state.error.totalPrice}</span>
        </div>
        </form>
      </div>
    );
  }
}

export default App;
