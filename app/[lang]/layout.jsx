import './globals.css';


export const metadata = {
	title: 'Toolight'
};

const RootLayout = async ({
	                          children,
	                          params
                          }) => {
	const parameters = await params;

	return (
		<html lang={parameters.lang}>
		<body
			className="antialiased"
		>
		{children}
		</body>
		</html>
	);
};

export default RootLayout;