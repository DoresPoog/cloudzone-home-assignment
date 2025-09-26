import { useState } from 'react';

export type FetchState = 'idle' | 'processing';

export interface Fetcher {
	readonly state: FetchState;
	readonly data: any;
	readonly error: string | null;
	fetch: (url: string, options?: RequestInit) => Promise<any>;
	clear: () => void;
}

export default function useFetcher() {
	const [state, setState] = useState<'idle' | 'processing'>('idle');
	const [data, setData] = useState<any>(null);
	const [error, setError] = useState<string | null>(null);

	const fetcher: Fetcher = {
		state,
		data,
		error,
		fetch: async (url: string, options?: RequestInit): Promise<any> => {
			setData(null);
			setError(null);
			setState('processing');

			try {
				const response = await fetch(url, options);

				if (response.ok) {
					const body = await response.json();
					setData(body);
					return body;
				} else {
					setError(`Status code: ${response.status} - ${response.statusText}`);
				}
			} catch (error: any) {
				setError(error);
			} finally {
				setState('idle');
			}

			return null;
		},
		clear: () => {
			setData(null);
			setError(null);
			setState('idle');
		}
	};

	return fetcher;
}
