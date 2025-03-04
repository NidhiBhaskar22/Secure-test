import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import config from "../../../../utils/config";
import Header from "../../../common/Header";
import { decode as base64Decode } from "js-base64";

const TestPreview = () => {
  const { testId } = useParams();
  const decodedTestId = base64Decode(testId);
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        const response = await axios.get(
          `${config.API_URL}/api/tests/get-test/${decodedTestId}`
        );
        console.log(response.data);
        setTest(response.data);
      } catch (error) {
        toast.error("Error fetching test details");
      } finally {
        setLoading(false);
      }
    };

    fetchTestDetails();
  }, [decodedTestId]);

  if (loading) {
    return (
      <div className="text-center mt-20 text-xl">Loading test details...</div>
    );
  }

  if (!test) {
    return (
      <div className="text-center mt-20 text-xl text-red-500">
        Test not found
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto mt-12 p-8 bg-white">
        <h2 className="text-4xl font-bold text-orange-500 mb-6">
          {test.Title}
        </h2>
        <p className="text-gray-600 text-lg mb-4">{test.Description}</p>
        <p className="text-gray-500 mb-6">
          <strong>Duration:</strong> {test.Duration} min |{" "}
          <strong>Total Marks:</strong> {test.TotalMarks}
        </p>

        {/* Questions Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Questions</h3>
          {test.Questions.length > 0 ? (
            test.Questions.map((q, index) => {
              const question = q.question;
              const correctOptionIds =
                question.correctOption?.map((opt) => opt.optionId) || [];

              return (
                <div
                  key={question.id}
                  className="mb-6 p-4 border rounded-md bg-gray-100"
                >
                  <h4 className="text-lg font-semibold">
                    {index + 1}. {question.questionText}
                  </h4>
                  <p className="text-gray-700">Marks: {question.marks}</p>

                  {/* Options */}
                  <div className="mt-3">
                    {question.options.map((opt, idx) => (
                      <div
                        key={opt.option.id}
                        className={`p-2 rounded-md ${
                          correctOptionIds.includes(opt.option.id)
                            ? "font-extrabold" // Correct option highlighted in green
                            : "font-light"
                        }`}
                      >
                        {idx + 1}. {opt.option.optionText}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500">
              No questions available for this test.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPreview;
