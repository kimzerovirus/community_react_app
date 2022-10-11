export default function ImgBlock({ node, ...props }: any) {
	return (
		<img
			style={{ maxWidth: '60vw' }}
			src={props.src.replace('../../../../public/', '/')}
			alt="이미지"
		/>
	);
}
