import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from '../../app/store';
interface Props { }
const PostList: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {
    const statePosts = useSelector((state: RootState) => state.posts.postsData);
    useEffect(()=>{
        console.log("posts: ",statePosts);
    })
    const renderPosts = statePosts.map(post=>(
        <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
        </div>
    ))
    return (
        <React.Fragment>
            <h1>Posts</h1>
            {renderPosts}
        </React.Fragment>
    )
}

export default PostList;