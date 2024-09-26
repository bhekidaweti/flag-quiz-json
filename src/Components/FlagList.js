import React from 'react';
import {flags} from './flag-obj'

const FlagList = () => {

  return (
    <div className='flag-container'> 
      <h1>Flag list</h1>
      <div className="flag-list">
        {flags.map(( flag, index) => (
          <div key={index} className='flag-item'>
            <p>{flag.country}</p>
            <img src={flag.image} alt={`${flag.country} flag`} />
          </div>
        ))}
      </div>
    </div>
  )
}
export default FlagList;
