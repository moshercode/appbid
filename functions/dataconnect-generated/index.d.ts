import { ConnectorConfig, DataConnect, OperationOptions, ExecuteOperationResponse } from 'firebase-admin/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export interface Bid_Key {
  id: UUIDString;
  __typename?: 'Bid_Key';
}

export interface Click_Key {
  id: UUIDString;
  __typename?: 'Click_Key';
}

export interface CreateListingData {
  newListing: Listing_Key;
  bid_insert: Bid_Key;
}

export interface CreateListingVariables {
  displayName: string;
  url: string;
  tagline?: string | null;
  iconUrl?: string | null;
  ownerEmail?: string | null;
  initialBid: number;
  stripeSessionId?: string | null;
}

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

export interface GetListingByIdVariables {
  id: UUIDString;
}

export interface GetListingByUrlData {
  listings: ({
    id: UUIDString;
    displayName: string;
    url: string;
    tagline?: string | null;
    currentBid: number;
  } & Listing_Key)[];
}

export interface GetListingByUrlVariables {
  url: string;
}

export interface GetVisitorStatsData {
  visitStats: ({
    lastHour?: number | null;
    last24h?: number | null;
  })[];
}

export interface IncrementClickCountData {
  listing_update?: Listing_Key | null;
  click_insert: Click_Key;
}

export interface IncrementClickCountVariables {
  listingId: UUIDString;
}

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

export interface ListAnnualLeaderboardVariables {
  limit?: number | null;
}

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

export interface ListMonthlyLeaderboardVariables {
  limit?: number | null;
}

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

export interface ListRecentBidsVariables {
  limit?: number | null;
}

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

export interface ListWeeklyLeaderboardVariables {
  limit?: number | null;
}

export interface Listing_Key {
  id: UUIDString;
  __typename?: 'Listing_Key';
}

export interface LogVisitData {
  visit_insert: Visit_Key;
}

export interface PlaceBidData {
  bid_insert: Bid_Key;
  listing_update?: Listing_Key | null;
}

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

export interface Visit_Key {
  id: UUIDString;
  __typename?: 'Visit_Key';
}

/** Generated Node Admin SDK operation action function for the 'LogVisit' Mutation. Allow users to execute without passing in DataConnect. */
export function logVisit(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<LogVisitData>>;
/** Generated Node Admin SDK operation action function for the 'LogVisit' Mutation. Allow users to pass in custom DataConnect instances. */
export function logVisit(options?: OperationOptions): Promise<ExecuteOperationResponse<LogVisitData>>;

/** Generated Node Admin SDK operation action function for the 'IncrementClickCount' Mutation. Allow users to execute without passing in DataConnect. */
export function incrementClickCount(dc: DataConnect, vars: IncrementClickCountVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<IncrementClickCountData>>;
/** Generated Node Admin SDK operation action function for the 'IncrementClickCount' Mutation. Allow users to pass in custom DataConnect instances. */
export function incrementClickCount(vars: IncrementClickCountVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<IncrementClickCountData>>;

/** Generated Node Admin SDK operation action function for the 'CreateListing' Mutation. Allow users to execute without passing in DataConnect. */
export function createListing(dc: DataConnect, vars: CreateListingVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateListingData>>;
/** Generated Node Admin SDK operation action function for the 'CreateListing' Mutation. Allow users to pass in custom DataConnect instances. */
export function createListing(vars: CreateListingVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateListingData>>;

/** Generated Node Admin SDK operation action function for the 'PlaceBid' Mutation. Allow users to execute without passing in DataConnect. */
export function placeBid(dc: DataConnect, vars: PlaceBidVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<PlaceBidData>>;
/** Generated Node Admin SDK operation action function for the 'PlaceBid' Mutation. Allow users to pass in custom DataConnect instances. */
export function placeBid(vars: PlaceBidVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<PlaceBidData>>;

/** Generated Node Admin SDK operation action function for the 'ListWeeklyLeaderboard' Query. Allow users to execute without passing in DataConnect. */
export function listWeeklyLeaderboard(dc: DataConnect, vars?: ListWeeklyLeaderboardVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListWeeklyLeaderboardData>>;
/** Generated Node Admin SDK operation action function for the 'ListWeeklyLeaderboard' Query. Allow users to pass in custom DataConnect instances. */
export function listWeeklyLeaderboard(vars?: ListWeeklyLeaderboardVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListWeeklyLeaderboardData>>;

/** Generated Node Admin SDK operation action function for the 'ListMonthlyLeaderboard' Query. Allow users to execute without passing in DataConnect. */
export function listMonthlyLeaderboard(dc: DataConnect, vars?: ListMonthlyLeaderboardVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListMonthlyLeaderboardData>>;
/** Generated Node Admin SDK operation action function for the 'ListMonthlyLeaderboard' Query. Allow users to pass in custom DataConnect instances. */
export function listMonthlyLeaderboard(vars?: ListMonthlyLeaderboardVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListMonthlyLeaderboardData>>;

/** Generated Node Admin SDK operation action function for the 'ListAnnualLeaderboard' Query. Allow users to execute without passing in DataConnect. */
export function listAnnualLeaderboard(dc: DataConnect, vars?: ListAnnualLeaderboardVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListAnnualLeaderboardData>>;
/** Generated Node Admin SDK operation action function for the 'ListAnnualLeaderboard' Query. Allow users to pass in custom DataConnect instances. */
export function listAnnualLeaderboard(vars?: ListAnnualLeaderboardVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListAnnualLeaderboardData>>;

/** Generated Node Admin SDK operation action function for the 'ListRecentBids' Query. Allow users to execute without passing in DataConnect. */
export function listRecentBids(dc: DataConnect, vars?: ListRecentBidsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListRecentBidsData>>;
/** Generated Node Admin SDK operation action function for the 'ListRecentBids' Query. Allow users to pass in custom DataConnect instances. */
export function listRecentBids(vars?: ListRecentBidsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListRecentBidsData>>;

/** Generated Node Admin SDK operation action function for the 'GetListingById' Query. Allow users to execute without passing in DataConnect. */
export function getListingById(dc: DataConnect, vars: GetListingByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetListingByIdData>>;
/** Generated Node Admin SDK operation action function for the 'GetListingById' Query. Allow users to pass in custom DataConnect instances. */
export function getListingById(vars: GetListingByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetListingByIdData>>;

/** Generated Node Admin SDK operation action function for the 'GetListingByUrl' Query. Allow users to execute without passing in DataConnect. */
export function getListingByUrl(dc: DataConnect, vars: GetListingByUrlVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetListingByUrlData>>;
/** Generated Node Admin SDK operation action function for the 'GetListingByUrl' Query. Allow users to pass in custom DataConnect instances. */
export function getListingByUrl(vars: GetListingByUrlVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetListingByUrlData>>;

/** Generated Node Admin SDK operation action function for the 'GetVisitorStats' Query. Allow users to execute without passing in DataConnect. */
export function getVisitorStats(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<GetVisitorStatsData>>;
/** Generated Node Admin SDK operation action function for the 'GetVisitorStats' Query. Allow users to pass in custom DataConnect instances. */
export function getVisitorStats(options?: OperationOptions): Promise<ExecuteOperationResponse<GetVisitorStatsData>>;

