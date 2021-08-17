import React, { useState } from 'react';
// Using an ES6 transpiler like Babel
import Slider from 'react-rangeslider'
 
// To include the default styles
import 'react-rangeslider/lib/index.css'


function Form({ onFilter, isReturn }) {
    const [originCity, setOrginCity] = useState('');
    const [destinationCity, setDestinationCity] = useState('');
    const [departDate, setDepartDate] = useState();
    const [returnDate, setReturnDate] = useState();
    const [passangers, setpassangers] = useState(1);
    const [price, setPrice] = useState(0)

    const[originCityError, setoriginCityError] = useState('');
    const[destinationCityError, setdestinationCityError] = useState('');
    const[departDateError, setdepartDateError] = useState('');
    const[returnDateError, setreturnDateError] = useState('');

    const formHandler = (e) => {
        e.preventDefault();

        if(!originCity){
            setoriginCityError('Please Add Origin City');
            return
        }else if(!destinationCity){
            setdestinationCityError('Destination City is Required');
            return
        }else if(!departDate){
            setdepartDateError('Please select date');
            return
        }

        const data = {
            originCity, 
            destinationCity,
            departDate, 
            returnDate, 
            passangers,
            price
        };
            onFilter(data);
            setOrginCity('');
            setDestinationCity('');
            setDepartDate('');
            setoriginCityError('');
            setdestinationCityError('');
            setdepartDateError('');
    }


    const handleOnChange = (value) => {
        setPrice(value);
      }
   
    return (
       
        <form action="" onSubmit={formHandler}>
            <div className="form-group">
                <label htmlFor="origincity">Origin City</label>
                <input
                    onChange = {(e) => setOrginCity(e.target.value) }
                    value = {originCity} 
                    type="text" 
                    placeholder="Enter Origin City" />
                    <span className="error">{originCityError}</span>
            </div>

            <div className="form-group">
                <label htmlFor="destinationcity">destination City</label>
                <input
                    onChange = {(e) => setDestinationCity(e.target.value) }
                    value = {destinationCity}  
                    type="text" 
                    placeholder="Enter Destination City" />
                    <span className="error">{destinationCityError}</span>
            </div>

            <div className="form-group">
                <label htmlFor="departure">departure date</label>
                <input 
                    onChange = {(e) => setDepartDate(e.target.value) }
                    value = {departDate}  
                    type="date"
                    placeholder="Enter Origin City" />
                    <span className="error">{departDateError}</span>
            </div>

            {   isReturn ?        
                    <div className="form-group">
                        <label htmlFor="returndate">return date</label>
                        <input
                            onChange = {(e) => setReturnDate(e.target.value)}
                            value={returnDate}
                            type="date"/>
                            <span className="error">{returnDateError}</span>
                    </div>: 
                null}


            <div className="form-group">
                <label htmlFor="passanger">Passanger</label>
                <input
                    onChange = {(e) => setpassangers(e.target.value) }
                    value = {passangers}  
                    type="number" 
                    placeholder="Enter Total Passanger"
                    min="1" />
            </div>

            <div className="form-group">
                <label htmlFor="passanger">Price</label>
                <Slider
                    min={500}
                    max={10000}
                    value={price}
                    orientation="horizontal"
                    onChange={handleOnChange}
                    
                />
            </div>

            <button className="submit__btn" type="submit" value="submit" >Search</button>
        </form>
    )
}

export default Form;

