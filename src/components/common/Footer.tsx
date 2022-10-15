import { Toolbar, Typography } from '@mui/material';

interface FooterProps {
	isBorder?: boolean;
}

export default function Footer({ isBorder }: FooterProps) {
	const year = new Date().getFullYear();

	return (
		<div style={isBorder ? { borderTop: '1px solid rgba(128,128,128,0.36)' } : { border: 'none' }}>
			<Toolbar disableGutters variant="dense" sx={{ maxHeight: '80px' }}>
				<Typography
					component="a"
					variant="body2"
					href="https://github.com/kimzerovirus"
					sx={{
						textDecoration: 'none',
						color: 'inherit',
						lineHeight: '80px',
						textAlign: 'center',
						width: '100%',
					}}
				>
					© {year} KIMZEROVIRUS
				</Typography>
			</Toolbar>
		</div>
	);
}
