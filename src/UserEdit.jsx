import './App.css'
import React, {useState} from 'react'
import UserService from './services/User'
import md5 from 'md5'

const UserEdit = ({setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaUser}) => {

// Komponentin tilan määritys

    const [newUserId, setNewUserId] = useState(muokattavaUser.userId)
    const [newFirstname, setNewFirstname] = useState(muokattavaUser.firstname)
    const [newLastname, setNewLastname] = useState(muokattavaUser.lastname)
    const [newEmail, setNewEmail] = useState(muokattavaUser.email)
    const [newAccesslevelId, setNewAccesslevelId] = useState(2)
    const [newUsername, setNewUsername] = useState(muokattavaUser.username)
    const [newPassword, setNewPassword] = useState('')

// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
      event.preventDefault()
      var newUser = {
            UserId: newUserId,
            firstname: newFirstname,
            lastname: newLastname,
            email: newEmail,
            accesslevelId: parseInt(newAccesslevelId),
            username: newUsername,
            password: md5(newPassword) // Salataan md5 kirjaston metodilla
        }
    
    UserService.update(newUser)
    .then(response => {
      if (response.status === 200) {
       setMessage("Edited User: " + newUser.username)
       setIsPositive(true)
       setShowMessage(true)
      
       setTimeout(() => {
        setShowMessage(false)
       }, 5000)

       setMuokkaustila(false)
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


  return (
    <div id="edit">
        <h2>User edit</h2>

        <form onSubmit={handleSubmit}>
            <div>
                <input type="text" value={newUserId} disabled />
            </div>
            <div>
                <input type='text' value={newFirstname} 
                onChange={({target}) => setNewFirstname(target.value)} required placeholder='Firstname' />
            </div>
            <div>
                <input type='text' value={newLastname} 
                onChange={({target}) => setNewLastname(target.value)} required placeholder='Lastname'/>
            </div>
            <div>
                <input type='email' value={newEmail} 
                onChange={({target}) => setNewEmail(target.value)} placeholder='Email'/>
            </div>
            <div>
                <input type='number' value={newAccesslevelId} 
                onChange={({target}) => setNewAccesslevelId(target.value)} placeholder='Access level'/>
            </div>
            <div>
                <input type='text' value={newUsername} 
                onChange={({target}) => setNewUsername(target.value)} required placeholder='Username'/>
            </div>
            <div>
                <input type='password' value={newPassword} 
                onChange={({target}) => setNewPassword(target.value)} required placeholder='Password'/>
            </div>

            <input type='submit' value='Save'/>
            <input type='button' value='Back' onClick={() => setMuokkaustila(false)}/>
        </form>

      </div>
  )
}

export default UserEdit