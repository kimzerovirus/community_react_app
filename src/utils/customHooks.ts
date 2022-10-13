import Router, { useRouter } from 'next/router';
import {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { IndexProps, PagingProps, PostProps } from 'src/utils/staticDataUtils';

type ReturnTypes<T> = [T, (e: ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<T>>];

// type VF<T> = ({ ...args }: T) => void;
// interface ObserverProps {
// 	setActiveId: Dispatch<SetStateAction<string>>;
// 	htmlstring: string;
// }

// export const useInput = <T>(initialData: T): ReturnTypes<T> => {
// 	const [value, setValue] = useState(initialData);
// 	const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
// 		setValue(e.target.value as unknown as T);
// 	}, []);
// 	return [value, handler, setValue];
// };

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
	htmlstring: IndexProps[],
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

			// 화면의 아이디 중 최상단 아이디 찾기
			// const getIndexFromId = (id: string) =>
			// 	headingElements.findIndex(heading => heading.id === id);

			if (visibleHeadings.length === 1) {
				// 화면에 보이는 아이디가 한개라면 바로 아이디 저장
				setActiveId(visibleHeadings[0].target.id);
			} else if (visibleHeadings.length > 1) {
				// 화면에 아이디가 여러개 보인다면 최상단 아이디를 찾은 후 아이디 저장
				const sortedVisibleHeadings = visibleHeadings.sort(
					(a, b) => Number(a.target.id) - Number(b.target.id), // 오름차순 정렬, id 값을 인덱스로 정했으므로 바로 계산함
				);
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

export const usePaging = (
	setSlicedPosts: Dispatch<SetStateAction<PostProps[]>>,
	setPaging: Dispatch<SetStateAction<PagingProps>>,
	posts: PostProps[],
	PER_PAGE = 10,
) => {
	const router = useRouter();

	Router.events.on('routeChangeComplete', () => {
		callback();
	});

	useEffect(() => {
		callback();
	}, [router.isReady]);

	function callback() {
		if (router.isReady) {
			const { page } = router.query;
			const currentPage =
				page === undefined ? 1 : Number(page) > posts.length ? posts.length : Number(page);
			const start = (currentPage - 1) * PER_PAGE;
			const end = currentPage * PER_PAGE;
			const totalPages =
				posts.length % PER_PAGE === 0
					? posts.length / PER_PAGE
					: Math.floor(posts.length / PER_PAGE) + 1;

			const pageCounts: number[] = [];
			let startNum = 1,
				endNum = 1;

			if (totalPages <= 5) {
				startNum = 1;
				endNum = totalPages;
			} else {
				startNum = currentPage + 1 - (currentPage % 5);
				endNum = startNum + 4 > totalPages ? totalPages : startNum + 4;
			}

			for (let i = startNum; i <= endNum; i++) pageCounts.push(i);

			setSlicedPosts(posts.slice(start, end));
			setPaging({
				isFirst: currentPage === 1 ? true : false,
				isLast: currentPage === totalPages ? true : false,
				currentPage,
				totalPages,
				pageCounts,
			});
		}
	}
};
