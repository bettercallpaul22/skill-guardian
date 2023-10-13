import { AuthService } from "../authServices";
import { apiSlice } from "../baseApi";
const authService = new AuthService()

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getUser:builder.query({
            query: (userId)=>`api/user/profile/${userId}`
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


export const {useGetUserQuery, useUpdateSkillMutation} = userApiSlice