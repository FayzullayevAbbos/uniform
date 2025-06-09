import qs from 'qs';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

type QueryParamsType = Record<string, any>;

const useQuery = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const QueryParams: QueryParamsType = qs.parse(location.search, { ignoreQueryPrefix: true });

  const stringify = (obj: QueryParamsType): string => qs.stringify(obj);

  const MergeQueryParams = (newParams: QueryParamsType): void => {
    navigate(`?${qs.stringify({ ...QueryParams, ...newParams })}`);
  };

  const DeleteQueryParams = (param: string): void => {
    const query = qs.parse(location.search, { ignoreQueryPrefix: true }) as QueryParamsType;
    delete query[param];
    const queryString = qs.stringify(query);
    navigate({ search: queryString ? `?${queryString}` : '' });
  };

  const goBackAndClearQuery = (): void => {
      navigate(-1);
      navigate({ search: '' });
  };

  return {
    QueryParams,
    MergeQueryParams,
    DeleteQueryParams,
    stringify,
    location,
    navigate,
    params,
    goBackAndClearQuery,
  };
};

export default useQuery;
