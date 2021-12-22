import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { useHistory } from 'react-router-dom'
import PostAuthor from './post-author/PostAuthor'
import TimeAgoPost from './time-ago-post/TimeAgoPost'
import ReactionButtonPost from './reaction-button-post/ReactionButtonPost'
interface Props {}
const PostList: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {
  const history = useHistory()
  const statePosts = useSelector((state: RootState) => state.posts.postsData)
  useEffect(() => {
    console.log('posts: ', orderSortPost)
  })
  const orderSortPost = [...statePosts].sort((a, b) =>
    b.date.toString().localeCompare(a.date.toString())
  )
  const renderPosts = orderSortPost.map((post) => (
    <div key={post.id} style={{ borderBottom: '1px solid gray' }}>
      <h2>{post.title}</h2>
      <PostAuthor userId={post.userId} />
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
