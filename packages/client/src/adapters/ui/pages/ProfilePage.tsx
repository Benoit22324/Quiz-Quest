import { useEffect, useState } from "react";
import GetRunByUserUseCase from "../../../domain/usecases/GetRunByUserUseCase";
import { DateShow } from "../../../utils/DateShow";
import RunRepository from "../../data/api/RunRepository";
import { useAuth } from "../context/AuthContext"
import Run from "../../../domain/entities/Run";
import { RunDisplay } from "../components/RunDisplay";
import { UserModifyModal } from "../components/UserModifyModal";
import { Alert } from "../components/Alert";
import { DeleteConfirmationModal } from "../components/DeleteConfirmationModal";
import UserRepository from "../../data/api/UserRepository";
import DeleteUserUseCase from "../../../domain/usecases/DeleteUserUseCase";

export const ProfilePage = () => {
    const { user, logout } = useAuth();

    const runRepository = new RunRepository();
    const userRepository = new UserRepository();
    const getRunByUserUseCase = new GetRunByUserUseCase(runRepository);
    const deleteUserUseCase = new DeleteUserUseCase(userRepository);

    const [userRuns, setUserRuns] = useState<Run[] | null>(null);
    const [modifyModalOpen, setModifyModalOpen] = useState<boolean>(false);
    const [delConfirmModalOpen, setDelConfirmModalOpen] = useState<boolean>(false);
    const [logSuccess, setLogSuccess] = useState<string | null>(null);

    const handleDelete = async() => {
        try {
            if (user) {
                await deleteUserUseCase.execute();

                logout();
            }
        } catch(err: any) {
            throw new Error("Error during the deletion of the User");
        }
    }

    const fetchRun = async () => {
        try {
            if (user) {
                const response = await getRunByUserUseCase.execute({ userId: user.getId() });

                if (response) setUserRuns(response);
            }
        } catch(err: any) {
            throw new Error("Error during the fetch of the run");
        }
    }

    useEffect(() => {
        fetchRun()
    }, [])

    return <>
        {
            modifyModalOpen && <UserModifyModal
                onSuccess={() => setLogSuccess("Your information was updated")}
                onClose={() => setModifyModalOpen(false)}
            />
        }
        {
            delConfirmModalOpen && <DeleteConfirmationModal
                handleConfirm={handleDelete}
                onClose={() => setDelConfirmModalOpen(false)}
            />
        }
        {
            logSuccess && <Alert message={logSuccess} type="success" setter={setLogSuccess} />
        }
        <div className="profile_page">
            {
                user && <>
                    <section className="profile_user_info_section">
                        <h2 className="profile_user_title">Your Profile</h2>
                        <p>Username : <span className="bold">{user.getUsername()}</span></p>
                        <p>Email : <span className="bold">{user.getEmail()}</span></p>
                        <p>Joined the <span className="bold">{DateShow(user.getCreatedAt())}</span></p>
                        <div className="profile_info_btn_container">
                            <button className="profile_modify_btn" onClick={() => setModifyModalOpen(true)}>Modify Info</button>
                            <button className="profile_delete_btn" onClick={() => setDelConfirmModalOpen(true)}>Delete Account</button>
                        </div>
                    </section>

                    <section className="profile_quiz_history">
                        <h2 className="profile_quiz_history_title">Your Quiz History</h2>
                        <RunDisplay runs={userRuns} />
                    </section>
                </>
            }
        </div>
    </>
}