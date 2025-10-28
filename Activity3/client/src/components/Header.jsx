import { Plus } from "lucide-react";

function Header({ name, buttonName, action }) {
  return (
    <div className="flex justify-between">
      <h1 className="text-2xl font-bold mb-4">{name}</h1>
      <div className="flex justify-center items-center mb-6 relative">
        <button
          onClick={action}
          className="right-0 cursor-pointer bg-black text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-black/60 transition"
        >
          <Plus size={18} /> {buttonName}
        </button>
      </div>
    </div>
  );
}

export default Header;
