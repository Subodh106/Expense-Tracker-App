
import React, { ReactNode } from "react";

export default function authLayout({children}:{children:ReactNode}){
    return(
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md mx-auto">
                {children}
            </div>
        </div>
    )
}