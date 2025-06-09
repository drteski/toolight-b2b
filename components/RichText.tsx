'use client';

import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

type Props = {
	data: SerializedEditorState;
	className?: string;
};

export default function RichTextRenderer({ data, className }: Props) {
	return <PayloadRichText data={data} className={className}/>;
}