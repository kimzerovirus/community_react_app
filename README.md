
배포 설정
```
yarn deploy-sh [커밋 메시지]

chmod +x deploy.sh
./deploy.sh [커밋 메시지]

curl -v -X GET "http://localhost:3000"
```

구글에서 여러 *static blog* 자료를 보았지만 대부분이 *jekyll* 또는 *gatsby* 를 기반으로 하고 있다. 하지만 나는 리액트를 공부할겸 만드는 것이므로 *jekyll* 은 후보군에서 제외하였고 남은 선택지는 *gatsby* 와 *next.js* 였는데 사용해 본 적이 없는 *gatsby* 보다는 기존에 사용해 본 적이 있는 *next.js* 를 사용하기로 결정하였다. (리액트 코드는 어차피 *gatsby* 로 만든 블로그와 비슷 하므로 *gatsby* 블로그를 많이 참고하였다.)

유튜브에만 검색해도 *next.js* 블로그 예제는 많은데 그저 예제이므로 실질적으로 *jekyll* 템플릿과 같이 깃허브 블로그로 실사용 할 만한 수준의 자료는 없다. 따라서 직접 스타일을 만들어야 하지만 나는 디자이너가 아니므로 *mui*  도움을 받아 만들게 되었다. 그런데 만들다 보니 *mui* 의 디자인 만으로는 만족할 수 없었고 급기야 *styled-components* 와 *scss* 를 추가로 사용하게 되었다. 이 부분은 *mui* 를 커스텀하다 보니 오히려 생산성이 안나와서 사용하게 되었다. 덕분에 좀 더 빠르게 스타일을 완성시켰지만 여러가지 스타일 작성법이 들어가서 추후에 디자인 변경시 매우 복잡해질 것 같아 *mui* 와 *scss* 를 제거하고 *styled* 로 전부 교체해야 할 것 같다.

*static blog* 를 만드는 기본적인 구성은 이와 같다. 
- *md* 파일을 *html* 문법으로 변환하는 과정
- 변환된 *html* 에 스타일을 입히는 과정, 특히 코드 하이라이팅
- 인터넷 포털에서 검색이 가능하게 해 줄 *SEO* 적용 

위의 두 과정만 만들면 기본적인 마크다운 블로그의 형태를 갖추게 되고 이 외 나머지는 본인의 선호도에 따라 추가 작업 해주면 된다. 예를 들면 기능적인 면에서는 sticky목차나 태그, 검색, 댓글 기능 등이 있을 것이고 디자인적인 면에서는 다크모드와 같은 것들 말이다.


Next.js SEO
_app.tsx 는 서버사이드 데이터이므로 여기서 SEO를 설정해줘야 카카오톡 같은데에서 정상 작동한다. 만약 페이지단에서 설정을 하게 되면 이는 클라이언트 사이드에서 렌더링 될때 자바스크립트를 통해 태그 내용을 교체하는 것이므로 서버사이드 데이터만 취급하는 카카오톡 같은 경우에는 작동하지 않게된다. 참고로 카카오톡은 og태그를 기반으로 작동하므로 og태그 설정을 잘해줘야한다.
https://developers.kakao.com/tool/debugger/sharing

소스코드 참고 자료
> https://github.com/vercel/next-learn/tree/master/basics/dynamic-routes-starter
> https://nextjs.org/learn/basics/dynamic-routes/setup
> https://github.com/jeonghwan-kim/jeonghwan-kim.github.com
> https://github.com/emgoto/emgoto.com
> https://demo.vercel.blog/
> https://github.com/jonschlinkert/gray-matter
> https://medium.com/nextjs/build-the-static-blog-with-next-js-and-markdown-d438c2f74297
> https://github.com/remarkjs/react-markdown
> https://github.com/react-syntax-highlighter/react-syntax-highlighter

디자인 참고 자료
> https://github.com/velopert/velog
> https://www.youtube.com/watch?v=KvoFvmu5eRo&t=2681s
> https://mui.com/material-ui/getting-started/overview/
