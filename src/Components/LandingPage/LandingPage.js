import React from 'react'
import '../../style/LandingPage.scss'
import CategoriesPage from '../Categories/CategoriesPage'
function LandingPage({ match }) {

    const Category = match.params.category || 'all';

    if (Category)
        return <CategoriesPage category={Category} />

    else return <div>Category Error</div>

}

export default LandingPage
