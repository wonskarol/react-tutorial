class Comment {}
class CommentList {}

const commentDb = [
    {
        id: "1388534400000",
        author: "Pete Hunt",
        text: "Hey there!",
        likes: 0
    },
    {
        id: "1420070400000",
        author: "Paul O’Shannessy",
        text: "React is *great*!",
        likes: 0
    },
    {
        id: "1455639402234",
        author: "Karol",
        text: "Hallo *react*",
        likes: 0
    }
];

const comments = commentDb.map(comment => {
  let commentObj = new Comment();
  commentObj.id = comment.id;
  commentObj.author = comment.author;
  commentObj.text = comment.text;
  commentObj.likes = comment.likes;
  return commentObj;
});

let commentList = new CommentList();
commentList.id = 1;

let getComments = () => comments;
let getCommentList = () => commentList;

export {
  getComments,
  getCommentList,
  Comment,
  CommentList
};
