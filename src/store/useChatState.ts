import {create} from "zustand";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { imageListClasses } from "@mui/material";

interface chatState {
    messages : string[],
    users : UserData[],
    selectedUser : UserData | null,
    isUsersLoading : boolean,
    isMessagesLoading : boolean,
    getUsers : () => Promise<void>,
    getMessages : (userId : string) =>Promise<void>
    setSelectedUser : (selectUser : UserData | null) => void
    sendMessage : (messageData : {text : string , imageFile : File | null }) => Promise<void>
}

type UserData = {
    name : string,
    email : string,
    profilePic : string,
    createdAt : string,
    _id : string,
}

const useChatState = create<chatState>((set,get)=>({
    messages : [],
    users : [],
    selectedUser : null,
    isUsersLoading : false,
    isMessagesLoading : false,

    getUsers : async () =>{
        try{
            set({isUsersLoading : true})
            const res = await api.get("/message/getAllUser");
            set({users : res.data.allFilteredUsers});
            if(res.data.success === false) toast.error(res.data.message);
        }catch(err){
            console.log(err);
            set({users : []});  
        }finally{
            set({isUsersLoading : false});
        }
    },

    getMessages : async (userId : string)=>{
        try{
            set({isMessagesLoading : true})
            const res = await api.get(`message/getAllMessages/${userId}`)
            set({messages : res.data.messages});
        }catch(err){
            console.log(err);
            set({messages : []})
        }finally{
            set({isMessagesLoading : false})
        }
    },
    setSelectedUser : (selectUser : UserData | null)=> {
        set({selectedUser : selectUser});
    },

    sendMessage : async (messageData : {text : string , imageFile : File | null })=>{
        try{
            const {selectedUser, messages } = get();
            if(selectedUser){
                const formData = new FormData();
                formData.append("text",messageData.text);
                if(messageData.imageFile){
                    formData.append("image",messageData.imageFile);
                }
                // sending the data in the form format to the backend 
                // now need to properly take out the data in the backend 
                const res = await api.post(`/message/send/${selectedUser._id}`,formData,{
                    headers : {
                        "Content-Type": "multipart/form-data" 
                    },
                    withCredentials : true,
                })
                if(res.data.success) toast.success(res.data.message);
            }
        }catch(err){
            console.log(err);
            set({messages : []})
        }
    }
}))

export default useChatState;