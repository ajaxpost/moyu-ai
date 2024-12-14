import Header from "@/components/home/header";
import Content from "@/components/home/content";

export default function Page() {
  return (
    <div className="min-h-screen">
      <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Header />
        <main>
          <Content />
        </main>
      </div>
    </div>
  );
}
