import './App.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, Routes, Route } from 'react-router-dom'
import Login from './Login.jsx'
import Signup from './Signin.jsx'
import Write from './write.jsx'

function Home({ isLoggedIn, username, showMyPosts, turnon, turnoff, handleLogout, goLogin, gowrite}) {
  let Btn1 = 'togglebutton1'
  let Btn2 = 'togglebutton2'

  if (!showMyPosts) {
    Btn1 += ' active-button'
  } else {
    Btn2 += ' active-button'
  }

  return (
    <>
      <header className='head'>
        <div className='title'>
          <span onClick={() => navigate('/')}>TAPIE Board</span>
        </div>
        <div className='login'>
          {isLoggedIn ? (
            <>
              <span id='username' style={{ marginRight: '8px', color: 'white', fontSize: '16px' ,fontWeight: 'bold'}}>{username}</span>
              <button className='login-butten' onClick={handleLogout} style={{backgroundColor:'#FFA4A4'}}>&#91;→ 로그아웃</button>
            </>
          ) : (
            <button className='login-butten' onClick={goLogin}>&#91;→ 로그인</button>
          )}
        </div>
      </header>
      <main>
        <div className='container'>
          <div className='write'>
            <button className='wbutton' onClick={gowrite}>글 작성하기</button>
            <p>
              전체글 <span className='count'></span>개 작성됨
            </p>
          </div>
          <div className='hug'>
            <div className='toggle'>
              <button className={Btn1} onClick={turnon}>전체 글</button>
              <button className={Btn2} onClick={turnoff}>나의 글</button>
            </div>
            <div className='board'></div>
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

  function turnon() {
    setShowMyPosts(false)
  }
  function turnoff() {
    setShowMyPosts(true)
  }
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
          />
        }
      />
      <Route
        path='/login'
        element={
          <Login
            setIsLoggedIn={setIsLoggedIn}
            setUser={setUsername}
          />
        }
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

    </Routes>
  )
}

export default App