import React from 'react';


import vid from '../assets/videoplayback.mp4';


function Home() {
  return (
    <div>
      <div className='vid'>
        <h1>Welcome to eat</h1>
        <video src={vid} autoPlay loop muted />
      </div>
      <div className='content'>
        
  
      </div>
      
      
    </div>
  );
}

export default Home;
