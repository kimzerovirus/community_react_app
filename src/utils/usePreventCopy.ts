import { useEffect } from 'react';

export const usePreventCopy = () => {
	useEffect(() => {
		document.body.addEventListener('mousedown', e => e.preventDefault());
		document.body.addEventListener('mousemove', e => e.preventDefault());
		document.body.addEventListener('touchstart', e => e.preventDefault());
	}, []);
};
