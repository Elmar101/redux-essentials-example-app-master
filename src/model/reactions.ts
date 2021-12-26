export const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀',
  } as const;
  
  export type Reaction = keyof typeof reactionEmoji;

  export type Reactions = {  [K in Reaction]: number; };



  

/*/
const reactionEmoji: {
    readonly thumbsUp: "👍";
    readonly hooray: "🎉";
    readonly heart: "❤️";
    readonly rocket: "🚀";
    readonly eyes: "👀";
}

const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀',
  } as const;


  {} as const  ->  readonly property
/*/