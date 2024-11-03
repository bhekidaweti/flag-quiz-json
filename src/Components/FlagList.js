import React from 'react';
import {flags} from './flag-obj'

const FlagList = () => {

  return (
    <div className='container'> 
    <div className="row align-items-start">
    <div className="col">
      
    </div>
      
      <div className="col flag-list">
      <h1>Flag List</h1>
        {flags.map(( flag, index) => (
          <div key={index} className='flag-item'>
            <p>{flag.country}</p>
            <img src={flag.image} alt={`${flag.country} flag`} />
          </div>
        ))}
      </div>
      <div className="col">
      
      </div>
    </div>
    </div>
  )
}
export default FlagList;


  