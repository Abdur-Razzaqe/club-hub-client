const DemoLoginButton = ({ setEmail, setPassword }) => {
  const demoUser = {
    email: "demo@clubhub.com",
    password: "123456",
  };

  const handleDemoLogin = () => {
    setEmail(demoUser.email);
    setPassword(demoUser.password);
  };

  return (
    <button
      type="button"
      onClick={handleDemoLogin}
      className="w-full mt-3 border border-teal-500 text-teal-600 py-2 rounded-lg hover:bg-teal-50 transition"
    >
      Demo Login
    </button>
  );
};

export default DemoLoginButton;
