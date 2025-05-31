import './detail.css';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [post, setPost] = useState('');
  const [dateOnly, setDateOnly] = useState('');

  useEffect(() => {
    axios.get(`/api/board/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setDateOnly(res.data.createdAt?.split('T')[0] || '');
      })
      .catch((err) => {
        console.error('게시글 불러오기 실패:', err);
      });
  }, [id]);

  function goHome() {
    navigate('/');
  }

  return (
    <>
      <header className='head'>
        <div className='title'>
          <span onClick={goHome}>TAPIE Board</span>
        </div>
        <div className='login'>
          <button className='login-butten' onClick={goHome}>&#91;← 홈으로</button>
        </div>
      </header>

      <main>
        <div className='card'>
          <p className='detail-title'>{post.title || ''}</p>
          <p className='author'>{post.author?.username || '없음음'} · {dateOnly}</p>
          <p className='content'>{post.content || ''}</p>
        </div>
      </main>
    </>
  );
}

export default Detail;
