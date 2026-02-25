import LoginForm from "./LoginForm";

const LoginCard = () => {
  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="bg-blue-600 p-4 rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 14l9-5-9-5-9 5 9 5z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 14l6.16-3.422A12.083 12.083 0 0112 20.055a12.083 12.083 0 01-6.16-9.477L12 14z"
            />
          </svg>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Student Manager
      </h2>
      <p className="text-center text-gray-500 mt-2 mb-6">
        Sign in to your account
      </p>

      <LoginForm />

      <p className="text-center text-sm text-gray-400 mt-6">
        Use any email & password to sign in
      </p>
    </div>
  );
};

export default LoginCard;