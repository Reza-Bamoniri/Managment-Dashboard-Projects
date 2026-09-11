import CommentHeader from "../components/comments/CommentHeader";
import CommentForm from "../components/comments/CommentForm";
import CommentsTable from "../components/comments/commentsTable/CommentsTable";
import useCommentManagement from "../hooks/useCommentManagement";


function CreateComment() {
  const {
  comments,
  projects,
  getProjectName,
  handleCreate,
  handleUpdate,
  handleDelete,
  openEditComment,
  closeEditComment,
  selectedComment,
  currentPage,
  totalPages,
  handlePageChange
} = useCommentManagement();

  

  return (
    <div className="space-y-6">
      <CommentHeader />

      <CommentForm
          projects={projects}
          selectedComment={selectedComment}
          onSubmit={
            selectedComment
              ? (data) => handleUpdate(selectedComment.id, data)
              : handleCreate
            }
          onCancelEdit={closeEditComment}
     />

      <CommentsTable
         comments={comments}
         getProjectName={getProjectName}
         onDelete={handleDelete}
         onEdit={openEditComment}
         currentPage={currentPage}
         totalPages={totalPages}
         onPageChange={handlePageChange}
/>
    </div>
  );
}

export default CreateComment;