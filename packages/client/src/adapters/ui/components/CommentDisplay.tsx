import type { PartialComment } from "../../../domain/entities/Comment"
import { CommentView } from "./CommentView"

export type CommentDisplayProps = {
    commentList: PartialComment[] | null
}

export const CommentDisplay = ({ commentList }: CommentDisplayProps) => {
    return <>
        <div className="comment_display_component">
            {
                commentList && commentList.length > 0 ? commentList.map(comment => <CommentView comment={comment} key={comment.id} />)
                : <p className="comment_display_error">No comment</p>
            }
        </div>
    </>
}