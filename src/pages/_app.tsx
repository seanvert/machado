import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import "src/styles/globals.css"
import { ThemeProvider } from '~/components/themeprovider'

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
      <ThemeProvider attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
      <div className={cn(
          "bg-background font-sans antialiased",
          fontSans.variable
        )}>
      <Component {...pageProps} />
      </div>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
