//search bar
import { Dispatch, SetStateAction } from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

export default function SearchBar({
  searchTerm,
  setSearchTerm,
}: SearchBarProps) {
  const onResetSearch = () => {
    setSearchTerm("");
  };

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    if (newSearchTerm != searchTerm) {
      setSearchTerm(newSearchTerm);
    }
  };

  return (
    <div className="container flex-col">
      <div className="flex gap-4">
        <input
          placeholder="Search"
          value={searchTerm}
          className="pl-1 border-2 border-black rounded-lg"
          onChange={onValueChange}
        />
        <button
          className="py-2 px-4 bg-stone-300 rounded-lg hover:opacity-75"
          onClick={onResetSearch}
        >
          Reset Search
        </button>
      </div>
      <p>
        Searching for: <span>{searchTerm}</span>
      </p>
    </div>
  );
}
