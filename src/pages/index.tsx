// import { useEffect, useState } from 'react';
// import { useSearchQuery } from '../hooks/useSearchQuery';
// import { useSearchParams } from 'react-router';
// import Header from '@/components/Header/Header';
// import Main from '@/components/Main/Main';
// import Footer from '@/components/Footer/Footer';

import ThemeToggle from '@/components/ThemeToggle';

const HomePage = () => {
  //   const [, setSearchParams] = useSearchParams();
  //   const [searchValue, setSearchValue] = useSearchQuery('searchValue');
  //   const [query, setQuery] = useState<string>('');

  //   useEffect(() => {
  //     if (searchValue.trim()) {
  //       setQuery(searchValue.trim());
  //     }
  //   }, [searchValue]);

  //   const handleSearch = (value: string) => {
  //     setSearchValue(value.trim());
  //     setQuery(value.trim());
  //     setSearchParams({ page: '1' });
  //   };

  return (
    <div className="container flex flex-col gap-5 mx-auto my-5">
      {/* <Header onSearch={handleSearch} initialValue={searchValue} />
      <Main searchQuery={query} />
      <Footer /> */}
      <ThemeToggle />
    </div>
  );
};

export default HomePage;
