import { Container, Typography } from '@mui/material';

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
			<Typography
				component="a"
				variant="body2"
				href="https://github.com/kimzerovirus"
				sx={{
					textDecoration: 'none',
					color: 'inherit',
				}}
			>
				© {year} KIMZEROVIRUS
			</Typography>
		</Container>
	);
}
