import UserProfile from "../components/UserProfile"
import { useParams } from "react-router-dom"

const UserProfilePage = () => {
  const { userId } = useParams()
  return (
    <div>
     <UserProfile />
    </div>
  )
}

export default UserProfilePage
