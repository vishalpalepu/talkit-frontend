import {create} from 'zustand';
import api from '../lib/axios'
import { toast } from 'react-hot-toast';
import useSocketState from './useSocketState';

interface AuthState {
    userAuth : any | null;
    isCheckingAuth : boolean;
    isLogginnIn : boolean;
    isSigningUp : boolean;
    isUpdatingProfile : boolean;
    onlineUsers : string[],
    checkAuth: ()=> Promise<void>;
    signUp :(data :RegisterFormData ) =>Promise<void>;
    login  :(data:LoginFormData) =>Promise<void>;
    logout :()=>Promise<void>;
    updatePhoto : (data :File)=>Promise<void>;
    setOnlineUsers : (usersIds : string[])=>void,
}

type RegisterFormData = {
  name : string,
  email : string,
  password : string
}

type LoginFormData = Omit<RegisterFormData,'name'>;

const useAuthCheck = create<AuthState>((set,get)=>({

    userAuth : null,
    isCheckingAuth: true,
    isLogginnIn : false,
    isSigningUp : false,
    isUpdatingProfile : false,
    onlineUsers : [],
    socket : null,

    checkAuth :async ()=>{
        try{
            const res = await api.get("/auth/check")
            set({userAuth : res.data.user})
            useSocketState.getState().connectSocket();
        }catch(err){
            console.log(err);
            set({userAuth : null});
        }finally{
            set({isCheckingAuth : false})
        }
    },

    signUp : async (data:RegisterFormData) => {
        try{
            set({isSigningUp : true})
            const res = await api.post("/auth/register",data);
            if(res.data.success) toast.success(res.data.message);
            set({userAuth : res.data.user});
            useSocketState.getState().connectSocket();
        }catch(err){
            console.log(err);
            set({userAuth : null});
        }finally{
            set({isSigningUp : false})
        }
    },

    login : async(data: LoginFormData)=>{
        try{
            set({isLogginnIn : true});
            const res = await api.post("/auth/login",data);
            if(res.data.success) toast.success(res.data.message);
            set({userAuth : res.data.user});
            useSocketState.getState().connectSocket();
        }catch(err){
            console.log(err);
            set({userAuth : null});
        }finally{
            set({isLogginnIn : false});
        }
    },
    logout : async()=>{
        try{
            const res = await api.post("/auth/logout");
            if(res.data.success) toast.success(res.data.message);
            useSocketState.getState().disconnectSocket();
        }catch(err){
            console.log(err);
            set({userAuth : null});
        }finally{
            set({userAuth : false});
        }
    },
    updatePhoto: async(file : File) =>{
        try{
            set({isUpdatingProfile : true})
            const formData = new FormData();

            formData.append("profilePic",file);
            const res = await api.put("/auth/updateProfile", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });
            if(res.data.success) toast.success(res.data.message);
            else toast.error(res.data.message);
        }
        catch(err){
            console.log(err);
        }finally{
            set({isUpdatingProfile : false});
        }
    },
    setOnlineUsers : (userIds)=>{
        set({onlineUsers : userIds})
    }
}))

export default useAuthCheck;