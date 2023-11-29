import { Link } from 'react-router-dom'

const HomePage = () => {

  return (
    <div>
        <div>
          <h4>Log In or Join to check out what is happening within your city limits!</h4>
          <div>
          <Link to='/login'>
            <button>
              Login
            </button>
          </Link>
          <Link to="/create-user-account">
            <button>
              Sign Up
            </button>
          </Link>
          </div>
        </div>
    </div>
  ) 
}

export default HomePage
