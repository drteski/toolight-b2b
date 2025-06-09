import './globals.css';
import { ReactNode } from 'react';
import { Providers } from '@/components/Providers';
import TopBar from '@/components/Header/TopBar';
import Navbar from '@/components/Header/Navbar';
import Footer from '@/components/Footer';


const RootLayout = async ({ children, params }: { children: ReactNode; params: any }) => {
	const parameters = await params;

	return (
		<html lang={parameters.lang}>
		<body className="antialiased">
		<Providers>
			<TopBar/>
			<Navbar/>
			<main>{children}</main>
			<Footer locale={parameters.lang}/>
		</Providers>
		</body>
		</html>
	);
};

export default RootLayout;
