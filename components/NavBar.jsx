"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signOut, signIn, getProviders, useSession } from "next-auth/react";
const NavBar = () => {
  const [providers, setProviders] = useState(null);
  const [ToggleMenu, setToggleMenu] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getProviders();
      setProviders(data);
    };
    fetchData();
  }, []);
  const { data: session } = useSession();

  return (
    <nav className="flex-between w-full mb-16 pt-3 ">
      <div className="flex-between gap-3">
        <Link href="/" className="flex gap-2 flex-center">
          <Image
            src={"/assets/images/logo.svg"}
            width={32}
            height={32}
            alt="logo"
            className="object-contain"
          />
        </Link>
        <Link
          target="_blank"
          href="https://github.com/Vyzz1/SharePrompt"
          className="flex gap-2 flex-center"
        >
          <Image
            src={"/assets/icons/github.svg"}
            width={32}
            height={32}
            alt="logo"
            className="object-contain"
          />
        </Link>
      </div>
      {/* Desktop */}
      {session?.user ? (
        <>
          {" "}
          <div className="sm:flex hidden">
            <div className="flex gap-3 md:gap-5">
              <Link href="/create-prompt" className="black_btn">
                Tạo Prompt
              </Link>
              <button className="outline_btn" type="button" onClick={signOut}>
                Đăng xuất
              </button>
              <Image
                alt="user-logo"
                src={session?.user.image}
                onClick={() => (window.location.href = "/profile")}
                width={37}
                height={37}
                className="rounded-full"
              />
            </div>
          </div>
        </>
      ) : (
        <div className="sm:flex hidden">
          {providers &&
            Object.values(providers).map((p) => (
              <button
                className="black_btn"
                key={p.name}
                onClick={() => signIn(p.id)}
                type="button"
              >
                Sign In
              </button>
            ))}
        </div>
      )}
      {/* Mobile */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <>
            <div className="flex ">
              <Image
                alt="user-logo"
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                onClick={() => setToggleMenu((pre) => !pre)}
              />
              {ToggleMenu && (
                <div className="dropdown">
                  <Link
                    href="/profile"
                    className="dropdown_link"
                    onClick={() => setToggleMenu(false)}
                  >
                    Tài khoản
                  </Link>
                  <Link
                    href="/create-prompt"
                    className="dropdown_link"
                    onClick={() => setToggleMenu(false)}
                  >
                    Tạo Prompt
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setToggleMenu(false);
                      signOut();
                    }}
                    className="mt-5 w-full black_btn"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {" "}
            {providers &&
              Object.values(providers).map((p) => (
                <button
                  className="black_btn"
                  key={p.name}
                  onClick={() => signIn(p.id)}
                  type="button"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
