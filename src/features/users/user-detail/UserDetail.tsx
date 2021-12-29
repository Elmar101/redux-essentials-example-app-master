import React from 'react'
import { useSelector } from 'react-redux';
import { selectUserById } from '../usersSlice';
import { RootState } from '../../../app/store';
import { Link, match, useParams } from 'react-router-dom';
import { selectAllPostFn } from '../../posts/postSlice';
import { Post } from '../../posts/post';
interface DetailParams {
    userId: string;
}
interface DetailsProps {
    required: string;
    match: match<DetailParams>;
}


const UserDetail: React.FC<DetailsProps> = ({ match }) => {
    //console.log(useParams())
    const {userId} = match.params;

    const userInfo = useSelector((state:RootState)=> selectUserById(state, userId));

    const allUserPosts = useSelector((state: RootState) =>{
        const allPosts = selectAllPostFn(state);
        const userPosts =  allPosts.filter( (post: Post) => post.user === userId);
        return userPosts
    });

    const postTitles = allUserPosts.map((post:Post)=>(
        <li key={post.id}>
            <Link to={`post/${post.id}`}> {post.title} </Link>
        </li>
    ))
    if(!userInfo){
        return <div> Dont Find User </div>
    }
    return (
        <div>
            <h1>{userInfo.name}</h1>
            <i>{postTitles}</i>
            
        </div>
    )
}

export default UserDetail
