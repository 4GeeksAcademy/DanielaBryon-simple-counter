import React, { useEffect, useState } from "react";
import SecondsCounter from "./counter";
//include images into your bundle

//create your first component
const Home = () => {

	const [timer, setTimer] = useState(0)
	const [active, setActive] = useState(false)
	const [isCountdown, setIsCountdown] = useState(false)
	const [alert, setAlert] = useState(0)


	 

	useEffect(()=>{ 
        let timerId;
		if (active) {
	        timerId = setTimeout(() => {
			    setTimer(value => value+1)       //recibe el valor que tiene el estado y le suma 1
		    },1000);
	    }
		else if (isCountdown) {
		    timerId = setTimeout(() => {
			    setTimer(value => Math.max (0, value -1));      //recibe el valor que tiene el estado y le resta 1
		    },1000);
		}

		return () => clearTimeout(timerId);
	}, [timer, active, isCountdown]);

	useEffect(() => {
		if (timer === alert && alert !== 0){
			 window.alert("Time's up");
		setAlert(0);
		}
	    
	},[timer, alert]);  
	    
	
	
	const startStop = () => setActive(value => !value)                  
	const resetTimer = () => setTimer(0)    
	const handleChange = e => setTimer(Math.max(0, Number(e.target.value)));       
	return (
		<main className="text-center">
			<section className="counter-holder">
			    <SecondsCounter number= {<span className="fa fa-clock"></span>} />
			    <SecondsCounter number= {Math.floor(timer/100000)%10} />
			    <SecondsCounter number= {Math.floor(timer/10000)%10} />
		        <SecondsCounter number= {Math.floor(timer/1000)%10} />
		        <SecondsCounter number= {Math.floor(timer/100)%10} />
		        <SecondsCounter number= {Math.floor(timer/10)%10} />
		        <SecondsCounter number= {Math.floor(timer%10)} />
			</section>
			<section className="container text-center my-5">
				<h2>Counter controller</h2>
				<div>
					<button 
					    disabled={active}
					    onClick={startStop} 
					    className ="mx-2 btn btn-success">Start</button>
					<button
					    disabled={!active} 
					    onClick={startStop} 
					    className ="mx-2 btn btn-secondary">Stop</button>
					<button 
					    onClick={resetTimer} 
					    className ="mx-2 btn btn-danger">Reset</button>

				</div>
			</section>
			<section className="container text-center">
				<h2>Countdown</h2>
				<form 
				    className="form-control border-0" 
				    onSubmit={e=>e.preventDefault()}>
				    <label
				        className="form-text">
					    Amount to start 
				        <input 
				            className="form-control" 
				            type="number" value={timer} 
				            onChange={handleChange} />         
                    </label>
				    <div>
				        <input
					        disabled ={isCountdown} 
					        className="m-1 btn btn-success" 
					        onClick={()=>setIsCountdown(true)} 
					        type="submit" 
					        value={"Start"} />
				        <input 
					        disabled={!isCountdown}
					        className="m-1 btn btn-secondary"
					        onClick={()=>setIsCountdown(false)} 
					        type="submit" 
					        value={"Stop"} />
                    </div>
				</form>
			</section>


			<section className="my-5 container text-center">
				<h2>Create Alert</h2>
				<form 
				    className="form-control border-0" 
				    onSubmit={e=>e.preventDefault()}>
				    <label
				        className="form-text">
					    Alert at  
				        <input 
				            className="form-control" 
				            type="number"  
				            onChange={e =>setAlert(Number(e.target.value))} />         
                    </label>
				    <div>
				        <input
					        className="m-1 btn btn-success" 
					        onClick={()=> window.alert("Alert created")} 
					        type="submit" 
					        value={"Create"} />
					</div>		
                </form>
			</section>
		</main> 

	);
};

export default Home;
