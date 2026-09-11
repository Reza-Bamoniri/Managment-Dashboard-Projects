import CommentHeader from "../components/comments/CommentHeader";
import CommentForm from "../components/comments/CommentForm";
import CommentsTable from "../components/comments/commentsTable/CommentsTable";
import useCommentManagement from "../hooks/useCommentManagement";
import { useAppSelector } from "../store/hooks";

function CreateComment() {
  const {
    comments,
    getProjectName,
    handleCreate,
    handleDelete,
    openEditComment,
  } = useCommentManagement();

  const projects = useAppSelector(
    (state) => state.projects.projects
  );

  return (
    <div className="space-y-6">
      <CommentHeader />

      <CommentForm
        projects={projects}
        onSubmit={handleCreate}
      />

      <CommentsTable
        comments={comments}
        getProjectName={getProjectName}
        onDelete={handleDelete}
        onEdit={openEditComment}
      />
    </div>
  );
}

export default CreateComment;