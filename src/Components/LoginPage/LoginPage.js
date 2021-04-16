import React from 'react'
import '../../style/LoginPage.scss'

function LoginPage() {

    const onSubmitHandler = e => {
        e.preventDefault();

    }

    return (
        <div className="loginComp">
            {/* <h1>로그인</h1> */}
            <form onSubmit={onSubmitHandler}>

                <div className="formBox">
                    <label htmlFor="id">아이디</label>
                    <div className="inputBox">
                        <input type="text" name="id" />
                        {/* <img src={process.env.PUBLIC_URL + '/icons/fail_icon.svg'} /> */}
                    </div>


                </div>

                <div className="formBox">
                    <label htmlFor="pwd">비밀번호</label>
                    <div className="inputBox">
                        <input type="password" name="pwd" />
                    </div>
                </div>

                <button type="submit">로그인</button>

            </form>
        </div>
    )
}

export default LoginPage
