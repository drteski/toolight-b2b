import { useEffect, useState } from 'react';
import axios from 'axios';

export const useDictionary = (lang) => {
	const [isLoading, setIsLoading] = useState(true);
	const [dictionary, setDictionary] = useState(null);
	useEffect(() => {
		axios.get(`/api/dictionary/${lang}`).then((data) => {
			setDictionary(data.data);
			setIsLoading(false);
		});
	}, [lang, isLoading]);
	return [isLoading, dictionary];
};