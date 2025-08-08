"use client"

import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"

const Navbar = () => {
    const { userInfo } = useSelector((state: RootState) => state.auth);

    return (
        <div>
            <h1>Name : {userInfo && userInfo.name}</h1>
        </div>
    )
}

export default Navbar
