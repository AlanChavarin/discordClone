import { useState, useContext } from 'react'
import UserContext from '../context/UserContext'
import { toast } from 'react-toastify'

const useLoginService = () => {
    const [loginLoading, setLoading] = useState(false)
    const {setUserData} = useContext(UserContext)

    const login = async (username, password) => {
        setLoading(true)
        return new Promise(resolve => {
            fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password,
                })
            })
            .then(res => res.json())
            .then(data => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                setUserData({
                    name: username
                })
                localStorage.setItem('user', data.token)
                setLoading(false)
                toast.success('login success')
                resolve(true)
            })
            .catch(error => handleError(error))
        })
    }

    const register = async (username, password) => {
        setLoading(true)
        return new Promise(resolve => {
            fetch('http://localhost:5000/api/', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })
            .then(res => res.json())
            .then(data => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                setUserData({
                    name: username
                })
                localStorage.setItem('user', data.token)
                setLoading(false)
                toast.success('register success')
                resolve(true)
            })
            .catch(error => handleError(error))
        })
    }

    const handleError = (error) => {
        setLoading(false)
        console.log(error)
        toast.error(error)
    }

    return {loginLoading, login, register}
}

export default useLoginService