import React from "react";
import Layout from "./components/Layout/Layout";
import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AboutUs from "./components/AboutUs/AboutUs";
import ContactForm from "./components/ContactForm/ContactForm";
import CourseDetail from "./components/Courses/CourseDetail/CourseDetail";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CoursesMain from "./components/Courses/CoursesMain/CoursesMain";
import STEMCourses from "./components/Courses/STEMCourses/STEMCourses";
import CreativeCourses from "./components/Courses/CreativeCourses/CreativeCourses";
import LanguagesCourses from "./components/Courses/LanguagesCourses/LanguagesCourses";
import TeacherDashboard from "./components/Dashboard/Teacher/TeacherDashboard";
import StudentDashboard from "./components/Dashboard/Student/StudentDashboard";
import Account from "./components/Account/Account";
import DashboardLayout from "./components/Dashboard/DashboardLayout/DashboardLayout";
import CourseCreation from "./components/Dashboard/Teacher/TeacherCourses/CourseCreation/CourseCreation";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Routes>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactform" element={<ContactForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/coursesmain" element={<CoursesMain />} />
          <Route path="/coursedetail/:id" element={<CourseDetail />} />
          <Route path="/stemcourses" element={<STEMCourses />} />
          <Route path="/creativecourses" element={<CreativeCourses />} />
          <Route path="/languagescourses" element={<LanguagesCourses />} />
          <Route path="/dashboard/*" element={<DashboardLayout />}>
            <Route path="student" element={<StudentDashboard />} />
            <Route path="teacher" element={<TeacherDashboard />} />
            <Route path="account" element={<Account />} />
            <Route path="*" element={<Navigate to="/dashboard/student" />} />
          </Route>
          <Route path="/account" element={<Account />} />
          <Route path="/*" element={<Navigate to="/homepage" />} />
          <Route
            path="/dashboard/teacher/coursecreation"
            element={
              <DashboardLayout>
                <CourseCreation />
              </DashboardLayout>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
