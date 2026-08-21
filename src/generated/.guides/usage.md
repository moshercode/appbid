# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { logVisit, incrementClickCount, createListing, placeBid, listWeeklyLeaderboard, listMonthlyLeaderboard, listAnnualLeaderboard, listRecentBids, getListingById, getListingByUrl } from '@appbid/dataconnect';


// Operation LogVisit: 
const { data } = await LogVisit(dataConnect);

// Operation IncrementClickCount:  For variables, look at type IncrementClickCountVars in ../index.d.ts
const { data } = await IncrementClickCount(dataConnect, incrementClickCountVars);

// Operation CreateListing:  For variables, look at type CreateListingVars in ../index.d.ts
const { data } = await CreateListing(dataConnect, createListingVars);

// Operation PlaceBid:  For variables, look at type PlaceBidVars in ../index.d.ts
const { data } = await PlaceBid(dataConnect, placeBidVars);

// Operation ListWeeklyLeaderboard:  For variables, look at type ListWeeklyLeaderboardVars in ../index.d.ts
const { data } = await ListWeeklyLeaderboard(dataConnect, listWeeklyLeaderboardVars);

// Operation ListMonthlyLeaderboard:  For variables, look at type ListMonthlyLeaderboardVars in ../index.d.ts
const { data } = await ListMonthlyLeaderboard(dataConnect, listMonthlyLeaderboardVars);

// Operation ListAnnualLeaderboard:  For variables, look at type ListAnnualLeaderboardVars in ../index.d.ts
const { data } = await ListAnnualLeaderboard(dataConnect, listAnnualLeaderboardVars);

// Operation ListRecentBids:  For variables, look at type ListRecentBidsVars in ../index.d.ts
const { data } = await ListRecentBids(dataConnect, listRecentBidsVars);

// Operation GetListingById:  For variables, look at type GetListingByIdVars in ../index.d.ts
const { data } = await GetListingById(dataConnect, getListingByIdVars);

// Operation GetListingByUrl:  For variables, look at type GetListingByUrlVars in ../index.d.ts
const { data } = await GetListingByUrl(dataConnect, getListingByUrlVars);


```