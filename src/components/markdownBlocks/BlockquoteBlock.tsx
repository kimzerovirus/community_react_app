import { css } from '@emotion/react';
import styled from '@emotion/styled';

export default function BlockquoteBlock({ node, children, ...props }: any) {
	return (
		<div className="blockquote" {...props}>
			{children}
		</div>
	);
}
