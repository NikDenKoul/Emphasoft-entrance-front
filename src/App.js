import './App.css';
import {createBrowserRouter, Route, RouterProvider, Routes} from "react-router-dom";
import UsersPage from "./users";
import MainPage from "./main_page";

const router = createBrowserRouter([
    {
        path: '/',
        Component: MainPage
    },
    {
        path: '/users',
        Component: UsersPage
    }
])

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;
