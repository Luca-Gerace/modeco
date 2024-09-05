import { useUser } from "../modules/UserContext";
import { IconizedCard } from "../components/IconizedCard";
import {
  ShoppingCartIcon,
  SparklesIcon,
  ChartBarIcon,
  TruckIcon,
  CheckBadgeIcon,
  NewspaperIcon
} from "@heroicons/react/24/solid";

export default function Home() {
  const { user } = useUser();

  const SECTIONS = [
    { icon: ChartBarIcon, title: 'Stats', link: '/stats' },
    { icon: ShoppingCartIcon, title: 'Products', link: '/products' },
    { icon: TruckIcon, title: 'Orders', link: '/orders' },
    { icon: SparklesIcon, title: 'Brands', link: '/brands' },
    { icon: CheckBadgeIcon, title: 'Green licenses', link: '/licenses' },
    { icon: NewspaperIcon, title: 'Blog posts', link: '/posts' },
  ];

  return (
    <section className="px-4 md:px-0">
      <h1 className="text-[40px] font-bold">Welcome back {user.name}</h1>
      <p>What would you like to do today? Let&apos;s make the world a better place together!</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-10">
        {SECTIONS.map((section, index) => (
          <IconizedCard
            key={index}
            icon={section.icon}
            title={section.title}
            link={section.link}
          />
        ))}
      </div>
    </section>
  );
}
