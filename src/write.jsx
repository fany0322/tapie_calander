import './App.css';
import './write.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;


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
          {isLoggedIn? (<main>
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
      </main>):(
        <h1 style={{color:'#ff0000'}}>로그인하세요</h1>
      )}
      
    </>
  )
  
    function postboard( title, content) {
      if (!isLoggedIn) {
        alert('로그인이 필요합니다.');
        goLogin();
        return;
      }
      
      if (!inputtitle.trim() || !inputcontent.trim()) {
        alert('제목과 내용을 모두 입력해주세요.');
        return;
      }


      axios.post( '/api/board/posts', {
      "title":title,
      "content":content,
      },{
        withCredentials: true,
        headers:{
        Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3IiwiZXhwIjoxNzQ4NTU5MzM4fQ.ixBHLtTycIGq0RtYcHpEpMPi2LsWuacW-I9guVPq4bU"
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
