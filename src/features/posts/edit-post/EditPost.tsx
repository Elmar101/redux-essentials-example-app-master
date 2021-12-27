import React, { ChangeEvent, useState } from 'react';
import { match, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Dispatch } from '../../../app/store';
import { Post } from '../post';
import { selectPostByIdFn, updatePost } from '../postSlice'
interface IParamsId {
  paramsId: string
}
interface Props {
  match: match<IParamsId>
}
function EditPost({ match }: Props) {
  const { paramsId } = match.params;
  console.log(paramsId)
  const history = useHistory();

  const dispatch: Dispatch = useDispatch();
  const users = useSelector( (state: RootState) => state.users );
  const post: Post | undefined = useSelector( (state: RootState) => selectPostByIdFn(state, paramsId) );

  const [postObj, setPostObj] = useState({
    title: post?.title,
    content: post?.content,
    userId: post?.id,
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (post) {
      setPostObj({ ...postObj, [e.target.name]: e.target.value })
    }
  }

  if (!post) {
    return (
      <i>
        NOT FOUNT <b>{paramsId} - edit </b> - paramsId of POST{' '}
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
      dispatch(
        updatePost(
          paramsId.toString(),
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
      <i> Edit post {paramsId} </i>
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
          style={{ width: '100%', padding: '16px' }}
          rows={20}
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