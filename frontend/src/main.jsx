import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import { AuthLayout } from "./components/index.js";
import AllPosts from "./pages/AllPosts.jsx";
import AddPost from "./pages/AddPost.jsx";
import EditPost from "./pages/EditPost.jsx";
import Post from "./pages/Post.jsx";
import Product from "./pages/Product.jsx";
import Signup from "./pages/Signup.jsx";
import My_Orders from "./pages/my-orders.jsx";
import My_Listings from "./pages/my-listings.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import UserProfilePage from "./pages/userPage.jsx";
import Login from "./pages/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "my-orders",
        element: (
          <AuthLayout authentication={false}>
            <My_Orders />
          </AuthLayout>
        ),
      },
      {
        path: "my-listings",
        element: (
          <AuthLayout authentication={false}>
            <My_Listings />
          </AuthLayout>
        ),
      },
      {
        path: "add-product",
        element: (
          <AuthLayout authentication={false}>
            <AddProduct />
          </AuthLayout>
        ),
      },
      {
        path: "my-profile",
        element: (
          <AuthLayout authentication={false}>
            <UserProfilePage />
          </AuthLayout>
        ),
      },
      {
        path: "signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "all-posts",
        element: (
          <AuthLayout authentication={true}>
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication={true}>
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication={true}>
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
