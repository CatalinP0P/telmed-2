import React from 'react'
import PageLayout from 'components/layout/pageLayout/pageLayout'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from 'pages/home/home'
import Register from 'pages/auth/register/register'
import Login from 'pages/auth/login/login'
import { AuthProvider } from 'context/AuthContext'
import RegisterMedic from 'pages/auth/registerMedic/registerMedic'
import AdminLogin from 'pages/admin/login/login'
import AdminHome from 'pages/admin/home/home'
import AdminCategories from 'pages/admin/categories/categories'
import AdminUsers from 'pages/admin/users/users'
import MedicHome from 'pages/medic/home/home'
import QuestionsHome from 'pages/questions/home/home'
import QuestionCategoryID from 'pages/questions/[categoryId]/[categoryId]'
import Categories from 'pages/categories/categories'
import NewsHome from 'pages/news/home/home'
import NewsCategory from 'pages/news/[categoryId]/[categoryId]'
import ContactHome from 'pages/contact/home/home'
import MyProfileHome from 'pages/myprofile/home/home'
import QuestionQ from 'pages/questions/q/[q]'
import NewsQ from 'pages/news/[q]/[q]'
import QuestionQuestionId from 'pages/questions/questionId/[questionId]/[questionId]'
import MedicById from 'pages/medic/[id]/[id]'
import AdminMedic from 'pages/admin/medic/medic'
import AdminArticles from 'pages/admin/articles/articles'
import AdminArticleCategory from 'pages/admin/articles/[categoryId]/[categoryId]'
import AdminArticleId from 'pages/admin/articles/[categoryId]/[articleId]/[articleId]'
import ArticleEditId from 'pages/news/edit/[id]/[id]'
import AdminApproveArticles from 'pages/admin/approveArticles/approveArticles'
import QuestionQuestionIdEdit from 'pages/questions/questionId/[questionId]/edit/edit'
import AdminMedicEditId from 'pages/admin/medic/edit/[id]/[id]'
import QuestionResponseEdit from 'pages/questions/questionId/[questionId]/[responseId]/edit/edit'

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <PageLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Auth */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/registerMedic" element={<RegisterMedic />} />

            {/* Admin */}
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/medic" element={<AdminMedic />} />
            <Route
              path="/admin/medic/edit/:id"
              element={<AdminMedicEditId />}
            />
            <Route path="/admin/articles" element={<AdminArticles />} />
            <Route
              path="/admin/aprove-articles"
              element={<AdminApproveArticles />}
            />
            <Route
              path="/admin/articles/:categoryId"
              element={<AdminArticleCategory />}
            />
            <Route
              path="/admin/articles/edit/:articleId"
              element={<AdminArticleId />}
            />

            {/* Medic */}
            <Route path="/medic" element={<MedicHome />} />
            <Route path="/medic/:id" element={<MedicById />} />

            {/* Questions */}
            <Route path="/questions" element={<QuestionsHome />} />
            <Route
              path="/questions/:categoryId"
              element={<QuestionCategoryID />}
            />
            <Route path="/questions/q/:q" element={<QuestionQ />} />
            <Route path="/categories" element={<Categories />} />
            <Route
              path="/questions/questionId/:id/edit"
              element={<QuestionQuestionIdEdit />}
            />
            <Route
              path="/questions/questionId/:id/:responseId/edit"
              element={<QuestionResponseEdit />}
            />
            <Route
              path="/questions/questionId/:id"
              element={<QuestionQuestionId />}
            />

            {/* News */}
            <Route path="/news" element={<NewsHome />} />
            <Route path="/news/:categoryId" element={<NewsCategory />} />
            <Route path="/news/q/:q" element={<NewsQ />} />
            <Route path="/news/edit/:id" element={<ArticleEditId />} />

            {/* Other */}
            <Route path="/contact" element={<ContactHome />} />
            <Route path="/myprofile" element={<MyProfileHome />} />
          </Routes>
        </PageLayout>
      </HashRouter>
    </AuthProvider>
  )
}
