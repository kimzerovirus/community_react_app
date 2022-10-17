export default function ImgBlock({ node, ...props }: any) {
	return (
		<img
			style={{ width: '100%' }}
			src={props.src.replace('../../../../public/', '/')}
			alt="이미지"
		/>
	);
}
