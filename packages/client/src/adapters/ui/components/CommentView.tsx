import type { PartialComment } from "../../../domain/entities/Comment"
import { DateShow } from "../../../utils/DateShow"

export type CommentViewProps = {
    comment: PartialComment
}

export const CommentView = ({ comment }: CommentViewProps) => {
    return <>
        <div className="comment_view_component">
            <div className="comment_view_info bold">
                <span className="comment_view_user">{comment.user ? comment.user.username : "Unknow Guest"}</span>
                <span className="comment_view_time">{comment.createdAt && DateShow(comment.createdAt)}</span>
            </div>
            <p className="comment_view_content">{comment.content}</p>
        </div>
    </>
}