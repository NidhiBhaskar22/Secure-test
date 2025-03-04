import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import config from "../../../../utils/config";
import { toast } from "react-toastify";

const AssignTest = () => {
  const [usersList, setUsersList] = useState([]);
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/api/auth/get-users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsersList(response.data.users);
      } catch (error) {
        toast.error("Error fetching users");
      }
    };
    fetchUsers();
  }, [token]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/api/tests/get-tests`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Sort tests by createdAt (latest first)
        const sortedTests = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setTests(sortedTests.reverse());
      } catch (error) {
        toast.error("Error fetching tests");
      }
    };
    fetchTests();
  }, [token]);

  // Handle checkbox selection for multiple users
  const handleUserSelection = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  // Handle test assignment and session creation
  const handleAssign = async () => {
    if (!selectedTest) {
      toast.error("Please select a test.");
      return;
    }
    if (selectedUsers.length === 0) {
      toast.error("Please select at least one user.");
      return;
    }
    if (!startTime) {
      toast.error("Please select a start time.");
      return;
    }

    try {
      // Fetch the test details to get duration
      setLoading(true);
      const testResponse = await axios.get(
        `${config.API_URL}/api/tests/get-test/${selectedTest}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const test = testResponse.data;
      const duration = test.Duration; // Extract test duration in minutes

      await Promise.all(
        selectedUsers.map(async (userId) => {
          // Assign the test
          await axios.post(
            `${config.API_URL}/api/assign`,
            { testId: selectedTest, userId },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          console.log("fgfxf", startTime);

          // Create session for the assigned user
          await axios.post(
            `${config.API_URL}/api/sessions/start`,
            {
              userId,
              testId: selectedTest,
              startTime,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        })
      );

      toast.success("Test assigned and sessions created successfully!");
      setSelectedUsers([]); // Reset selection after assigning
      setStartTime(""); // Reset start time
    } catch (error) {
      toast.error("Failed to assign test or create sessions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-[60%] mt-20 bg-white p-6">
        <h2 className="text-5xl font-bold mb-10 text-orange-500">Assign Test</h2>

        {/* Select Test */}
        <div className="mb-8">
          <label className="block font-semibold mb-4 text-gray-500 text-2xl">
            Select Test
          </label>
          <select
            onChange={(e) => setSelectedTest(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-md"
          >
            <option value="">Select a test</option>
            {tests.map((test) => (
              <option key={test.TestID} value={test.TestID}>
                {test.Title}
              </option>
            ))}
          </select>
        </div>

        {/* Select Users (Multiple Checkboxes) */}
        <div className="mb-8">
          <label className="block font-semibold mb-4 text-gray-500 text-2xl">
            Select Users
          </label>
          <div className="border border-gray-300 p-4 rounded-md max-h-60 overflow-y-auto">
            {usersList.map((user) => (
              <label key={user.UserID} className="flex items-center mb-3">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.UserID)}
                  onChange={() => handleUserSelection(user.UserID)}
                  className="mr-3"
                />
                {user.FirstName} {user.LastName} ({user.Email})
              </label>
            ))}
          </div>
        </div>

        {/* Select Start Time */}
        <div className="mb-8">
          <label className="block font-semibold mb-4 text-gray-500 text-2xl">
            Select Start Time
          </label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-md"
          />
        </div>

        {/* Assign Button */}
        <button
          onClick={handleAssign}
          className="bg-orange-500 text-white py-2 px-4 rounded-md"
        >
          {!loading? "Assign Test & Create Sessions" : "Assigning..."}
        </button>
      </div>
    </div>
  );
};

export default AssignTest;
