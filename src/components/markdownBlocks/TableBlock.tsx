import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

export default function TableBlock({ node, children, ...props }: any) {
	const [element, setElement] = useState<JSX.Element>();

	useEffect(() => {
		setElement(
			<TableWrapper>
				<table>{children}</table>
			</TableWrapper>,
		);
	}, [children]);

	return <>{element}</>;
}

const TableWrapper = styled.div`
	width: 100%;
	overflow: auto;

	table {
		width: 100%;
		border-collapse: collapse;
		white-space: nowrap;
	}
	th,
	td {
		border: 1px solid #ddd;
		padding: 5px;
	}
`;
