  import React from 'react';
  import '../../src/componet/css/homePage.css';  // Import file CSS dành riêng cho HomePage


  function Home() {
    return (
        <div className="Home">
          <div className="Home-container">
            <div>Room</div>
            <div className="Home-login" style={{
            }}>
              <a href="/login" >Login</a>
              <a href="/register">Register</a>
            </div>
          </div>
          <header className="Home-header">
            <div className='Home-image'>
               <div className='Home-moon'>
                <p style={{
                  color: "black",
                  fontSize: "28px",
                  fontFamily: "fantasy"
                }}>The Moon</p>
               </div>
            </div>
          </header>
        </div>
      );
  }
  
  export default Home;

