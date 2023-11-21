import React from "react";
import { useState } from "react";
import ReactDOM  from "react-dom/client";

const Bmi = () =>{
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [bmi, setBmi] = useState('');
    const [message, setMessage] = useState('');

    const Calculate = (e) =>{
        e.preventDefault();
        if(weight == 0 || height == 0)
        {
            alert("Please enter correct height or weight");
        }
        else{
            let bmi = (weight/(height*height))*10000;
            setBmi(bmi.toFixed(1));

        if(bmi < 18)
        {
            setMessage("You are underweight");
        }
        else if(bmi < 24)
        {
            setMessage("You are healthy");
        }
        else{
            setMessage("You are underweight");
        }
    }
    }
    let Reset = () => {
        setWeight(0);
        setHeight(0);
        setBmi('');
        setMessage('');
    };
    return (
        <div className="main-container">
            <div className="container">
                <h1>BMI Calculator</h1>
                <form className="bmi-form">
                    <div className="weight">
                        <label>Weight(in Kg) : </label>
                        <input type="text" className="weight-input" placeholder = "Mention your body weight" value = {weight} onChange={(e)=>setWeight(e.target.value)}></input>
                    </div>
                    <div>
                        <label>Height(in cm) : </label>
                        <input type="text" className="height-input" placeholder = "Mention your height" value = {height} onChange={(e)=>setHeight(e.target.value)}></input>
                    </div>
                    <div>
                        <button onClick={Calculate} className="bmi-calculation">Calculate BMI</button>
                        <button onClick={Reset} className="reset">Reset</button>
                    </div>
                    <div className="message">
                        <h3>Your current BMI is : {bmi}</h3>
                        <p>{message}</p>
                    </div>
                    
                </form>
                
            </div>
        </div>
    )
}

export default Bmi;