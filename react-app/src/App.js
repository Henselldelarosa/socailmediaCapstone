import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useParams } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import GetAllPost from "./components/Post/GetAllPostComponent/GetAllPost"
import PostDetail from "./components/Post/PostDetailComponent/PostDetail";

// thunk
import { getAllPosts, getPostById } from "./store/post";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
    dispatch(getAllPosts())

  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>

          <Route path="/login">
            <LoginFormPage />
          </Route>

          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <Route exact path='/posts/:id'>
            <PostDetail/>
          </Route>

          <Route exact path='/'>
            <GetAllPost/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
