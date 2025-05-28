import { cn } from '@/lib/utils';

const WrapperInner = (props) => {
	return <div className={cn(`max-w-desktop px-4 my-0 mx-auto `, props.className)}>{props.children}</div>;
};

export default WrapperInner;