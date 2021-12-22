import React from 'react'
import { IPostsData, reactionsAdded } from '../postSlice'
import { useDispatch } from 'react-redux';
import { Dispatch } from '../../../app/store';
 
interface IReactionEmoji {
  thumbsUp: string
  hooray: string
  heart: string
  rocket: string
  eyes: string
}

const reactionEmoji: IReactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

export type IName = "thumbsUp" | " hooray" | "heart" | "rocket" | "eyes";
interface Props {
  post: IPostsData
}

const ReactionButtonPost: React.FC<Props> = (props) => {
  const { post } = props;
  const dispatch:Dispatch = useDispatch();
  const raectionButtons = Object.entries(reactionEmoji).map(([name , emoji]) => (
    <button key={name} type="button" style={{marginRight:"10px"}} onClick={()=>{dispatch( reactionsAdded(post.id.toString(), name ))}}>
        {emoji} { post?.reactions?.[name] }
    </button>
  ))
  return (<div>
      {raectionButtons}
  </div>)
}

export default ReactionButtonPost
