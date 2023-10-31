import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"
import { selectCurrentToken } from "../services/features/userSlice"
import  jwtDecode  from "jwt-decode";
import { AuthService } from "../services/authServices";


const PrivateRoutes = () => {
    const authService = new AuthService()
    const token = useSelector(selectCurrentToken)

  


if( token !== null) {
    console.log("token is valid")
}else{
    console.log("token is invalid....")

}

    
    return (
        <>
        {/* {token && (<Outlet />)} */}
        {!authService.getUserToken() ? (<Navigate to="/" />) : <Outlet /> }
        </>
    )
}

export default PrivateRoutes
