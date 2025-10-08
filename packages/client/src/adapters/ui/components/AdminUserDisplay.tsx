import type User from "../../../domain/entities/User"
import { AdminUserView } from "./AdminUserView"

export type AdminUserDisplayProps = {
    usersList: User[] | null
    setDelete: (value: boolean) => void
}

export const AdminUserDisplay = ({ usersList, setDelete }: AdminUserDisplayProps) => {
    return <>
        <div className="admin_user_display_component">
            {
                usersList ? usersList.map(user => <AdminUserView user={user} setDelete={setDelete} key={user.getId()} />)
                : <p className="admin_user_display_error">No User found</p>
            }
        </div>
    </>
}