import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";
import { Home ,Profile ,Login,Edit, ChangePassword } from "./Routes/Routes";
import { Suspense } from "react";
import LoaderPage from "./components/LoaderPage/LoaderPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<LoaderPage/>}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/account",
          element:(
          <Suspense fallback={<LoaderPage/>}>
              <Profile />
            </Suspense>)
        },
        {
          path: "/account/edit",
          element:(
            <Suspense fallback={<LoaderPage/>}>
                <Edit />
              </Suspense>)
        },
        {
          path: "/account/password/change",
          element:(
            <Suspense fallback={<LoaderPage/>}>
                <ChangePassword />
              </Suspense>)
        }
      ],
    },
    {
      path:"/login",
      element: <Login />
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
