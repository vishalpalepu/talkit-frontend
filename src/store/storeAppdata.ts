import {create} from 'zustand';
import api from '../lib/axios'

interface AuthState {
    userAuth : any | null;
    isCheckingAuth : boolean;
    isLogginnIn : boolean;
    isSiginingUp : boolean;
    isUpdatingProfile : boolean;
    checkAuth: ()=> Promise<void>;
    signUp :(data :RegisterFormData ) =>Promise<void>
}

type RegisterFormData = {
  name : string,
  email : string,
  password : string
}

type LoginFormData = Omit<RegisterFormData,'name'>;

const useAuthCheck = create<AuthState>((set)=>({

    userAuth : null,
    isCheckingAuth: true,
    isLogginnIn : false,
    isSiginingUp : false,
    isUpdatingProfile : false,

    checkAuth :async ()=>{
        try{
            const res = await api.get("/auth/check")
            set({userAuth : res.data.user})
        }catch(err){
            console.log(err);
            set({userAuth : null});
        }finally{
            set({isCheckingAuth : false})
        }
    },

    signUp : async (data:RegisterFormData) => {
        try{
            set({isSiginingUp : true})
            const res = await api.post("/auth/register",data);
            set({userAuth : res.data});
        }catch(err){
            console.log(err);
            set({userAuth : null});
        }finally{
            set({isSiginingUp : false})
        }
    },

    login : async(data: LoginFormData)=>{
        try{
            set({isLogginnIn : true});
            const res = await api.post("/auth/login",data);
            set({userAuth : res.data});
        }catch(err){
            console.log(err);
            set({userAuth : null});
        }finally{
            set({isLogginnIn : false});
        }
    }
}))

export default useAuthCheck;