import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Login.css'

export default function Login({ setUser, setIsLoggedIn }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const res = await axios.post(
        '/api/auth/login',
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      )
      console.log('로그인 성공 응답:', res.data)

      if (res.data.message === '로그인되었습니다') {
        setUser(username)  
        setIsLoggedIn(true)  
        navigate('/')        
      } else {
        setError('로그인 실패: 응답이 올바르지 않습니다.')
      }
    } catch (err) {
      console.error('로그인 에러:', err.response?.data || err.message)
      if (err.response?.status === 422) {
        setError('입력값이 잘못되었습니다.')
      } else if (err.response?.status === 401) {
        setError('아이디 또는 비밀번호가 틀렸습니다.')
      } else {
        setError('로그인 실패')
      }
    }
  }

  return (
    <>
      <header className="head">
        <div className="title" onClick={() => navigate('/')}>TAPIE Board</div>
        <div className="login">
          <span id="username"></span>
          <button className="login-butten" onClick={() => navigate('/signup')}>
            회원가입
          </button>
        </div>
      </header>
      <main>
        <div className="login_section">
          <h2 className="login_title">로그인</h2>
          <div className="login_container">
            <form className="login_form" onSubmit={handleLogin}>
              <label className="login_label" htmlFor="username">유저이름</label>
              <input
                type="text"
                id="username"
                placeholder="이름을 입력하세요"
                className="login_input"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <label className="login_label" htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                placeholder="비밀번호를 입력해주세요"
                className="login_input"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              {error && <div className="error">{error}</div>}
              <button type="submit" className="login_submit">&#91;→ 로그인</button>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}
