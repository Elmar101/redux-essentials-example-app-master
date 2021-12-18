import React, { useMemo } from "react";
import { Link, match } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { IPostsData } from "../postSlice";

interface DetailParams {
    postId: string;
}
interface DetailsProps {
    required: string;
    match: match<DetailParams>;
}
export const PostDetail: React.FC<DetailsProps> = ({match}) =>{
    const {postId} = match.params;
    const posts: IPostsData[] = useSelector((state:RootState)=> state.posts.postsData);
    const post: IPostsData | undefined = useMemo(()=>posts.find(post=> post.id.toString() === postId),[])
   if(!post){
    return <i>  NOT FOUNT <b>"{postId}" </b> - postId of POST  </i>
   }
    //console.log("postId: ",postId, " post",post);
    return(
        <React.Fragment>
            <h1> {post?.id} - Post Detail </h1>
            <h3> {post?.title} </h3>
            <p> {post?.content} </p>
            <Link to={`/editPost/${post.id}`}> Edit Post </Link>
        </React.Fragment>
    )
}
