import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useRouter } from "next/router";

import { CloseIcon, MenuIcon } from "./Icons";

export default function Navbar({ items }) {
  // console.log(`nav items`, items);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggle() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-white/90 shadow-lg">
      <div className="container mx-auto flex flex-wrap items-center justify-between text-sm font-medium uppercase text-slate-700 xl:gap-10">
        <Link href={`/`}>
          <a className="m-4 h-10 w-20" title="Home">
            <Image
              src={`${useRouter().basePath}/brand/logo.png`}
              height={50}
              width={114}
              layout={`responsive`}
              alt={`Logo`}
            />
          </a>
        </Link>
        <button onClick={toggle} className="navbar-toggler p-4 xl:hidden">
          {isMenuOpen ? CloseIcon(`icon-close`) : MenuIcon(`icon-menu`)}
        </button>
        <ul
          className={`${
            isMenuOpen ? `flex w-full` : `hidden`
          } flex-col divide-y xl:flex xl:flex-row xl:items-center xl:gap-10 xl:divide-y-0`}
        >
          <li className="current mx-4 py-2">
            <Link href={`/`}>
              <a className="py-6 hover:text-orange-600">Home</a>
            </Link>
          </li>
          {items &&
            items.map((item) => {
              // console.log(`children`, children, `type: `, typeof children);
              return (
                <li key={item.id} className="group relative mx-4 py-4">
                  <Link href={`/category/${item.id}`}>
                    <a>
                      <span className="">{item.name}</span>
                    </a>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </nav>
  );
}
