import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import config from "../../../../utils/config";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const TestsList = () => {
  const [tests, setTests] = useState([]);
  const [sessions, setSessions] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const testsPerPage = 9;
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user.UserID);
  console.log(userId);

  useEffect(() => {
    const fetchAssignedTests = async () => {
      try {
        const response = await axios.get(
          `${config.API_URL}/api/tests/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setTests(response.data);
      } catch (error) {
        toast.error("Error fetching assigned tests");
      }
    };

    fetchAssignedTests();
  }, [token, userId]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const sessionPromises = tests.map(async (test) => {
          const response = await axios.get(
            `${config.API_URL}/api/sessions?userId=${userId}&testId=${test.TestID}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          return { testId: test.TestID, session: response.data };
        });

        const sessionData = await Promise.all(sessionPromises);
        const sessionMap = sessionData.reduce((acc, { testId, session }) => {
          acc[testId] = session;
          return acc;
        }, {});

        setSessions(sessionMap);
      } catch (error) {
        toast.error("Error fetching session details");
      }
    };

    if (tests.length > 0) {
      fetchSessions();
    }
  }, [tests, token, userId]);

  // Function to Determine Test Status
  const getStatus = (session) => {
    if (!session) return "UPCOMING"; // Default if no session found
    const now = new Date();
    const start = new Date(session.startTime);
    const end = new Date(session.endTime);

    if (now < start) return "UPCOMING";
    if (now >= start && now <= end) return "LIVE";
    return "DONE";
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
        <h2 className="text-5xl font-bold mb-6 text-orange-500">
          Your Assigned Tests
        </h2>

        {/* Grid Layout */}
        {tests.length === 0 ? (
          <p className="text-gray-600 text-lg">No tests assigned yet.</p>
        ) : (
          <div className="grid grid-cols-3 gap-6 w-full max-w-7xl mx-auto">
            {currentTests.map((test) => {
              const session = sessions[test.TestID];
              const status = getStatus(session);
              const testLink = `http://localhost:5173/test/${test.TestID}/user/${userId}`;

              return (
                <Link
                  key={test.TestID}
                  to={testLink} // ✅ Redirects to test link from email
                  className="bg-white p-8 shadow-md rounded-md border flex flex-col items-center justify-center border-gray-300 hover:shadow-2xl transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-gray-800">
                    {test.Title}
                  </h3>
                  <p className="text-gray-600">{test.Description}</p>
                  <p className="mt-2 text-sm text-gray-500">
                    Duration: {test.Duration} min
                  </p>
                  {session && (
                    <p className="mt-1 text-sm text-gray-500">
                      Start Time: {new Date(session.startTime).toLocaleString()}
                    </p>
                  )}
                  <span
                    className={`mt-3 px-4 py-2 text-white text-sm font-semibold rounded ${
                      status === "UPCOMING"
                        ? "bg-blue-500"
                        : status === "LIVE"
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {status}
                  </span>
                </Link>
              );
            })}
          </div>
        )}

        {/* Pagination Controls */}
        {tests.length > testsPerPage && (
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
        )}
      </div>
    </div>
  );
};

export default TestsList;
