const NoResults = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-96">
      <h1 className="text-xl font-bold">No Pokemon found</h1>
      <p>Try searching for another name</p>
    </div>
  );
};

export default NoResults;
