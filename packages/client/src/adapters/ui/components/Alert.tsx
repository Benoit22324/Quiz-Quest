import { useEffect } from "react"

export type AlertProps = {
    message: string,
    type: string,
    setter: (value: string | null) => void
}

export const Alert = ({ message, type, setter }: AlertProps) => {
    useEffect(() => {
        setTimeout(() => setter(null), 5000)
    }, [])

    return <>
        <div className={`alert_component ${type === "success" ? "alert_success" : "alert_error"}`}>
            <span>{message}</span>
        </div>
    </>
}