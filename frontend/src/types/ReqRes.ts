
interface Profile{
    id:number,
    user_id:number,
    bio?:string,
    cover_pic?:string,
    profile_pic?:string,
}


export interface User {
    id: number,
    name: string,
    email: string,
    username: string,
    profile?:Profile
}

interface Message {
    id: number,
    text?: string,
    user_id: number,
    conversation_id: number,
    updated_at: string,
    created_at: string,
    markdown?:string
}

interface Post {
    id: number,
    content: string,
    user_id: number,
    view_count: number,
    updated_at: string,
    created_at: string,
}

interface Conversation{
    user_id:number,
    conversation_id:number,
    user:User
}


//payload

