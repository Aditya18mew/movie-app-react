import { createContext } from "react";
import { useContext } from "react";


export const Moviecontext=createContext()

export function useCustomcontext(){
    return useContext(Moviecontext)
}
