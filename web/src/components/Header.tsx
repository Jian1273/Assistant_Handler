import { useLocation } from "preact-iso";

const navStyles = {
  normal:
    "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium",
  active: "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium",
};

const menus = [
  { title: "主页", link: "/" },
  { title: "404", link: "/404" },
];

export function Header() {
  const { url } = useLocation();

  return (
    <nav class="bg-gray-800">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <h2 className="text-xl font-bold text-white">
                Admin Tools Online
              </h2>
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                {menus.map((item) => (
                  <a
                    href={item.link}
                    key={item.title}
                    className={
                      url == item.link ? navStyles.active : navStyles.normal
                    }
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
