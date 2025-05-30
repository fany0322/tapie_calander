import './App.css';
import './write.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

function Write({ isLoggedIn, username, handleLogout, goLogin }) {
  const navigate = useNavigate()
  const [inputtitle, setInputTitle] = useState('');
  const [inputcontent, setInputContent] = useState('');

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
                <input type='text' placeholder='제목을 입력하세요' value={inputtitle} onChange={(e) => {setInputTitle(e.target.value)}}/>
              </div>
              <div className='content-input'>
                <span>내용</span>
                <textarea placeholder='내용을 작성해주세요' value={inputcontent} onChange={(e) => {setInputContent(e.target.value)}}></textarea>
              </div>
            </form>
            <div className='write-button'>
              <button onClick={() => postboard(inputtitle, inputcontent)}>등록하기</button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
  
    function postboard( title, content) {
       const token = localStorage.getItem("accessToken");
      axios.post( 'https://community-api.tapie.kr/board/posts', {
     "title":title,
    "content":content,
  },{
    headers: {
      Authorization: `Bearer ${token}`
    }
}).then((response) => {
      console.log('글 작성 성공:', response.data);
      navigate('/');
    }).catch((error) => {
      console.error('글 작성 실패:', error);
      alert('글 작성이 실패했습니다. 다시 시도해주세요.');

    });
}
}


export default Write
