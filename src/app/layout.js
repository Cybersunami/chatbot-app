import { Inter } from "next/font/google";
import ThemeProviderWrapper from "./ThemeProviderWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ChatBot",
  description: "Your friendly chatbot",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <div style={{ 
          minHeight: "100vh", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          background: "linear-gradient(90deg, rgba(196,174,238,1) 0%, rgba(148,183,233,1) 48%)"
        }}>
          <ThemeProviderWrapper>
            {children}
          </ThemeProviderWrapper>
        </div>
      </body>
    </html>
  );
}
