import React from 'react'
import { CheckCircle } from 'lucide-react'

export function Card({ title, Description, Deadline }) {
  const handleDelete = () => {
    alert('Free trial started!');
  };

  const handleMark = () => {
    alert('Free trial started!');
  };

  return (
    <section className="relative w-full overflow-hidden bg-white pb-14">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="mx-auto md:max-w-4xl">
          <div className="-m-5 flex flex-wrap">
            <div className="w-full p-5 md:w-1/2">
              <div className="rounded-md border bg-white bg-opacity-90">
                <div className="border-b">
                  <div className="px-9 py-7">
                    <h3 className="mb-3 text-xl font-bold leading-snug text-gray-900">Title</h3>
                    <p className="font-medium leading-relaxed text-gray-500">
                      { title }
                    </p>
                  </div>
                </div>
                <div className="px-9 pb-9 pt-8 backdrop:blur-md">
                  <p className="mb-6 font-medium leading-relaxed text-gray-600">
                    Description
                  </p>
                  <p className="mb-6 font-medium leading-relaxed text-gray-600">
                   { Description }
                    </p>
                  <p className="mb-6 text-lg font-semibold leading-normal text-gray-600">
                    <span>Deadline</span>
                    <span className="ml-2 text-gray-900"> {Deadline}</span>
                  </p>
                  <div className="md:inline-block">
                    <button
                      type="button"
                      onClick={handleMark}
                      className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      Mark as Done!!
                    </button>
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                        Delete task
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Card