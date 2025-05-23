import './App.css'
import React, {useState, useEffect} from 'react'
import UserService from './services/User'
import UserAdd from './UserAdd'
import UserEdit from './UserEdit'

const UserList = ({setIsPositive, setShowMessage, setMessage}) => {

// Komponentin tilan määritys
const [users, setUsers] = useState([])
const [lisäystila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaUser, setMuokattavaUser] = useState(false)
const [search, setSearch] = useState("")


useEffect(() => {

  const token = localStorage.getItem('token')
  UserService.setToken(token)

  UserService.getAll()
  .then(data => {
    setUsers(data)
        })
    },[lisäystila, reload, muokkaustila]
)

//Hakukentän onChange tapahtumankäsittelijä
const handleSearchInputChange = (event) => {
  setSearch(event.target.value.toLowerCase())
}

const editUsers = (user) => {
  setMuokattavaUser(user)
  setMuokkaustila(true)
}

const deleteUser = (user) => {
    let vastaus = window.confirm(`Remove User ${user.username}?`)

    if (vastaus === true) {
        UserService.remove(user.userId)
        .then(res => {
            if (res.status === 200) {
                setMessage(`Successfully removed user ${user.username}.`)
                setIsPositive(true)
                setShowMessage(true)
                window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert

                // Ilmoituksen piilotus
                setTimeout(() => {
                setShowMessage(false)},
                5000
                )
            }
            
                }
            )
        .catch(error => {
            setMessage(error.message)
            setIsPositive(false)
            setShowMessage(true)
            window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert
    
            setTimeout(() => {
                setShowMessage(false)
                }, 10000)
          })

    } // Jos poisto halutaankin perua
    else {
        setMessage('Poisto peruttu onnistuneesti.')
        setIsPositive(true)
        setShowMessage(true)
        window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert

        // Ilmoituksen piilotus
        setTimeout(() => {
        setShowMessage(false)},
        5000
        )
    }
}

  return (
    <>
        <h1><nobr>Users</nobr>

                {lisäystila && <UserAdd setLisäystila={setLisäystila}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}

                {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>}</h1>

                {!lisäystila && !muokkaustila &&
                  <input placeholder="Search by lastname" value={search} onChange={handleSearchInputChange} />
                }

                {muokkaustila && <UserEdit setMuokkaustila={setMuokkaustila}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} muokattavaUser={muokattavaUser} />}

                {!lisäystila && !muokkaustila &&
                <table id="userTable">
                    <thead>
                        <tr>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Email</th>
                            <th>Access level</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users && users.map(u => 
                            {
                                const lowerCaseName = u.lastname.toLowerCase()
                                if (lowerCaseName.indexOf(search) > -1) {
                                    return(
                                        <tr key={u.userId}>
                                            <td>{u.firstname}</td>
                                            <td>{u.lastname}</td>
                                            <td>{u.email}</td>
                                            <td>{u.accesslevelId}</td>
                                            <td><button onClick={() => editUsers(u)}>Edit</button></td>
                                            <td><button onClick={() => deleteUser(u)}>Delete</button></td>
                                        </tr>
                                    )
                                }
                            }
                        )
                    }
                    </tbody>
                </table>
                }
    </>
  )
}

export default UserList