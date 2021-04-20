import React, { useState } from 'react'
import '../../style/LoginPage.scss'

function LoginPage() {

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
        alert(`${Id} // ${Pwd}`)
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
