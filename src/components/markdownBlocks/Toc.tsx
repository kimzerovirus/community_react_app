import styled from '@emotion/styled';
import React, { FC, useState } from 'react';
import { useIntersectionObserver } from 'src/utils/customHooks';
import { IndexProps } from 'src/utils/staticDataUtils';

interface TocProps {
	indexes: IndexProps[];
}

interface TocLiProps {
	depth: number;
}

const Toc: FC<TocProps> = ({ indexes }) => {
	const [activeId, setActiveId] = useState('');

	useIntersectionObserver(setActiveId, indexes);

	return indexes.length > 0 ? (
		<TocUl>
			<ul>
				{indexes.map((index: IndexProps, id: number) => (
					<TocLi key={id} depth={index.depth} className={activeId === String(id) ? 'active' : ''}>
						<a href={`#${id}`}>{index.title}</a>
					</TocLi>
				))}
			</ul>
		</TocUl>
	) : (
		<></>
	);
};

const TocUl = styled.div`
	display: none;
	@media (min-width: 1420px) {
		display: block;
		overflow: visible;
		position: absolute;
		right: 0px;
		width: 240px;
		height: inherit;

		ul {
			max-height: 450px;
			width: 240px;
			overflow: auto;
			margin: 0;
			padding: 4px 0;
			border-left: 1px solid rgba(128, 128, 128, 0.36);
			font-size: 0.875rem;

			/* position: fixed; */
			@supports (position: sticky) or (position: -webkit-sticky) {
				position: sticky;
				position: -webkit-sticky;
				top: 0px;
			}
		}
	}
`;

const TocLi = styled.li<TocLiProps>`
	list-style: none;
	/* color: rgba(128, 128, 128, 0.36); */
	opacity: 0.5;
	margin: 4px 24px 0 ${props => props.depth + 'px'};

	&:first-of-type {
		margin-top: 0;
	}

	&:hover,
	&.active {
		color: inherit;
		opacity: 1;
	}

	&.active {
		margin-left: ${props => props.depth - 6 + 'px'};
		font-size: 1rem;
		line-height: 0.875;
		/* font-weight: bold; */
		/* background-color: rgba(128, 128, 128, 0.36); */
		/* border-left: 2px solid #6868ac; */
	}
`;

export default Toc;
