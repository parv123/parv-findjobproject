import React, { useState,useEffect,useCallback} from "react";
//import logo from './logo.svg';
import loader from './loader.png'
import './App.css';

import Sample from './Sample';
//import Carousel from 'react-bootstrap/Carousel'
/*var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

*/


function App(props) {
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]);
  const [flag,setFlag] =useState(false);
  const [name, setName] = useState(props.name)
  const [disable,setDisable]= useState(false);
  const [indexes, setIndexes] = useState({
    previousIndex: 0,
    currentIndex: 0,
    nextIndex: 1
  });
 

  function submitDetails(e){
    if(location===""||description==="")
    {
      alert("Please fill all the details.")
    }
    else{
      setData([]);
      setDisable(false);
    setFlag(true);
    var queryURL = `http://localhost:3000/${location}/${description}`
    
    
    // make AJAX request using fetch API
    fetch(queryURL)
        .then(function (response) {
            //return response;
            return response.json();
        })
        .then(function (result) {
          for(let i=0; i<result.length;i++){
            Object.defineProperty(result[i],'showmore',{
              value:0,
              writable:true
            })
          }
          for(let i=0; i<result.length;i++){
            Object.defineProperty(result[i],'showcard',{
              value:0,
              writable:true
            })
          }
          if(result.length>0)
          result[0].showcard=1;
          setData(result); 
         setDisable(true);
          console.log(result);
          setFlag(false); 
        })
        .catch(function (error) {
            console.log(error);
        });
       // console.log(queryURL);
    }
       e.preventDefault();
      
    
  }
  
 
function renderItems(){
  const mapRows = data.map((item, index)=>(


    <ul key = {item.id}>
   { item.showcard === 1?<span className = "card active"  >

  <h2><span><b>Company Name : </b>{item.company}</span></h2>
  <br></br><img width ="200px"  src = {item.company_logo} className = "logo"></img>
  <br></br><span><a href={item.company_url}>{item.company_url}</a></span>
  
  <br></br><b >Created at : </b><span>{item.created_at}</span>
  <br></br><b>Job title : </b><span>{item.title}</span>
  <br></br><b>Job Location : </b><span>{item.location}</span>
  <br></br><b>Employment Type : </b> <span>{item.type}</span>

 {item.showmore === 1 ? <span><br></br><b>Job Description : </b><br></br> <span className="abcd" dangerouslySetInnerHTML={{__html: item.description}} ></span>
  <br></br><div id="apply"><b>How to Apply?</b>< span dangerouslySetInnerHTML={{__html: item.how_to_apply}} ></span></div>
  <br></br><button className="btn btn-primary" onClick ={ (e)=>{e.preventDefault(); item.showmore= 0;}}>Show Less</button></span> :<span></span>}
  <br></br>{item.showmore === 0 ? <span><button className="btn btn-danger" onClick ={ (e)=>{e.preventDefault(); item.showmore= 1;}}>Show More</button></span>:<span></span>}
  
  
  


</span>:<span></span>}
</ul>

  
  ));
  
  return (  mapRows);
}
function handlePrevious(e){
for(let i= data.length -1 ; i>=0 ; i=i-1){
  if(data[i].showcard===1){
    if(i=== 0){
      
      data[i].showcard = 0;
      data[data.length-1].showcard = 1;
      break;
    }
    else{
    data[i].showcard = 0;
    data[i-1].showcard = 1;

    break;
    }
  }
}
}
function handleNext(e){
  for(let i =0; i<data.length;i++){
    if(data[i].showcard===1){
      if(i===(data.length-1)){
        data[i].showcard = 0;
        data[0].showcard = 1;
        break;
      }
      else{
      
      data[i].showcard = 0;
      data[i+1].showcard = 1;
      break;
      }
    }
  }
}
function resetDetails(e){
  setLocation("");
  setDescription("");
  setDisable(false);
  setData([]);
}
  function handleChange(e) {
    setLocation(e.target.value);
  }
  function handleChangeDesc(e) {
    setDescription(e.target.value);
  }
  const handleCardTransition = useCallback(() => {
    // If we've reached the end, start again from the first card,
    // but carry previous value over
    if (indexes.currentIndex >= data.length - 1) {
      setIndexes({
        previousIndex: data.length - 1,
        currentIndex: 0,
        nextIndex: 1
      });
    } else {
      setIndexes(prevState => ({
        previousIndex: prevState.currentIndex,
        currentIndex: prevState.currentIndex + 1,
        nextIndex:
          prevState.currentIndex + 2 === data.length
            ? 0
            : prevState.currentIndex + 2
      }));
    }
  }, [indexes.currentIndex]);

  useEffect(() => {
    const transitionInterval = setInterval(() => {
      handleCardTransition();
    }, 1000);

    return () => clearInterval(transitionInterval);
  }, [handleCardTransition, indexes]);
  useEffect(()=>{
    setName(props.name)
});

  return (
   
    <div className="App">
     {disable=== false?<div>  <p id="hi">Hi {name}!</p>
      <h6 id="line">Enter the job location and description for the job below </h6>
      </div>:<span></span>}<form>
       
        <input placeholder="Enter city, state, zip code or country" className="textbox m-2" onChange={handleChange}  id = "loc" value={location}/>
        <input placeholder = "Enter title, expertise, e.g. development"  className="textbox m-2"  onChange={handleChangeDesc} value={description} id=  "desc"/>
        <br className="resp"></br>
        <button className="searchbtn"  onClick={submitDetails} btype = "submit" ><i className="srch fa fa-search"></i></button>
       {disable=== true? <button className="searchbtn"  onClick={resetDetails} btype = "submit" href="" >Reset</button>:<span></span>}
       

       
        </form>
       {flag === true ? <img className="loader" src={loader}></img>:<span></span>}
       <br></br>
  {disable=== true? <span className="xyz" >{data.length} jobs found.</span>:<span></span>}
  <br></br>
       {data.length!==0? <span><br></br><button className ='prevbtn fas' onClick={handlePrevious}>&#xf100;</button><button className ='nxtbtn fas' onClick={handleNext}>&#xf101;</button></span>:<span></span>}
      <br></br>
       <div className="container">
      <ul className="card-carousel">
        {renderItems()}
       
       
       </ul>
       
       </div>
       
      </div>
  );
}

export default App;
