import React from 'react';
import Header from '../components/Header';

type Props = {
    children: React.ReactNode;
};

export default function Layout({ children }: Props) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-1">{children}</div>
            {/* <Footer /> */}
        </div>
    );
}
