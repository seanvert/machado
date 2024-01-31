"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Logo } from "@/components/ui/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "@/components/ui/darkmodetoggle"
import { signIn, signOut, useSession } from "next-auth/react";

const NavBar = () => {
  const { data: sessionData } = useSession();
  return (
    <NavigationMenu className="z-50">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <Logo />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      machado
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Um aplicativo para te ensinar escrita criativa
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/intro" title="Introdução">
                Inspiração e mais informações sobre o app.
              </ListItem>
              <ListItem href="/exercises" title="Exercícios">
                Comece a praticar agora mesmo!
              </ListItem>
              <ListItem href="/track" title="Progresso">
                O seu progresso no curso
              </ListItem>
              <ListItem href="/stats" title="Estatísticas">
                Suas estatísticas de uso do app.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        </NavigationMenuList>
        <div className="flex-grow"></div>
        <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Login</NavigationMenuTrigger>
          <NavigationMenuContent>

          </NavigationMenuContent>
        </NavigationMenuItem>
        {sessionData ? 
        <Link href={"/" + sessionData?.user?.name} legacyBehavior passHref>
        <span>Logged in as {sessionData.user?.name}</span>
        </Link> :
        ""}
        <ModeToggle />
        <NavigationMenuItem onClick={sessionData ? () => void signOut() : () => void signIn()}>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {sessionData ? "Sign out" : "Sign in"}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        </NavigationMenuList>  
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
export default NavBar;