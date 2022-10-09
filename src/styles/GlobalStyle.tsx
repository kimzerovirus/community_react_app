import { css, Global } from '@emotion/react';
import React from 'react';

// 리액트에서는 최상위 div의 이름이 app이였던것 같은데 next.js 에서는 __next 이다.

const style = css`
	html,
	body,
	#__next {
		width: 100% !important;
		height: 100% !important;
	}
	a {
		text-decoration: none;
		color: inherit;
	}
`;

const GlobalStyle = () => {
	return <Global styles={style} />;
};

export default GlobalStyle;
