import useLoginService from "../service/useLoginService"
import UserContext from "../context/UserContext" 
import { useContext } from "react"
import { ToastContainer } from "react-toastify"

function LoginServiceTesterComponent({username, password}) {
    const {userData} = useContext(UserContext)
    const {login, register} = useLoginService()

    const submitLogin = () => {
      login(username, password)
    }

    const submitRegister = () => {
      register(username, password)
    }

  return (
    <div>
      {userData.name ? <div data-testid='loggedInElement'>Currently logged in as: {userData.name}</div> : <div data-testid="loggedOutElement">Not currently logged in</div>}
      <button onClick={() => submitLogin()} data-testid="submitButtonLogin"></button>
      <button onClick={() => submitRegister()} data-testid="submitButtonRegister"></button>
      <ToastContainer />
    </div>
  )
}
export default LoginServiceTesterComponent