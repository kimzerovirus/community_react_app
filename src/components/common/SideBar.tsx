import styled from '@emotion/styled';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button, Drawer, Grid, IconButton } from '@mui/material';
import React, { useState } from 'react';

import { ButtonGroup } from './Header';

const SideBar = ({ menuList }: any) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<IconButton onClick={() => setOpen(true)} edge="start" color="inherit" aria-label="logo">
				<MenuIcon />
			</IconButton>
			<Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
				<Box width="250px" mt={6}>
					<Grid>
						{menuList.map(({ name, link }: { name: string; link: string }) => (
							<Grid item key={name}>
								<Button
									component="a"
									href={link}
									sx={{
										color: 'inherit',
										fontSize: '1rem',
										textDecoration: 'none',
										display: 'block',
										width: '100%',
										textAlign: 'center',
									}}
								>
									{name}
								</Button>
							</Grid>
						))}
					</Grid>
					<Group>
						<ButtonGroup />
					</Group>
				</Box>
			</Drawer>
		</>
	);
};

export default SideBar;

const Group = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	position: absolute;
	bottom: 6rem;

	/* background-color: #6868ac;
	border-radius: 1rem;
	color: #fff; */
`;
