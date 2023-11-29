import UserProfile from "../components/UserProfile"
import CreateUserEvent from "../components/CreateUserEvent"
import { useParams } from "react-router-dom"

const UserProfilePage = () => {
  const { userId } = useParams()
  return (
    <div>
      <div>
        <UserProfile />
      </div>
      <div>
        <CreateUserEvent />
      </div>
    </div>
  )
}

export default UserProfilePage
