import { useState } from 'react'
import { toast } from 'react-toastify'

const useMessageService = () => {
    const [messageLoading, setLoading]= useState(false)

    const getMessage = async (messageId) => {
        setLoading(true)
        return new Promise(resolve => {
            fetch(`http://localhost:5000/api/messages/${messageId}`)
            .then(res => res.json())
            .then(data => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                setLoading(false)
                resolve(data)
            })
            .catch(error => handleError(error))
        })
    }

    const getMessagesByChannel = async (channelId) => {
        setLoading(true)
        return new Promise(resolve => {
            fetch(`http://localhost:5000/api/messages/${channelId}`)
            .then(res => res.json())
            .then(data => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                setLoading(false)
                resolve(data)
            })
            .catch(error => handleError(error))
        })
    }

    const postMessage = async (formData) => {
        const {username, message, parentChannel} = formData
        setLoading(true)
        return new Promise(resolve => {
            fetch(`http://localhost:5000/api/`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('user')
                },
                body: JSON.stringify({
                    username,
                    message,
                    parentChannel
                })
            })
            .then(res => res.json())
            .then(data => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                setLoading(false)
                resolve(data)
            })
            .catch(error => handleError(error))
            
        })
    }

    const handleError = (error) => {
        setLoading(false)
        console.log(error)
        toast.error(error)
    }

    return {messageLoading, getMessage, getMessagesByChannel, postMessage}
}

export default useMessageService