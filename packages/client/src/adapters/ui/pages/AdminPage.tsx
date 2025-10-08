import { useEffect, useState } from "react";
import GetAllUserUseCase from "../../../domain/usecases/GetAllUserUseCase";
import UserRepository from "../../data/api/UserRepository"
import User from "../../../domain/entities/User";
import { AdminUserDisplay } from "../components/AdminUserDisplay";
import { useAuth } from "../context/AuthContext";

export const AdminPage = () => {
    const { user } = useAuth();

    const userRepository = new UserRepository();
    const getAllUserUseCase = new GetAllUserUseCase(userRepository);

    const [usersList, setUsersList] = useState<User[] | null>(null);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const fetchUsers = async() => {
        try {
            if (user) {
                const response = await getAllUserUseCase.execute();

                if (response) {
                    const filteredUsers = response.filter(userData => userData.getId() !== user?.getId())
                    setUsersList(filteredUsers.length > 0 ? filteredUsers : null);
                }
            }
        } catch(err: any) {
            throw new Error("Error during the fetch of every Users");
        }
    }

    useEffect(() => {
        if (!isDeleting) fetchUsers()
    }, [isDeleting])

    return <>
        <div className="admin_page">
            <h2 className="admin_page_title">User List</h2>

            <AdminUserDisplay usersList={usersList} setDelete={setIsDeleting} />
        </div>
    </>
}