import { Button, Divider, Indicator, NavLink } from "@mantine/core";
import { IconMenu } from "@tabler/icons";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import logo from "../public/logo.svg";
import Hamburger from "hamburger-react";
import CustomRefinementList from "../components/refinementlist";
import { signOut } from "next-auth/react";

const Nav = () => {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className="shadow-md w-full fixed top-0 left-0">
        <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
          <div className="cursor-pointer" onClick={() => router.push(`/`)}>
            <Image height={40} priority src={logo} alt="logo" />
          </div>

          <div className="space-x-3 flex absolute right-8 top-4">
            <div
              className="mt-3 cursor-pointer"
              onClick={() => setCartOpen(true)}
            >
              <Indicator
                color="#228B22"
                inline
                label={data?.cart?.length || 0}
                size={16}
              >
                <svg
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd"
                >
                  <path d="M13.5 21c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5m0-2c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5m-6 2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5m0-2c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5m16.5-16h-2.964l-3.642 15h-13.321l-4.073-13.003h19.522l.728-2.997h3.75v1zm-22.581 2.997l3.393 11.003h11.794l2.674-11.003h-17.861z" />
                </svg>
              </Indicator>
            </div>
            <div className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              <Hamburger
                onToggle={() => {
                  setCategoriesOpen(false);
                  setMenuOpen((o) => !o);
                }}
                size={24}
                className="inline"
              />
            </div>
          </div>

          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
              menuOpen ? "top-20 " : "top-[-490px]"
            }`}
          >
            <li key={`home`} className="md:ml-8 text-xl md:my-0 my-3">
              <NavLink
                label={
                  <a
                    href="/"
                    className="uppercase text-gray-800 hover:text-gray-400 duration-500"
                  >
                    Home
                  </a>
                }
                childrenOffset={28}
              />
            </li>

            <li key={`categories`} className="md:ml-8 text-xl md:my-0 my-3">
              <NavLink
                onChange={() => setCategoriesOpen((o) => !o)}
                label={
                  <a
                    href="#"
                    className=" uppercase text-gray-800 hover:text-gray-400 duration-500"
                  >
                    Categories
                  </a>
                }
                opened={categoriesOpen}
                childrenOffset={28}
              >
                <CustomRefinementList
                  attribute="category"
                  sortBy={["count:desc", "name:asc"]}
                />
              </NavLink>
            </li>

            <li key={`saved`} className="md:ml-8 text-xl md:my-0 my-3">
              <NavLink
                label={
                  <a
                    href="/saved"
                    className="uppercase text-gray-800 hover:text-gray-400 duration-500"
                  >
                    Saved
                  </a>
                }
                childrenOffset={28}
              />
            </li>

            <li key={`orders`} className="md:ml-8 text-xl md:my-0 my-3">
              <NavLink
                label={
                  <a
                    href="/orders"
                    className="uppercase text-gray-800 hover:text-gray-400 duration-500"
                  >
                    Orders
                  </a>
                }
                childrenOffset={28}
              />
            </li>

            <li key={`about`} className="md:ml-8 text-xl md:my-0 my-3">
              <NavLink
                label={
                  <a
                    href="/about"
                    className="uppercase text-gray-800 hover:text-gray-400 duration-500"
                  >
                    About
                  </a>
                }
                childrenOffset={28}
              />
            </li>

            <li key={`help`} className="md:ml-8 text-xl md:my-0 my-3">
              <NavLink
                label={
                  <a
                    href="/help"
                    className="uppercase text-gray-800 hover:text-gray-400 duration-500"
                  >
                    Help
                  </a>
                }
                childrenOffset={28}
              />
            </li>

            <li key={`contact`} className="md:ml-8 text-xl md:my-0 my-3">
              <NavLink
                label={
                  <a
                    href="/contact"
                    className="uppercase text-gray-800 hover:text-gray-400 duration-500"
                  >
                    Contact us
                  </a>
                }
                childrenOffset={28}
              />
            </li>

            <Divider />

            <li key={`account`} className="md:ml-8 text-xl md:my-0 my-3">
              <NavLink
                label={
                  <a
                    href="/account"
                    className="uppercase text-gray-800 hover:text-gray-400 duration-500"
                  >
                    My account
                  </a>
                }
                childrenOffset={28}
              />
            </li>

            <div className="md:hidden">
              <li key={`contact`} className="md:ml-8 text-xl md:my-0 my-3">
                <NavLink
                  label={
                    <a className="uppercase text-gray-800 hover:text-gray-400 duration-500">
                      <span
                        className="hover:cursor-pointer"
                        onClick={() => {
                          if (data) {
                            signOut();
                            notifications.show({
                              title: "You are now logged out",
                              color: "green",
                            });
                          }
                        }}
                      >
                        Log out
                      </span>
                    </a>
                  }
                  childrenOffset={28}
                />
              </li>
            </div>
          </ul>
        </div>
      </div>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima quasi
        impedit reiciendis earum veritatis voluptatum, iusto nemo labore?
        Tempore eaque ea architecto nesciunt nulla molestias eligendi tempora
        velit culpa facere?
      </p>
      <br />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima quasi
        impedit reiciendis earum veritatis voluptatum, iusto nemo labore?
        Tempore eaque ea architecto nesciunt nulla molestias eligendi tempora
        velit culpa facere?
      </p>
      <br />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima quasi
        impedit reiciendis earum veritatis voluptatum, iusto nemo labore?
        Tempore eaque ea architecto nesciunt nulla molestias eligendi tempora
        velit culpa facere?
      </p>
      <br />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima quasi
        impedit reiciendis earum veritatis voluptatum, iusto nemo labore?
        Tempore eaque ea architecto nesciunt nulla molestias eligendi tempora
        velit culpa facere?
      </p>
      <br />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima quasi
        impedit reiciendis earum veritatis voluptatum, iusto nemo labore?
        Tempore eaque ea architecto nesciunt nulla molestias eligendi tempora
        velit culpa facere?
      </p>
      <br />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima quasi
        impedit reiciendis earum veritatis voluptatum, iusto nemo labore?
        Tempore eaque ea architecto nesciunt nulla molestias eligendi tempora
        velit culpa facere?
      </p>
      <br />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima quasi
        impedit reiciendis earum veritatis voluptatum, iusto nemo labore?
        Tempore eaque ea architecto nesciunt nulla molestias eligendi tempora
        velit culpa facere?
      </p>
      <br />

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima quasi
        impedit reiciendis earum veritatis voluptatum, iusto nemo labore?
        Tempore eaque ea architecto nesciunt nulla molestias eligendi tempora
        velit culpa facere?
      </p>
      <br />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima quasi
        impedit reiciendis earum veritatis voluptatum, iusto nemo labore?
        Tempore eaque ea architecto nesciunt nulla molestias eligendi tempora
        velit culpa facere?
      </p>
      <br />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima quasi
        impedit reiciendis earum veritatis voluptatum, iusto nemo labore?
        Tempore eaque ea architecto nesciunt nulla molestias eligendi tempora
        velit culpa facere?
      </p>
      <br />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima quasi
        impedit reiciendis earum veritatis voluptatum, iusto nemo labore?
        Tempore eaque ea architecto nesciunt nulla molestias eligendi tempora
        velit culpa facere?
      </p>
      <br />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima quasi
        impedit reiciendis earum veritatis voluptatum, iusto nemo labore?
        Tempore eaque ea architecto nesciunt nulla molestias eligendi tempora
        velit culpa facere?
      </p>
      <br />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima quasi
        impedit reiciendis earum veritatis voluptatum, iusto nemo labore?
        Tempore eaque ea architecto nesciunt nulla molestias eligendi tempora
        velit culpa facere?
      </p>
      <br />
    </>
  );
};

export default Nav;
