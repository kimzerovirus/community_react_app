// import LaunchSharpIcon from '@mui/icons-material/LaunchSharp';
// import OpenInNewSharpIcon from '@mui/icons-material/OpenInNewSharp';
// import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import { Container, Grid, Link, Typography } from '@mui/material';
import lottieJson from 'public/cat.json';
import Lottie from 'react-lottie-player';

export default function PageNotFound() {
	return (
		<Container component="main" maxWidth="xs" style={{ marginTop: '10%' }}>
			<Lottie loop animationData={lottieJson} play style={{ width: `100%`, height: `100%` }} />

			<Grid container justifyContent="center" mt={2}>
				<Typography component="h1" variant="h6">
					해당 페이지를 찾지 못했습니다.
				</Typography>
			</Grid>
			<Grid container justifyContent="center">
				<Link href="/" variant="body2">
					메인페이지로 이동
					{/* <HomeSharpIcon sx={{ fontSize: '0.875rem' }} /> */}
				</Link>
			</Grid>
		</Container>
	);
}
