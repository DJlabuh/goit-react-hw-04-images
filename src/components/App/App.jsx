import React, { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from 'components/Searchbar';
import { Loader } from 'components/Loader';
import { ImageGallery } from 'components/ImageGallery';
import { Button } from 'components/Button';
import { getImages } from '../../services/getImages';

export const App = () => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(null);

  const performSearch = useCallback(async () => {
    try {
      const searchData = await getImages(searchText, page);

      if (searchData.hits.length === 0) {
        toast.error('Sorry, there are no images matching your query!');
        return;
      }

      setData(prevData => [...prevData, ...searchData.hits]);
      setMaxPage(Math.ceil(searchData.totalHits / 12));
    } catch (error) {
      toast.error(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }, [searchText, page]);

  useEffect(() => {
    if (searchText !== '' || page !== 1) {
      setIsLoading(true);
      performSearch();
    }
  }, [searchText, page, performSearch]);

  const handleSearch = searchText => {
    setSearchText(searchText);
    setPage(1);
    setData([]);
  };

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showLoadMoreButton = data.length > 0 && page < maxPage;

  return (
    <>
      <Searchbar handleSearch={handleSearch} />
      <section>
        {isLoading && <Loader />}
        <ToastContainer autoClose={2000} />
        {data.length > 0 && <ImageGallery data={data} />}
        {showLoadMoreButton && <Button onClick={loadMoreImages} />}
      </section>
    </>
  );
};
