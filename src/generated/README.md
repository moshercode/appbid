# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `appbid`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListWeeklyLeaderboard*](#listweeklyleaderboard)
  - [*ListMonthlyLeaderboard*](#listmonthlyleaderboard)
  - [*ListAnnualLeaderboard*](#listannualleaderboard)
  - [*ListRecentBids*](#listrecentbids)
  - [*GetListingById*](#getlistingbyid)
  - [*GetListingByUrl*](#getlistingbyurl)
  - [*GetVisitorStats*](#getvisitorstats)
- [**Mutations**](#mutations)
  - [*LogVisit*](#logvisit)
  - [*IncrementClickCount*](#incrementclickcount)
  - [*CreateListing*](#createlisting)
  - [*PlaceBid*](#placebid)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `appbid`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@appbid/dataconnect` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@appbid/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@appbid/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `appbid` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListWeeklyLeaderboard
You can execute the `ListWeeklyLeaderboard` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
listWeeklyLeaderboard(vars?: ListWeeklyLeaderboardVariables, options?: ExecuteQueryOptions): QueryPromise<ListWeeklyLeaderboardData, ListWeeklyLeaderboardVariables>;

interface ListWeeklyLeaderboardRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListWeeklyLeaderboardVariables): QueryRef<ListWeeklyLeaderboardData, ListWeeklyLeaderboardVariables>;
}
export const listWeeklyLeaderboardRef: ListWeeklyLeaderboardRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listWeeklyLeaderboard(dc: DataConnect, vars?: ListWeeklyLeaderboardVariables, options?: ExecuteQueryOptions): QueryPromise<ListWeeklyLeaderboardData, ListWeeklyLeaderboardVariables>;

interface ListWeeklyLeaderboardRef {
  ...
  (dc: DataConnect, vars?: ListWeeklyLeaderboardVariables): QueryRef<ListWeeklyLeaderboardData, ListWeeklyLeaderboardVariables>;
}
export const listWeeklyLeaderboardRef: ListWeeklyLeaderboardRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listWeeklyLeaderboardRef:
```typescript
const name = listWeeklyLeaderboardRef.operationName;
console.log(name);
```

### Variables
The `ListWeeklyLeaderboard` query has an optional argument of type `ListWeeklyLeaderboardVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListWeeklyLeaderboardVariables {
  limit?: number | null;
}
```
### Return Type
Recall that executing the `ListWeeklyLeaderboard` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListWeeklyLeaderboardData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListWeeklyLeaderboardData {
  weeklyLeaderboardEntries: ({
    listingId?: UUIDString | null;
    displayName?: string | null;
    url?: string | null;
    tagline?: string | null;
    iconUrl?: string | null;
    periodTotal?: number | null;
    lastBidAt?: TimestampString | null;
    periodClicks?: number | null;
  })[];
}
```
### Using `ListWeeklyLeaderboard`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listWeeklyLeaderboard, ListWeeklyLeaderboardVariables } from '@appbid/dataconnect';

// The `ListWeeklyLeaderboard` query has an optional argument of type `ListWeeklyLeaderboardVariables`:
const listWeeklyLeaderboardVars: ListWeeklyLeaderboardVariables = {
  limit: ..., // optional
};

// Call the `listWeeklyLeaderboard()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listWeeklyLeaderboard(listWeeklyLeaderboardVars);
// Variables can be defined inline as well.
const { data } = await listWeeklyLeaderboard({ limit: ..., });
// Since all variables are optional for this query, you can omit the `ListWeeklyLeaderboardVariables` argument.
const { data } = await listWeeklyLeaderboard();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listWeeklyLeaderboard(dataConnect, listWeeklyLeaderboardVars);

console.log(data.weeklyLeaderboardEntries);

// Or, you can use the `Promise` API.
listWeeklyLeaderboard(listWeeklyLeaderboardVars).then((response) => {
  const data = response.data;
  console.log(data.weeklyLeaderboardEntries);
});
```

### Using `ListWeeklyLeaderboard`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listWeeklyLeaderboardRef, ListWeeklyLeaderboardVariables } from '@appbid/dataconnect';

// The `ListWeeklyLeaderboard` query has an optional argument of type `ListWeeklyLeaderboardVariables`:
const listWeeklyLeaderboardVars: ListWeeklyLeaderboardVariables = {
  limit: ..., // optional
};

// Call the `listWeeklyLeaderboardRef()` function to get a reference to the query.
const ref = listWeeklyLeaderboardRef(listWeeklyLeaderboardVars);
// Variables can be defined inline as well.
const ref = listWeeklyLeaderboardRef({ limit: ..., });
// Since all variables are optional for this query, you can omit the `ListWeeklyLeaderboardVariables` argument.
const ref = listWeeklyLeaderboardRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listWeeklyLeaderboardRef(dataConnect, listWeeklyLeaderboardVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.weeklyLeaderboardEntries);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.weeklyLeaderboardEntries);
});
```

## ListMonthlyLeaderboard
You can execute the `ListMonthlyLeaderboard` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
listMonthlyLeaderboard(vars?: ListMonthlyLeaderboardVariables, options?: ExecuteQueryOptions): QueryPromise<ListMonthlyLeaderboardData, ListMonthlyLeaderboardVariables>;

interface ListMonthlyLeaderboardRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListMonthlyLeaderboardVariables): QueryRef<ListMonthlyLeaderboardData, ListMonthlyLeaderboardVariables>;
}
export const listMonthlyLeaderboardRef: ListMonthlyLeaderboardRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMonthlyLeaderboard(dc: DataConnect, vars?: ListMonthlyLeaderboardVariables, options?: ExecuteQueryOptions): QueryPromise<ListMonthlyLeaderboardData, ListMonthlyLeaderboardVariables>;

interface ListMonthlyLeaderboardRef {
  ...
  (dc: DataConnect, vars?: ListMonthlyLeaderboardVariables): QueryRef<ListMonthlyLeaderboardData, ListMonthlyLeaderboardVariables>;
}
export const listMonthlyLeaderboardRef: ListMonthlyLeaderboardRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMonthlyLeaderboardRef:
```typescript
const name = listMonthlyLeaderboardRef.operationName;
console.log(name);
```

### Variables
The `ListMonthlyLeaderboard` query has an optional argument of type `ListMonthlyLeaderboardVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListMonthlyLeaderboardVariables {
  limit?: number | null;
}
```
### Return Type
Recall that executing the `ListMonthlyLeaderboard` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMonthlyLeaderboardData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMonthlyLeaderboardData {
  monthlyLeaderboardEntries: ({
    listingId?: UUIDString | null;
    displayName?: string | null;
    url?: string | null;
    tagline?: string | null;
    iconUrl?: string | null;
    periodTotal?: number | null;
    lastBidAt?: TimestampString | null;
    periodClicks?: number | null;
  })[];
}
```
### Using `ListMonthlyLeaderboard`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMonthlyLeaderboard, ListMonthlyLeaderboardVariables } from '@appbid/dataconnect';

// The `ListMonthlyLeaderboard` query has an optional argument of type `ListMonthlyLeaderboardVariables`:
const listMonthlyLeaderboardVars: ListMonthlyLeaderboardVariables = {
  limit: ..., // optional
};

// Call the `listMonthlyLeaderboard()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMonthlyLeaderboard(listMonthlyLeaderboardVars);
// Variables can be defined inline as well.
const { data } = await listMonthlyLeaderboard({ limit: ..., });
// Since all variables are optional for this query, you can omit the `ListMonthlyLeaderboardVariables` argument.
const { data } = await listMonthlyLeaderboard();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMonthlyLeaderboard(dataConnect, listMonthlyLeaderboardVars);

console.log(data.monthlyLeaderboardEntries);

// Or, you can use the `Promise` API.
listMonthlyLeaderboard(listMonthlyLeaderboardVars).then((response) => {
  const data = response.data;
  console.log(data.monthlyLeaderboardEntries);
});
```

### Using `ListMonthlyLeaderboard`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMonthlyLeaderboardRef, ListMonthlyLeaderboardVariables } from '@appbid/dataconnect';

// The `ListMonthlyLeaderboard` query has an optional argument of type `ListMonthlyLeaderboardVariables`:
const listMonthlyLeaderboardVars: ListMonthlyLeaderboardVariables = {
  limit: ..., // optional
};

// Call the `listMonthlyLeaderboardRef()` function to get a reference to the query.
const ref = listMonthlyLeaderboardRef(listMonthlyLeaderboardVars);
// Variables can be defined inline as well.
const ref = listMonthlyLeaderboardRef({ limit: ..., });
// Since all variables are optional for this query, you can omit the `ListMonthlyLeaderboardVariables` argument.
const ref = listMonthlyLeaderboardRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMonthlyLeaderboardRef(dataConnect, listMonthlyLeaderboardVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.monthlyLeaderboardEntries);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.monthlyLeaderboardEntries);
});
```

## ListAnnualLeaderboard
You can execute the `ListAnnualLeaderboard` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
listAnnualLeaderboard(vars?: ListAnnualLeaderboardVariables, options?: ExecuteQueryOptions): QueryPromise<ListAnnualLeaderboardData, ListAnnualLeaderboardVariables>;

interface ListAnnualLeaderboardRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListAnnualLeaderboardVariables): QueryRef<ListAnnualLeaderboardData, ListAnnualLeaderboardVariables>;
}
export const listAnnualLeaderboardRef: ListAnnualLeaderboardRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAnnualLeaderboard(dc: DataConnect, vars?: ListAnnualLeaderboardVariables, options?: ExecuteQueryOptions): QueryPromise<ListAnnualLeaderboardData, ListAnnualLeaderboardVariables>;

interface ListAnnualLeaderboardRef {
  ...
  (dc: DataConnect, vars?: ListAnnualLeaderboardVariables): QueryRef<ListAnnualLeaderboardData, ListAnnualLeaderboardVariables>;
}
export const listAnnualLeaderboardRef: ListAnnualLeaderboardRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAnnualLeaderboardRef:
```typescript
const name = listAnnualLeaderboardRef.operationName;
console.log(name);
```

### Variables
The `ListAnnualLeaderboard` query has an optional argument of type `ListAnnualLeaderboardVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListAnnualLeaderboardVariables {
  limit?: number | null;
}
```
### Return Type
Recall that executing the `ListAnnualLeaderboard` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAnnualLeaderboardData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAnnualLeaderboardData {
  annualLeaderboardEntries: ({
    listingId?: UUIDString | null;
    displayName?: string | null;
    url?: string | null;
    tagline?: string | null;
    iconUrl?: string | null;
    periodTotal?: number | null;
    lastBidAt?: TimestampString | null;
    periodClicks?: number | null;
  })[];
}
```
### Using `ListAnnualLeaderboard`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAnnualLeaderboard, ListAnnualLeaderboardVariables } from '@appbid/dataconnect';

// The `ListAnnualLeaderboard` query has an optional argument of type `ListAnnualLeaderboardVariables`:
const listAnnualLeaderboardVars: ListAnnualLeaderboardVariables = {
  limit: ..., // optional
};

// Call the `listAnnualLeaderboard()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAnnualLeaderboard(listAnnualLeaderboardVars);
// Variables can be defined inline as well.
const { data } = await listAnnualLeaderboard({ limit: ..., });
// Since all variables are optional for this query, you can omit the `ListAnnualLeaderboardVariables` argument.
const { data } = await listAnnualLeaderboard();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAnnualLeaderboard(dataConnect, listAnnualLeaderboardVars);

console.log(data.annualLeaderboardEntries);

// Or, you can use the `Promise` API.
listAnnualLeaderboard(listAnnualLeaderboardVars).then((response) => {
  const data = response.data;
  console.log(data.annualLeaderboardEntries);
});
```

### Using `ListAnnualLeaderboard`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAnnualLeaderboardRef, ListAnnualLeaderboardVariables } from '@appbid/dataconnect';

// The `ListAnnualLeaderboard` query has an optional argument of type `ListAnnualLeaderboardVariables`:
const listAnnualLeaderboardVars: ListAnnualLeaderboardVariables = {
  limit: ..., // optional
};

// Call the `listAnnualLeaderboardRef()` function to get a reference to the query.
const ref = listAnnualLeaderboardRef(listAnnualLeaderboardVars);
// Variables can be defined inline as well.
const ref = listAnnualLeaderboardRef({ limit: ..., });
// Since all variables are optional for this query, you can omit the `ListAnnualLeaderboardVariables` argument.
const ref = listAnnualLeaderboardRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAnnualLeaderboardRef(dataConnect, listAnnualLeaderboardVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.annualLeaderboardEntries);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.annualLeaderboardEntries);
});
```

## ListRecentBids
You can execute the `ListRecentBids` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
listRecentBids(vars?: ListRecentBidsVariables, options?: ExecuteQueryOptions): QueryPromise<ListRecentBidsData, ListRecentBidsVariables>;

interface ListRecentBidsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListRecentBidsVariables): QueryRef<ListRecentBidsData, ListRecentBidsVariables>;
}
export const listRecentBidsRef: ListRecentBidsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listRecentBids(dc: DataConnect, vars?: ListRecentBidsVariables, options?: ExecuteQueryOptions): QueryPromise<ListRecentBidsData, ListRecentBidsVariables>;

interface ListRecentBidsRef {
  ...
  (dc: DataConnect, vars?: ListRecentBidsVariables): QueryRef<ListRecentBidsData, ListRecentBidsVariables>;
}
export const listRecentBidsRef: ListRecentBidsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listRecentBidsRef:
```typescript
const name = listRecentBidsRef.operationName;
console.log(name);
```

### Variables
The `ListRecentBids` query has an optional argument of type `ListRecentBidsVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListRecentBidsVariables {
  limit?: number | null;
}
```
### Return Type
Recall that executing the `ListRecentBids` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListRecentBidsData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListRecentBidsData {
  bids: ({
    id: UUIDString;
    deltaAmount: number;
    bidderName?: string | null;
    displayName: string;
    url: string;
    createdAt: TimestampString;
  } & Bid_Key)[];
}
```
### Using `ListRecentBids`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listRecentBids, ListRecentBidsVariables } from '@appbid/dataconnect';

// The `ListRecentBids` query has an optional argument of type `ListRecentBidsVariables`:
const listRecentBidsVars: ListRecentBidsVariables = {
  limit: ..., // optional
};

// Call the `listRecentBids()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listRecentBids(listRecentBidsVars);
// Variables can be defined inline as well.
const { data } = await listRecentBids({ limit: ..., });
// Since all variables are optional for this query, you can omit the `ListRecentBidsVariables` argument.
const { data } = await listRecentBids();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listRecentBids(dataConnect, listRecentBidsVars);

console.log(data.bids);

// Or, you can use the `Promise` API.
listRecentBids(listRecentBidsVars).then((response) => {
  const data = response.data;
  console.log(data.bids);
});
```

### Using `ListRecentBids`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listRecentBidsRef, ListRecentBidsVariables } from '@appbid/dataconnect';

// The `ListRecentBids` query has an optional argument of type `ListRecentBidsVariables`:
const listRecentBidsVars: ListRecentBidsVariables = {
  limit: ..., // optional
};

// Call the `listRecentBidsRef()` function to get a reference to the query.
const ref = listRecentBidsRef(listRecentBidsVars);
// Variables can be defined inline as well.
const ref = listRecentBidsRef({ limit: ..., });
// Since all variables are optional for this query, you can omit the `ListRecentBidsVariables` argument.
const ref = listRecentBidsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listRecentBidsRef(dataConnect, listRecentBidsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.bids);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.bids);
});
```

## GetListingById
You can execute the `GetListingById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
getListingById(vars: GetListingByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetListingByIdData, GetListingByIdVariables>;

interface GetListingByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetListingByIdVariables): QueryRef<GetListingByIdData, GetListingByIdVariables>;
}
export const getListingByIdRef: GetListingByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getListingById(dc: DataConnect, vars: GetListingByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetListingByIdData, GetListingByIdVariables>;

interface GetListingByIdRef {
  ...
  (dc: DataConnect, vars: GetListingByIdVariables): QueryRef<GetListingByIdData, GetListingByIdVariables>;
}
export const getListingByIdRef: GetListingByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getListingByIdRef:
```typescript
const name = getListingByIdRef.operationName;
console.log(name);
```

### Variables
The `GetListingById` query requires an argument of type `GetListingByIdVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetListingByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetListingById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetListingByIdData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetListingByIdData {
  listing?: {
    id: UUIDString;
    displayName: string;
    url: string;
    tagline?: string | null;
    ownerEmail?: string | null;
    currentBid: number;
    clickCount: number;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Listing_Key;
}
```
### Using `GetListingById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getListingById, GetListingByIdVariables } from '@appbid/dataconnect';

// The `GetListingById` query requires an argument of type `GetListingByIdVariables`:
const getListingByIdVars: GetListingByIdVariables = {
  id: ..., 
};

// Call the `getListingById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getListingById(getListingByIdVars);
// Variables can be defined inline as well.
const { data } = await getListingById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getListingById(dataConnect, getListingByIdVars);

console.log(data.listing);

// Or, you can use the `Promise` API.
getListingById(getListingByIdVars).then((response) => {
  const data = response.data;
  console.log(data.listing);
});
```

### Using `GetListingById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getListingByIdRef, GetListingByIdVariables } from '@appbid/dataconnect';

// The `GetListingById` query requires an argument of type `GetListingByIdVariables`:
const getListingByIdVars: GetListingByIdVariables = {
  id: ..., 
};

// Call the `getListingByIdRef()` function to get a reference to the query.
const ref = getListingByIdRef(getListingByIdVars);
// Variables can be defined inline as well.
const ref = getListingByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getListingByIdRef(dataConnect, getListingByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.listing);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.listing);
});
```

## GetListingByUrl
You can execute the `GetListingByUrl` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
getListingByUrl(vars: GetListingByUrlVariables, options?: ExecuteQueryOptions): QueryPromise<GetListingByUrlData, GetListingByUrlVariables>;

interface GetListingByUrlRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetListingByUrlVariables): QueryRef<GetListingByUrlData, GetListingByUrlVariables>;
}
export const getListingByUrlRef: GetListingByUrlRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getListingByUrl(dc: DataConnect, vars: GetListingByUrlVariables, options?: ExecuteQueryOptions): QueryPromise<GetListingByUrlData, GetListingByUrlVariables>;

interface GetListingByUrlRef {
  ...
  (dc: DataConnect, vars: GetListingByUrlVariables): QueryRef<GetListingByUrlData, GetListingByUrlVariables>;
}
export const getListingByUrlRef: GetListingByUrlRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getListingByUrlRef:
```typescript
const name = getListingByUrlRef.operationName;
console.log(name);
```

### Variables
The `GetListingByUrl` query requires an argument of type `GetListingByUrlVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetListingByUrlVariables {
  url: string;
}
```
### Return Type
Recall that executing the `GetListingByUrl` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetListingByUrlData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetListingByUrlData {
  listings: ({
    id: UUIDString;
    displayName: string;
    url: string;
    tagline?: string | null;
    currentBid: number;
  } & Listing_Key)[];
}
```
### Using `GetListingByUrl`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getListingByUrl, GetListingByUrlVariables } from '@appbid/dataconnect';

// The `GetListingByUrl` query requires an argument of type `GetListingByUrlVariables`:
const getListingByUrlVars: GetListingByUrlVariables = {
  url: ..., 
};

// Call the `getListingByUrl()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getListingByUrl(getListingByUrlVars);
// Variables can be defined inline as well.
const { data } = await getListingByUrl({ url: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getListingByUrl(dataConnect, getListingByUrlVars);

console.log(data.listings);

// Or, you can use the `Promise` API.
getListingByUrl(getListingByUrlVars).then((response) => {
  const data = response.data;
  console.log(data.listings);
});
```

### Using `GetListingByUrl`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getListingByUrlRef, GetListingByUrlVariables } from '@appbid/dataconnect';

// The `GetListingByUrl` query requires an argument of type `GetListingByUrlVariables`:
const getListingByUrlVars: GetListingByUrlVariables = {
  url: ..., 
};

// Call the `getListingByUrlRef()` function to get a reference to the query.
const ref = getListingByUrlRef(getListingByUrlVars);
// Variables can be defined inline as well.
const ref = getListingByUrlRef({ url: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getListingByUrlRef(dataConnect, getListingByUrlVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.listings);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.listings);
});
```

## GetVisitorStats
You can execute the `GetVisitorStats` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
getVisitorStats(options?: ExecuteQueryOptions): QueryPromise<GetVisitorStatsData, undefined>;

interface GetVisitorStatsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetVisitorStatsData, undefined>;
}
export const getVisitorStatsRef: GetVisitorStatsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getVisitorStats(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetVisitorStatsData, undefined>;

interface GetVisitorStatsRef {
  ...
  (dc: DataConnect): QueryRef<GetVisitorStatsData, undefined>;
}
export const getVisitorStatsRef: GetVisitorStatsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getVisitorStatsRef:
```typescript
const name = getVisitorStatsRef.operationName;
console.log(name);
```

### Variables
The `GetVisitorStats` query has no variables.
### Return Type
Recall that executing the `GetVisitorStats` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetVisitorStatsData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetVisitorStatsData {
  visitStats: ({
    lastHour?: number | null;
    last24h?: number | null;
  })[];
}
```
### Using `GetVisitorStats`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getVisitorStats } from '@appbid/dataconnect';


// Call the `getVisitorStats()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getVisitorStats();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getVisitorStats(dataConnect);

console.log(data.visitStats);

// Or, you can use the `Promise` API.
getVisitorStats().then((response) => {
  const data = response.data;
  console.log(data.visitStats);
});
```

### Using `GetVisitorStats`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getVisitorStatsRef } from '@appbid/dataconnect';


// Call the `getVisitorStatsRef()` function to get a reference to the query.
const ref = getVisitorStatsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getVisitorStatsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.visitStats);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.visitStats);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `appbid` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## LogVisit
You can execute the `LogVisit` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
logVisit(): MutationPromise<LogVisitData, undefined>;

interface LogVisitRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<LogVisitData, undefined>;
}
export const logVisitRef: LogVisitRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
logVisit(dc: DataConnect): MutationPromise<LogVisitData, undefined>;

interface LogVisitRef {
  ...
  (dc: DataConnect): MutationRef<LogVisitData, undefined>;
}
export const logVisitRef: LogVisitRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the logVisitRef:
```typescript
const name = logVisitRef.operationName;
console.log(name);
```

### Variables
The `LogVisit` mutation has no variables.
### Return Type
Recall that executing the `LogVisit` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `LogVisitData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface LogVisitData {
  visit_insert: Visit_Key;
}
```
### Using `LogVisit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, logVisit } from '@appbid/dataconnect';


// Call the `logVisit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await logVisit();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await logVisit(dataConnect);

console.log(data.visit_insert);

// Or, you can use the `Promise` API.
logVisit().then((response) => {
  const data = response.data;
  console.log(data.visit_insert);
});
```

### Using `LogVisit`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, logVisitRef } from '@appbid/dataconnect';


// Call the `logVisitRef()` function to get a reference to the mutation.
const ref = logVisitRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = logVisitRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.visit_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.visit_insert);
});
```

## IncrementClickCount
You can execute the `IncrementClickCount` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
incrementClickCount(vars: IncrementClickCountVariables): MutationPromise<IncrementClickCountData, IncrementClickCountVariables>;

interface IncrementClickCountRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: IncrementClickCountVariables): MutationRef<IncrementClickCountData, IncrementClickCountVariables>;
}
export const incrementClickCountRef: IncrementClickCountRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
incrementClickCount(dc: DataConnect, vars: IncrementClickCountVariables): MutationPromise<IncrementClickCountData, IncrementClickCountVariables>;

interface IncrementClickCountRef {
  ...
  (dc: DataConnect, vars: IncrementClickCountVariables): MutationRef<IncrementClickCountData, IncrementClickCountVariables>;
}
export const incrementClickCountRef: IncrementClickCountRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the incrementClickCountRef:
```typescript
const name = incrementClickCountRef.operationName;
console.log(name);
```

### Variables
The `IncrementClickCount` mutation requires an argument of type `IncrementClickCountVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface IncrementClickCountVariables {
  listingId: UUIDString;
}
```
### Return Type
Recall that executing the `IncrementClickCount` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `IncrementClickCountData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface IncrementClickCountData {
  listing_update?: Listing_Key | null;
  click_insert: Click_Key;
}
```
### Using `IncrementClickCount`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, incrementClickCount, IncrementClickCountVariables } from '@appbid/dataconnect';

// The `IncrementClickCount` mutation requires an argument of type `IncrementClickCountVariables`:
const incrementClickCountVars: IncrementClickCountVariables = {
  listingId: ..., 
};

// Call the `incrementClickCount()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await incrementClickCount(incrementClickCountVars);
// Variables can be defined inline as well.
const { data } = await incrementClickCount({ listingId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await incrementClickCount(dataConnect, incrementClickCountVars);

console.log(data.listing_update);
console.log(data.click_insert);

// Or, you can use the `Promise` API.
incrementClickCount(incrementClickCountVars).then((response) => {
  const data = response.data;
  console.log(data.listing_update);
  console.log(data.click_insert);
});
```

### Using `IncrementClickCount`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, incrementClickCountRef, IncrementClickCountVariables } from '@appbid/dataconnect';

// The `IncrementClickCount` mutation requires an argument of type `IncrementClickCountVariables`:
const incrementClickCountVars: IncrementClickCountVariables = {
  listingId: ..., 
};

// Call the `incrementClickCountRef()` function to get a reference to the mutation.
const ref = incrementClickCountRef(incrementClickCountVars);
// Variables can be defined inline as well.
const ref = incrementClickCountRef({ listingId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = incrementClickCountRef(dataConnect, incrementClickCountVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.listing_update);
console.log(data.click_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.listing_update);
  console.log(data.click_insert);
});
```

## CreateListing
You can execute the `CreateListing` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
createListing(vars: CreateListingVariables): MutationPromise<CreateListingData, CreateListingVariables>;

interface CreateListingRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateListingVariables): MutationRef<CreateListingData, CreateListingVariables>;
}
export const createListingRef: CreateListingRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createListing(dc: DataConnect, vars: CreateListingVariables): MutationPromise<CreateListingData, CreateListingVariables>;

interface CreateListingRef {
  ...
  (dc: DataConnect, vars: CreateListingVariables): MutationRef<CreateListingData, CreateListingVariables>;
}
export const createListingRef: CreateListingRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createListingRef:
```typescript
const name = createListingRef.operationName;
console.log(name);
```

### Variables
The `CreateListing` mutation requires an argument of type `CreateListingVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateListingVariables {
  displayName: string;
  url: string;
  tagline?: string | null;
  iconUrl?: string | null;
  ownerEmail?: string | null;
  initialBid: number;
  stripeSessionId?: string | null;
}
```
### Return Type
Recall that executing the `CreateListing` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateListingData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateListingData {
  newListing: Listing_Key;
  bid_insert: Bid_Key;
}
```
### Using `CreateListing`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createListing, CreateListingVariables } from '@appbid/dataconnect';

// The `CreateListing` mutation requires an argument of type `CreateListingVariables`:
const createListingVars: CreateListingVariables = {
  displayName: ..., 
  url: ..., 
  tagline: ..., // optional
  iconUrl: ..., // optional
  ownerEmail: ..., // optional
  initialBid: ..., 
  stripeSessionId: ..., // optional
};

// Call the `createListing()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createListing(createListingVars);
// Variables can be defined inline as well.
const { data } = await createListing({ displayName: ..., url: ..., tagline: ..., iconUrl: ..., ownerEmail: ..., initialBid: ..., stripeSessionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createListing(dataConnect, createListingVars);

console.log(data.newListing);
console.log(data.bid_insert);

// Or, you can use the `Promise` API.
createListing(createListingVars).then((response) => {
  const data = response.data;
  console.log(data.newListing);
  console.log(data.bid_insert);
});
```

### Using `CreateListing`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createListingRef, CreateListingVariables } from '@appbid/dataconnect';

// The `CreateListing` mutation requires an argument of type `CreateListingVariables`:
const createListingVars: CreateListingVariables = {
  displayName: ..., 
  url: ..., 
  tagline: ..., // optional
  iconUrl: ..., // optional
  ownerEmail: ..., // optional
  initialBid: ..., 
  stripeSessionId: ..., // optional
};

// Call the `createListingRef()` function to get a reference to the mutation.
const ref = createListingRef(createListingVars);
// Variables can be defined inline as well.
const ref = createListingRef({ displayName: ..., url: ..., tagline: ..., iconUrl: ..., ownerEmail: ..., initialBid: ..., stripeSessionId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createListingRef(dataConnect, createListingVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.newListing);
console.log(data.bid_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.newListing);
  console.log(data.bid_insert);
});
```

## PlaceBid
You can execute the `PlaceBid` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
placeBid(vars: PlaceBidVariables): MutationPromise<PlaceBidData, PlaceBidVariables>;

interface PlaceBidRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: PlaceBidVariables): MutationRef<PlaceBidData, PlaceBidVariables>;
}
export const placeBidRef: PlaceBidRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
placeBid(dc: DataConnect, vars: PlaceBidVariables): MutationPromise<PlaceBidData, PlaceBidVariables>;

interface PlaceBidRef {
  ...
  (dc: DataConnect, vars: PlaceBidVariables): MutationRef<PlaceBidData, PlaceBidVariables>;
}
export const placeBidRef: PlaceBidRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the placeBidRef:
```typescript
const name = placeBidRef.operationName;
console.log(name);
```

### Variables
The `PlaceBid` mutation requires an argument of type `PlaceBidVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface PlaceBidVariables {
  listingId: UUIDString;
  amount: number;
  deltaAmount?: number | null;
  bidderName?: string | null;
  displayName: string;
  url: string;
  tagline?: string | null;
  iconUrl?: string | null;
  ownerEmail?: string | null;
  stripeSessionId?: string | null;
}
```
### Return Type
Recall that executing the `PlaceBid` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `PlaceBidData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface PlaceBidData {
  bid_insert: Bid_Key;
  listing_update?: Listing_Key | null;
}
```
### Using `PlaceBid`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, placeBid, PlaceBidVariables } from '@appbid/dataconnect';

// The `PlaceBid` mutation requires an argument of type `PlaceBidVariables`:
const placeBidVars: PlaceBidVariables = {
  listingId: ..., 
  amount: ..., 
  deltaAmount: ..., // optional
  bidderName: ..., // optional
  displayName: ..., 
  url: ..., 
  tagline: ..., // optional
  iconUrl: ..., // optional
  ownerEmail: ..., // optional
  stripeSessionId: ..., // optional
};

// Call the `placeBid()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await placeBid(placeBidVars);
// Variables can be defined inline as well.
const { data } = await placeBid({ listingId: ..., amount: ..., deltaAmount: ..., bidderName: ..., displayName: ..., url: ..., tagline: ..., iconUrl: ..., ownerEmail: ..., stripeSessionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await placeBid(dataConnect, placeBidVars);

console.log(data.bid_insert);
console.log(data.listing_update);

// Or, you can use the `Promise` API.
placeBid(placeBidVars).then((response) => {
  const data = response.data;
  console.log(data.bid_insert);
  console.log(data.listing_update);
});
```

### Using `PlaceBid`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, placeBidRef, PlaceBidVariables } from '@appbid/dataconnect';

// The `PlaceBid` mutation requires an argument of type `PlaceBidVariables`:
const placeBidVars: PlaceBidVariables = {
  listingId: ..., 
  amount: ..., 
  deltaAmount: ..., // optional
  bidderName: ..., // optional
  displayName: ..., 
  url: ..., 
  tagline: ..., // optional
  iconUrl: ..., // optional
  ownerEmail: ..., // optional
  stripeSessionId: ..., // optional
};

// Call the `placeBidRef()` function to get a reference to the mutation.
const ref = placeBidRef(placeBidVars);
// Variables can be defined inline as well.
const ref = placeBidRef({ listingId: ..., amount: ..., deltaAmount: ..., bidderName: ..., displayName: ..., url: ..., tagline: ..., iconUrl: ..., ownerEmail: ..., stripeSessionId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = placeBidRef(dataConnect, placeBidVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.bid_insert);
console.log(data.listing_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.bid_insert);
  console.log(data.listing_update);
});
```

