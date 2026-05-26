"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { Settings, User, LogOut, ChevronDown } from "lucide-react"

export default function Home() {
  const [position, setPosition] = useState("bottom")

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-12 p-12">
      <h1 className="text-2xl font-semibold">shadcn/ui Demo</h1>

      <section className="flex flex-col items-center gap-3">
        <h2 className="text-sm font-medium text-muted-foreground">Buttons</h2>
        <div className="flex flex-wrap items-center gap-2">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      <section className="flex flex-col items-center gap-3">
        <h2 className="text-sm font-medium text-muted-foreground">Dropdown Menu</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Open Menu <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>
              Show details
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Show sidebar</DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Position</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
              <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              <LogOut /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </div>
  )
}
