import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import config from "../../../utils/config";
import { toast } from "react-toastify";

const TestSummaryPage = () => {
  const { testId, userId } = useParams();
  const token = useSelector((state) => state.auth.token);

  const [testSummary, setTestSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(testSummary);

  useEffect(() => {
    const fetchTestSummary = async () => {
      try {
        const response = await axios.get(
          `${config.API_URL}/api/tests/${testId}/user/${userId}/summary`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTestSummary(response.data);
      } catch (error) {
        toast.error("Error fetching test summary.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestSummary();
  }, [testId, userId, token]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-orange-500">{testSummary.testTitle}</h1>
      <p className="text-lg text-gray-600 mt-2">{testSummary.testDescription}</p>
      <div className="text-red-500 font-bold text-xl mt-2">
        Total Marks: {testSummary.totalMarks}
      </div>

      <div className="w-full max-w-7xl bg-white p-6 mt-6 rounded-lg shadow-md">
        {testSummary.questions.map((question, index) => (
          <div key={question.questionId} className="mb-6 border-b pb-4">
            <h2 className="text-lg font-semibold">
              {index + 1}. {question.questionText} <span className="text-gray-500">({question.marks} marks)</span>
            </h2>

            {/* Options List */}
            {question.options.map((option) => (
              <div key={option.id} className="mt-2 flex items-center">
                <input
                  type="radio"
                  name={`question-${question.questionId}`}
                  value={option.id}
                  checked={question.chosenOption && question.chosenOption.id === option.id}
                  readOnly
                  className="mr-2"
                />
                <div
                  className={`p-2 rounded-md w-full ${
                    question.correctOption?.id === option.id
                      ? "bg-green-300" // ✅ Prevents error if correctOption is undefined
                      : question.chosenOption?.id === option.id
                      ? "bg-red-300" // ✅ Prevents error if chosenOption is undefined
                      : "bg-gray-200"
                  }`}
                >
                  {option.optionText}
                </div>
              </div>
            ))}

            {/* Correct and Chosen Answers */}
            <div className="mt-3 text-sm">
              <strong>Correct Answer:</strong>{" "}
              <span className="text-green-600">{question.correctOption ? question.correctOption.optionText : "Not Available"}</span>
            </div>

            <div className="text-sm">
              <strong>Your Answer:</strong>{" "}
              {question.chosenOption ? (
                <span
                  className={
                    question.chosenOption?.id === question.correctOption?.id
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {question.chosenOption.optionText}
                </span>
              ) : (
                <span className="text-gray-600">No answer selected</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestSummaryPage;
