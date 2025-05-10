import './App.css'
import React, {useState} from 'react'
import LoginService from './services/Auth'
import md5 from 'md5'

const Login = ({setShowMessage, setIsPositive, setMessage, setLoggedInUser, setAccess}) => {

// Komponentin tilan määritys
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')

// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
    event.preventDefault()
    var userForAuth = {
        username: username,
        password: md5(password) // Salataan md5 kirjaston metodilla
    }

    //console.log(userForAuth)
    
    LoginService.authenticate(userForAuth)
    .then(response =>{
        if (response.status === 200) {

            // Tallennetaan tietoja selaimen local storageen
            localStorage.setItem("username", response.data.username)
            localStorage.setItem("accesslevelId", response.data.accesslevelId)
            localStorage.setItem("token", response.data.token)

            // Asetetaan app komponentissa olevaan stateen
            setLoggedInUser(response.data.username)
            setAccess(Number(response.data.accesslevelId))

            setMessage(`Logged in as: ${userForAuth.username}`)
            setIsPositive(true)
            setShowMessage(true)

            setTimeout(() => {
            setShowMessage(false)
            }, 5000)
        }
    })
    .catch(error => {
        setMessage(error.message)
        setIsPositive(false)
        setShowMessage(true)
        
        setTimeout(() => {
            setShowMessage(false)
        }, 10000)
    })
}

    const emptyFields = () => {
        setUsername("")
        setPassword("")
    }

  return (
      <div id="loginWindow">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
            <div>
                <input type='text' value={username} 
                onChange={({target}) => setUsername(target.value)} placeholder='Username'/>
            </div>
            <div>
                <input type='password' value={password} 
                onChange={({target}) => setPassword(target.value)} placeholder='Password'/>
            </div>

            <input type='submit' value='Login'/>
            <input type='button' value='Empty' onClick={() => emptyFields()}/>
        </form>

      </div>
  )
}

export default Login