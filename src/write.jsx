import './App.css'
import './write.css'
import { useNavigate } from 'react-router-dom'

function Write({ isLoggedIn, username, handleLogout, goLogin }) {
  const navigate = useNavigate()

  return (
    <>
      <header className='head'>
        <div className='title'>
          <span onClick={() => navigate('/')}>TAPIE Board</span>
        </div>
        <div className='login'>
          {isLoggedIn ? (
            <>
              <span id='username' style={ {marginRight: '8px', color: 'white', fontSize: '16px' ,fontWeight: 'bold'}}>{username}</span>
              <button className='login-butten' onClick={handleLogout} style={{backgroundColor:'#FFA4A4'}}>&#91;→ 로그아웃</button>
            </>
          ) : (
            <button className='login-butten' onClick={goLogin}>&#91;→ 로그인</button>
          )}
        </div>
      </header>

      <main>
        <div className='write-page'>
          <div className='write-title'>
            <span>글 작성</span>
          </div>
          <div className='write-form'>
            <form>
              <div className='write-title-input'>
                <span>제목</span>
                <input type='text' placeholder='제목을 입력하세요' />
              </div>
              <div className='content-input'>
                <span>내용</span>
                <textarea placeholder='내용을 작성해주세요'></textarea>
              </div>
            </form>
            <div className='write-button'>
              <button onClick={() => navigate('/')}>등록하기</button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Write
