const Spinner = ({ loading }) => {
    if (!loading) return null;
  
    return (
      <div className="flex justify-center items-center py-6">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  };
  
  export default Spinner;
  