import DeleteUserUseCase from "../../../domain/usecases/DeleteUserUseCase";
import UserRepository from "../../data/api/UserRepository"
import { useAuth } from "../context/AuthContext";

export type DeleteConfirmationModalProps = {
    onClose: () => void
}

export const DeleteConfirmationModal = ({ onClose }: DeleteConfirmationModalProps) => {
    const { user, logout } = useAuth();

    const userRepository = new UserRepository();
    const deleteUserUseCase = new DeleteUserUseCase(userRepository);

    const handleDelete = async () => {
        try {
            if (user) {
                await deleteUserUseCase.execute();

                logout();
            }
        } catch(err: any) {
            throw new Error("Error during the deletion of the User");
        }
    }

    return <>
        <div className="delete_confirmation_modal_component">
            <div className="delete_confirmation_modal">
                <p className="delete_confirmation_text">Are you sure ?</p>

                <div className="delete_confirmation_btn_container">
                    <button className="delete_confirmation_cancel_btn" onClick={onClose}>Cancel</button>
                    <button className="delete_confirmation_delete_btn" onClick={handleDelete}>Confirm</button>
                </div>
            </div>
        </div>
    </>
}