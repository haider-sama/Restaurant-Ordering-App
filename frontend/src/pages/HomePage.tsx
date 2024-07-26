import SearchBar, { SearchForm } from "@/components/search/SearchBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    const handleSearchSubmit = (searchFormValues: SearchForm) => {
        navigate({
          pathname: `/search/${searchFormValues.searchQuery}`,
        });
    };

    return (
        <div className="flex flex-col gap-12">
            <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-6 text-center -mt-16">
                <h1 className="text-4xl font-bold tracking-tight text-orange-400">
                    Explore the best restaurants in your area
                </h1>
                <span className="text-xl">Search your favourite cuisine today!</span>
                <SearchBar
                placeHolder="Type in a restaurant or a city name"
                onSubmit={handleSearchSubmit}
                />
            </div>
        </div>
    );

}

export default HomePage;
