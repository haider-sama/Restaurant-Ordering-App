import { Link } from "react-router-dom";

type SearchResultInfoProps = {
  total: number;
  city: string;
};

const SearchResultInfo = ({ total, city }: SearchResultInfoProps) => {

  return (
    <div className="text-xl font-bold flex flex-col gap-4 justify-between lg:items-center lg:flex-row">
      <span>
        {total} Restaurants found in {city}.
        <Link to="/"
        className="ml-1 text-sm font-semibold hover:underline cursor-pointer text-slate-800">
          Change Location
        </Link>
      </span>
    </div>
  );
};

export default SearchResultInfo;