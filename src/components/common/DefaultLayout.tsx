import { Container } from '@mui/material';
import React, { FC, ReactNode } from 'react';
import Footer from 'src/components/common/Footer';
import Header from 'src/components/common/Header';
import { WrappedComponent, Wrapper } from 'src/styles/WrapperStyle';

export interface DefaultLayoutProps {
	children: ReactNode;
	isBorder?: boolean;
	maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	style?: any;
}

const DefaultLayout: FC<DefaultLayoutProps> = ({ children, isBorder, maxWidth, style }) => {
	return (
		<Wrapper>
			<Header isBorder={isBorder} />
			<WrappedComponent>
				<Container maxWidth={maxWidth} style={style}>
					{children}
				</Container>
			</WrappedComponent>
			<Footer />
		</Wrapper>
	);
};

export default DefaultLayout;
