import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Tagline from "../components/Tagline";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState([false]);

  const solve = async () => {
    setMessage([false]);
    setLoading(true);
    const { data } = await axios.post("/api/solve", { payload: input });
    if (data.status == 200) {
      console.log(data.payload);
      result.unshift(data.payload);
    } else {
      setMessage([true, data.message]);
    }
    setLoading(false);
  };
  return (
    <>
      <Head>
        <title>Mathsolver</title>
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
        <Navbar />
        <div className="px-2">
          <Tagline />

          <div className="mt-4 ml-auto mr-auto min-[200px]:w-sm min-[500px]:w-6/12">
            <form action="" onSubmit={(e) => e.preventDefault()}>
              <div className="bg-white rounded-md border-2 py-6 px-4 ">
                <div className="form-control">
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Enter your problem"
                      className="input input-bordered w-full"
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                      className={`btn ${loading && "loading"} `}
                      disabled={loading}
                      onClick={solve}
                      type="submit"
                    >
                      Solve!
                    </button>
                  </div>
                </div>
                {loading == true ? (
                  <div className="mt-3 text-slate-500">Solving...</div>
                ) : null}
                {message[0] == true ? (
                  <div className="mt-3 text-slate-500">{message[1]}</div>
                ) : null}
              </div>
            </form>
          </div>
          {result.length > 0 ? (
            <>
              {result.map((question, index) => {
                return (
                  <div
                    key={index}
                    className="mt-4 ml-auto mr-auto min-[200px]:w-sm min-[500px]:w-6/12"
                  >
                    <div className="bg-white rounded-md border-2 py-6 px-4 ">
                      {question.map((data, i) => {
                        if (data.name == "pod") {
                          if (data.elements[0].elements[0].name == "img") {
                            return (
                              <div key={i} className="p-2">
                                <h1 className="text-lg mb-2">
                                  {data.attributes.title}
                                </h1>
                                {data.elements.map((subpod, i) => {
                                  if (subpod.name == "subpod") {
                                    return (
                                      <img
                                        key={i}
                                        className="mb-2"
                                        src={subpod.elements[0].attributes.src}
                                      ></img>
                                    );
                                  }
                                })}
                                <hr className="mb-3" />
                              </div>
                            );
                          } else if (
                            data.elements[0].elements[1].name == "img"
                          ) {
                            return (
                              <div key={i} className="p-2">
                                <h1 className="text-lg mb-2">
                                  {data.attributes.title}
                                </h1>
                                {data.elements.map((subpod, i) => {
                                  if (subpod.name == "subpod") {
                                    return (
                                      <img
                                        key={i}
                                        className="mb-2"
                                        src={
                                          data.elements[0].elements[1]
                                            .attributes.src
                                        }
                                      ></img>
                                    );
                                  }
                                })}
                                <hr className="mb-3" />
                              </div>
                            );
                          } else if (data.attributes.title == "Image") {
                            return (
                              <div key={i} className="p-2">
                                <h1 className="text-lg mb-2">
                                  {data.attributes.title}
                                </h1>
                                {data.elements.map((subpod, i) => {
                                  if (subpod.name == "subpod") {
                                    return (
                                      <img
                                        key={i}
                                        className="mb-2"
                                        src={subpod.elements[2].attributes.src}
                                      ></img>
                                    );
                                  }
                                })}
                                <hr className="mb-3" />
                              </div>
                            );
                          }
                        } else {
                        }
                      })}
                    </div>
                  </div>
                );
              })}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
