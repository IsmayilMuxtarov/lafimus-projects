// import { History } from 'history';
// import {createBrowserHistory} from 'history';
//
// const history = createBrowserHistory();
//
// export default history;
import { createBrowserHistory } from 'history';
import { History } from 'history';

// export type ReadonlyBrowserHistory = Readonly<History>
// export type ReadonlyBrowserHistory = Readonly<History>;
export const browserHistory = createBrowserHistory();
// const  ReadonlyBrowserHistory = createBrowserHistory();

export default browserHistory;
