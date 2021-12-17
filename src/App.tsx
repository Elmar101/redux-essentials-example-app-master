import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import PostList from './features/posts/PostList';
import AddPostsToList from "./features/posts/AddPostsToList";
import { PostDetail } from "./features/posts/post-detail/PostDetail";
function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <AddPostsToList/>
                <PostList/>
              </React.Fragment>
            )}
          />

          <Route
            exact
            path="/post/:postId"
            component={ PostDetail }
          />

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
