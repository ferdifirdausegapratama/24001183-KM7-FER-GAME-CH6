import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // set ke boolean
  const navigate = useNavigate();
  const [notification, setNotificatin] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading saat proses dimulai
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        {
          email,
          password,
        }
      );
      console.log(response);

      if (response.data.isSuccess) {
        const token = response.data.data.token;
        const username = response.data.data.username;

        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem(
          "rahasia punya imam",
          "aku bangga bgt sama kalian FSW2 !"
        );

        navigate("/"); // Tambahkan navigasi setelah login berhasil
      } else {
        setError("Login failed"); // Tampilkan pesan jika login gagal
      }
    } catch (err) {
      console.log(err);
      setError("An error occurred while logging in."); // Tampilkan pesan error
    } finally {
      setLoading(false); // Reset loading status
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {notification && (
        <Notification type={""} message={""} description={""} onClose={""} />
      )}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block bg-white w-full rounded-md border-0 py-1.5 px-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block bg-white w-full rounded-md border-0 py-1.5 px-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        {error && (
          <p className="mt-4 text-center text-sm text-red-500">{error}</p>
        )}

        <p className="mt-10 text-center text-sm text-white">
          Not a member?{" "}
          <a
            href="#"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Start a 14 day free trial
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
