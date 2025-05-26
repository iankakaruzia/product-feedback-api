export interface IDefaultHTTPErrors {
  [status: number]: string;
}

export const defaultHttpErrors: IDefaultHTTPErrors = {
  400: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1',
  401: 'https://datatracker.ietf.org/doc/html/rfc7235#section-3.1',
  402: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.2',
  403: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.3',
  404: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.4',
  405: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.5',
  406: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.6',
  407: 'https://datatracker.ietf.org/doc/html/rfc7235#section-3.2',
  408: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.7',
  409: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.8',
  410: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.9',
  411: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.10',
  412: 'https://datatracker.ietf.org/doc/html/rfc7232#section-4.2',
  413: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.11',
  414: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.12',
  415: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.13',
  416: 'https://datatracker.ietf.org/doc/html/rfc7233#section-4.4',
  417: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.14',
  500: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.1',
  501: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.2',
  502: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.3',
  503: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.4',
  504: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.6',
  505: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.6',
};
