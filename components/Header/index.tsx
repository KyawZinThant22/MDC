import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Logout, resetData } from "../../redux/features/auth";
import { useRouter } from "next/router";

import Popup from "reactjs-popup";

//icons
import { RiNotification3Line } from "react-icons/ri";

const navLinks = [
  {
    title: "Dashboard",
    route: "/",
  },
  {
    title: "Create Post",
    route: "/",
  },
  {
    title: "Reading List",
    route: "/",
  },
  {
    title: "Setting",
    route: "/",
  },
];

const Header = () => {
  const { user } = useAppSelector((state) => state.auth.value);

  const userData = useAppSelector((state) => user && state.user.value);

  const authData = useAppSelector((state) => state.auth.value);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onLogOut = () => {
    dispatch(Logout());
    dispatch(resetData());
    router.push("/");
  };

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
          {authData.user ? (
            <>
              {/* <p>{userName}</p> */}
              <button
                type="button"
                aria-label="create account button"
                className="border-blue-600 p-2 text-blue-600 rounded-md px-3 border hover:bg-blue-500 hover:text-white"
              >
                Create Post
              </button>

              <div className="relative cursor-pointer">
                <div className="w-4 text-white text-sm rounded-full bg-red-600 absolute left-4 text-center bottom-4">
                  1
                </div>
                <RiNotification3Line size={30} />
              </div>

              <div className="tooltipBoundary relative">
                <Popup
                  trigger={
                    <button type="button" className="button">
                      <div>
                        <div className="w-10 h-10 bg-green-400 rounded-full"></div>
                      </div>
                    </button>
                  }
                  position={["top center"]}
                  closeOnDocumentClick
                  keepTooltipInside=".tooltipBoundary"
                >
                  <div className="border-2 w-[18rem] absolute  top-3 -right-[50px] bg-white rounded-md  ">
                    <div className=" space-y-0 px-6 py-2 pt-3 cursor-pointer m-2 rounded hover:bg-[#EBECFC] hover:first:underline">
                      <p className="m-0">Kyaw Zin Thant</p>
                      <p className="text-sm text-gray-500">@kyawzinthant22</p>
                    </div>
                    <hr className="mt-2" />
                    <ul className="p-2 px-4 ">
                      {navLinks.map((nav: any, idx: number) => (
                        <li
                          className="cursor-pointer p-2 text-lg hover:underline rounded hover:bg-[#EBECFC] "
                          key={idx}
                        >
                          {nav.title}
                        </li>
                      ))}
                    </ul>
                    <hr className="mt-2" />
                    <p
                      className="px-6 p-2 pb-3 hover:underline rounded hover:bg-[#EBECFC] m-2 cursor-pointer"
                      onClick={onLogOut}
                    >
                      Sign Out
                    </p>
                  </div>
                </Popup>
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <button
                  type="button"
                  aria-label="log in button"
                  className="hover:bg-blue-50 p-2 rounded-md px-4 hover:text-blue-600 hover:underline"
                >
                  Log in
                </button>
              </Link>
              <Link href="/create-new-user">
                <button
                  type="button"
                  aria-label="create account button"
                  className="border-blue-600 p-2 text-blue-600 rounded-md px-3 border hover:bg-blue-500 hover:text-white"
                >
                  Create account
                </button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </nav>
  );
};

export default Header;
