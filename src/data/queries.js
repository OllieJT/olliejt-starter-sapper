import { gql } from 'apollo-boost';

export const EVERYTHING = gql`
	# everything needed for route...
	# (cache misses fall back to loading)

	query shop {
		shop {
			name
		}
	}
`;

export const SOMETHING = gql`
	# everything needed for route...
	# (cache misses fall back to loading)

	query shop {
		shop {
			name
		}
	}
`;
