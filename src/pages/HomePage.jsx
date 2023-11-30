import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

const HomePage = () => {
  return (
    <div>
      <div className='carousel-container'>
        <Carousel fade>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/1600x600"
              alt="First slide"
            />
          </Carousel.Item>
          {/* Add more Carousel.Items for additional images */}
        </Carousel>
      </div>
      <div className='content'>
        <h4>Log In or Join to check out what is happening within your city limits!</h4>
        <div>
          <Link to='/login'>
            <button>Login</button>
          </Link>
          <Link to="/create-user-account">
            <button>Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
