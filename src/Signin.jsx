import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import './Login.css'

export default function Signin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const defaultNickname = 'ubsosoimshiro'+Math.floor(Math.random() * 100000)

  const handleSignup = async (e) => {
    e.preventDefault()

    await axios.post(
      'https://community-api.tapie.kr/auth/register',
      {
        username,
        nickname: defaultNickname,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    alert('회원가입 성공!')
  }

  return (
    <>
      <header className="head">
        <div className="title">TAPIE Board</div>
        <div className="login">
          <button className="login-butten" onClick={() => navigate('/login')}>
            로그인
          </button>
        </div>
      </header>
      <main>
        <div className="login_section">
          <h2 className="login_title">회원가입</h2>
          <div className="login_container">
            <form className="login_form" onSubmit={handleSignup}>
              <label className="login_label" htmlFor="username">유저이름</label>
              <input
                type="text"
                id="username"
                placeholder="이름을 입력하세요"
                className="login_input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className="login_label" htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                placeholder="비밀번호를 입력해주세요"
                className="login_input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="login_submit">&#91;→ 회원가입</button>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}
