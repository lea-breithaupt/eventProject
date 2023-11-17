import UserRegisterForm from "../components/UserRegisterForm"

const CreateUserAccountPage = () => {
  return (
    <div>
        <UserRegisterForm />
    </div>
  )
}

export default CreateUserAccountPage

// I want this page to be a link from the home page to 
// allow a user to create a new user account 
// I want it to display the header, and the register
// new user form, and allow users to choose up to 4 
// categories of interests