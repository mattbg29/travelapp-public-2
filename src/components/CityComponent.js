import React, { useState } from "react";

var multNow = 0
var onOff = 0

const {SAFETY} = require('../data/safetyIndex.js');
var targetCity = []

const City = () => {
    const [month, setMonth] = useState("");
    const [temp, setTemp] = useState("");
    const [safety, setSafety] = useState("");
    const [corF, setCorF] = useState("C");
    const [widthNow, setWidthNow] = useState(window.innerWidth < 500 ? 0 : 1);  

    React.useEffect(() => {
        function handleResize() {
          setWidthNow(window.innerWidth < 500 ? 0 : 1)    
      }
        window.addEventListener('resize', handleResize)
        return () => {
          window.removeEventListener('resize', handleResize)
        }
      })
    

    if (corF === 'C') {
        multNow = 0
    } else {
        multNow = 1
    }
    
    if (month && temp && safety && corF) {
        let monthNow = month.toLowerCase()
        targetCity = [...SAFETY].filter((d) => d[monthNow]*Math.pow(9/5,multNow)+32*multNow - (5 + 5*multNow) <= [temp] && d[monthNow]*Math.pow(9/5,multNow)+32*multNow + (5 + 5*multNow) >= [temp]).filter((d) => d.ranking >= [safety]).map((d) => <div className='col-1' style={{display: 'flex', flexDirection:'row', width: 150}}>{d.city}</div>)
        onOff = 1
    }

    return (
        <div style={{textAlign: 'center'}}>
            <div style={{marginTop: 25, marginBottom: 25}}>
                Now let's identify the best place to visit
                <br/>
                Please enter below your travel month (first 3 letters), ideal temperature and minimum travel safety index
            </div>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems: 'center'}}>
                <input type="radio" style={{alignItems:'center'}} value="C" name="CorF" defaultChecked onChange={(e) => setCorF(e.currentTarget.value)}/>C<br/>            
                <input type="radio" style={{marginLeft: 10}} value="F" name="CorF" onChange={(e) => setCorF(e.currentTarget.value)}/>F
            </div>
            <div style={{justifyContent: 'center'}}>
                <input placeholder='travel month' id='travel-month' onChange={(e) => setMonth(e.target.value)}/>
                <input placeholder='ideal temp' id='ideal-temp' onChange={(e) => setTemp(e.target.value)}/>
                <input placeholder='safety weighting (0-90)' onChange={(e) => setSafety(e.target.value)}/>
            </div>
            {onOff === 1 && <div style={{marginTop: 20, marginBottom: 20}}>Here are the cities you should visit!</div>}
            <div className = "row" style={{display: 'grid', justifyContent: 'center', marginLeft: 0, gridTemplateColumns: widthNow === 1 ? 'repeat(4, 155px)' : 'repeat(1, 155px)'}}>{targetCity}</div>
        </div>
        );
};

export default City;

