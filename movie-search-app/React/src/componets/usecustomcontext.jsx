import { createContext } from "react";
import { useContext } from "react";


export const MovieContext=createContext()

export function useCustomcontext(){
    return useContext(MovieContext)
}
