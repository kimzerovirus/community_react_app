import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { PrismAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CopyIcon, PasteIcon } from 'src/components/Icons';
// import { twilight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useTheme } from 'src/styles/theme/CustomThemeProvider';
import syntaxTheme from 'src/styles/theme/syntaxTheme';

export default function CodeBlock({ node, inline, className, children, ...props }: any) {
	const match = /language-(\w+)/.exec(className || '');
	const style = useTheme();
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setCopied(false);
		}, 1000);
		return () => clearTimeout(timer);
	}, [copied]);

	// TODO code copy button
	return inline ? (
		// 강조 (``)
		<code className="primary" style={{ fontWeight: 'bold' }} {...props}>
			`{children}`
		</code>
	) : match ? (
		// 코드 (```)
		<div className="code">
			<div className="copy-alert" style={copied ? { display: 'block' } : { display: 'none' }}>
				Code Copied...
			</div>
			<CopyToClipboard text={children} onCopy={() => setCopied(true)}>
				<button className="icon copy-icon">{copied ? <PasteIcon /> : <CopyIcon />}</button>
			</CopyToClipboard>
			<SyntaxHighlighter style={syntaxTheme[style]} language={match[1]} {...props}>
				{String(children)
					.replace(/\n$/, '')
					.replace(/\n&nbsp;\n/g, '')
					.replace(/\n&nbsp\n/g, '')}
			</SyntaxHighlighter>
		</div>
	) : (
		<div className="code">
			<CopyToClipboard text={children} onCopy={() => setCopied(true)}>
				<button className="icon copy-icon">{copied ? <PasteIcon /> : <CopyIcon />}</button>
			</CopyToClipboard>
			<SyntaxHighlighter style={syntaxTheme[style]} language="textile" {...props}>
				{String(children).replace(/\n$/, '')}
			</SyntaxHighlighter>
		</div>
	);
}
