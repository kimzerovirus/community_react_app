import { useDarkMode } from '../DarkModeProvider';

export default function BlockquoteBlock({ node, children, ...props }: any) {
	const dark = 'blockquote dark';
	const light = 'blockquote light';
	const style = useDarkMode(dark, light);

	return (
		<div className={style} {...props}>
			{children}
		</div>
	);
}
