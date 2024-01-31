import type { ReactNode } from "react"
import Head from "next/head";

import NavBar from "./navbar"
import { Footer } from "./footer"
import { cn } from "@/lib/utils"

export const PageLayout = ({children} : {children: ReactNode}) => {
    return (
        <>
        <Head>
        <title>Machado</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <main className={cn("flex justify-center h-screen ")}>
            <div className="h-full w-full
flex-grow flex-col items-center flex
            ">
                <NavBar />
                {children}
                <Footer />
            </div>
        </main>
        </>
    )
}