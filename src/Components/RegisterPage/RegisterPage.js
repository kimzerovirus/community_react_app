import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

function RegisterPage() {

    const Formik = useFormik({
        initialValues: {
            name: '',
            id: '',
            pwd: '',
            pwdc: '',
            email: ''
        },
        validationSchema: Yup.object({
            id: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
        }),
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2))
        },
    })

    return (
        <div className="formComp mt mb">
            <form onSubmit={Formik.handleSubmit}>
                <div className="formBox">
                    <label htmlFor="name">이름</label>
                    <div className="inputBox">
                        <input type="text" name="name" id="name" onChange={Formik.handleChange} value={Formik.values.name} />
                    </div>
                </div>

                <div className="formBox">
                    <label htmlFor="id">아이디</label>
                    <div className="inputBox">
                        <input type="text" name="id" id="id" onChange={Formik.handleChange} value={Formik.values.id} />
                    </div>
                </div>

                <div className="formBox">
                    <label htmlFor="pwd">비밀번호</label>
                    <div className="inputBox">
                        <input type="password" name="pwd" id="pwd" onChange={Formik.handleChange} value={Formik.values.pwd} />
                    </div>
                </div>

                <div className="formBox">
                    <label htmlFor="pwdc">비밀번호 확인</label>
                    <div className="inputBox">
                        <input type="password" name="pwdc" id="pwdc" onChange={Formik.handleChange} value={Formik.values.pwdc} />
                    </div>
                </div>

                <div className="formBox">
                    <label htmlFor="email">이메일</label>
                    <div className="inputBox">
                        <input type="email" name="email" id="email" onChange={Formik.handleChange} value={Formik.values.email} />
                    </div>
                </div>

                <button type="submit">회원가입</button>
            </form>
        </div>
    )
}

export default RegisterPage
