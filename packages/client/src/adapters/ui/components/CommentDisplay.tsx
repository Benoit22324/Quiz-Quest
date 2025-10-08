import type { PartialComment } from "../../../domain/entities/Comment"
import { CommentView } from "./CommentView"

export type CommentDisplayProps = {
    commentList: PartialComment[] | null
    setDelete: (value: boolean) => void
}

export const CommentDisplay = ({ commentList, setDelete }: CommentDisplayProps) => {
    return <>
        <div className="comment_display_component">
            {
                commentList && commentList.length > 0 ? commentList.map(comment => <CommentView comment={comment} setDelete={setDelete} key={comment.id} />)
                : <p className="comment_display_error">No comment</p>
            }
        </div>
    </>
}