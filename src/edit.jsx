import './App.css';
import './edit.css';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Edit({ isLoggedIn, username, handleLogout, goLogin }) {
  const navigate = useNavigate();
  const { id } = useParams(); 

  const [inputtitle, setInputTitle] = useState('');
  const [inputcontent, setInputContent] = useState('');
  const [error, setError] = useState('');



    useEffect(()=>{
        axios.get(`https://community-api.tapie.kr/board/posts/${id}`)
        .then((res) => {
            const post = res.data;
            setInputTitle(post.title);
            setInputContent(post.content);
        })
        .catch( () => {
            setError('게시글을 불러올 수 없습니다.');
        });
    }, [id]);

  function editboard() {
    if (!isLoggedIn) {
        alert('로그인이 필요합니다.');
        goLogin();
        return;
      }

    if (!inputtitle.trim() || !inputcontent.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    axios.put(`/api/board/posts/${id}`, {
      title: inputtitle,
      content: inputcontent
    }).then(() => {
        alert('수정 완료');
        navigate('/');
      }).catch((error) => {
        console.error('글 작성 실패:', error);
        alert('수정 실패 다시 시도해주세요');
      });
    };

  return (
    <>
      <header className='head'>
        <div className='title'>
          <span onClick={() => navigate('/')}>TAPIE Board</span>
        </div>
        <div className='login'>
          {isLoggedIn ? (
            <>
              <span id='username' style={{ marginRight: '8px', color: 'white', fontSize: '16px', fontWeight: 'bold' }}>{username}</span>
              <button className='login-butten' onClick={handleLogout} style={{ backgroundColor: '#FFA4A4' }}>&#91;→ 로그아웃</button>
            </>
          ) : (
            <button className='login-butten' onClick={goLogin}>&#91;→ 로그인</button>
          )}
        </div>
      </header>
          {isLoggedIn?(
      <main>
        <div className='edit-page'>
          <div className='edit-title'>
            <span>글 수정</span>
          </div>
          <div className='edit-form'>
            <form>
              <div className='edit-title-input'>
                <span>제목</span>
                <input type='text'placeholder='제목을 입력하세요'value={inputtitle}onChange={(e) => setInputTitle(e.target.value)}/>
              </div>
              <div className='content-input'>
                <span>내용</span>
                <textarea placeholder='내용을 작성해주세요' value={inputcontent} onChange={(e) => setInputContent(e.target.value)}></textarea>
              </div>
            </form>
            <div className='edit-button'>
              <button onClick={editboard}>수정하기</button>
            </div>
          </div>
        </div>
      </main>):(
        <h1 style={{color:'#ff0000'}}>로그인하세요</h1>
      )}
    </>
  );
}

export default Edit;
