import React from 'react'
import { useFormik } from 'formik'

function RegisterPage() {

    const Formik = useFormik({
        initialValues: {
            name: '',
            id: '',
            pwd: '',
            pwdc: '',
            email: ''
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2))
        },
    })

    return (
        <div>
            register
            <form onSubmit={Formik.handleSubmit}>

                <label htmlFor="name">이름</label>
                <input type="text" name="name" id="name" onChange={Formik.handleChange} value={Formik.values.name} />

                <label htmlFor="id">아이디</label>
                <input type="text" name="id" id="id" onChange={Formik.handleChange} value={Formik.values.id} />

                <label htmlFor="pwd">비밀번호</label>
                <input type="password" name="pwd" id="pwd" onChange={Formik.handleChange} value={Formik.values.pwd} />

                <label htmlFor="pwdc">비밀번호 확인</label>
                <input type="password" name="pwdc" id="pwdc" onChange={Formik.handleChange} value={Formik.values.pwdc} />

                <label htmlFor="email">이메일</label>
                <input type="email" name="email" id="email" onChange={Formik.handleChange} value={Formik.values.email} />

                <button type="submit">회원가입</button>
            </form>
        </div>
    )
}

export default RegisterPage
