import { MenuIcon } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

function Dropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-sm" >
          <MenuIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Navigation</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Button variant="link" asChild>
              <a href="/">Home</a>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button variant="link" asChild>
              <a href="/cat">Cat</a>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <ModeToggle />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Header() {
  return (
    <header className="sticky mt-4 w-screen flex items-center justify-center">
      <nav>
        <ul className="flex items-center justify-between">
          <li className="flex-1 text-center">
            <a href="/" className="flex-1 text-lg font-semibold">
              Get Cat
            </a>
          </li>
          <li className="fixed left-0 pl-2 flex items-center justify-center">
            <Dropdown />
          </li>
        </ul>
      </nav>
    </header>
  );
}
