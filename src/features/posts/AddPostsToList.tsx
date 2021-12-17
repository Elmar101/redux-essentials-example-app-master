import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from '../../app/store';
import { addPost } from "./postSlice";
import {nanoid} from "@reduxjs/toolkit";
interface Props {}
const AddPostsToList:React.FC<Props> = (props) => {
    const [postData, setPostData] = useState({title: '', content:''});

    const dispatch: Dispatch = useDispatch();

    const handlePostData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
        setPostData({...postData, [e.target.name]: e.target.value})
    }

    const addingPostToList = (e:any) => {
        e.preventDefault();
        if(postData.title && postData.content){
            dispatch(addPost({id: nanoid(),title: postData.title, content: postData.content}));
        }
        setPostData({title: '', content: ''});
    }
    return (
        <div style={{margin: "auto", width:"50%"}}>
            
            <h2> Add Post to PostLists </h2>
            <form>
                <label> Post Title: </label>
                <input 
                    style={{padding:"7px"}}
                    name='title'
                    value={ postData.title }
                    onChange={ handlePostData }
                />
                <textarea
                    style={{padding:"7px"}}
                    name="content"
                    value={ postData.content }
                    onChange={ handlePostData }
                />
                <button onClick={ addingPostToList }> Add Post To List </button>
            </form>
        </div>
    )
}

export default AddPostsToList;
