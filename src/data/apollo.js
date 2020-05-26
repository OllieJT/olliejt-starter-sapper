import fetch from 'node-fetch';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = new createHttpLink({
	uri: 'TODO',
	fetch,
});

const middlewareLink = setContext(() => ({
	headers: {
		key: 'value',
	},
}));

const client = new ApolloClient({
	link: middlewareLink.concat(httpLink),
	cache: new InMemoryCache(),
});

export default client;
