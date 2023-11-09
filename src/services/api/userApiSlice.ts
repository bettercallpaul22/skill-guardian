import { AuthResponse } from "../../model";
import { AuthService } from "../authServices";
import { apiSlice } from "../baseApi";
const authService = new AuthService()

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getUser:builder.query({
            query: (userId)=>`api/user/profile/${userId}`
        }),
        getAllUsers:builder.query<AuthResponse[],  void>({
            query: (userId)=>`api/user/all`
        }),

        updateSkill:builder.mutation({
            query: (body) =>({
                url:`api/user/update-skill/${authService.getUserId()}`,
                method:"PUT",
                body,
                     
             })
        }),

      
    })
}) 


export const {useGetUserQuery, useUpdateSkillMutation, useGetAllUsersQuery} = userApiSlice