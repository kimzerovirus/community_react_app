import React, { FC, ReactNode } from 'react';

interface StickyProps {
	children: ReactNode;
}

const Sticky: FC<StickyProps> = ({ children }) => {
	return <>{children}</>;
};

export default Sticky;
