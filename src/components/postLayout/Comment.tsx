import styled from '@emotion/styled';
import React, { FC, useEffect, useRef } from 'react';
import { useTheme } from 'src/styles/theme/CustomThemeProvider';

const defaultUtterancSettings = {
	src: 'https://utteranc.es/client.js',
	repo: 'kimzerovirus/kimzerovirus',
	'issue-term': 'pathname',
	label: 'Comment',
	theme: 'github-light', // 'github-light' | 'github-dark'
	crossOrigin: 'anonymous',
	async: 'true',
};

const Comment: FC = () => {
	const commentBox = useRef<HTMLDivElement>(null);
	const theme = useTheme();

	useEffect(() => {
		const { current } = commentBox;
		if (current !== null) {
			createScriptElement({ ...defaultUtterancSettings, theme: `github-${theme}` }, current);
		}
	}, [theme]);

	const createScriptElement = (settings: typeof defaultUtterancSettings, root: HTMLDivElement) => {
		// if (root.children.length > 0) {
		// 	root.innerHTML = '';
		//  처음 한번만 생성한다면 return 해도 될듯?
		// }

		// 중복 생성 안되게 초기화
		// https://github.com/wicksome/utterances-react/blob/master/packages/component/src/Utterances.js 참고
		while (root.firstChild) {
			root.removeChild(root.firstChild);
		}

		const script = document.createElement('script');
		Object.entries(settings).forEach(([key, value]) => {
			script.setAttribute(key, value);
		});

		// Failed to execute 'insertAdjacentHTML' on 'Element': The element has no parent.
		const div = document.createElement('div'); // 사실 엘리먼트를 하나 더 추가 해주지 않아도 되지만 자꾸 콘솔에 에러가 뜨는게 싫어 추가함
		root.appendChild(div);
		div.appendChild(script);
	};

	return <CommentWrapper ref={commentBox} />;
};

const CommentWrapper = styled.div`
	width: 100%;
	margin: 3rem 0;
	.utterances {
		max-width: 100% !important;
	}
`;

export default Comment;

/*
1.	interface MutableRefObject<T> {
		current: T;
	}

2.	interface RefObject<T> {
		readonly current: T | null;
	}

	여기서 ref는 DOM을 다루므로 2번의 상황이다. 따라서 null로 초기화를 해줘야 된다.
*/
