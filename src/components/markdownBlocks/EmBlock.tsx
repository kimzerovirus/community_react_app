export default function EmBlock({ node, children, ...props }: any) {
	return (
		<span style={{ fontStyle: 'italic' }} {...props}>
			{children}
		</span>
	);
}
