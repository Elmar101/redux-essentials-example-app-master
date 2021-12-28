import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../../../app/store';
import { addNewPost } from '../postSlice';
import { nanoid, unwrapResult } from "@reduxjs/toolkit";
//import { addPost, addNewPost } from '../postSlice';
import { AsyncStatus } from '../../../model/asyncState';

interface Props { }

const AddPostsToList: React.FC<Props> = (props) => {
    const [addRequestStatus, setAddRequestStatus] = useState<AsyncStatus>('idle')
    const [postData, setPostData] = useState({ title: '', content: '', userId: '' });
    const users = useSelector((state: RootState) => state.users);
    const dispatch: Dispatch = useDispatch();
    const isValid = useMemo(() => [postData.title, postData.content, postData.userId].every(Boolean) && 
                                                    addRequestStatus === 'idle', [postData, addRequestStatus]);
   
    const handlePostData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setPostData({ ...postData, [e.target.name]: e.target.value })
    }

    const  addingPostToList = async (e: any) => {
        e.preventDefault();
        if (isValid) {
            //dispatch( addPost(postData.title, postData.content, postData.userId) ); 
            try{
                setAddRequestStatus('loading');
                const result = await dispatch( 
                    addNewPost({title: postData.title , content: postData.content , user: postData.userId}) 
                )/* .unwrap() */
               unwrapResult(result)
            }catch(err) {
                console.error('Error Message: ',err)
            }finally{
                setAddRequestStatus('idle');
                setPostData({ title: '', content: '', userId: '' });
            }
        }
       
    }

    const userOptions = users.map(user => (
        <option key={user.id} value={user.id}> {user.name} </option>
    ));



    return (
        <div style={{ margin: "20px auto", width: "50%", border: "7px solid red", padding: "20px" }}>

            <h2> Add Post to PostLists Form </h2>
            <form>
                <label> Post Title: </label>
                <input
                    style={{ padding: "16px", width: "100%" }}
                    name='title'
                    value={postData.title}
                    onChange={handlePostData}
                />
                <br /> <br />
                <select name="userId" value={postData.userId} onChange={handlePostData}>
                    <option value=""> Choose Author </option>
                    {userOptions}
                </select>
                <br /> <br />
                <textarea
                    style={{ padding: "16px", width: "100%" }}
                    name="content"
                    value={postData.content}
                    onChange={handlePostData}
                />
                <button onClick={addingPostToList} disabled={!isValid}> Add Post To List </button>
            </form>
        </div>
    )
}

export default AddPostsToList