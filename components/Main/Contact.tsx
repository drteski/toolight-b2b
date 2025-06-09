'use client';
import React from 'react';
import useCurrentLocale from '@/hooks/useCurrentLocale';
import useGetPayloadData from '@/hooks/useGetPayloadData';
import Loading from '@/app/(frontend)/[lang]/loading';

const Contact = () => {
	const { code } = useCurrentLocale();
	const { data, isLoading } = useGetPayloadData('layout', true, code);
	if (isLoading) return <Loading/>;
	return (
		<div id="contact" className="py-padding">
			<div className="max-w-inner-wrapper mx-auto my-0 px-padding">
				<h2 className="uppercase text-2xl xs:text-3xl font-bold">{data.sections.contact}</h2>
			</div>

		</div>
	);
};

export default Contact;