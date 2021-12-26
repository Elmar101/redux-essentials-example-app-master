import React, { useMemo } from "react";
import { Link, match } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { Post } from '../post';
import PostAuthor from "../post-author/PostAuthor";
import ReactionButtonPost from "../reaction-button-post/ReactionButtonPost";
import TimeAgoPost from "../time-ago-post/TimeAgoPost";
import { selectPostByIdFn } from "../postSlice";


interface DetailParams {
    paramsId: string;
}
interface DetailsProps {
    required: string;
    match: match<DetailParams>;
}
export const PostDetail: React.FC<DetailsProps> = ({match}) =>{
    const {paramsId} = match.params;
    const post: Post | undefined = useSelector((state: RootState) => selectPostByIdFn(state, paramsId));
    //const post:Post | undefined = useMemo(()=>posts.find(post=> post.id === paramsId),[paramsId,posts]);

   if(!post){
    return <i>  NOT FOUNT <b>"{paramsId}" </b> - paramsId of POST  </i>
   }
   
    return(
        <React.Fragment>
            <h1> {post?.id} - Post Detail </h1>
            <h3> {post?.title} </h3>
             <PostAuthor userId={post.id}/>
             <TimeAgoPost timeStamp={post.date}/>
            <ReactionButtonPost post={post}/> 
            <p> {post?.content} </p>
            <Link to={`/editPost/${post.id}`}> Edit Post </Link>
        </React.Fragment>
    )
}