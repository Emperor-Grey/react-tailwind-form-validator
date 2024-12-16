import { useState } from 'react';

import { FormContent } from './Form/FormContent';
import { SubmittedData } from './types';

function App() {
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(
    null,
  );

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full bg-gradient-to-r from-slate-300 to-gray-400">
      <div className="w-fit p-8 text-center">
        {/* Heading and description */}
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to the Official Demo of the React Tailwind Form Validator
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          This demo showcases form validation using React, Tailwind CSS, and
          custom hooks. Check the source code on{' '}
          <a
            href="https://github.com/Emperor-Grey/react-tailwind-form-validator"
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            GitHub.
          </a>
        </p>
      </div>

      {/* Main content */}
      <div className="flex justify-center items-start gap-8 mt-8">
        {/* Form Content Box */}
        <div className="flex flex-col items-center p-6 bg-neutral-500/40 backdrop-blur-lg rounded-lg shadow-xl hover:px-5 transition-all duration-300 ease-linear w-1/2">
          <FormContent setSubmittedData={setSubmittedData} />
        </div>

        {/* Submitted Data Box */}
        <div className="p-6 border rounded-lg shadow-lg bg-gray-100 w-1/2">
          <h2 className="text-2xl font-bold mb-4">Submitted Data</h2>
          {submittedData ? (
            <div>
              <pre className="bg-white p-4 border rounded shadow whitespace-pre-wrap break-words">
                {JSON.stringify(submittedData, null, 2)}
              </pre>
              <button
                onClick={() => setSubmittedData(null)}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              >
                Clear Now
              </button>
            </div>
          ) : (
            <p className="text-gray-500">
              Submit the form to see the data here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
