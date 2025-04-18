import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <form className="flex flex-col items-center space-y-4">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Label htmlFor="username">Username:</Label>
          <Input type="text" id="username" name="username" required />
        </div>
        <div className="flex w-full max-w-sm items-center space-x-3">
          <Label htmlFor="password">Password:</Label>
          <Input type="password" id="password" name="password" required />
        </div>
        <Button className="mx-auto w-fit" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
