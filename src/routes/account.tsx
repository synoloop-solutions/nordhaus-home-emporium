import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account — NordHaus Living" },
      { name: "description", content: "Sign in or create your NordHaus Living account." },
    ],
    links: [{ rel: "canonical", href: "/account" }],
  }),
  component: AccountPage,
});

function AccountPage() {
  const [email, setEmail] = useState("");
  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:px-6">
      <h1 className="mb-6 text-center font-display text-3xl font-semibold">My Account</h1>
      <Tabs defaultValue="login">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Sign in</TabsTrigger>
          <TabsTrigger value="register">Create account</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <form className="space-y-4 pt-4" onSubmit={(e) => { e.preventDefault(); toast.success("Signed in (demo)"); }}>
            <div className="space-y-1.5"><Label htmlFor="le">Email</Label><Input id="le" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            <div className="space-y-1.5"><Label htmlFor="lp">Password</Label><Input id="lp" type="password" required /></div>
            <Button type="submit" className="w-full">Sign in</Button>
          </form>
        </TabsContent>
        <TabsContent value="register">
          <form className="space-y-4 pt-4" onSubmit={(e) => { e.preventDefault(); toast.success("Account created (demo)"); }}>
            <div className="space-y-1.5"><Label htmlFor="rn">Full name</Label><Input id="rn" required /></div>
            <div className="space-y-1.5"><Label htmlFor="re">Email</Label><Input id="re" type="email" required /></div>
            <div className="space-y-1.5"><Label htmlFor="rp">Password</Label><Input id="rp" type="password" required /></div>
            <Button type="submit" className="w-full">Create account</Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}