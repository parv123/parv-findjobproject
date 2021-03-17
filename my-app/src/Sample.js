import React, { useState, useEffect} from "react";
import './App.css';

function Sample(props) {
    const[loc,setLoc] = useState(props.value)
   useEffect(()=>{
       setLoc(props.value)
   });
    return(
    <h1>{loc}</h1>
    );
    }
    export default Sample;

    