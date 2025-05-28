'use client';
import Wrapper from '@/components/layout/Wrapper';
import Header from '@/components/Header';
import { use, useState } from 'react';
import { useDictionary } from '@/hooks/useDictionary';
import {
	motion,
	useScroll,
	useTransform,
	useMotionValueEvent
} from 'motion/react';

const Home = ({ params }) => {
	const { lang } = use(params);
	const [isLoading, dictionary] = useDictionary(lang);
	const [position, setPosition] = useState('relative');
	const { scrollYProgress } = useScroll();
	const topPosition = useTransform(scrollYProgress, [0, 0.3], [500, 200]);
	const topPosition2 = useTransform(scrollYProgress, [0, 0.3], [0, 20]);
	const topPosition3 = useTransform(
		scrollYProgress,
		[0, 0.3],
		['relative', 'sticky']
	);
	useMotionValueEvent(scrollYProgress, 'change', (current) => {

		setPosition(current >= 0.3 ? 'relative' : 'sticky');
	});

	console.log(topPosition);
	return (
		<Wrapper>
			<Header dictionary={!isLoading && dictionary.layout.header}/>
			<motion.div style={{
				marginTop : topPosition.get() + 104,
				transition: '0.1s all'

			}}>
				<motion.div
					className=" flex gap-4 p-8"
					style={{
						position: 'sticky',
						top     : topPosition
					}}
				>
					<div className="w-64 h-10 bg-red-500"></div>
					<div className="w-64 h-10 bg-red-500"></div>
					<div className="w-64 h-10 bg-red-500"></div>
					<div className="w-64 h-10 bg-red-500"></div>
					<div className="w-64 h-10 bg-red-500"></div>
					<div className="w-64 h-10 bg-red-500"></div>
				</motion.div>
				<motion.div className="grid grid-cols-3 gap-4 p-8">
					<div className="w-64 h-48 bg-green-500"></div>
					<div className="w-64 h-48 bg-green-500"></div>
					<div className="w-64 h-48 bg-green-500"></div>
					<div className="w-64 h-48 bg-green-500"></div>
					<div className="w-64 h-48 bg-green-500"></div>
					<div className="w-64 h-48 bg-green-500"></div>
					<div className="w-64 h-48 bg-green-500"></div>
					<div className="w-64 h-48 bg-green-500"></div>
					<div className="w-64 h-48 bg-green-500"></div>
					<div className="w-64 h-48 bg-green-500"></div>
					<div className="w-64 h-48 bg-green-500"></div>
					<div className="w-64 h-48 bg-green-500"></div>
					<div className="w-64 h-48 bg-green-500"></div>
					<div className="w-64 h-48 bg-green-500"></div>
					<div className="w-64 h-48 bg-green-500"></div>
					<div className="w-64 h-48 bg-green-500"></div>
					<div className="w-64 h-48 bg-green-500"></div>
					<div className="w-64 h-48 bg-green-500"></div>
					<div className="w-64 h-48 bg-green-500"></div>
					<div className="w-64 h-48 bg-green-500"></div>
				</motion.div>
			</motion.div>
			<motion.div className="grid grid-cols-3 gap-4 p-8">
				<div className="w-64 h-48 bg-green-500"></div>
				<div className="w-64 h-48 bg-green-500"></div>
				<div className="w-64 h-48 bg-green-500"></div>
			</motion.div>
		</Wrapper>
	);
};

export default Home;
