function Page({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 p-8">
      {children}
    </div>
  );
}

export default Page;