import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"

type Props = {
    children: React.ReactNode
}

export default function Layout({children}: Props) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div>
                {children}
            </div>
            {/* <Footer /> */}
        </div>
    )
} 