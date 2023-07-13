import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch} from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
// import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
// import Navigation from "./components/Navigation";
// import GetAllPost from "./components/Post/GetAllPostComponent/GetAllPost"
import PostDetail from "./components/Post/PostDetailComponent/PostDetail";
import EditUser from './pages/editUser/EditUser'
// thunk
import { getAllPosts} from "./store/post";
import { getTheUsers } from "./store/user";
import SearchComponent from "./components/Search/SearchComponent";
import Navbar from "./Components/navbar/Navbar";
import Login from "./pages/login/Login";
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const dispatch = useDispatch();
  const {id} = useParams()
  const user = useSelector(state => state.users[id])
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user)
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
    dispatch(getTheUsers())
    dispatch(getAllPosts())
  }, [dispatch]);

  return (
    <>
      <Navbar isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <Route exact path='/posts/:id'>
            <PostDetail/>
          </Route>

          <Route exact path='/searches/users/:searchQuery'>
            <SearchComponent/>
          </Route>

          <Route exact path='/profile/:id'>
            <Profile/>
          </Route>

          <Route exact path='/'>
            <Home sessionUser={sessionUser}/>
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
