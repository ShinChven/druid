import qs from 'qs';
import { NavigateFunction } from 'react-router-dom';

export interface CommonQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  from?: string;
}

class QueryParams<T> {

  typeMapping: Record<string, 'boolean' | 'number'> = {};

  constructor(typeMapping: Record<string, 'boolean' | 'number'> = {}) {
    this.typeMapping = typeMapping;
  }

  getQuery(): Partial<T> {
    try {
      const urlComponents = window.location.href.split('?');
      if (urlComponents.length > 1) {
        const queries = qs.parse(urlComponents[1]) as Record<string, any>
        Object.keys(this.typeMapping).forEach((key) => {
          const type = this.typeMapping[key];
          const value = queries[key];
          if (value && type === 'boolean') {
            switch (value?.toLowerCase()) {
              case 'true':
              case '1':
                queries[key] = true;
                break;
              case 'false':
              case '0':
                queries[key] = false;
                break;
              default:
                break;
            }
          } else if (type === 'number') {
            const n = Number(value);
            queries[key] = isNaN(n) ? undefined : n;
          }
        });
        return queries as unknown as T;
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
    return {} as T;
  }

  setQuery(query: any, navigate: NavigateFunction, fullReplace = false) {
    const urlComponents = window.location.href.split('?');
    const pathname = window.location.pathname;
    const queries = fullReplace ? {} : qs.parse(urlComponents[1]) as Record<string, any>;
    Object.keys(query).forEach((key) => {
      const value = query[key];
      if (value !== undefined) {
        queries[key] = value;
      } else {
        delete queries[key];
      }
    });
    const url = pathname + '?' + qs.stringify(queries);
    navigate(url);
  }
}
export default QueryParams;
