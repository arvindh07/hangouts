import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

interface RedirectProps {
    user: boolean
}
const Redirect = ({ user }: RedirectProps) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/auth")
        } else {
            navigate("/")
        }
    }, [])

    return <><Outlet /></>
}

export default Redirect