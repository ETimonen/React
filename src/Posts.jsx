import './App.css'
import React, {useState, useEffect} from 'react'

const Posts = () => {

// Komponentin tilan määritys
const [posts, setPosts] = useState([])
const [showPosts, setShowPosts] = useState(false)

useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/posts")
  .then(res => res.json()) // Muutetaan json data javascriptiksi
  .then(oliot => setPosts(oliot))
  },[]
)

  return (
      <>
        <h2 onClick={() => setShowPosts(!showPosts)}>Posts from typicode</h2>

        {
          showPosts && posts && posts.map(p => 
            <div className='posts' key={p.id}>
              <br/>
              <h3>{p.title} (User: {p.userId})</h3>
              <p>{p.body}</p>
              <br/>
            </div>
          )
        }

      </>
  )
}

export default Posts