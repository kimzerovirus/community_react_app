import BlockquoteBlock from 'src/components/markdownBlocks/BlockquoteBlock';
import CodeBlock from 'src/components/markdownBlocks/CodeBlock';
import EmBlock from 'src/components/markdownBlocks/EmBlock';
import ImgBlock from 'src/components/markdownBlocks/ImgBlock';
import TableBlock from 'src/components/markdownBlocks/TableBlock';

const markDownBlocks = {
	code: CodeBlock,
	blockquote: BlockquoteBlock,
	img: ImgBlock,
	em: EmBlock,
	table: TableBlock,
};

export default markDownBlocks;
