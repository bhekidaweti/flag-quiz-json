import React from 'react';
import {flags} from './flag-obj';
import { Helmet } from 'react-helmet';


const FlagList = () => {

  return (
    <div className='container'> 
          <Helmet>
            <title>World Flag List - Home!</title>
            <meta name="description" content="Welcome to the World Flags List!" />
            <meta property="og:title" content="World Flag List - Home!" />
            <meta property="og:description" content="Can you name all the flags? Start the quiz now and find out!" />
          </Helmet>
          <div className="flag-list">
              <h1>World Flags List</h1>
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


  