import { FaTrashAlt } from "react-icons/fa"
import type User from "../../../domain/entities/User"
import { DateShow } from "../../../utils/DateShow"
import UserRepository from "../../data/api/UserRepository"
import DeleteUserUseCase from "../../../domain/usecases/DeleteUserUseCase"
import { useState } from "react"
import { DeleteConfirmationModal } from "./DeleteConfirmationModal"

export type AdminUserViewProps = {
    user: User
    setDelete: (value: boolean) => void
}

export const AdminUserView = ({ user, setDelete }: AdminUserViewProps) => {
    const userRepository = new UserRepository();
    const deleteUserUseCase = new DeleteUserUseCase(userRepository);

    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

    const handleDelete = async () => {
        try {
            setDelete(true);

            const response = await deleteUserUseCase.execute({ id: user.getId() });

            if (response) setDelete(false);
        } catch(err: any) {
            throw new Error("Error during the Deletion of the User");
        }
    }

    return <>
        {
            deleteModalOpen && <DeleteConfirmationModal handleConfirm={handleDelete} onClose={() => setDeleteModalOpen(false)} />
        }
        <div className="admin_user_view_component">
            <p>Username : <span className="bold">{user.getUsername()}</span></p>
            <p>Email : <span className="bold">{user.getEmail()}</span></p>
            <p>Joined the <span className="bold">{DateShow(user.getCreatedAt())}</span></p>
            <FaTrashAlt className="admin_user_view_delete_btn" onClick={() => setDeleteModalOpen(true)} />
        </div>
    </>
}