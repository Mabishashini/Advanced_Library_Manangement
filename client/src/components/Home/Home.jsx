import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import book from "../../books.jpg"


const Home = () => {
  return (
    <div className="home-page container">
      <header>
        <div className="logo">
          <h1>Library Management</h1>
        </div>

        <nav>
          <ul>
            <li className="btn-primary">
              <Link to="/login">
                <div className="buttons">
                  <button className="blob-btn">
                    Admin Login
                    <span className="blob-btn__inner">
                      <span className="blob-btn__blobs">
                        <span className="blob-btn__blob"></span>
                        <span className="blob-btn__blob"></span>
                        <span className="blob-btn__blob"></span>
                        <span className="blob-btn__blob"></span>
                      </span>
                    </span>
                  </button>
                </div>
              </Link>
            </li>
            
          </ul>
        </nav>
      </header>

      <div className="main_page">
        <div className="home_img">
          <img className="home_img_img" src={book} alt="" />
        </div>
        <div className="home_text">
          <h1>Discover Your Next Adventure</h1>
          <p>
          Welcome to our Library Management System! Organize, discover, and explore the world of books with ease. Streamline your library experience, from cataloging to borrowing, all in one place. Empower your reading journey today!
          </p>
          <button className="home-btn"><Link className="link"to="/table">Get Started</Link></button>
        </div>
      </div>
    </div>
  );
};

export default Home;
