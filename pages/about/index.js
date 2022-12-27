import React, { useEffect, useState } from "react";
import Head from "next/head";
import Tagline from "../../components/Tagline";
import Link from "next/link";
import axios from "axios";

function Index() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState([true, "Fetching..."]);
  useEffect(() => {
    async function getCount() {
      const { data } = await axios.get("/api/count");
      setCount(data.payload);
      setLoading([false]);
    }

    getCount();
  });
  return (
    <>
      <Head>
        <title>Mathsolver - About</title>
        <meta name="title" content="Mathsolver" />
        <meta
          name="description"
          content="Solve your math within a second
"
        />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Mathsolver" />
        <meta
          property="og:description"
          content="Solve your math within a second
"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Mathsolver" />
        <meta
          property="twitter:description"
          content="Solve your math within a second
"
        />
      </Head>
      <div className="bg-gray-100 h-fit">
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <Link href={"/"} className="btn btn-ghost normal-case text-xl">
              Mathsolver
            </Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link
                  href={"/"}
                  className="btn btn-ghost font-normal capitalize"
                >
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="px-2">
          <Tagline />

          <div className="mt-4 ml-auto mr-auto min-[200px]:w-sm min-[500px]:w-6/12">
            <div className="bg-white rounded-md border-2 py-6 px-4 ">
              <div className="text-center font-bold text-xl">About</div>
              <hr className="mt-2" />
              <p className="mt-3">
                This App was created by Ahmad Fikri Akbar using Next JS. This
                app is for solving mathematic questions. This app solve the
                problem with Wolfram-Alpha API
              </p>
              <br></br>
              <p className="mt-3">
                I hope this app will help you on your exam test like i do.
              </p>
              <br></br>
              <p>- Developer</p>
              <br />
              <div className="text-center text-slate-500">
                {loading[0] == true ? (
                  <span>{loading[1]}</span>
                ) : (
                  <span>Problem solved : {count}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
