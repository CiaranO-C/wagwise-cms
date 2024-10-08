import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import ArticleGrid from "../../components/ArticleGrid.jsx";
import Search from "../../components/Searchbar.jsx";
import PageNums from "../../components/Pagination.jsx";
import { Content, Header } from "../../components/sharedStyles";
import { searchArticles } from '../../api/api-article.js';

function SearchResults() {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState(null);
  const perPage = 2;

  useEffect(() => {
    async function searchResultsLoader() {
     const articles = await searchArticles(location.search);
      setResults(articles);
      setRange(articles.slice(0, perPage));
      setLoading(false);
    }
    searchResultsLoader();
  }, [location.search]);

  if (loading) return <h1>Loading</h1>;

  function handleRange(i, j) {
    setRange(results.slice(i, j));
  }

  return (
    <SearchMain>
      <header>
        <h1>Search Results</h1>
        <Search />
      </header>
      <ArticleGrid articles={range} />
      <PageNums
        itemsPerPage={perPage}
        itemCount={results.length}
        setItemRange={handleRange}
      />
    </SearchMain>
  );
}

const SearchMain = styled.main`
  ${Content}
  grid-template-rows: 100px 425px 1fr;
  row-gap: 20px;

  header {
    ${Header}
  }
`;
export default SearchResults;
