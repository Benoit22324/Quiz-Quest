import { Controller, useForm, type FieldValues } from "react-hook-form"
import type { LoginFormData } from "../../../typings/LoginFormData";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";
import { Alert } from "../components/Alert";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [showPass, setShowPass] = useState<boolean>(false);
    const [logError, setLogError] = useState<string | null>(null);
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const handleFormSubmit = async (values: FieldValues) => {
        const data = values as LoginFormData;

        try {
            const response = await login({
                email: data.email,
                password: data.password
            })

            if (!response) {
                setLogError("Invalid Credentials");
                return
            }

            navigate("/");
        } catch(err: any) {
            throw new Error("Error during the login");
        }
    }

    useEffect(() => {
        if (errors.email && errors.password) setLogError("Email & Password field empty");
        else if (errors.email) setLogError("Email field empty");
        else if (errors.password) setLogError("Password field empty");
    }, [errors])

    return <>
        {
            logError && <Alert message={logError} type={"error"} setter={setLogError} />
        }
        <div className="login_page">
            <h2 className="login_title">Already have an account ?</h2>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="login_form_container">
                <div className="login_input_container">
                    <label htmlFor="email" className="login_label bold">Email</label>

                    <Controller
                        control={control}
                        rules={{ required: true }}
                        defaultValue={""}
                        name="email"
                        render={({ field }) => <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="login_input"
                            {...field}
                        />}
                    />
                </div>

                <div className="login_input_container">
                    <label htmlFor="password" className="login_label bold">Password</label>

                    <Controller
                        control={control}
                        rules={{ required: true, min: 1 }}
                        defaultValue={""}
                        name="password"
                        render={({ field }) => <input
                            id="password"
                            type={showPass ? "text" : "password"}
                            placeholder="Enter your password"
                            className="login_input"
                            {...field}
                        />}
                    />

                    {
                        showPass ? <FaEye className="login_show_btn" onClick={() => setShowPass(false)} />
                        : <FaEyeSlash className="login_show_btn" onClick={() => setShowPass(true)} />
                    }
                </div>

                <button className="login_submit_btn">Log in</button>
            </form>
        </div>
    </>
}