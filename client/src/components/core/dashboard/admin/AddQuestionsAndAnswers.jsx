import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import config from "../../../../utils/config";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { decode as base64Decode } from "js-base64";

const AddQuestionsAndOptions = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const encodedTestId = queryParams.get("testId");
  const preselectedTestId = encodedTestId ? base64Decode(encodedTestId) : "";
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(preselectedTestId || "");
  const [questionText, setQuestionText] = useState("");
  const [marks, setMarks] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState("");
  const [totalMarks, setTotalMarks] = useState(0);
  const [currentMarks, setCurrentMarks] = useState(0);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);

  // Fetch all tests
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get(
          `${config.API_URL}/api/tests/get-tests`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTests(response.data);
      } catch (error) {
        toast.error("Error fetching tests");
      }
    };
    fetchTests();
  }, [token]);

  // Fetch Total & Current Marks 
  useEffect(() => {
    if (!selectedTest) return;

    const fetchMarks = async () => {
      try {
        const response = await axios.get(
          `${config.API_URL}/api/tests/test-marks/${selectedTest}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTotalMarks(response.data.TotalMarks);
        setCurrentMarks(response.data.CurrentMarks);
      } catch (error) {
        toast.error("Error fetching test marks");
      }
    };

    fetchMarks();
  }, [selectedTest, token]);

  // Handle input changes for options
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  // Function to create a question & add options
  const handleCreateQuestionWithOptions = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newMarks = Number(marks);
    if (currentMarks + newMarks > totalMarks) {
      toast.error(`Total marks exceeded! Max allowed: ${totalMarks}`);
      setLoading(false);
      return;
    }

    try {
      // Step 1: Create the Question
      const questionResponse = await axios.post(
        `${config.API_URL}/api/tests/questions`,
        {
          testId: Number(selectedTest),
          questionText,
          marks: newMarks,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const questionId = questionResponse.data.id;

      // Step 2: Create the 4 Options
      const optionsResponse = await axios.post(
        `${config.API_URL}/api/tests/options/multiple`,
        {
          questionId,
          options,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Step 3: Assign Correct Option
      const optionIds = optionsResponse.data.map((option) => option.id);
      const optionId = optionIds[Number(correctOption - 1)];

      await axios.post(
        `${config.API_URL}/api/tests/questions/correct-option`,
        {
          questionId,
          optionId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Question and options added successfully!");
      setCurrentMarks((prev) => prev + newMarks);
      setQuestionText("");
      setMarks("");
      setOptions(["", "", "", ""]);
      setCorrectOption("");
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Failed to add question and options"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full mt-10 bg-white p-6 px-40">
        <h2 className="text-5xl font-bold mb-6 text-orange-500">
          Add Test Questions & Options
        </h2>
        {(currentMarks === totalMarks && currentMarks!== 0) ? (
          <div className="text-3xl font-extrabold mt-12">No more questions can be added</div>
        ) : (
          <>
        {/* Select Test */}
        <div className="mb-6">
          <label className="block font-medium text-gray-600">Select Test</label>
          <select
            value={selectedTest}
            onChange={(e) => setSelectedTest(e.target.value)}
            className="form-style w-full border px-4 py-2 rounded-md"
          >
            <option value="">-- Select a Test --</option>
            {tests.map((test) => (
              <option key={test.TestID} value={test.TestID}>
                {test.Title}
              </option>
            ))}
          </select>
        </div>

         {/* Current & Total Marks */}
         <p className="text-gray-700 mb-4">
          Current Marks:{" "}
          <span className="text-orange-500 font-semibold">{currentMarks}</span> /{" "}
          <span className="text-orange-500 font-semibold">{totalMarks}</span>
        </p>

        {/* Add Question & Options Form */}
        <form onSubmit={handleCreateQuestionWithOptions} className="mb-8">
          <h3 className="text-xl font-semibold mb-4">
            Add a Question & Options
          </h3>

          <div className="mb-4">
            <label className="block text-gray-600">Question Text</label>
            <input
              type="text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="form-style w-full border px-4 py-2 rounded-md"
              placeholder="Enter question"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600">Marks</label>
            <input
              type="number"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              className="form-style w-full border px-4 py-2 rounded-md"
              placeholder="Enter marks"
              required
            />
          </div>

          {/* Options */}
          <h3 className="text-lg font-semibold mt-6">Enter 4 Options</h3>
          {options.map((option, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-600">Option {index + 1}</label>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="form-style w-full border px-4 py-2 rounded-md"
                placeholder={`Enter option ${index + 1}`}
                required
              />
            </div>
          ))}

          {/* Correct Option */}
          <div className="mb-4">
            <label className="block text-gray-600">Correct Option (1-4)</label>
            <input
              type="number"
              value={correctOption}
              onChange={(e) => setCorrectOption(e.target.value)}
              className="form-style w-full border px-4 py-2 rounded-md"
              placeholder="Enter correct option index"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 px-6 py-2 rounded-md text-white font-medium transition ${
              loading ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {loading
              ? "Adding Question & Options..."
              : "Add Question & Options"}
          </button>
        </form>
        </>
        )}
        
      </div>
    </div>
  );
};

export default AddQuestionsAndOptions;
