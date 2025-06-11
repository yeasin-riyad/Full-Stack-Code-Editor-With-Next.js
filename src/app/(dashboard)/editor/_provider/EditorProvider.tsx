import { createContext, useContext, useState } from "react"


interface TEditorProvider{
    isLoading:boolean
    setIsLoading:(value:boolean)=>void
}

const initialValue={
    isLoading:false,
    setIsLoading:()=>{}
}

const createEditorProviderContext= createContext<TEditorProvider>(initialValue);

export const useEditorContext= ()=>useContext(createEditorProviderContext);

export function EditorProviderComponent({children}:{children:React.ReactNode}){
    const [isLoading,setIsLoading]=useState<boolean>(false);
    const handleLoading=(value?:boolean)=>{
        setIsLoading(value||false)

    }
    return (
        <createEditorProviderContext.Provider value={
            {
                isLoading,
                setIsLoading:handleLoading
            }
        }>
            {children}
        </createEditorProviderContext.Provider>
    )

}