'use client';

import { Input } from '@/components/ui/input';
import Logo from '@/components/Logo';
import WrapperInner from '@/components/layout/WrapperInner';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useState } from 'react';
import { useWindowScroll } from '@/hooks/useWindowScroll';

const MotionImage = motion(Image);

const Header = ({ dictionary }) => {
	const scrollY = useWindowScroll();
	const { scrollYProgress } = useScroll();
	const logoScale = useTransform(scrollYProgress,
		[0, 0.3],
		[500, 200]   // Zmniejszenie logo o 20%
	);
	const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 0]);
	const backgroundHeight = useTransform(scrollYProgress, [0, 0.3], [500, 200]);

	const isScrolled = scrollY > 50;

	return (
		<header className="fixed top-0  z-10">
			<MotionImage src="/static/background.jpg"
			             className="object-cover object-[center_top] opacity-50"
			             style={{
				             opacity   : backgroundOpacity,
				             height    : backgroundHeight,
				             transition: '0.1s all'
			             }}
			             width={3386}
			             height={2677}
			             alt="bg"/>
			<WrapperInner className="absolute inset-0 w-full flex flex-col gap-16 justify-center items-center h-full">
				<Logo className="w-full h-auto"
				      style={{
					      width     : logoScale,
					      transition: '0.1s all'
				      }}
				/>
				<Input className="bg-white px-8 py-10 lg:text-xl" type="text" placeholder={dictionary.search}/>
			</WrapperInner>
		</header>
	);
};

export default Header;