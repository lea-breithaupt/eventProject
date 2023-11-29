const UsersFirstName = () => {
  const [firstname, setFirstName] = useState('')

  useEffect(() => {
    const getUsersFirstName = async () => {
        const response = await axios.get('/getUsersFirstName')
        const userFirstName = response.data.firstName;
        setFirstName(userFirstName)
      }
    
      getUsersFirstName()
    }, [])
  return (
    <div>
        {firstname}
    </div>
  )
}

export default UsersFirstName
