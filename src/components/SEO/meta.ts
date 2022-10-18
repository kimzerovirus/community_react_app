//https://kyounghwan01.github.io/blog/React/next/next-seo/#카카오톡-미리보기-이슈
//https://medium.com/nextjs/how-to-add-seo-in-the-nextjs-app-4eb745a382a7

export const config = {
	openGraph: {
		type: 'website',
		locale: 'ko_KR',
		url: 'https://kimzerovirus.github.io/',
		title: 'kimzerovirus.log',
		description: 'kimzerovirus의 블로그입니다.',
		site_name: 'Kimzerovirus.log',
		keywords:
			'java, javascript, typescript, kotlin, spring, spring-boot, react, 개발, 개발 블로그, blog',
		images: [
			{
				url: 'https://avatars.githubusercontent.com/u/68390715?s=400&u=325fb149f87913954651f3a8181577475af3b035&v=4',
				width: 280,
				height: 280,
				alt: 'kimzerovirus.log',
				type: 'image/jpeg',
			},
		],
	},
	twitter: {
		handle: '@Official_Kimzerovirus.log',
		site: '@Official_Kimzerovirus.log',
		cardType: 'summary_large_image',
	},
};
