import { Container, Typography } from '@mui/material';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import markDownBlocks from 'src/components/markdownBlocks';
import { StaticProps } from 'src/pages/post/project/[slug]';
import { dateFormat } from 'src/utils/dateFormat';

function MarkDownView({ htmlstring, data }: StaticProps) {
	return (
		<div style={{ borderTop: '1px solid #ddd', width: '100%' }}>
			<Container maxWidth="md">
				<Typography
					variant="h3"
					noWrap
					component="h1"
					mt={6}
					color="primary"
					sx={{
						fontWeight: 700,
					}}
				>
					{data.title}
				</Typography>
				<Typography
					variant="body1"
					noWrap
					component="p"
					mt={1}
					mb={3}
					sx={{
						color: 'inherit',
					}}
				>
					{dateFormat(data.date)}
				</Typography>
				<ReactMarkdown
					className="markdown-style"
					remarkPlugins={[remarkGfm]} // TODO link, table, checklist - styling
					rehypePlugins={[[rehypeRaw, { passThrough: ['element'] }]]}
					components={markDownBlocks}
				>
					{htmlstring
						.replace(/\n\s\n\s/gi, '\n\n&nbsp;\n\n')
						.replace(/\*\*/gi, '@$_%!^')
						.replace(/@\$_%!\^/gi, '**')
						.replace(/<\/?u>/gi, '*')}
				</ReactMarkdown>
			</Container>
		</div>
	);
}

export default MarkDownView;
