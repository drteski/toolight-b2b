'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import payloadParamsGraphQLBuilder from '@/lib/payloadParamsQueryBulider';

const useGetPayloadProductsGraphQL = (
	locale: string,
	limit: string | null = '24',
	page: string | null = '1',
	category: string = '',
	query: { [key: string]: string[] } | null = null
) => {
	const where = payloadParamsGraphQLBuilder(query);

	where.AND = where.AND || [];
	if (category !== '') {
		where.AND.push({
			category: {
				slug: { equals: category }
			}

		});
	}
	where.AND.push({ active: { equals: true } });

	const getPayloadProducts = async () => {
		// Uwaga: locale bez cudzysłowów — enum!
		const graphqlQuery = {
			query: `
        query GetProducts {
          Products(locale: ${locale}, limit: ${limit}, page: ${page}, where: ${JSON.stringify(where).replace(/"([^"]+)":/g, '$1:')}) {
            docs {
              id
              title
              parameters {
                name
                value
              }
              slug
              mainImage {
                url
              }
            }
            totalDocs
            limit
            page
            totalPages
          }
        }
      `
		};

		return await axios
			.post('/api/graphql', graphqlQuery, {
				headers: {
					'Accept-Language': locale,
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				const graphqlResponse = res.data;

				// Obsługa błędów GraphQL
				if (graphqlResponse.errors) {
					throw new Error(graphqlResponse.errors[0].message);
				}

				return graphqlResponse.data?.Products;
			})
			.catch((error) => {
				console.error('GraphQL error:', error);
				return {
					message: error.message
				};
			});
	};

	const { data, error, isError, isLoading } = useQuery({
		queryKey: ['productsGraphQL', locale, limit, page, category, query],
		queryFn: getPayloadProducts
	});

	return { data, error, isError, isLoading };
};

export default useGetPayloadProductsGraphQL;
