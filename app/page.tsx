import Header from "@/components/header";
import Home from "@/components/home";

export default function Page() {
  return (
    <div className="min-h-screen">
      <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Header />
        <main>
          <Home />
        </main>
      </div>
    </div>
  );
}
