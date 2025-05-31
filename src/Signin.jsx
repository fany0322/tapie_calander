import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import './Login.css'

export default function Signin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const defaultNickname = 'ubsosoimshiro' + Math.floor(Math.random() * 100000)


  const handleSignup = async (e) => {
    e.preventDefault()

    if (username.length < 4) {
      alert('유저이름은 최소 4자 이상이어야 합니다.')
      return
    }
    if (password.length < 3) {
      alert('비밀번호는 최소 3자 이상이어야 합니다.')
      return
    }

    try {
      await axios.post(
        '/api/auth/register',
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
      navigate('/login')
    } catch (err) {
      if (err.response?.data?.detail) {
        alert(
          '회원가입 실패:\n' +
            err.response.data.detail
              .map(d => `• ${d.loc.join('.')}: ${d.msg}`)
              .join('\n')
        )
      } else {
        alert('회원가입 실패: ' + (err.response?.data?.message || '알 수 없는 오류'))
      }
    }
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
