import {create} from "zustand";
import api from "../lib/axios";
import toast from "react-hot-toast";

interface chatState {
    messages : string[],
    users : UserData[],
    selectedUser : UserData | null,
    isUsersLoading : boolean,
    isMessagesLoading : boolean,
    getUsers : () => Promise<void>,
    getMessages : (userId : string) =>Promise<void>
    setSelectedUser : (selectUser : UserData | null) => void
}

type UserData = {
    name : string,
    email : string,
    profilePic : string,
    createdAt : string,
    _id : string,
}

const useChatState = create<chatState>((set)=>({
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
    }
}))

export default useChatState;