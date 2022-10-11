import styled from '@emotion/styled';
import React, { FC, useEffect, useState } from 'react';
import { useIntersectionObserver } from 'src/utils/customHooks';

interface TocProps {
	htmlstring: string;
}

interface TocLiProps {
	depth: number;
}

const Toc: FC<TocProps> = ({ htmlstring }) => {
	const INDENT_SIZE = 12;

	const [activeId, setActiveId] = useState('');

	useIntersectionObserver(setActiveId, htmlstring);

	const titles = htmlstring.split(`\n`).filter(title => title.includes('# '));
	const indexes = titles
		.filter(str => str[0] === '#')
		.map(title => {
			const depth =
				(title.match(/#/g)?.length as number) > 0
					? ((title.match(/#/g)?.length as number) - 1) * INDENT_SIZE
					: INDENT_SIZE;

			return { title: title.split('# ')[1].replace(/`/g, '').trim(), depth };
		});

	return indexes ? (
		<TocUl>
			{indexes.map((index, id) => (
				<TocLi key={id} depth={index.depth} className={activeId === String(id) ? 'active' : ''}>
					<a href={`#${id}`}>{index.title}</a>
				</TocLi>
			))}
		</TocUl>
	) : (
		<></>
	);
};

const TocUl = styled.ul`
	display: none;
	@media (min-width: 1420px) {
		display: block;
		position: absolute;
		right: 0;
		width: 250px;
		margin: 0;
		padding: 4px 0;
		border-left: 1px solid rgba(128, 128, 128, 0.36);
		font-size: 0.875rem;
	}
`;

const TocLi = styled.li<TocLiProps>`
	list-style: none;
	color: rgba(128, 128, 128, 0.36);
	margin: 4px 24px 0 ${props => props.depth + 'px'};

	&:first-of-type {
		margin-top: 0;
	}

	&:hover,
	&.active {
		color: inherit;
		opacity: 0.7;
	}

	&.active {
		margin-left: ${props => props.depth - 6 + 'px'};
		/* font-weight: bold; */
		/* background-color: rgba(128, 128, 128, 0.36); */
		/* border-left: 2px solid #6868ac; */
	}
`;

export default Toc;
