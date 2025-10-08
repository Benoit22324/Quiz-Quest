import { useState } from "react"
import type { PartialComment } from "../../../domain/entities/Comment"
import DeleteCommentUseCase from "../../../domain/usecases/DeleteCommentUseCase"
import { DateShow } from "../../../utils/DateShow"
import CommentRepository from "../../data/api/CommentRepository"
import { useAuth } from "../context/AuthContext"
import { DeleteConfirmationModal } from "./DeleteConfirmationModal"
import { FaTrashAlt } from "react-icons/fa"

export type CommentViewProps = {
    comment: PartialComment
    setDelete: (value: boolean) => void
}

export const CommentView = ({ comment, setDelete }: CommentViewProps) => {
    const { user } = useAuth();

    const commentRepository = new CommentRepository();
    const deleteCommentUseCase = new DeleteCommentUseCase(commentRepository);

    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

    const handleCommentDelete = async () => {
        if (user && (user.getAdmin() || comment.user?.id === user.getId()) && comment.id !== undefined) {
            setDelete(true);

            const response = await deleteCommentUseCase.execute({ id: comment.id});

            if (response) setDelete(false);
        }
    }

    return <>
        {
            deleteModalOpen && <DeleteConfirmationModal handleConfirm={handleCommentDelete} onClose={() => setDeleteModalOpen(false)} />
        }
        <div className="comment_view_component">
            <div className="comment_view_info bold">
                <span className="comment_view_user">{comment.user ? comment.user.username : "Unknow Guest"}</span>
                <span className="comment_view_time">{comment.createdAt && DateShow(comment.createdAt)}</span>
            </div>
            <p className="comment_view_content">{comment.content}</p>
            {
                (user?.getAdmin() || comment.user?.id === user?.getId()) && <FaTrashAlt onClick={() => setDeleteModalOpen(true)} className="comment_view_delete_btn" />
            }
        </div>
    </>
}