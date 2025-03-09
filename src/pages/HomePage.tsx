import Header from '@/components/Header/Header';
import Main from '@/components/Main/Main';
import Footer from '@/components/Footer/Footer';

const HomePage = () => {
  return (
    <div className="container flex flex-col gap-5 mx-auto my-5">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default HomePage;
