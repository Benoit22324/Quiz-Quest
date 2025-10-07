import { useEffect, useState } from "react";
import { Controller, useForm, type FieldValues } from "react-hook-form"
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import UserRepository from "../../data/api/UserRepository";
import UpdateUserUseCase from "../../../domain/usecases/UpdateUserUseCase";
import { Alert } from "./Alert";
import type { UserModifyFormData } from "../../../typings/UserModifyFormData";
import { useAuth } from "../context/AuthContext";

export type UserModifyModalProps = {
    onSuccess: () => void
    onClose: () => void
}

export const UserModifyModal = ({ onSuccess, onClose }: UserModifyModalProps) => {
    const { user } = useAuth();
    const userRepository = new UserRepository();
    const updateUserUseCase = new UpdateUserUseCase(userRepository);

    const [showPass, setShowPass] = useState<boolean>(false);
    const [logError, setLogError] = useState<string | null>(null);
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const handleFormSubmit = async (values: FieldValues) => {
        const data = values as UserModifyFormData;

        try {
            if (user) {
                const newUser = {
                    username: data.username,
                    email: user.getEmail(),
                    password: data.password
                };
                const response = await updateUserUseCase.execute(newUser);

                if (response) {
                    onSuccess();
                    onClose();
                }
            }
        } catch(err: any) {
            throw new Error("Error during the update of the User");
        }
    }

    useEffect(() => {
        if (errors.username && errors.password) setLogError("Username and Password field empty");
        else if (errors.username) setLogError("Username field empty");
        else if (errors.password) setLogError("Password field empty");
    }, [errors])

    return <>
        <div className="user_modify_modal_component">
            {
                logError && <Alert message={logError} type="error" setter={setLogError} />
            }
            <div className="user_modify_modal">
                <h3 className="user_modify_title">Modify your information</h3>

                <form className="user_modify_form" onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="user_modify_input_container">
                        <label className="user_modify_label">Username :</label>

                        <Controller
                            control={control}
                            rules={{ required: true, min: 1 }}
                            defaultValue={user ? user.getUsername() : ""}
                            name="username"
                            render={({ field }) => <input
                                id="username"
                                type="text"
                                placeholder="Enter a username"
                                className="user_modify_input"
                                {...field}
                            />}
                        />
                    </div>

                    <div className="user_modify_input_container">
                        <label className="user_modify_label">Password :</label>

                        <Controller
                            control={control}
                            rules={{ required: true, min: 8 }}
                            defaultValue={""}
                            name="password"
                            render={({ field }) => <input
                                id="password"
                                type={showPass ? "text" : "password"}
                                placeholder="Enter a password"
                                className="user_modify_input"
                                {...field}
                            />}
                        />

                        {
                            showPass ? <FaEye className="user_modify_show_btn" onClick={() => setShowPass(false)} />
                            : <FaEyeSlash className="user_modify_show_btn" onClick={() => setShowPass(true)} />
                        }
                    </div>

                    <div className="user_modify_btn_container">
                        <button className="user_modify_cancel_btn" type="button" onClick={onClose}>Cancel</button>
                        <button className="user_modify_confirm_btn">Confirm</button>
                    </div>
                </form>
            </div>
        </div>
    </>
}