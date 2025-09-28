import { useState } from 'react';
import useFetcher from './useFetcher';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const CUSTOMER_IDS_URL = `${API_URL}/customer-ids`;
const headers = {
	'X-Api-Key': API_KEY
};

export default function useCustomerIDsFetcher() {
	const fetcher = useFetcher();
	const [id, setId] = useState<string>('');

	let response;

	const submit = async (type: FormType, id: string): Promise<boolean> => {
		let success;
		let errors = [];

		setId(id);

		switch (type) {
			case 'add': {
				response = await fetcher.fetch(CUSTOMER_IDS_URL, {
					method: 'POST',
					headers: {
						...headers,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ id }),
				});

				success = response && response.success;
				errors = response.errors;

				break;
			}

			case 'check': {
				response = await fetcher.fetch(`${CUSTOMER_IDS_URL}/${id}`, {
					headers
				});
				success = response && response.success && response.result;

				break;
			}

			case 'delete': {
				response = await fetcher.fetch(`${CUSTOMER_IDS_URL}/${id}`, {
					method: 'DELETE',
					headers
				});

				success = response && response.success;

				break;
			}
      	}

		return success;
	};

	const clear = () => {
		setId('');
		fetcher.clear();
	}

	return {
		id,
		state: fetcher.state,
		data: fetcher.data,
		error: fetcher.error,
		submit,
		clear
	};
}