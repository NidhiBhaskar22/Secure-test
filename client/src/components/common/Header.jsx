import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { clearAuth } from "../../redux/slices/authSlice";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import logo from "../../assets/logo_bgless.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const navigation = [
  { name: "About", link: "/about" },
  { name: "Contact", link: "/contact" },
];

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(
      clearAuth()
    )
    toast.success("User logged out");
    navigate("/");
  }

  const dashboardLink =
  auth?.user?.Role === "ADMIN" ? "/dashboard-admin" : "/dashboard-user";

  return (
    <header className="bg-white/90">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">SecureTest</span>
            <img alt="Logo" src={logo} className="h-10 w-30" />
          </Link>
        </div>
        <div className="hidden lg:flex lg:gap-x-16">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              className="text-lg font-semibold text-orange-500 p-2 hover:bg-orange-500 hover:text-white rounded transition-all duration-200"
            >
              {item.name}
            </Link>
          ))}
        </div>
        {auth?.user?.Role === "ADMIN" && <Link  to={'/test-creation'} className="text-lg font-semibold text-orange-500 ml-8 p-2 hover:bg-orange-500 hover:text-white rounded transition-all duration-200">Create Test</Link>}
        {auth?.user?.Role === "USER" && <Link to={'/dashboard-user/tests-list'} className="text-lg font-semibold text-orange-500 ml-8 p-2 hover:bg-orange-500 hover:text-white rounded transition-all duration-200">Tests</Link>}
        <div className="flex flex-1 items-center justify-end gap-x-6">
          {auth?.user ? (
            <>
              <Link
                to={dashboardLink}
                className="hidden text-lg font-semibold text-orange-500 lg:block"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-md bg-orange-500 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden text-lg font-semibold text-orange-500 lg:block"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded-md bg-orange-500 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
      </nav>
      <div className="h-[0.05rem] bg-orange-400 ml-60 mr-60"></div>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center gap-x-6">
            <Link to="/" className="-m-1.5 p-1.5">
              <img alt="Logo" src={logo} className="h-8 w-auto" />
            </Link>
            <Link
              to="/register"
              className="ml-auto rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.link}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Link
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
