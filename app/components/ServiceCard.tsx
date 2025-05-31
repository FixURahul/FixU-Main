import Link from "next/link";
import { ReactNode } from "react";

interface ServiceCardProps {
  href: string;
  icon: ReactNode;
  title: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ href, icon, title }) => {
  return (
    <Link
      href={href}
      className="bg-gray-900 rounded-lg p-6 text-center hover:bg-gray-800 transition-colors cursor-pointer"
    >
      <div className="flex justify-center mb-3">{icon}</div>
      <h3 className="text-lg font-medium text-white">{title}</h3>
    </Link>
  );
};

export default ServiceCard;