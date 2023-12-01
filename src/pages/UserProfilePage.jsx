import UserCreatedEvents from "../components/UserCreatedEvents"
import UserProfile from "../components/UserProfile"
import { useParams } from "react-router-dom"

const UserProfilePage = () => {
  const { userId } = useParams()
  return (
    <div>
      <div>
        <UserProfile />
      </div>
      <div>
      
      </div>
    </div>
  )
}

export default UserProfilePage
