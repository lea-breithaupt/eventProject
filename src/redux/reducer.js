const initialState = {
    userId: null,
    isLoggedIn: false,
    eventCreated: false,
    createdEventDetails: null,
    loggedInUser: null,
    editMode: false,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'authenticated':
            return {
                ...state,
                userId: action.payload,
                isLoggedIn: true,
            }
        
        case 'logout':
            return {
                ...state,
                userId: null,
                isLoggedIn: false,
            }
        
        case 'createUser':
            return {
                ...state,
                userId: null,
                isLoggedIn: false,
            }
        
        case 'SET_USER':
            return {
                ...state,
                userId: action.payload,
                isLoggedIn: true,
            }
        
        case 'EDIT_MODE': 
            return {
                ...state,
                isLoggedIn: true,
                editMode: action.payload
            }
        
        case 'LOG IN':
            return {
                ...state,
                loggedInUser: action.payload
            }

        default:
            return state
    }
}

export default reducer