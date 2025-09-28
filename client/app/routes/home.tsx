import { useState } from 'react';
import type { Route } from './+types/home';
import CustomerIDForm from '~/components/customer-id-form';
import useCustomerIDsFetcher from '~/hooks/useCustomerIDsFetcher';
import PulsingResult from '~/components/loaders/pulsing-result';
import SuccessAnimatedIcon from '~/components/icons/animated/success/success-animated-icon';
import ErrorAnimatedIcon from '~/components/icons/animated/error/error-animated-icon';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CloudZone Home Assignment" },
    { name: "Customer IDs", content: "Customer IDs" },
  ];
}

export default function Home() {
  const [selectedForm, setSelectedForm] = useState<FormType>('add');
  const fetcher = useCustomerIDsFetcher();
  const isProcessing = fetcher.state === 'processing';

  function onClickFormTab(form: FormType) {
    if (isProcessing) {
      return;
    }

    fetcher.clear();
    setSelectedForm(form);
  }

  async function onSubmit(id: string): Promise<boolean> {
    return fetcher.submit(selectedForm, id);
  }

  let result = null;
  let ResultIcon = (!fetcher.data || !fetcher.data.success) ? ErrorAnimatedIcon : SuccessAnimatedIcon;

  if (fetcher.error) {
    result = `Failed to ${selectedForm} ID '${fetcher.id}'.`;
  } else if (fetcher.data) {
    result = `Customer ID '${fetcher.id}' `;

    switch (selectedForm) {
      case 'add': {
        if (fetcher.data.success) {
          result += 'was added successfully!';
        } else if (fetcher.data.errors.includes('id_already_exists')) {
          result += 'already exists!';
        } else {
          result += 'could not be added - please try again.';
        }

        break;
      }
      case 'check': {
        result += fetcher.data.result ? 'exists!' : 'does not exist.';
        break;
      }
      case 'delete': {
        if (fetcher.data.success) {
          result += 'deleted successfully.';
        } else if (fetcher.data.errors.includes('id_does_not_exist')) {
          result += 'does not exist.';
        }

        break;
      }
    }
  }

  return (
    <main className="flex flex-col items-center gap-16 min-h-0 w-[500px] m-auto justify-center mt-[150px] pb-4 animate-fade-in">

        <header className="flex flex-col items-center gap-9 text-center">
          <h1 className="text-4xl">Customer IDs</h1>
        </header>

        <div className="relative z-10 max-w-[500px] w-full space-y-6 px-4">

          <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
              <ul className="flex flex-wrap -mb-px">
                  <li className="me-2">
                      <button onClick={() => onClickFormTab('add')}
                              className={"inline-block cursor-pointer p-4 border-b-2 rounded-t-lg hover:text-lightgray-600 dark:hover:text-gray-300 " + (selectedForm === 'add' ? "active text-white border-blue-600" : "border-transparent text-lightgrey hover:border-gray-300")}
                      >
                        Add
                      </button>
                  </li>
                  <li className="me-2">
                      <button onClick={() => onClickFormTab('check')}
                              className={"inline-block cursor-pointer p-4 border-b-2 rounded-t-lg hover:text-lightgray-600 dark:hover:text-gray-300 " + (selectedForm === 'check' ? "active text-white border-blue-600" : "border-transparent text-lightgrey hover:border-gray-300")}
                      >
                        Check
                      </button>
                  </li>
                  <li className="me-2">
                      <button onClick={() => onClickFormTab('delete')}
                              className={"inline-block cursor-pointer p-4 border-b-2 rounded-t-lg hover:text-lightgray-600 dark:hover:text-gray-300 " + (selectedForm === 'delete' ? "active text-white border-blue-600" : "border-transparent text-lightgrey hover:border-gray-300")}
                      >
                        Delete
                      </button>
                  </li>
              </ul>
          </div>

          <div className="relative z-10 bg-gray-800 rounded-lg shadow p-6 min-h-[200px]">
            <CustomerIDForm
              show={selectedForm === 'add'}
              prompt={'Add'}
              onSubmit={onSubmit}
              isProcessing={isProcessing}
            />

            <CustomerIDForm
              show={selectedForm === 'check'}
              prompt={'Check'}
              onSubmit={onSubmit}
              isProcessing={isProcessing}
            />

            <CustomerIDForm
              show={selectedForm === 'delete'}
              prompt={'Delete'}
              onSubmit={onSubmit}
              isProcessing={isProcessing}
            /> 
          </div>
          
        </div>

        <div className="w-[80%] h-[100px]">
          <span className="block mb-[20px] text-2xl">Result</span>
          <div className="text-l text-white-500">
            {isProcessing && <PulsingResult />}

            {(!isProcessing && result) ? <div className="flex items-center gap-1 pl-3">
                <ResultIcon className="w-[33px] inline-block" />
                <span>{result}</span>
              </div> : null
            }
          </div>
        </div>

        <div className="relative z-10 max-w-[500px] w-full space-y-6 px-4">
          <img
            src="https://www.cloudzone.io/wp-content/uploads/2025/08/Logo_white-1-1.png"
            alt="by CloudZone"
            width="100"
            className="relative opacity-0 float-right mt-5 animate-fade-in-left-1-0_5s-2s"
          />
        </div>
        
    </main>
  );
}
