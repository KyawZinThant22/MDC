import { FiSearch } from "react-icons/fi";
import Link from "next/link";

const Header = () => {
  return (
    <nav className=" w-full headerShadow py-3">
      <div className=" container mx-auto flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="bg-black p-2 rounded">
            <header className="text-lg font-bold text-white">MDC</header>
          </div>
          <form className="flex justify-between cursor-none bg-white border hover:border-gray-500 p-2 rounded-md w-[30rem]">
            <input type="text" placeholder="Search..." className="text-black" />
            <FiSearch size={20} />
          </form>
        </div>
        <nav className="flex items-center gap-3 text-lg">
          <button
            type="button"
            aria-label="log in button"
            className="hover:bg-blue-50 p-2 rounded-md px-4 hover:text-blue-600 hover:underline"
          >
            Log in
          </button>
          <Link href="/create-new-user">
            <button
              type="button"
              aria-label="create account button"
              className="border-blue-600 p-2 text-blue-600 rounded-md px-3 border hover:bg-blue-500 hover:text-white"
            >
              Create account
            </button>
          </Link>
        </nav>
      </div>
    </nav>
  );
};

export default Header;
