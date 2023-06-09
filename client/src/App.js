import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import AuthenticationPage from "./components/Authentication/AuthenticationPage";
import Layout from "./components/Layout/Layout";
import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import AboutUs from "./components/AboutUs/AboutUs";
import ContactForm from "./components/ContactForm/ContactForm";
import CourseDetail from "./components/Courses/CourseDetail/CourseDetail";
import CoursesMain from "./components/Courses/CoursesMain/CoursesMain";
import STEMCourses from "./components/Courses/STEMCourses/STEMCourses";
import CreativeCourses from "./components/Courses/CreativeCourses/CreativeCourses";
import LanguagesCourses from "./components/Courses/LanguagesCourses/LanguagesCourses";
import TeacherDashboard from "./components/Dashboard/Teacher/TeacherDashboard";
import StudentDashboard from "./components/Dashboard/Student/StudentDashboard";
import DashboardLayout from "./components/Dashboard/DashboardLayout/DashboardLayout";
import CourseCreation from "./components/Dashboard/Teacher/TeacherCourses/CourseCreation/CourseCreation";

function App() {
  function HeaderWithAuthenticationCheck() {
    const location = useLocation();
    const hideHeaderRoutes = ["/login", "/register"];
    const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

    return shouldHideHeader ? null : <Header />;
  }

  return (
    <BrowserRouter>
      <Layout>
        <HeaderWithAuthenticationCheck />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<AuthenticationPage />} />
          <Route path="/register" element={<AuthenticationPage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactform" element={<ContactForm />} />
          <Route path="/coursesmain" element={<CoursesMain />} />
          <Route path="/coursedetail/:id" element={<CourseDetail />} />
          <Route path="/stemcourses" element={<STEMCourses />} />
          <Route path="/creativecourses" element={<CreativeCourses />} />
          <Route path="/languagescourses" element={<LanguagesCourses />} />
          <Route path="/dashboard/*" element={<DashboardLayout />}>
            <Route path="student" element={<StudentDashboard />} />
            <Route path="stem-courses" element={<STEMCourses />} />
            <Route path="teacher" element={<TeacherDashboard />} />
            <Route path="*" element={<Navigate to="/dashboard/student" />} />
          </Route>
          <Route
            path="/dashboard/teacher/coursecreation"
            element={
              <DashboardLayout>
                <CourseCreation />
              </DashboardLayout>
            }
          />
          <Route path="/*" element={<Navigate to="/homepage" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
