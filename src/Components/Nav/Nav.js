import React from 'react'
import { NavLink } from 'react-router-dom'
import '../../style/Nav.scss'
import Categories from '../Categories/Categories'

// category목록은 categories폴더의 categories에 배열형태로 저장함

function Nav() {
    return (
        <header className="gnb">
            <div className="container">

                {/* MainNav */}
                <div className="mainNav">
                    {Categories.map(c => (
                        <NavLink key={c.name} className="categoryNav" activeClassName="active" exact={c.name === 'all'} to={c.name === 'all' ? '/' : `/category/${c.name}`}>
                            {c.text}
                        </NavLink>
                    ))}
                </div>

                {/* SubNav */}
                <nav className="subNav">
                    <ul>
                        <li><a href="/login">로그인</a></li>
                        <li className="last"><a href="/register">회원가입</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Nav



{/* <li><Link to="/login">로그인</Link></li>
                    <li><Link to="/register">회원가입</Link></li> */}