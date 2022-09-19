import { useContext, useEffect, useState } from 'react';
import { PrismAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { twilight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { ThemeContext } from 'src/pages/_app';

import { dark, light } from './syntaxTheme';
export default function CodeBlock({ node, inline, className, children, ...props }: any) {
	const { isDark } = useContext(ThemeContext);
	const match = /language-(\w+)/.exec(className || '');

	const [theme, setTheme] = useState<any>();
	useEffect(() => {
		const th = isDark ? dark : light;
		setTheme(th);
	}, [isDark]); // style 에서 삼항 연산자 사용시에 next js 뭔가 오류가 있음 그래서 useeffect로 돌려버림

	return inline ? (
		// 강조 (``)
		<code
			style={{
				background:
					'linear-gradient( to right, var(--sub-highlight-color) 15%, var(--highlight-color) 85%, var(--sub-highlight-color) )',
				padding: '2px',
				borderRadius: '7px',
			}}
			{...props}
		>
			{children}
		</code>
	) : match ? (
		// 코드 (```)
		<SyntaxHighlighter style={theme} language={match[1]} {...props}>
			{String(children)
				.replace(/\n$/, '')
				.replace(/\n&nbsp;\n/g, '')
				.replace(/\n&nbsp\n/g, '')}
		</SyntaxHighlighter>
	) : (
		<SyntaxHighlighter style={theme} language="textile" {...props}>
			{String(children).replace(/\n$/, '')}
		</SyntaxHighlighter>
	);
}
