
"use client";

import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import HomeMovies from "@/components/HomeMovies";

export default function Home() {
  const [query, setQuery] = useState("");

  return (
    <>
      <HeroSection onSearchChange={setQuery} />

      <div className="m-10 mt-0 flex flex-col">
        <HomeMovies query={query} />
      </div>
    </>
  );
}
