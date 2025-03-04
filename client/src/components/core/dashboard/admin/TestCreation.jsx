import { useState } from "react";
import axios from "axios"; // Import Axios for API calls
import Header from "../../../common/Header";
import { toast } from "react-toastify";
import config from "../../../../utils/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { encode as base64Encode } from 'js-base64';
import { PlusIcon } from "@heroicons/react/24/outline";

const TestCreation = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {

      const response = await axios.post(
        `${config.API_URL}/api/tests/create-test`,
        {
          title,
          description,
          duration: Number(duration),
          totalMarks: Number(totalMarks),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Test Created:", response.data.TestID);
      toast.success("Test Created Successfully!");
      
      // Reset form fields
      setTitle("");
      setDescription("");
      setDuration("");
      setTotalMarks("");
      navigate(`/dashboard-admin/add-ques?testId=${base64Encode(response?.data?.TestID)}`);
    } catch (error) {
      console.error("Error creating test:", error.response?.data || error.message);
      console.log(error);

      toast.error(error.response?.data?.error || "Failed to create test");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <Header />
      <div className="flex justify-center items-center">
        <div className="w-[60%] mt-20 bg-white p-6">
          <h2 className="text-5xl font-bold mb-10 text-orange-500">Create a New Test</h2>

          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-8">
              <label className="block font-semibold mb-4 text-gray-500 text-2xl">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-style w-full border px-4 py-2 rounded-md focus:outline-gray-300"
                placeholder="Enter test title"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-8">
              <label className="block text-gray-500 font-medium mb-4 text-2xl">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-style w-full border px-4 py-2 rounded-md focus:outline-gray-300"
                placeholder="Enter test description"
                rows="3"
                required
              ></textarea>
            </div>

            {/* Duration */}
            <div className="mb-8">
              <label className="block text-gray-500 font-medium mb-4 text-2xl">
                Duration (in minutes)
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="form-style w-full border px-4 py-2 rounded-md focus:outline-gray-300"
                placeholder="Enter duration"
                required
              />
            </div>

            {/* Total Marks */}
            <div className="mb-8">
              <label className="block text-gray-500 font-medium mb-4 text-2xl">
                Total Marks
              </label>
              <input
                type="number"
                value={totalMarks}
                onChange={(e) => setTotalMarks(e.target.value)}
                className="form-style w-full border px-4 py-2 rounded-md focus:outline-gray-300"
                placeholder="Enter total marks"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-10 group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md 
                ${loading ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"} 
                px-6 font-medium text-white transition`}
            >
              {loading ? "Creating..." : "Create Test"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TestCreation;
