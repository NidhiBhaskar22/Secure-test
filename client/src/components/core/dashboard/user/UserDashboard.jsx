import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import config from "../../../../utils/config";

const UserDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/api/dashboard/user-dashboard-data`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, [token]);

  if (!dashboardData) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const { assignedTests, upcomingTests, testAttempts, proctoringWarnings, sessionDetails } = dashboardData;

  const performanceData = {
    labels: testAttempts.map((attempt) => attempt.test.Title),
    datasets: [
      {
        label: 'Scores',
        data: testAttempts.map((attempt) => attempt.score || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: function(value) {
            if (Number.isInteger(value)) {
              return value;
            }
          },
        },
      },
    },
  };

  return (
    <div className="relative flex flex-col justify-center items-center">
      <div className="container mx-auto p-4 mt-4">
        <h1 className="text-4xl font-bold mb-4 text-center text-orange-500">User Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-2 text-orange-500">Assigned Tests:</h2>
            <ul className="list-disc list-inside">
              {assignedTests.map((test) => (
                <li key={test.testId}>
                  {test.test.Title} - {test.test.Description}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-2 text-orange-500">Upcoming Tests:</h2>
            <ul className="list-disc list-inside">
              {upcomingTests.map((test) => (
                <li key={test.Title}>
                  {test.Title} - {test.Description}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mt-4">
          <h2 className="text-2xl font-semibold mb-2 text-orange-500">Test Attempts:</h2>
          <ul className="list-disc list-inside">
            {testAttempts.map((attempt) => (
              <li key={attempt.id}>
                {attempt.test.Title} - Score: {attempt.score || 'N/A'}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mt-4">
          <h2 className="text-2xl font-semibold mb-2 text-orange-500">Proctoring Warnings:</h2>
          <ul className="list-disc list-inside">
            {proctoringWarnings.map((warning) => (
              <li key={warning.warning.id}>
                {warning.session.test.Title} - {warning.warning.warningType}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mt-4">
          <h2 className="text-2xl font-semibold mb-2 text-orange-500">Performance Overview:</h2>
          <Bar data={performanceData} options={options} />
        </div>

        <div className="bg-white rounded-lg shadow p-6 mt-4">
          <h2 className="text-2xl font-semibold mb-2 text-orange-500">Session Details:</h2>
          <ul className="list-disc list-inside">
            {sessionDetails.map((session) => (
              <li key={session.id}>
                {session.test.Title} - Status: {session.status}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;