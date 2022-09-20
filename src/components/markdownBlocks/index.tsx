import BlockquoteBlock from 'src/components/markdownBlocks/BlockquoteBlock';
import CodeBlock from 'src/components/markdownBlocks/CodeBlock';
import TableBlock from 'src/components/markdownBlocks/TableBlock';

const markDownBlocks = {
	code: CodeBlock,
	blockquote: BlockquoteBlock, // >
	// img({ node, ...props }) {
	// 	return (
	// 		<img
	// 			style={{ maxWidth: '60vw' }}
	// 			src={props.src.replace('../../../../public/', '/')}
	// 			alt="MarkdownRenderer__Image"
	// 		/>
	// 	);
	// },
	em({ node, children, ...props }: any) {
		return (
			<span style={{ fontStyle: 'italic' }} {...props}>
				{children}
			</span>
		);
	},
	table: TableBlock,
};

export default markDownBlocks;
