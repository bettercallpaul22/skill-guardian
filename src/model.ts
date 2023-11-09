export interface AuthResponse {
    success: boolean;
    token: string;
    _id: string;
    user:User
}

export interface MyTokenResponse {
    user: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        city: string;
        state: string;
        country: string;
        avatar: string;
        age: number;
        gender: string;
        skills: string[];
        reviews: string[];
        skillsAndExperience: string;
        
    }

}

export interface MyTokenResponse {

    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    state: string;
    country: string;
    avatar: string;
    age: number;
    gender: string;


}

export interface MyChatResponse {
    _id: string;
    createdAt: string;
    updatedAt: string;
    members: string[];
}

export interface User {
    _id: string;
    createdAt: string;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    about: string;
    charges: string;
    gender: string;
    avatar: string;
    city: string;
    state: string;
    country: string;
    status: string;
    password: string;
    skills:  string;
    bvn:  string;
    bank_number:  string;
    guarantor_name: string;
    guarantor_number: string;
    bank_name:  string;
    mobile_number:  string;
    Skill_summary:  string;
}


export interface RequestDataResponse {
    _id: string;
    senderId: string;
    recipientId: string;
    firstName: string;
    lastName: string;
    avatar: string;
    age: number;
    gender: string;
    text: string;
    bill: string;
    city: string;
    state: string;
    country: string;
    createdAt: string;
    updatedAt: string;
}


export interface StatesData{
    code:string;
    name:string;
    lgas:string[];
}