import { Container, Typography } from '@mui/material';

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center', padding: '3rem 0' }}>
			<Typography component="p" variant="body2">
				{year} © KIMZEROVIRUS.
			</Typography>
		</Container>
	);
}
