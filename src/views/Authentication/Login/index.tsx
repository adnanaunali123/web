// React Imports
import { FC, Fragment, useState } from "react";

// React Query Imports
import { UserLoginMutationHook } from "@/services/react-query-client/auth/user-login";

// Custom Component Imports
import { Button } from "@/components/ui/button";
import { setCookieClientSideFn } from "@/utils/storage.util";
import Router from "next/router";
import { useAppDispatch } from "@/redux/store";
import { loginSuccess } from "@/redux/slices/authentication.slice";

interface ISignInViewProps {}

const SignInView: FC<ISignInViewProps> = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { mutateAsync } = UserLoginMutationHook();

  /**
   * @description Handles the login process for the user
   *
   * @returns {void}
   */
  const handleLogin = async (formData: FormData): Promise<void> => {
    const userName = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      setLoading(true);

      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userName,
          password: password,
          expiresInMins: 30, // optional, defaults to 60
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCookieClientSideFn("accessToken", data.token);
        dispatch(loginSuccess({ user: data, token: data.token }));
        Router.push("/products");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    handleLogin(formData);
  };

  return (
    <Fragment>
      <section className="">
        <div className="flex items-center justify-center bg-white px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md border-solid border-2 border-black-600 p-8">
            <div className="mb-2"></div>
            <h2 className="text-2xl font-bold leading-tight text-black">
              Sign in to your account
            </h2>
            <form
              action="#"
              method="POST"
              className="mt-8"
              onSubmit={handleSubmit}
            >
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="username"
                    className="text-base font-medium text-gray-900"
                  >
                    User Name
                  </label>
                  <div className="mt-2">
                    <input
                      name="username"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="User Name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      name="password"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    disabled={loading}
                  >
                    {loading ? <span className="loader"></span> : "Log in"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <style jsx>{`
        .loader {
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-left-color: white;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          animation: spin 1s linear infinite;
          display: inline-block;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </Fragment>
  );
};

export default SignInView;
