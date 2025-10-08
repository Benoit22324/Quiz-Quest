import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6"
import { Alert } from "../components/Alert";
import { Controller, useForm, type FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { RegisterFormData } from "../../../typings/RegisterFormData";

export const RegisterPage = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [showPass, setShowPass] = useState<boolean>(false);
    const [logError, setLogError] = useState<string | null>(null);
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const handleFormSubmit = async (values: FieldValues) => {
        const data = values as RegisterFormData;

        try {
            const response = await register({
                username: data.username,
                email: data.email,
                password: data.password
            })

            if (typeof response === "string") {
                setLogError(response);
                return
            }

            navigate("/login");
        } catch(err: any) {
            throw new Error("Error during the registration");
        }
    }

    useEffect(() => {
        if (errors.username && errors.email && errors.password) setLogError("Username, Email and Password field empty");
        else if (errors.username) setLogError("Username field empty");
        else if (errors.email) setLogError("Email field empty");
        else if (errors.password) setLogError("Password field empty");
    }, [errors])

    return <>
        {
            logError && <Alert message={logError} type={"error"} setter={setLogError} />
        }
        <div className="register_page">
            <h2 className="register_title">Register to create your quiz world</h2>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="register_form_container">
                <div className="register_input_container">
                    <label htmlFor="username" className="register_label bold">Username</label>

                    <Controller
                        control={control}
                        rules={{ required: true, min: 1 }}
                        defaultValue={""}
                        name="username"
                        render={({ field }) => <input
                            id="username"
                            type="text"
                            placeholder="Enter a username"
                            className="register_input"
                            {...field}
                        />}
                    />
                </div>

                <div className="register_input_container">
                    <label htmlFor="email" className="register_label bold">Email</label>

                    <Controller
                        control={control}
                        rules={{ required: true }}
                        defaultValue={""}
                        name="email"
                        render={({ field }) => <input
                            id="email"
                            type="email"
                            placeholder="Enter a email"
                            className="register_input"
                            {...field}
                        />}
                    />
                </div>

                <div className="register_input_container">
                    <label htmlFor="password" className="register_label bold">Password</label>

                    <Controller
                        control={control}
                        rules={{ required: true, min: 1 }}
                        defaultValue={""}
                        name="password"
                        render={({ field }) => <input
                            id="password"
                            type={showPass ? "text" : "password"}
                            placeholder="Enter a password"
                            className="register_input"
                            {...field}
                        />}
                    />

                    {
                        showPass ? <FaEye className="register_show_btn" onClick={() => setShowPass(false)} />
                        : <FaEyeSlash className="register_show_btn" onClick={() => setShowPass(true)} />
                    }
                </div>

                <button className="register_submit_btn">Register</button>
            </form>
        </div>
    </>
}