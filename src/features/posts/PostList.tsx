import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../app/store';
import { Post } from './post';
import PostAuthor from './post-author/PostAuthor';
import ReactionButtonPost  from './reaction-button-post/ReactionButtonPost';
import TimeAgoPost from './time-ago-post/TimeAgoPost';
interface Props {
  
}



const PostList: React.FC<Props> = (props) => {

  const history = useHistory();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const orderSortPost = [...posts].sort( (a, b) => b.date.toString().localeCompare(a.date.toString()) )

  const renderPosts: JSX.Element[] = orderSortPost.map((post: Post) => (
    <div key={post.id} style={{ borderBottom: '1px solid gray' }}>
      <h2>{post.title}</h2>
      <PostAuthor userId={post.user as string} />
      <TimeAgoPost timeStamp={post.date} /> 
      <p>{post.content}</p>
      <ReactionButtonPost post={post} /> 
      <button
        style={{ marginRight: '20px', color: 'white', background: 'black' }}
        onClick={() => history.push(`post/${post.id}`)}
      >
        View Post
      </button>

      <button
        style={{ marginRight: '20px', color: 'white', background: 'black' }}
        onClick={() => history.push(`editPost/${post.id}`)}
      >
        Edit Post
      </button>

      <br />
      <br />
    </div>
  ))
  
  return (
    <React.Fragment>
      <div
        style={{
          border: '4px solid gray',
          margin: 'auto',
          width: '50%',
          padding: '16px',
        }}
      >
        <h1>Posts</h1>
        {renderPosts}
      </div>
    </React.Fragment>
  )
}

export default PostList
