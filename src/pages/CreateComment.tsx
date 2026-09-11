import CommentHeader from "../components/comments/CommentHeader";
import CommentForm from "../components/comments/CommentForm";
import CommentsTable from "../components/comments/commentsTable/CommentsTable";
import type { Comment } from "../types/comment";

function CreateComment() {
  const comments: Comment[] = [];

  const getProjectName = (projectId: string) => {
    return projectId;
  };

  return (
    <div className="space-y-6">
      <CommentHeader />

      <CommentForm />

      <CommentsTable
        comments={comments}
        getProjectName={getProjectName}
      />
    </div>
  );
}

export default CreateComment;