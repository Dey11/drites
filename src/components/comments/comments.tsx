import Avatar from "../avatar";
import CommentForm from "./comment-form";

type CommentsSectionProps = {
  comments: {
    id: string;
    img: string;
    user: string;
    userId: string;
    createdAt: string;
    content: string;
  }[];
  postId: string;
  isLoggedIn: boolean;
};

export default async function Comments({
  comments,
  postId,
  isLoggedIn,
}: CommentsSectionProps) {
  return (
    <div>
      <CommentForm postId={postId} isLoggedIn={isLoggedIn} />

      <div>
        {comments.length > 0 ? (
          <div className="mt-5 flex flex-col">
            {comments.map((comment) => (
              <div key={comment.id} className="my-4 flex gap-3">
                <Avatar name={comment.user} />
                <div className="flex flex-col">
                  <p className="text-normal font-semibold">{comment.user}</p>
                  <p className="text-slate-700">{comment.content}</p>
                  <p className="text-xs text-slate-500">
                    {"Posted on " +
                      new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-5 px-2 text-sm text-slate-700">No comments yet</p>
        )}
      </div>
    </div>
  );
}
