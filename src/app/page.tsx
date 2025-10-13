import SignupPage from "./signup/page";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <SignupPage />
    </div>
  );
}
