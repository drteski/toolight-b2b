'use client';
import React from 'react';
import useGetPayloadData from '@/hooks/useGetPayloadData';
import Loading from '@/app/(frontend)/[lang]/loading';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog';
import RichTextRenderer from '@/components/RichText';

const Footer = ({ locale }: { locale: string }) => {
	const { data, isLoading } = useGetPayloadData('footer', true, locale);
	if (isLoading) return <Loading/>;
	return (
		<footer className="bg-neutral-200 mt-padding">
			<div className="max-w-inner-wrapper mx-auto pt-padding pb-20 px-padding grid grid-rows-2 xs:grid-rows-1 xs:grid-cols-2 gap-8">
				<div className="flex flex-col justify-center gap-1 text-sm">
					<span>{data.address.companyName}</span>
					<span>{data.address.address}</span>
					<span>{data.address.city} {data.address.postalCode}</span>
					<span>NIP: {data.address.nip}</span>
				</div>
				<div><Dialog>
					<DialogTrigger className="font-medium">{data.privacy.title}</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>{data.privacy.title}</DialogTitle>
							<DialogFooter>
								<RichTextRenderer className={'w-full'} data={data.privacy.terms}/></DialogFooter>
						</DialogHeader>
					</DialogContent>
				</Dialog></div>
			</div>

		</footer>
	);
};

export default Footer;