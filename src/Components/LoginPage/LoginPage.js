import React, { useState } from 'react'

//style
import '../../style/LoginPage.scss'
import Swal from 'sweetalert2'

//store
import { useDispatch } from 'react-redux'
import { loginUser } from '../../_actions/user_action'


function LoginPage(props) {
    const dispatch = useDispatch();

    const [Id, setId] = useState('');
    const [Pwd, setPwd] = useState('');

    const onIdHandler = e => {
        setId(e.currentTarget.value)
    }

    const onPwdHandler = e => {
        setPwd(e.currentTarget.value)
    }


    const onSubmitHandler = e => {
        e.preventDefault();
        // alert(`${Id} // ${Pwd}`)

        let body = {
            id: Id,
            pwd: Pwd
        }

        let alertData = {
            icon: 'error',
            title: 'LOGIN ERROR',
        }

        if (body.id !== '' && body.pwd !== '') {
            dispatch(loginUser(body))
                .then(res => {
                    if (res.payload.loginSuccess) {
                        props.history.push('/')
                    } else {
                        Swal.fire(alertData)
                    }
                })
        } else {
            if (body.id === '') {
                alertData = {
                    icon: 'error',
                    title: '아이디를 입력해주세요',
                }
            } else if (body.pwd === '') {
                alertData = {
                    icon: 'error',
                    title: '비밀번호를 입력해주세요',
                }
            }
            Swal.fire(alertData)
        }

    }

    return (
        <div className="loginComp formComp">
            {/* <h1>로그인</h1> */}
            <form onSubmit={onSubmitHandler}>

                <div className="formBox">
                    <label htmlFor="id">아이디</label>
                    <div className="inputBox">
                        <input type="text" name="id" value={Id} onChange={onIdHandler} />
                        {/* <img src={process.env.PUBLIC_URL + '/icons/fail_icon.svg'} /> */}
                    </div>


                </div>

                <div className="formBox">
                    <label htmlFor="pwd">비밀번호</label>
                    <div className="inputBox">
                        <input type="password" name="pwd" value={Pwd} onChange={onPwdHandler} />
                    </div>
                </div>

                <button type="submit">로그인</button>

            </form>
        </div>
    )
}

export default LoginPage
