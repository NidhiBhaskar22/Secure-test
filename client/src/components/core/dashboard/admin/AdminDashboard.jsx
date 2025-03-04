import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import config from "../../../../utils/config";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/api/dashboard/admin-dashboard-data`, {
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

  const { totalTests, totalUsers, testsAssigned, testsPerUser, usersPerTest, userActivity, proctoringData, sessionDetails } = dashboardData;

  const testsPerUserData = {
    labels: testsPerUser.map((user) => `${user.user.FirstName} ${user.user.LastName}`),
    datasets: [
      {
        label: 'Tests Per User',
        data: testsPerUser.map((user) => user._count.testId),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const usersPerTestData = {
    labels: usersPerTest.map((test) => test.test.Title),
    datasets: [
      {
        label: 'Users Per Test',
        data: usersPerTest.map((test) => test._count.userId),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const userActivityData = {
    labels: userActivity.map((activity) => `${activity.user.FirstName} ${activity.user.LastName}`),
    datasets: [
      {
        label: 'Warning Count',
        data: userActivity.map((activity) => activity.warningCount),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
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
        <h1 className="text-4xl font-bold mb-4 text-center text-orange-500">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-2 text-orange-500">Total Tests Created: {totalTests}</h2>
            <h2 className="text-2xl font-semibold text-orange-500">Total Users: {totalUsers}</h2>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2 text-orange-500">Tests Assigned to Users:</h3>
            <ul className="list-disc list-inside">
              {testsAssigned.map((assignment) => (
                <li key={`${assignment.userId}-${assignment.testId}`}>
                  {assignment.user.FirstName} {assignment.user.LastName} is assigned to {assignment.test.Title}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mt-4">
          <h3 className="text-xl font-semibold mb-2 text-orange-500">Tests Per User:</h3>
          <Bar data={testsPerUserData} options={options} />
        </div>

        <div className="bg-white rounded-lg shadow p-6 mt-4">
          <h3 className="text-xl font-semibold mb-2 text-orange-500">Users Per Test:</h3>
          <Bar data={usersPerTestData} options={options} />
        </div>

        <div className="bg-white rounded-lg shadow p-6 mt-4">
          <h3 className="text-xl font-semibold mb-2 text-orange-500">User Activity:</h3>
          <Bar data={userActivityData} options={options} />
        </div>

        <div className="bg-white rounded-lg shadow p-6 mt-4">
          <h3 className="text-xl font-semibold mb-2 text-orange-500">Proctoring Data:</h3>
          <ul className="list-disc list-inside">
            {proctoringData.map((data) => (
              <li key={data.id}>
                {data.warningSessions.map((session) => (
                  <div key={session.sessionId}>
                    {session.session.test.Title} - {session.session.user.FirstName} {session.session.user.LastName} - {data.warningType}
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mt-4">
          <h3 className="text-xl font-semibold mb-2 text-orange-500">Session Details:</h3>
          <ul className="list-disc list-inside">
            {sessionDetails.map((session) => (
              <li key={session.id}>
                {session.test.Title} - {session.user.FirstName} {session.user.LastName} - Status: {session.status}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;