import React from 'react';
import {flags} from './flag-obj';


const FlagList = () => {

  return (
    <div className='container'> 
      
          <div className="flag-list">
              <h1>Flag List</h1>
              {flags.map(( flag, index) => (
                <div key={index} className='flag-item'>
                  <img src={flag.image} alt={`${flag.country} flag`} />
                  <p className='countries'>{flag.country}</p>
                </div>
              ))}
              <hr></hr>
          </div>
    </div>
  )
}
export default FlagList;


  