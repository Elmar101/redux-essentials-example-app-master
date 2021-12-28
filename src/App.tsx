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
import UserList from './features/users/user-list/User-List';
import UserDetail from './features/users/user-detail/UserDetail';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
           {/*/ Post /*/}
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

          {/*/ User /*/}

          <Route exact path="/users" component={UserList} />
          <Route exact path="/user/:userId" component={UserDetail} />

          {/*/ Redirect to Home Page /*/}
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
