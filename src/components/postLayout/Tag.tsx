import styled from '@emotion/styled';
import Link from 'next/link';
import { FC, ReactNode } from 'react';

interface TagProps {
	tagname: string;
	query: { tag: string };
	selected?: string;
	pathname: string;
}

const Tag: FC<TagProps> = ({ tagname, query, selected, pathname }) => (
	<TagWrapper className={selected === tagname ? 'active' : ''}>
		<Link href={{ pathname, query }}>
			<a>#{tagname}</a>
		</Link>
	</TagWrapper>
);

const TagWrapper = styled.div`
	background: rgba(128, 128, 128, 0.36);
	display: inline-block;
	font-size: 0.875rem;
	padding: 0.25rem 0.5rem;
	margin: 0 0.25rem 0.25rem 0;
`;

export default Tag;
