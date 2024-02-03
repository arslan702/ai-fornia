import React, { useState } from 'react';
import Hero from '@/components/home/Hero';
import TopAiTools from '@/components/home/TopAiTools';
import 'typeface-manrope'; // Import the font

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory,setFilterCategory]=useState(null);
  console.log("woooooooooo::::",filterCategory)
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  const handleFilterCategory=(cata)=>{
    setFilterCategory(cata)
  }

  return (
    <div className="font-manrope dark:bg-primary-dark">
      <Hero onSearch={handleSearch} CategoryFilter={handleFilterCategory} />
      <TopAiTools searchTerm={searchTerm} Category={filterCategory} />
    </div>
  );
}