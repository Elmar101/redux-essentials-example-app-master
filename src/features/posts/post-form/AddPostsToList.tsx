import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../../../app/store';
import { addPost } from '../postSlice';

interface Props {}

const AddPostsToList:React.FC<Props> = (props) => {
    const [postData, setPostData] = useState({title: '', content:'', userId: ''});
    const users = useSelector((state:RootState)=>state.users);
    const dispatch: Dispatch = useDispatch();

    const handlePostData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=> {
        setPostData({...postData, [e.target.name]: e.target.value})
    }

    const addingPostToList = (e:any) => {
        e.preventDefault();
        if(postData.title && postData.content){
            dispatch(addPost(postData.title, postData.content, postData.userId)); 
        }
        setPostData({title: '', content: '', userId: ''});
    }

    const userOptions = users.map(user=> (
        <option key={user.id} value={user.id}> {user.name} </option>
    ));
    const isValid = useMemo(()=> Boolean(postData.title) && Boolean(postData.content) && Boolean(postData.userId),[postData])
    return (
        <div style={{margin: "20px auto", width:"50%", border:"7px solid red",padding: "20px"}}>
            
            <h2> Add Post to PostLists Form </h2>
            <form>
                <label> Post Title: </label>
                <input 
                    style={{padding:"16px",width: "100%"}}
                    name='title'
                    value={ postData.title }
                    onChange={ handlePostData }
                />
                <br/> <br/>
                <select name="userId" value={postData.userId} onChange={handlePostData}>
                    <option value=""> Choose Author </option>
                    {userOptions}
                </select>
                <br/> <br/>
                <textarea
                    style={{padding:"16px",width: "100%"}}
                    name="content"
                    value={ postData.content }
                    onChange={ handlePostData }
                />
                <button onClick={ addingPostToList } disabled={!isValid}> Add Post To List </button>
            </form>
        </div>
    )
}

export default AddPostsToList