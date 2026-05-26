import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import "./App.css"

function App() {
  const [serverTime, setServerTime] = useState<string>("")

  useEffect(() => {
    fetch("/api/datetime")
      .then((res) => res.json())
      .then((data) => setServerTime(data.now))
  }, [])

  return (
    <div className="app min-h-dvh flex flex-col items-center justify-center gap-8 p-8">
      <Badge variant="outline" className="text-base py-1 px-3">
        {/* Server time: {serverTime || "Loading..."} */} 
        {serverTime} kfldsajflkdsaj
      </Badge>

      <h1 className="text-4xl font-bold tracking-tight">Theme Showcase</h1>

      <div className="flex flex-wrap items-center gap-4 justify-center">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button disabled>Disabled</Button>
      </div>

      <div className="flex flex-wrap items-center gap-2 justify-center">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </div>

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Enter your credentials to continue.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Sign in</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default App
