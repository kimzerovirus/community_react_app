import { Box, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';

// /post/project?page=1
function PaginationComp() {
	const [cpage, setCpage] = useState(1);

	useEffect(() => {
		console.log(cpage);
	}, [cpage]);

	const handlePage = (e: any) => {
		const currentPage = parseInt(e.target.outerText);
		setCpage(currentPage);
	};

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center' }}>
			<Pagination
				defaultPage={1}
				count={5}
				shape="rounded"
				// variant="outlined"
				onChange={e => handlePage(e)}
				showFirstButton
				showLastButton
			/>
		</Box>
	);
}

export default PaginationComp;
