import React from 'react'

function CategoriesPage({ category }) {

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '76vh', width: '100%' }}>
            {category} 게시판 글
        </div>
    )
}

export default CategoriesPage
