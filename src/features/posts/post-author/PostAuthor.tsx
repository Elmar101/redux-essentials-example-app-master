import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

interface Props {
    userId: string ;
}

const PostAuthor: React.FC<Props> = ( props ) => {
    const { userId } = props
    const author = useSelector((state:RootState)=> state.users.find(user => user.id.toString() === userId.toString() ) )
    return (
        <span><b>{author ? author.name : "Unknow This Post Author"}</b></span>
    )
}

export default PostAuthor
