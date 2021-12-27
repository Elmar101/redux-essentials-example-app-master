import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import EditPost from './features/posts/edit-post/EditPost'
import { PostDetail } from './features/posts/post-detail/PostDetail'
import AddPostsToList from './features/posts/post-form/AddPostsToList'
import PostList from './features/posts/PostList'

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
                <AddPostsToList />
                <PostList />
              </React.Fragment>
            )}
          />

          <Route exact path="/post/:paramsId" component={PostDetail} />
 
          <Route exact path="/editPost/:paramsId" component={EditPost} /> 
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
