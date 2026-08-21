# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { logVisit, incrementClickCount, createListing, placeBid, listLeaderboard, getTopListing, listRecentBids, getListingById, getListingByUrl, getVisitorStats } from '@appbid/dataconnect';


// Operation LogVisit: 
const { data } = await LogVisit(dataConnect);

// Operation IncrementClickCount:  For variables, look at type IncrementClickCountVars in ../index.d.ts
const { data } = await IncrementClickCount(dataConnect, incrementClickCountVars);

// Operation CreateListing:  For variables, look at type CreateListingVars in ../index.d.ts
const { data } = await CreateListing(dataConnect, createListingVars);

// Operation PlaceBid:  For variables, look at type PlaceBidVars in ../index.d.ts
const { data } = await PlaceBid(dataConnect, placeBidVars);

// Operation ListLeaderboard:  For variables, look at type ListLeaderboardVars in ../index.d.ts
const { data } = await ListLeaderboard(dataConnect, listLeaderboardVars);

// Operation GetTopListing: 
const { data } = await GetTopListing(dataConnect);

// Operation ListRecentBids:  For variables, look at type ListRecentBidsVars in ../index.d.ts
const { data } = await ListRecentBids(dataConnect, listRecentBidsVars);

// Operation GetListingById:  For variables, look at type GetListingByIdVars in ../index.d.ts
const { data } = await GetListingById(dataConnect, getListingByIdVars);

// Operation GetListingByUrl:  For variables, look at type GetListingByUrlVars in ../index.d.ts
const { data } = await GetListingByUrl(dataConnect, getListingByUrlVars);

// Operation GetVisitorStats: 
const { data } = await GetVisitorStats(dataConnect);


```