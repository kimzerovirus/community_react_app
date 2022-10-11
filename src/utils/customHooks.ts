import {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';

type ReturnTypes<T> = [T, (e: ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<T>>];

// type VF<T> = ({ ...args }: T) => void;
// interface ObserverProps {
// 	setActiveId: Dispatch<SetStateAction<string>>;
// 	htmlstring: string;
// }

export const useInput = <T>(initialData: T): ReturnTypes<T> => {
	const [value, setValue] = useState(initialData);
	const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value as T);
	}, []);
	return [value, handler, setValue];
};

export const usePreventCopy = () => {
	useEffect(() => {
		document.body.addEventListener('mousedown', e => e.preventDefault());
		document.body.addEventListener('mousemove', e => e.preventDefault());
		document.body.addEventListener('touchstart', e => e.preventDefault());
	}, []);
};

export const useScrollSpy = () => {
	useEffect(() => {
		console.log('spy');
	});
};

// https://github.com/emgoto/emgoto.com/blob/master/src/components/table-of-contents/utils.js
// export const useIntersectionObserver: VF<ObserverProps> = ({ setActiveId, htmlstring }) => {
export const useIntersectionObserver = (
	setActiveId: Dispatch<SetStateAction<string>>,
	htmlstring: string,
) => {
	const headingElementsRef = useRef<any>({});

	useEffect(() => {
		headingElementsRef.current = {};

		const callback: IntersectionObserverCallback = headings => {
			// 모든 headings 를 { key : value } 저장
			headingElementsRef.current = headings.reduce((map: any, headingElement) => {
				map[headingElement.target.id] = headingElement;
				return map;
			}, headingElementsRef.current);

			// 현재 페이지에 보여지는 headings 찾기
			const visibleHeadings: IntersectionObserverEntry[] = [];
			Object.keys(headingElementsRef.current).forEach(key => {
				const headingElement = headingElementsRef.current[key];

				if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
			});

			const getIndexFromId = (id: string) =>
				headingElements.findIndex(heading => heading.id === id);

			if (visibleHeadings.length === 1) {
				setActiveId(visibleHeadings[0].target.id);
			} else if (visibleHeadings.length > 1) {
				const sortedVisibleHeadings = visibleHeadings.sort(
					(a, b) => getIndexFromId(a.target.id) - getIndexFromId(b.target.id),
				);
				console.log(visibleHeadings[0].target.id);
				setActiveId(sortedVisibleHeadings[0].target.id);
			}
		};

		// header 영역 사이즈, 하단 감시 안할 영역 40%
		const observer = new IntersectionObserver(callback, {
			rootMargin: '110px 0px -40% 0px',
		});

		const headingElements = Array.from(document.querySelectorAll('h2, h3, h4, h5'));
		headingElements.forEach((element, id) => {
			element.setAttribute('id', String(id));
			observer.observe(element);
		});

		return () => observer.disconnect();
	}, [htmlstring]);
};
