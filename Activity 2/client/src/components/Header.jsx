import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

function Header({ name, withBack = false, backLink }) {
  return (
    <div className="flex gap-4 items-center">
      {withBack && (
        <Link to={backLink}>
          <ChevronLeft />
        </Link>
      )}
      <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
    </div>
  );
}

export default Header;
