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

// https://github.com/emgoto/emgoto.com/blob/master/src/components/table-of-contents/utils.js
// export const useIntersectionObserver: VF<ObserverProps> = ({ setActiveId, indexes }) => {
export const useIntersectionObserver = (
	setActiveId: Dispatch<SetStateAction<string>>,
	indexes: IndexProps[],
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

				if (headingElement.isIntersecting) {
					visibleHeadings.push(headingElement);
				}
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
		// const scope = { rootMargin: '0px 0px -90% 0px' }; // header 영역 빼고 싶으면 첫번째 요소인 margin-top에 80px(헤더 영역 크기)
		const scope = { rootMargin: '0px 0px -40% 0px' }; // header 영역 빼고 싶으면 첫번째 요소인 margin-top에 80px(헤더 영역 크기)
		const observer = new IntersectionObserver(callback, scope);

		const headingElements = Array.from(document.querySelectorAll('h2, h3, h4, h5'));
		headingElements.forEach((element, id) => {
			element.setAttribute('id', String(id));
			observer.observe(element);
		});

		return () => observer.disconnect();
	}, [indexes]);
};

// export const useScrollSpy = (
// 	setActiveId: Dispatch<SetStateAction<string>>,
// 	indexes: IndexProps[],
// ) => {
// 	useEffect(() => {
// 		const headingElements = Array.from(document.querySelectorAll('h2, h3, h4, h5'));
// 		window.addEventListener('scroll', () => {

// 		});
// 	}, [indexes]);
// };

export const usePaging = (
	setSelected: Dispatch<SetStateAction<string>>,
	setSlicedPosts: Dispatch<SetStateAction<PostProps[]>>,
	setPaging: Dispatch<SetStateAction<PagingProps>>,
	posts: PostProps[],
	PER_PAGE = 8,
) => {
	const router = useRouter();
	const { page, year, tag, series } = router.query;

	Router.events.on('routeChangeComplete', () => {
		// router.isReady 는 쿼리스트링 변경이 완료되기 전에 실행되서 값의 변경을 감지하지 못한다.
		// 반면 router 이벤트를 사용하면 완전히 변경된 후에 작동이 가능한듯 하다.
		callback();
	});

	useEffect(() => {
		// 라우터 이벤트는 쿼리스트링이 없는 기본 url 로 접속시 작동하지 않으므로
		// 기본 url 접속시 1페이지로 보낸다.
		callback();
	}, []);

	function callback() {
		let slicedPosts: PostProps[] = [];
		let selected = '모든글';

		if (year === undefined && tag === undefined && series === undefined) {
			slicedPosts = posts;
		} else if (year !== undefined) {
			slicedPosts = posts.filter(post => post.frontmatter.year === year);
			selected = year as string;
		} else if (tag !== undefined) {
			slicedPosts = posts.filter(post => post.frontmatter.tags?.includes(tag as string));
			selected = tag as string;
		} else if (series !== undefined) {
			slicedPosts = posts.filter(post => post.frontmatter.series === series);
			selected = series as string;
		}

		const currentPage =
			page === undefined
				? 1
				: Number(page) > slicedPosts.length
				? slicedPosts.length
				: Number(page);

		const start = (currentPage - 1) * PER_PAGE;
		const end = currentPage * PER_PAGE;
		const totalPages =
			slicedPosts.length % PER_PAGE === 0
				? slicedPosts.length / PER_PAGE
				: Math.floor(slicedPosts.length / PER_PAGE) + 1;

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

		setSelected(selected);
		setSlicedPosts(slicedPosts.slice(start, end));
		setPaging({
			isFirst: currentPage === 1 ? true : false,
			isLast: currentPage === totalPages ? true : false,
			isPrev: !pageCounts.includes(1), // 1 페이지를 포함하고 있으면 이전 리스트가 없는 것
			isNext: !pageCounts.includes(endNum), // 마지막 페이지를 포함하면 이후 리스트가 없는 것
			currentPage,
			totalPages,
			pageCounts,
		});
	}
};
