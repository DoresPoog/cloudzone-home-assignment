import { useState } from 'react';
import useFetcher from './useFetcher';

export default function useCustomerIDsFetcher() {
	const fetcher = useFetcher();
	const [result, setResult] = useState<{
		type: FormType,
		id: string,
		success: boolean
	} | null>(null);

	let response;

	const submit = async (type: FormType, id: string): Promise<boolean> => {
		let success;

		switch (type) {
			case 'add': {
				response = await fetcher.fetch('https://jpvwzuxjgf.execute-api.il-central-1.amazonaws.com/Prod/customer-ids', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ id }),
				});

				success = response && response.success;

				break;
			}

			case 'check': {
				response = await fetcher.fetch(`https://jpvwzuxjgf.execute-api.il-central-1.amazonaws.com/Prod/customer-ids/${id}`);
				success = response && response.success && response.result;

				break;
			}

			case 'delete': {
				response = await fetcher.fetch(`https://jpvwzuxjgf.execute-api.il-central-1.amazonaws.com/Prod/customer-ids/${id}`, {
					method: 'DELETE',
				});

				success = response && response.success;

				break;
			}
      	}

		setResult({
			type,
			id,
			success
		});

		return success;
	};

	const clear = () => {
		setResult(null);
		fetcher.clear();
	}

	return {
		state: fetcher.state,
		result,
		error: fetcher.error,
		submit,
		clear
	};
}