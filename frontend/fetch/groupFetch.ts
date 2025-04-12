import { CHAT_GROUP_URL, CHAT_GROUP_USERS_URL, CHAT_MESSAGES_URL } from "@/lib/apiEndPoints"

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

export async function fetchChatGroup(id: string) {
    const res = await fetch(`${CHAT_GROUP_URL}/${id}`, {
      cache: "no-cache",
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const response = await res.json();
    console.log('the chat group fetched is',response.data)
    if (response?.data) {
      return response?.data;
    }
    return null;
  }



export async function fetchChatGroupUsers(id: string) {
    const res = await fetch(`${CHAT_GROUP_USERS_URL}?group_id=${id}`, {
      cache: "no-cache",
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const response = await res.json();
    console.log('the user data fetched is',response.data)
    if (response?.data) {
      return response?.data;
    }
    return [];
  }


  export const fetchChats = async (groupId: string) => {
    const res = await fetch(`${CHAT_MESSAGES_URL}/${groupId}`, {
      cache: "no-cache", 
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch messages");
    }
  
    const response = await res.json();
    console.log("Fetched messages:", response.data);
  
    if (response?.data) {
      return response?.data;
    }
    return [];
  };

  export const addMessage = async (groupId: string, message: string, name: string, token: string) => {
    const res = await fetch(`${CHAT_MESSAGES_URL}/${groupId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        name,
      }),
    });
  
    if (!res.ok) {
      throw new Error("Failed to add message");
    }
  
    const response = await res.json();
    console.log("Message added:", response.data);
  
    if (response?.data) {
      return response?.data;
    }
    return null;
  };

  export const deleteMessage = async (messageId: string, token: string) => {
    const res = await fetch(`${CHAT_MESSAGES_URL}/${messageId}`, {
      method: "DELETE",
    });
  
    if (!res.ok) {
      throw new Error("Failed to delete message");
    }
  
    const response = await res.json();
    console.log("Message deleted:", response);
  
    if (response?.data) {
      return response?.data;
    }
    return null;
  };