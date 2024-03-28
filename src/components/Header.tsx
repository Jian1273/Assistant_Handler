import { useLocation } from "preact-iso";

const menus = [
  { title: "Home", link: "/" },
  { title: "404", link: "/404" },
];

export function Header() {
  const { url } = useLocation();

  return (
    <header className="h-14 bg-blue-600 shadow-lg">
      <div className="h-full max-w-screen-lg mx-auto flex flex-row text-white space-x-8 items-center">
        <h2 className="text-xl font-bold">Python Tools Online</h2>
        <nav className="flex flex-row h-full">
          {menus.map((item) => (
            <a
              href={item.link}
              key={item.title}
              className={`px-6 flex flex-col justify-center hover:bg-black/20 transition-all ${
                url == item.link && "bg-black/20"
              }`}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
