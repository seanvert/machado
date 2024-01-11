import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import "src/styles/globals.css"


export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
      <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
