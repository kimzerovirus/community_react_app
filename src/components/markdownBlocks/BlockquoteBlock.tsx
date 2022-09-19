import styled from '@emotion/styled';

export default function blockquote({ node, children, ...props }: any) {
	return (
		<div
			style={{
				background: '#f0f0f0',
				padding: '1px 15px',
				borderRadius: '7px',
			}}
			{...props}
		>
			{children}
		</div>
	);
}

const Div = styled.div`
	backgournd: #f0f0f0;
`;
