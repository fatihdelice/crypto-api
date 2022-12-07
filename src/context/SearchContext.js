import { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchValue, setSearchValue] = useState("");

    const values = { searchValue, setSearchValue };

    return (
        <SearchContext.Provider value={values}>{children}</SearchContext.Provider>
    );
};


export const useSearch = () => useContext(SearchContext);