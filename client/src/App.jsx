import { Route, Routes, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import TestPage2 from "./screens/TestPage2";
import HomePage from "./screens/HomePage";
import InstructionsPage from "./screens/InstructionsPage";
import LoginPage from "./screens/Login";
import RegisterPage from "./screens/Register";
import ForgetPage from "./screens/Forgot";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactPage from "./screens/Contact";
import TestCreation from "./components/core/dashboard/admin/TestCreation";
import AddQuestionsAndOptions from "./components/core/dashboard/admin/AddQuestionsAndAnswers";
import TestList from "./components/core/dashboard/admin/TestList";
import TestsList from "./components/core/dashboard/user/TestsList";
import TestPage from "./components/core/tests/TestPage";
import NotFound from "./screens/NotFound";
import TestPreview from "./components/core/dashboard/admin/TestPreview";
import AssignTest from "./components/core/dashboard/admin/AssignTest";
import DashboardLayout from "./screens/DashboardLayout";
import AdminDashboard from "./components/core/dashboard/admin/AdminDashboard";
import UserDashboard from "./components/core/dashboard/user/UserDashboard";
import UserHistory from "./components/core/dashboard/user/UserHistory";
import TestSummaryPage from "./components/core/tests/TestsSummary";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const auth = useSelector((state) => state.auth);
  const token = auth?.token;
  const userRole = auth?.user?.Role;
  console.log(userRole, token);
  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        toastStyle={{
          backgroundColor: "#030811",
          color: "#f2ebe3",
          borderColor: "#f2ebe3",
        }}
        progressStyle={{ backgroundColor: "#f2ebe3" }}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/test" element={<TestPage2 />} />
        <Route path="/forget-password" element={<ForgetPage />} />
        <Route path="/instructions" element={<InstructionsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/test-creation" element={<TestCreation />} />
        <Route path="/test/:testId/user/:userId" element={<TestPage />} />

        <Route
          path="/dashboard-admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="test-list" element={<TestList />} />
          <Route path="add-ques" element={<AddQuestionsAndOptions />} />
          <Route path="assign-test" element={<AssignTest />} />
          <Route path="test-creation" element={<TestCreation />} />
        </Route>

        <Route
          path="/dashboard-user"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserDashboard />} />
          <Route path="tests-list" element={<TestsList />} />
          <Route path="user-history" element={<UserHistory />} />
        </Route>

        <Route
          path="/test-preview/:testId"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <TestPreview />
            </ProtectedRoute>
          }
        />
        <Route path="/test/:testId/user/:userId/summary"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <TestSummaryPage/>
            </ProtectedRoute>
          }/>
      </Routes>
    </Provider>
  );
}

export default App;
