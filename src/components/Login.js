import React, { useState } from 'react'
import axios from 'axios';

function Login({isStart}) {
    const [loginInfo, setLoginInfo] = useState({
        id: '',
        password: '',
    });

    function onChangeHandler(e) {
        setLoginInfo({
            ...loginInfo,
            [e.target.name]: e.target.value
        })
    }

    function onSubmitHandler(e){
        e.preventDefault();
        axios.post('http://localhost:5000/api/login', loginInfo)
        .then(function(response) {
            if(response.data === 'fail'){
                alert('아이디와 비밀번호를 확인해주세요');
            } else{
                isStart();
            }
                
        })
        .catch(function(error) {
            console.log(error);
        })
    }

    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <label>ID</label>
                <input type="tel" name="id" pattern="[0-9]{11}" maxLength="11" onChange={onChangeHandler} required></input>
                <label>PW</label>
                <input type="password" name="password" pattern="[0-9]{11}" maxLength="11" onChange={onChangeHandler} required></input>
                <button type="submit">로그인</button>
            </form>
        </div>
    )    
}

export default Login
