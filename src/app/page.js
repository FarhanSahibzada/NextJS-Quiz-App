"use client";
import React, { useEffect, useState } from "react";


export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [cate, setcate] = useState()
  const [list, setlist] = useState();
const [checked , setchecked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://eaxeli.com/api/v1/questions/quiz?categorySlug=history');
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status} - ${res.statusText}`);
        }
        const data = await res.json();
        if (data) {
          setcate(data)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (cate?.questions && cate.questions.length > 0) {
      setlist(cate.questions[index]); // Assuming you want to display the current question
    }
  }, [cate, index]);

  const handleclick = (ans) => {
      setchecked(true)
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-lg">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
            Quiz Challenge
          </h1>
          <p className="text-lg text-gray-600">Question {index + 1} of {cate?.questions?.length}</p>
        </div>
        <div className="mb-8">
          <p className="text-xl font-semibold text-gray-700 mb-4">
            {list?.question}
          </p>
          {list?.options.map((val, index) => (
            <div key={index} className="space-y-4 ">
              <button className={`mb-2 w-full py-3 ${checked ? (list.answer == val ? `bg-green-500` : `bg-red-500`):`bg-indigo-600`}   text-white rounded-xl font-semibold shadow-md  transition duration-300`}
                onClick={() => handleclick(val)}
              >
                {val}
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button className="py-2 px-6 bg-gray-200 rounded-lg text-gray-700 font-semibold hover:bg-gray-300 transition duration-300"
            onClick={() => setIndex((prev) => prev - 1)
            }
            >
            Back
          </button>
          <button className="py-2 px-6 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition duration-300"
            onClick={() => {setIndex((prev) => prev + 1)
            setchecked(false) }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
