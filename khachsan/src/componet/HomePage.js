import React from 'react';
import '../../src/componet/css/homePage.css'; // import file css dành riêng cho homepage

function Home() {
  const rooms = [
    {
      id: 1,
      name: "Superior City View",
      image: "https://webhotel.vn/files/images/421.jpg",
      adults: 2,
      children: 2,
      price: 200,
    },
    {
      id: 2,
      name: "Deluxe Twin",
      image: "https://images.squarespace-cdn.com/content/v1/5aadf482aa49a1d810879b88/1626698584182-YPDVH4ZANFBZSEPY7AEM/2.jpg",
      adults: 2,
      children: 2,
      price: 250,
    },
    {
      id: 3,
      name: "Deluxe Double",
      image: "https://kientrucnamcuong.com/upload/image/images/thiet-ke-phong-khach-san-2.jpg",
      adults: 2,
      children: 3,
      price: 300,
    },
    {
      id: 4,
      name: "Executive Suite",
      image: "https://decoxdesign.com/upload/images/penthouse-ecogreen-85m2-phong-ngu-02-decox-design.jpg",
      adults: 2,
      children: 2,
      price: 400,
    },
  ];

  return (
    <div className="Home">
      <div className="Home-container">
        <div>Room</div>
        <div className="Home-login">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
      </div>
      <header className="Home-header">
        <div className="Home-image">
          <div className="Home-moon">
            <p
              style={{
                color: "white",
                fontSize: "50px",
                fontFamily: "fantasy",
              }}
            >
              The Moon
            </p>
          </div>
        </div>
      </header>
      <section className="Home-rooms">
        <h2>Available Rooms</h2>
        <div className="Room-list">
          {rooms.map((room) => (
            <div key={room.id} className="Room-card">
              <img src={room.image} alt={room.name} className="Room-image" />
              <h3>{room.name}</h3>
              <p>
                <span>{room.adults} Adult</span> |{" "}
                <span>{room.children} Children</span>
              </p>
              <p className="Room-price">${room.price}.00 / per night</p>
              <button className="Room-details-btn">View Details</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;

