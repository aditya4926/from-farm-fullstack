function Button({ children, onClick, type = "button", variant = "green" }) {
  const colors = {
    green: "bg-green-600 hover:bg-green-700",
    red: "bg-red-600 hover:bg-red-700",
    blue: "bg-blue-600 hover:bg-blue-700",
    black: "bg-gray-900 hover:bg-black",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${colors[variant]} text-white px-5 py-3 rounded-xl shadow transition`}
    >
      {children}
    </button>
  );
}

export default Button;