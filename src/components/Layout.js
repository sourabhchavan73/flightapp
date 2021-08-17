import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import SingleFlight from './SingleFlight';
import ReturnFlight from './ReturnFlight';

function Layout({ onFilter }) {
    const [returnFlight, setReturnFlight] = useState(false);
    const { flights } = useContext(GlobalContext);
    const [ results, setResults] = useState(flights);
    const [ header, setHeader] = useState([]);

    const singleFlightHandler = (data) => {
        const singleFlights =  results.filter(result => !result.isReturn );
        const name = singleFlights.filter(result => result.price < data.price && result.originCity.toLowerCase() === data.originCity.toLowerCase() && result.destinationCity.toLowerCase() === data.destinationCity.toLowerCase() && Date.parse(result.departDate) === Date.parse(data.departDate))
        setResults(name);
        setHeader(name);
        console.log(data)
    }

    const returnFlightHandler = (data) => {
        const returnFlights = results.filter(result => result.isReturn);
        const returnFlightsList = returnFlights.filter(returnFlight => returnFlight.originCity.toLowerCase() === data.originCity.toLowerCase() && returnFlight.destinationCity.toLowerCase() === data.destinationCity.toLowerCase() && Date.parse(returnFlight.departDate) === Date.parse(data.departDate))
        setResults(returnFlightsList);
        setHeader(returnFlightsList);
        console.log(data)
    }

    const renderHeader = () =>{
        if(header.length > 0 && header[0].isReturn === true){
            return `${header[0].originCity} > ${header[0].destinationCity} > ${header[0].originCity}`
        }else if (header.length > 0){
            return `${header[0].originCity} > ${header[0].destinationCity}`
        }   
    }
    
    const rendorFlightsList = () => {
        return(
            results.map(result => (
                <div className="flight__details-row" key={result.id}>
                    <div className="row" >
                        <div className="col-xl-8">
                            <div>
                                <h4 className="flight__price">Rs. {result.price}</h4>
                            </div>

                            <div className="row flight__details-rowwrapper">
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 col-6"> 
                                    <small>AL - 202</small>
                                    <h5 className="flight__city">{result.originCity} to {result.destinationCity}</h5>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <p className="flight__time">Departure</p>
                                            <p className="flight__time">Arrival</p>
                                        </div>
                                        <div className="col-lg-4">
                                            <p className="flight__time"> {result.departTime}</p>
                                            <p className="flight__time">{result.arriveTime}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="col-lg-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 col-6">
                                    {result.isReturn ?                     
                                        <div className="return__details">
                                            <small>AL - 203</small>
                                            <h5 className="flight__city">{result.destinationCity} to {result.originCity}</h5>
                                            <div className="row">
                                                <div className="col-lg-5">
                                                    <p className="flight__time">Departure</p>
                                                    <p className="flight__time">Arrival</p>
                                                </div>
                                                <div className="col-lg-5">
                                                    <p className="flight__time"> {result.retdepartTime}</p>
                                                    <p className="flight__time">{result.retarriveTime}</p>
                                                </div>
                                            </div>
                                        </div> : 
                                    null}
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4">
                            <img src={result.image} alt="" />
                        </div>
                    </div>

                    <div className="d-flex justify-content-end">
                        <button className="book__flight-btn">Book this Flight</button>
                    </div>
                </div>

            ))
        )
    }
    
    const NoDataFound = () => {
        return(
            <div>
                <div>No Data Found</div>
                <div className="btn__link" onClick = {() => setResults(flights)}>Go Back to Dashboard</div>
            </div>
        )
    }


    return (
        <div className="container">
            <div className="row justify-content-between">
                <div className="col-xl-3 col-lg-4 col-md-5 col-sm-7 col-xs-12 col-12">
                    <div className="filter__card">
                        <div className="d-flex">
                            <button 
                                className="single__flight-btn" 
                                onClick = {()=> {
                                    setReturnFlight(false);
                                    setResults(flights)
                                }}>
                                    Single Flight
                            </button>
                            <button 
                                onClick = {() => {
                                    setReturnFlight(true);
                                    setResults(flights)
                                }} 
                                className="return__flight-btn">
                                    Return Flight
                            </button>
                        </div>
                        
                        <div className="flight__form-wrapper">
                            {returnFlight ? 
                                <ReturnFlight onFilter = {returnFlightHandler} /> : 
                                <SingleFlight onFilter = {singleFlightHandler} />
                            }
                        </div>
                    </div>
                </div>

                <div className="col-xl-9 col-lg-8 col-md-7 col-sm-7 col-xs-12 col-12">
                        <div className="flight__details-wrapper">
                            {header.length ? 
                                <div className="d-flex justify-content-between align-items-center">
                                    <h1>{header.length > 0 ? renderHeader() : null  }</h1>
                                    <small>Total Flights: {results.length}</small>
                                </div> : null
                            }
                            <div className="flight__details-card">
                                {  results.length > 0 ? rendorFlightsList() :
                                    <NoDataFound />
                                }
                            </div>
                        </div>  
                        
                </div>   
            </div>
        </div>
    )
}

export default Layout
