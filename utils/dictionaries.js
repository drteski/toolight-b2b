const dictionaries = {
	pl: () => import('../dictionaries/pl.json').then((module) => module.default),
	en: () => import('../dictionaries/en.json').then((module) => module.default)
};


export const getDictionary = (locale) => {
	return new Promise((resolve) => {
		(async () => {
			resolve(dictionaries[locale]());
		})();
	});
};