import { CHAT_GROUP_URL } from "@/lib/apiEndPoints"

 export const fetchChatGroups=async(token:string)=>{
    const res=await fetch(CHAT_GROUP_URL,{
        headers:{
            Authorization: `Bearer ${token}`
        },
        next:{
            revalidate:60*60,
            tags:["dashboard"]
        }
    })

    if(!res.ok){
        throw new Error("failed to fetch data")
    }

    const response=await res.json()
    if(response?.data){
        return response?.data
    }
    return []
}

