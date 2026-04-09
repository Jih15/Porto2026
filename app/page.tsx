"use client";

import Bento from "./components/bento/bento";
import Cover from "./components/cover/cover";



const Page: React.FC = () => {
  return (
    <main className="relative w-full overflow-x-hidden" style={{ background: "#080808" }}>
      <Cover />
      <Bento />
    </main>
  );
};

export default Page;