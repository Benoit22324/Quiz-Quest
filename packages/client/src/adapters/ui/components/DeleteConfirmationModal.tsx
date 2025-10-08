export type DeleteConfirmationModalProps = {
    handleConfirm: () => void
    onClose: () => void
}

export const DeleteConfirmationModal = ({ handleConfirm, onClose }: DeleteConfirmationModalProps) => {
    return <>
        <div className="delete_confirmation_modal_component">
            <div className="delete_confirmation_modal">
                <p className="delete_confirmation_text">Are you sure ?</p>

                <div className="delete_confirmation_btn_container">
                    <button className="delete_confirmation_cancel_btn" onClick={onClose}>Cancel</button>
                    <button className="delete_confirmation_delete_btn" onClick={handleConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    </>
}