import { gql } from 'apollo-boost';

export const GET_PAGE = gql`
	{
		characters {
			results {
				name
				species
			}
		}
		locations {
			results {
				name
				dimension
			}
		}
	}
`;

export const GET_CHARACTERS = gql`
	{
		characters {
			results {
				name
				species
			}
		}
	}
`;

export const GET_LOCATIONS = gql`
	{
		locations {
			results {
				name
				dimension
			}
		}
	}
`;
