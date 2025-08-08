import { Poppins } from 'next/font/google';
import { Children } from './types';
import { METADATA } from './constants';
import './global.css';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '600']
});

export const metadata = METADATA.ROOT_LAYOUT;

function RootLayout({ children }: Children) {
    return (
        <html lang="en" className={poppins.className}>
            <body>
                <main className="main">{children}</main>
            </body>
        </html>
    );
};

export default RootLayout;
