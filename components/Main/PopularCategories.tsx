'use client';
import React from 'react';
import useCurrentLocale from '@/hooks/useCurrentLocale';
import useGetPayloadData from '@/hooks/useGetPayloadData';
import Loading from '@/app/(frontend)/[lang]/loading';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import Image from 'next/image';
import Link from 'next/link';

const PopularCategoriesData = ({ locale }) => {
	const { data, isLoading } = useGetPayloadData('categories', false, locale);
	if (isLoading) return <Loading/>;
	return <div className="max-w-inner-wrapper mx-auto my-0 p-padding xs:p-0"><Carousel>
		<CarouselContent className="gap-4 pt-padding">
			{data.docs.map((item) => (
				<CarouselItem key={item.title}
				              className="basis-[calc(100%_-_(var(--spacing-padding)/3))] sm:basis-[calc(60%_-_(var(--spacing-padding)/3))] xs:basis-[calc(45%_-_(var(--spacing-padding)/2))] lg:basis-[calc(33.3%_-_(var(--spacing-padding)/3))] xl:basis-[calc(25%_-_(var(--spacing-padding)/2.7))] flex flex-col gap-4 border border-neutral-100 rounded-xl p-padding!">
					<Link href={`/${locale}/categories/${item.slug}`}>

						<Image src={item.sizes.thumbnail.url}
						       width={item.sizes.thumbnail.width}
						       height={item.sizes.thumbnail.height}
						       alt={item.title}
						       className="object-cover object-center aspect-square w-full"/>
						<span className="text-lg uppercase">{item.title}</span>
					</Link>
				</CarouselItem>))}
		</CarouselContent>
		<CarouselPrevious/>
		<CarouselNext/>
	</Carousel></div>;
};
const PopularCategories = ({}) => {
	const { code } = useCurrentLocale();
	const { data, isLoading } = useGetPayloadData('layout', true, code);
	if (isLoading) return <Loading/>;
	return (
		<div className="py-padding overflow-hidden">
			<div className="max-w-inner-wrapper mx-auto my-0 px-padding">
				<h2 className="uppercase text-2xl xs:text-3xl font-bold">{data.sections.popularCategories}</h2>
			</div>
			<PopularCategoriesData locale={code}/>
		</div>
	);
};

export default PopularCategories;