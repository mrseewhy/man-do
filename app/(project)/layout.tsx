import React from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

function layout({ children }: LayoutProps<"/">) {
  return (
    <div className="min-h-full flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Nav />
      <main className="flex-1 flex flex-col w-full items-center p-4 ">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default layout;
