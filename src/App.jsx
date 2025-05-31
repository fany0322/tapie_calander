import './App.css'
import { useState, useEffect } from 'react'
import { useNavigate, Routes, Route } from 'react-router-dom'
import Login from './Login.jsx'
import Signup from './Signin.jsx'
import Write from './write.jsx'
import axios from 'axios'
import Edit from './edit.jsx'
import Detail from './detail.jsx';

function Home({ 
  isLoggedIn, 
  username, 
  showMyPosts, 
  turnon, 
  turnoff, 
  handleLogout, 
  goLogin, 
  gowrite,
  goedit,
  godetail

}) {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get('/api/board/posts')
      .then(response => {
        const data = response.data

        if (Array.isArray(data)) {
          setPosts(data)
        } else if (Array.isArray(data.posts)) {
          setPosts(data.posts)
        } else {
          setPosts([])
        }
      })
      .catch(() => {
        console.error('오류남!!')
      })
  }, [])

  function handleDelete(postId) {
    axios.delete(`api/board/posts/${postId}`)
      .then(() => {
        setPosts(prevPosts => prevPosts.filter(post => post.id !== postId))
      })
      .catch(() => {
        alert('삭제 실패')
      })
  }
  

  const filteredPosts = showMyPosts
    ? posts.filter(post => post.author?.username === username)
    : posts

  let Btn1 = 'togglebutton1'
  let Btn2 = 'togglebutton2'

  if (!showMyPosts) Btn1 += ' active-button'
  else Btn2 += ' active-button'

  return (
    <>
      <header className='head'>
        <div className='title' onClick={() => navigate('/')}>
          TAPIE Board
        </div>

        <div className='login'>
          {isLoggedIn ? (
            <>
              <span 
                id='username' 
                style={{ 
                  marginRight: '8px', 
                  color: 'white', 
                  fontSize: '16px', 
                  fontWeight: 'bold' 
                }}
              >
                {username}
              </span>
              <button 
                className='login-butten' 
                onClick={handleLogout} 
                style={{ backgroundColor: '#FFA4A4' }}
              >
                &#91;→ 로그아웃
              </button>
            </>
          ) : (
            <button className='login-butten' onClick={goLogin}>
              &#91;→ 로그인
            </button>
          )}
        </div>
      </header>

      <main>
        <div className='container'>

          <div className='write'>
            <button className='wbutton' onClick={gowrite}>
              글 작성하기
            </button>
            <p>
              전체글 <span className='count'>{posts.length}</span>개 작성됨
            </p>
          </div>

          <div className='hug'>

            <div className='toggle'>
              <button className={Btn1} onClick={turnon}>
                전체 글
              </button>
              <button className={Btn2} onClick={turnoff}>
                나의 글
              </button>
            </div>

            <div className='board'>
              {showMyPosts ? (
                isLoggedIn ? (
                  filteredPosts.length > 0 ? (
                    filteredPosts.map(post => {
                      const dateonly = post.createdAt.split('T')[0]

                      return (
                        <div key={post.id} className='wrap'>
                          <div className='sangdanbar'>
                          <p className='post-title' onClick={()=>godetail(post.id)}>{post.title}</p>
                          <div className="buttons-mukum">
                            <button className="edit-btn" onClick={()=>goedit(post.id)}>수정</button>
                            <button className="delete-btn" onClick={() => handleDelete(post.id)}>삭제</button>
                          </div>
                          </div>
                          <p className='author'>
                            {post.author?.username || '없으'} · {dateonly}
                          </p>
                          <p className='content'>{post.content}</p>
                        </div>
                      )
                    })
                  ) : (
                    <p>작성한 글이 없습니다.</p>
                  )
                ) : (
                  <p>로그인이 안됐어;;</p>
                )
              ) : posts.length > 0 ? (
                posts.map(post => {
                  const dateonly = post.createdAt.split('T')[0]

                  return (
                    <div key={post.id} className='wrap'>
                      <p className='post-title' onClick={()=>godetail(post.id)}>{post.title}</p>
                      <p className='author'>
                        {post.author?.username || '없으'} · {dateonly}
                      </p>
                      <p className='content'>{post.content}</p>
                    </div>
                  )
                })
              ) : (
                <p>글이 없습니다.</p>
              )}
            </div>

          </div>

        </div>
      </main>
    </>
  )
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [showMyPosts, setShowMyPosts] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const savedLogin = localStorage.getItem('isLoggedIn')
    const savedUsername = localStorage.getItem('username')

    if (savedLogin === 'true') {
      setIsLoggedIn(true)
      setUsername(savedUsername)
    }
  }, [])

  function handleLogout() {
    setIsLoggedIn(false)
    setUsername('')
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('username')
  }

  function goLogin() {
    navigate('/login')
  }

  function gowrite() {
    if (isLoggedIn) {
      navigate('/write')
    } else {
      alert('로그인 후 작성해주세요.')
      navigate('/login')
    }
  }

  function goedit(postId) {
    navigate(`/edit/${postId}`)
  }
  
  function godetail(postId) {
    navigate(`/detail/${postId}`)
  }

  function turnon() {
    setShowMyPosts(false)
  }

  function turnoff() {
    if (!isLoggedIn) {
      alert('로그인 후 이용해주세요.')
      navigate('/login')
      return
    }
    setShowMyPosts(true)
  }

  return (
    <Routes>
      <Route
        path='/'
        element={
          <Home
            isLoggedIn={isLoggedIn}
            username={username}
            showMyPosts={showMyPosts}
            turnon={turnon}
            turnoff={turnoff}
            handleLogout={handleLogout}
            goLogin={goLogin}
            gowrite={gowrite}
            godetail={godetail}
            goedit={goedit}
          />
        }
      />
      <Route
        path='/login'
        element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUsername} />}
      />
      <Route path='/signup' element={<Signup />} />
      <Route
        path='/write'
        element={
          <Write
            isLoggedIn={isLoggedIn}
            username={username}
            handleLogout={handleLogout}
            goLogin={goLogin}
          />
        }
      />
      <Route
        path='/edit/:id'
        element={
          <Edit
            isLoggedIn={isLoggedIn}
            username={username}
            handleLogout={handleLogout}
            goLogin={goLogin}
          />
        }
      />
      <Route
        path='/detail/:id'
        element={
          <Detail
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
            goLogin={goLogin}
          />
        }
      />
    </Routes>
  )
}

export default App
