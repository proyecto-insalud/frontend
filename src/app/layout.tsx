import "./globals.css";
import { AuthProvider } from "./context/AuthContext"; // importa tu AuthProvider


export const metadata = {
    title: "Insalud",
    description: "Frontend para Insalud",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
        <body>
        <AuthProvider>{children}</AuthProvider>
        </body>
        </html>
    );
}
