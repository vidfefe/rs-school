import { useEffect, useState } from 'react';
import { useSearchQuery } from '../hooks/useSearchQuery';
import Header from '@/components/Header/Header';
import Main from '@/components/Main/Main';
import Footer from '@/components/Footer/Footer';
import { useRouter } from 'next/router';

const HomePage = () => {
  const { push } = useRouter();
  const [searchValue, setSearchValue] = useSearchQuery('searchValue');
  const [queryValue, setQueryValue] = useState<string>('');

  useEffect(() => {
    if (searchValue.trim()) {
      setQueryValue(searchValue.trim());
    }
  }, [searchValue]);

  const handleSearch = (value: string) => {
    setSearchValue(value.trim());
    setQueryValue(value.trim());
    push({ query: { page: '1' } });
  };

  return (
    <div className="container flex flex-col gap-5 mx-auto my-5">
      <Header onSearch={handleSearch} initialValue={searchValue} />
      <Main searchQuery={queryValue} />
      <Footer />
    </div>
  );
};

export default HomePage;
