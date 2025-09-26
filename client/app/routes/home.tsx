import { useState } from 'react';
import type { Route } from './+types/home';
import CustomerIDForm from '~/components/customer-id-form';
import useCustomerIDsFetcher from '~/hooks/useCustomerIDsFetcher';

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

  if (fetcher.error) {
    result = (
      <div>
        Failed to {selectedForm} ID '{fetcher.result!.id}'.
      </div>
    )
  } else if (fetcher.result) {
    switch (selectedForm) {
      case 'add': {
        result = (
          <div>
            Customer ID '{fetcher.result.id}' added successfully!
          </div>
        );

        break;
      }
      case 'check': {
        result = (
          <div>
            Customer ID '{fetcher.result.id}' {fetcher.result.success ? 'exists!' : 'does not exist.'}
          </div>
        );

        break;
      }
      case 'delete': {
        result = (
          <div>
            Customer ID '{fetcher.result.id}' deleted successfully.
          </div>
        );

        break;
      }
    }
  }

  return (
    <main className="flex items-center justify-center pt-16 pb-4 animate-fade-in">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">

        <header className="flex flex-col items-center gap-9 text-center">
          <div className="w-[500px] max-w-[100vw] p-4">
            <h1 className="text-4xl">Customer IDs</h1>
            {/* <h2 className="text-2xl">By</h2> */}

            <img
              src="https://www.cloudzone.io/wp-content/uploads/2025/08/Logo_white-1-1.png"
              alt="by CloudZone"
              width="100"
              className="relative opacity-0 float-right mt-5 animate-fade-in-left-1-0_5s-2s"
            />
          </div>
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
              result={result}
            />

            <CustomerIDForm
              show={selectedForm === 'check'}
              prompt={'Check'}
              onSubmit={onSubmit}
              isProcessing={isProcessing}
              result={result}
            />

            <CustomerIDForm
              show={selectedForm === 'delete'}
              prompt={'Delete'}
              onSubmit={onSubmit}
              isProcessing={isProcessing}
              result={result}
            /> 
          </div>
          
        </div>
        
      </div>
    </main>
  );
}
