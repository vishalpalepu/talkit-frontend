import {create} from "zustand";
import {Socket , io} from "socket.io-client";
import useAuthCheck from "./useAuthCheck";

interface SocketState {
    socket : Socket | null,
    connectSocket: ()=>void,
    disconnectSocket : ()=>void,
}

const useSocketState = create<SocketState>((set,get)=>({
    socket : null,
    connectSocket:  ()=>{
        const userAuth = useAuthCheck.getState().userAuth;

        if(!userAuth || get().socket?.connected) return;
        const socket = io("http://localhost:3030",{
            query : {
                userId : userAuth._id,
            }
        })
        socket.connect();
        set({socket : socket})

        socket.on("getOnlineUsers",(userIds)=>{
            useAuthCheck.getState().setOnlineUsers(userIds);
        })
    },
    disconnectSocket : ()=>{
        if(get().socket?.connected) get().socket?.disconnect();
        set({socket : null});
    }
}))

export default useSocketState;
