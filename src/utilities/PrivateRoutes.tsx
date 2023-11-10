import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"
import { selectCurrentToken } from "../services/features/userSlice"
import jwtDecode from "jwt-decode";
import { AuthService } from "../services/authServices";
import { useAppSelector } from "../services2/hooks";
import { getToken } from "../services2/features/authSlice";


const PrivateRoutes = () => {
  const authService = new AuthService()
  const token = useSelector(selectCurrentToken)



  return (
    <>
      {!authService.getUserToken() ? (<Navigate to="/" />) : <Outlet />}
    </>
  )
}

export default PrivateRoutes
