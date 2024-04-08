import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 w-screen">
      <nav>
        <ul className="flex justify-between items-center">
          <li className="text-center flex-1">
            <div className="text-lg font-semibold flex-1">Get Cat</div>
          </li>
          <li className="sticky flex items-center justify-center right-0">
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
