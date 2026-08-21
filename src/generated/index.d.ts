import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise } from 'firebase/data-connect';

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

interface LogVisitRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<LogVisitData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<LogVisitData, undefined>;
  operationName: string;
}
export const logVisitRef: LogVisitRef;

export function logVisit(): MutationPromise<LogVisitData, undefined>;
export function logVisit(dc: DataConnect): MutationPromise<LogVisitData, undefined>;

interface IncrementClickCountRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: IncrementClickCountVariables): MutationRef<IncrementClickCountData, IncrementClickCountVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: IncrementClickCountVariables): MutationRef<IncrementClickCountData, IncrementClickCountVariables>;
  operationName: string;
}
export const incrementClickCountRef: IncrementClickCountRef;

export function incrementClickCount(vars: IncrementClickCountVariables): MutationPromise<IncrementClickCountData, IncrementClickCountVariables>;
export function incrementClickCount(dc: DataConnect, vars: IncrementClickCountVariables): MutationPromise<IncrementClickCountData, IncrementClickCountVariables>;

interface CreateListingRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateListingVariables): MutationRef<CreateListingData, CreateListingVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateListingVariables): MutationRef<CreateListingData, CreateListingVariables>;
  operationName: string;
}
export const createListingRef: CreateListingRef;

export function createListing(vars: CreateListingVariables): MutationPromise<CreateListingData, CreateListingVariables>;
export function createListing(dc: DataConnect, vars: CreateListingVariables): MutationPromise<CreateListingData, CreateListingVariables>;

interface PlaceBidRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: PlaceBidVariables): MutationRef<PlaceBidData, PlaceBidVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: PlaceBidVariables): MutationRef<PlaceBidData, PlaceBidVariables>;
  operationName: string;
}
export const placeBidRef: PlaceBidRef;

export function placeBid(vars: PlaceBidVariables): MutationPromise<PlaceBidData, PlaceBidVariables>;
export function placeBid(dc: DataConnect, vars: PlaceBidVariables): MutationPromise<PlaceBidData, PlaceBidVariables>;

interface ListWeeklyLeaderboardRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListWeeklyLeaderboardVariables): QueryRef<ListWeeklyLeaderboardData, ListWeeklyLeaderboardVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: ListWeeklyLeaderboardVariables): QueryRef<ListWeeklyLeaderboardData, ListWeeklyLeaderboardVariables>;
  operationName: string;
}
export const listWeeklyLeaderboardRef: ListWeeklyLeaderboardRef;

export function listWeeklyLeaderboard(vars?: ListWeeklyLeaderboardVariables, options?: ExecuteQueryOptions): QueryPromise<ListWeeklyLeaderboardData, ListWeeklyLeaderboardVariables>;
export function listWeeklyLeaderboard(dc: DataConnect, vars?: ListWeeklyLeaderboardVariables, options?: ExecuteQueryOptions): QueryPromise<ListWeeklyLeaderboardData, ListWeeklyLeaderboardVariables>;

interface ListMonthlyLeaderboardRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListMonthlyLeaderboardVariables): QueryRef<ListMonthlyLeaderboardData, ListMonthlyLeaderboardVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: ListMonthlyLeaderboardVariables): QueryRef<ListMonthlyLeaderboardData, ListMonthlyLeaderboardVariables>;
  operationName: string;
}
export const listMonthlyLeaderboardRef: ListMonthlyLeaderboardRef;

export function listMonthlyLeaderboard(vars?: ListMonthlyLeaderboardVariables, options?: ExecuteQueryOptions): QueryPromise<ListMonthlyLeaderboardData, ListMonthlyLeaderboardVariables>;
export function listMonthlyLeaderboard(dc: DataConnect, vars?: ListMonthlyLeaderboardVariables, options?: ExecuteQueryOptions): QueryPromise<ListMonthlyLeaderboardData, ListMonthlyLeaderboardVariables>;

interface ListAnnualLeaderboardRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListAnnualLeaderboardVariables): QueryRef<ListAnnualLeaderboardData, ListAnnualLeaderboardVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: ListAnnualLeaderboardVariables): QueryRef<ListAnnualLeaderboardData, ListAnnualLeaderboardVariables>;
  operationName: string;
}
export const listAnnualLeaderboardRef: ListAnnualLeaderboardRef;

export function listAnnualLeaderboard(vars?: ListAnnualLeaderboardVariables, options?: ExecuteQueryOptions): QueryPromise<ListAnnualLeaderboardData, ListAnnualLeaderboardVariables>;
export function listAnnualLeaderboard(dc: DataConnect, vars?: ListAnnualLeaderboardVariables, options?: ExecuteQueryOptions): QueryPromise<ListAnnualLeaderboardData, ListAnnualLeaderboardVariables>;

interface ListRecentBidsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListRecentBidsVariables): QueryRef<ListRecentBidsData, ListRecentBidsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: ListRecentBidsVariables): QueryRef<ListRecentBidsData, ListRecentBidsVariables>;
  operationName: string;
}
export const listRecentBidsRef: ListRecentBidsRef;

export function listRecentBids(vars?: ListRecentBidsVariables, options?: ExecuteQueryOptions): QueryPromise<ListRecentBidsData, ListRecentBidsVariables>;
export function listRecentBids(dc: DataConnect, vars?: ListRecentBidsVariables, options?: ExecuteQueryOptions): QueryPromise<ListRecentBidsData, ListRecentBidsVariables>;

interface GetListingByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetListingByIdVariables): QueryRef<GetListingByIdData, GetListingByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetListingByIdVariables): QueryRef<GetListingByIdData, GetListingByIdVariables>;
  operationName: string;
}
export const getListingByIdRef: GetListingByIdRef;

export function getListingById(vars: GetListingByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetListingByIdData, GetListingByIdVariables>;
export function getListingById(dc: DataConnect, vars: GetListingByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetListingByIdData, GetListingByIdVariables>;

interface GetListingByUrlRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetListingByUrlVariables): QueryRef<GetListingByUrlData, GetListingByUrlVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetListingByUrlVariables): QueryRef<GetListingByUrlData, GetListingByUrlVariables>;
  operationName: string;
}
export const getListingByUrlRef: GetListingByUrlRef;

export function getListingByUrl(vars: GetListingByUrlVariables, options?: ExecuteQueryOptions): QueryPromise<GetListingByUrlData, GetListingByUrlVariables>;
export function getListingByUrl(dc: DataConnect, vars: GetListingByUrlVariables, options?: ExecuteQueryOptions): QueryPromise<GetListingByUrlData, GetListingByUrlVariables>;

interface GetVisitorStatsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetVisitorStatsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetVisitorStatsData, undefined>;
  operationName: string;
}
export const getVisitorStatsRef: GetVisitorStatsRef;

export function getVisitorStats(options?: ExecuteQueryOptions): QueryPromise<GetVisitorStatsData, undefined>;
export function getVisitorStats(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetVisitorStatsData, undefined>;

