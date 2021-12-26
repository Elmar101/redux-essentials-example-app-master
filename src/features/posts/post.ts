
import { AsyncState } from '../../model/asyncState';
import { Reactions } from '../../model/reactions';

export type Post = {
  id: string;
  title: string;
  content: string;
  user?: string;
  date: string;
  reactions: Reactions;
};

export type PostState = {
  posts: Post[];
} & AsyncState;
