import { useState } from 'react';
import type { Route } from './+types/home';
import CustomerIDForm from '~/components/customer-id-form';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CloudZone Home Assignment" },
    { name: "Customer IDs", content: "Customer IDs" },
  ];
}

export default function Home() {
  const [selectedForm, setSelectedForm] = useState<'add' | 'check' | 'delete'>('add');
  const [isProcessing, setIsProcessing] = useState(false);

  function onClickFormTab(form: 'add' | 'check' | 'delete') {
    setSelectedForm(form);
  }

  async function onSubmit(id: string) {
    let response;
    
    setIsProcessing(true);

    try {
      switch (selectedForm) {
        case 'add':
          response = await fetch('https://jpvwzuxjgf.execute-api.il-central-1.amazonaws.com/Test/customer-ids', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
          }).then(res => res.json());

          if (response.success) {
            alert(`Customer ID ${id} added successfully!`);
          }

          break;
        case 'check':
          response = await fetch(`https://jpvwzuxjgf.execute-api.il-central-1.amazonaws.com/Test/customer-ids/${id}`).then(res => res.json());

          if (response.success) {
            if (response.result) {
              alert(`Customer ID ${id} exists!`);
            } else {
              alert(`Customer ID ${id} does not exist.`);
            }
          }

          break;
        case 'delete':
          response = await fetch(`https://jpvwzuxjgf.execute-api.il-central-1.amazonaws.com/Test/customer-ids/${id}`, {
            method: 'DELETE',
          }).then(res => res.json());

          if (response.success) {
            alert(`Customer ID ${id} deleted successfully!`);
          }

          break;
      }
    } catch (error) {
      alert(`Error processing customer ID ${id}: ${error}`);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">

        <header className="flex flex-col items-center gap-9 text-center">
          <div className="w-[500px] max-w-[100vw] p-4">
            <h1 className="text-4xl">Customer IDs</h1>
            <h2 className="text-2xl">By</h2>

            <img
              src="https://www.cloudzone.io/wp-content/uploads/2025/08/Logo_white-1-1.png"
              alt="by CloudZone"
              width="100"
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
            <CustomerIDForm prompt={'Add'} isProcessing={isProcessing} onSubmit={onSubmit} show={selectedForm === 'add'} />
            <CustomerIDForm prompt={'Check'} isProcessing={isProcessing} onSubmit={onSubmit} show={selectedForm === 'check'} />
            <CustomerIDForm prompt={'Delete'} isProcessing={isProcessing} onSubmit={onSubmit} show={selectedForm === 'delete'} /> 
          </div>
          
        </div>
        
      </div>
    </main>
  );
}
