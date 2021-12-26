import { Post } from '../post'
import { Reaction, reactionEmoji } from '../../../model/reactions'
import { reactionAdded } from '../postSlice'
import { useDispatch } from 'react-redux';
import { Dispatch } from '../../../app/store';

type Props = {
  post: Post
}

const ReactionButtonPost: React.FC<Props> = (props) => {
  const { post } = props;
  const dispatch:Dispatch = useDispatch();
  const raectionButtons = Object.entries(reactionEmoji).map(([name , emoji]) => (
    <button key={name} type="button" style={{marginRight:"10px"}} onClick={()=>{dispatch( reactionAdded(post.id, name as Reaction ))}}>
        {emoji} { post?.reactions[name as Reaction] }
    </button>
  ))
  return (<div>
      {raectionButtons}
  </div>)
}

export default ReactionButtonPost
