import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import config from "../../../../utils/config";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { encode as base64Encode } from 'js-base64';
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

const TestList = () => {
  const [tests, setTests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const testsPerPage = 9;
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchTests();
  }, [token]);

  const fetchTests = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/api/tests/get-tests`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const sortedTests = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setTests(sortedTests.reverse());
    } catch (error) {
      toast.error("Error fetching tests");
    }
  };

  const handleDelete = async (testId) => {
    try {
      await axios.delete(`${config.API_URL}/api/tests/delete-test/${testId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Test deleted successfully");
      setTests(tests.filter((test) => test.TestID !== testId));
    } catch (error) {
      toast.error("Failed to delete test");
    }
  };

  // Pagination Logic
  const indexOfLastTest = currentPage * testsPerPage;
  const indexOfFirstTest = indexOfLastTest - testsPerPage;
  const currentTests = tests.slice(indexOfFirstTest, indexOfLastTest);
  const totalPages = Math.ceil(tests.length / testsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <h2 className="text-5xl font-bold mb-12 text-orange-500">
          Available Tests
        </h2>
        <Link to={'/test-creation'} className="text-orange-500 font-extrabold w-full flex lg:ml-64 mb-8">
          <PlusIcon className="h-5 w-5 mr-2"/>Add Test
        </Link>
        {/* Grid Layout */}
        <div className="grid grid-cols-3 gap-6 w-full max-w-7xl mx-auto">
          {currentTests.map((test) => (
            <div
              key={test.TestID}
              className="relative bg-white p-8 shadow-md rounded-md border flex flex-col items-center justify-center border-gray-300 hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {test.Title}
              </h3>
              <p className="text-gray-600">{test.Description}</p>
              <p className="mt-2 text-sm text-gray-500">
                Duration: {test.Duration} min | Marks: {test.TotalMarks}
              </p>
              <Link to={`/test-preview/${base64Encode(test.TestID)}`} className="mt-4 text-orange-500 font-bold">
                View Test
              </Link>
              {/* Delete Button */}
              <button 
                onClick={() => handleDelete(test.TestID)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <TrashIcon className="h-6 w-6" />
              </button>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-center mt-6 space-x-4 fixed bottom-0 w-full bg-white p-12 z-20">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`rounded-full h-10 w-10 flex items-center justify-center  ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 text-white"
            }`}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>

          <span className="text-gray-700 font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`rounded-full h-10 w-10 flex items-center justify-center ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 text-white"
            }`}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestList;
