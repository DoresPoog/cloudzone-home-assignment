import { useState } from 'react';
import Spinner from './loaders/spinner';
import PulsingResult from './loaders/pulsing-result';

interface CustomerIDFormProps {
	prompt: string;
	onSubmit: (id: string) => Promise<boolean>;
	isProcessing: boolean;
	show?: boolean;
}

export default function CustomerIDForm({ prompt, onSubmit, isProcessing, show }: CustomerIDFormProps) {
  const [id, setId] = useState<string>();

  async function _onSubmit(event: React.FormEvent) {
	event.preventDefault();
	const success = await onSubmit(id!);

	if (success) {
		setId('');
	}
  }

  return (
	<form className={`relative z-0 max-w-sm mx-auto ${show ? 'animate-fade-in-left' : 'hidden'}`} onSubmit={_onSubmit}>

	  <div className="mb-5">
		<label htmlFor="id" className="block mb-2 text-sm font-medium text-white-900">{prompt} ID</label>
		<input
		  id="id"
		  type="text"
		  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
		  placeholder="e.g. 314268632"
		  required
		  value={id}
		  onChange={(e) => setId(e.target.value)}
		/>
	  </div>
	  
	  <button
		type="submit"
		disabled={isProcessing}
		className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:border-gray-200 disabled:text-grey-500 disabled:shadow-none disabled:hover:bg-blue-700 disabled:cursor-default">
		  {isProcessing ? <><Spinner /> Submitting...</> : prompt}
	  </button>

	</form>
  );
}
