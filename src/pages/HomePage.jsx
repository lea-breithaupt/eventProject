import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className='Home-page'>
      <div className='content'>
        <img 
          alt=""
          src="https://drive.google.com/uc?export=view&id=1nVj"
        />
        <h4>Sign In or Join to check out what is happening within your city limits!</h4>
        <div>
          <Link to='/login'>
            <button className='Home-page-button'>Sign In</button>
          </Link>
          <Link to="/create-user-account">
            <button className='Home-page-button'>Join</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
