import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { setCredentials } from "../features/auth/authSlice";
import { useLoginMutation } from "../features/auth/authApiSlice";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("user: ", user, "pwd: ", pwd);
      const userData = await login({ user, pwd }).unwrap();
      console.log("userData: ", userData);
      dispatch(setCredentials({ ...userData, user }));
      setUser("");
      setPwd("");
      navigate("/welcome");
    } catch (err) {
      console.log(err);
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUser(e.target.value);

  const handlePwdInput = (e) => setPwd(e.target.value);

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section className="bg-slate-600 w-full flex items-center">
      <div className="w-full lg:w-4/12 px-4 mx-auto py-4">
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
          {errMsg}
        </p>
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-500 border-0 max-w-md">
          <div className="rounded-t mb-0 px-6 py-6">
            <div className="text-center mb-3">
              <h6 className="text-blueGray-500 text-sm font-bold">Sign in with</h6>
            </div>
            <div className="btn-wrapper text-center">
              <button
                className="bg-white active:bg-blueGray-50 text-blueGray-700 text-slate-600 px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                type="button"
              >
                <img alt="..." className="w-5 mr-1" src="https://demos.creative-tim.com/notus-js/assets/img/github.svg" />
                Github
              </button>
              <button
                className="bg-white active:bg-blueGray-50 text-blueGray-700 text-slate-600 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                type="button"
              >
                <img alt="..." className="w-5 mr-1" src="https://demos.creative-tim.com/notus-js/assets/img/google.svg" />
                Google
              </button>
            </div>
            <hr className="mt-6 border-b-1 border-blueGray-300" />
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div className="text-blueGray-400 text-center mb-3 font-bold">
              <small>Or sign in with credentials</small>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                  Email
                </label>
                <input
                  ref={userRef}
                  type="user"
                  className="text-slate-600 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="User"
                  onChange={handleUserInput}
                  value={user}
                />
              </div>
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                  Password
                </label>
                <input
                  type="password"
                  className="text-slate-600 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Password"
                  value={pwd}
                  onChange={handlePwdInput}
                />
              </div>
              <div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    id="customCheckLogin"
                    type="checkbox"
                    className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                  />
                  <span className="ml-2 text-sm font-semibold text-blueGray-600">Remember me</span>
                </label>
              </div>
              <div className="text-center mt-6">
                <button
                  className="bg-slate-600 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-md hover:shadow-slate-800 outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );

  return content;
};

export default Login;
