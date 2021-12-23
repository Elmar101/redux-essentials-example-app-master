import React, { ChangeEvent, useMemo, useState } from 'react'
import { match, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '../../../app/store'
import { IPostsData } from '../postSlice'
import { updatePost } from '../postSlice'
import { IInitialUserState } from '../../users/usersSlice'
interface IParamsId {
  postId: string
}
interface Props {
  match: match<IParamsId>
}
function EditPost({ match }: Props) {
  const { postId } = match.params;
  const history = useHistory();

  const dispatch: Dispatch = useDispatch();
  const users: IInitialUserState[] = useSelector( (state: RootState) => state.users );
  const posts: IPostsData[] = useSelector( (state: RootState) => state.posts.postsData );

  const post: IPostsData | undefined = useMemo(() =>posts.find((post)=>post.id.toString()===postId),[postId,posts]);

  const [postObj, setPostObj] = useState({
    title: post?.title,
    content: post?.content,
    userId: post!.userId,
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (post) {
      setPostObj({ ...postObj, [e.target.name]: e.target.value })
    }
  }

  if (!post) {
    return (
      <i>
        NOT FOUNT <b>"{postId}" </b> - postId of POST{' '}
      </i>
    )
  }

  const optionUsers = users.map((user) => (
    <option value={user.id} selected={user.id.toString() === postObj!.userId}>
      {user.name}
    </option>
  ))

  const saveEditPost = (e: any) => {
    e.preventDefault()
    if (postObj.title && postObj.content) {
      //dispatch( updatePost( { id:postId.toString(), title: postObj.title , content: postObj.content } ) );
      dispatch(
        updatePost(
          postId.toString(),
          postObj.title,
          postObj.content,
          postObj.userId
        )
      )
      history.push('/');
    }
  }

  return (
    <div style={{ width: '50%', padding: '16px', margin: 'auto 20px' }}>
      <i> Edit post {postId} </i>
      <form>
        <label> Edit Post Title: </label>
        <input
          style={{ width: '100%', padding: '16px' }}
          name="title"
          value={postObj!.title}
          onChange={handleChange}
        />
        <br />
        <br />
        <label> Edit Post Author: </label>
        <select name="userId" value={postObj!.userId} onChange={handleChange}>
          {optionUsers}
        </select>
        <br />
        <br />
        <label> Edit Post Content: </label>
        <textarea
          name="content"
          value={postObj!.content}
          onChange={handleChange}
        ></textarea>
        <br />
        <br />
        <button onClick={saveEditPost}> Save Your Edit Post </button>
        <br />
        <br />
      </form>
    </div>
  )
}

export default EditPost
