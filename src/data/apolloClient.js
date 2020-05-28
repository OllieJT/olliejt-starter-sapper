import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		// Server URL (must be absolute)
		uri: 'https://rickandmortyapi.com/graphql',
		//credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
		headers: {
			//authorization: process.env.GRAPHQL_SHOPIFY_AUTH,
			//'X-Shopify-Storefront-Access-Token': process.env.GRAPHQL_SHOPIFY_AUTH,
		},
		fetch,
	}),
});

export default client;
