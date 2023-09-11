import {createContext, useState} from 'react'
const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [userData, setUserData] = useState({
        name: '',
    })

    return <UserContext.Provider value={{
        userData, setUserData
    }}>
        {children}
    </UserContext.Provider>
}

export default UserContext
