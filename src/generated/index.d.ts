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

export interface GetTopListingData {
  listings: ({
    id: UUIDString;
    displayName: string;
    url: string;
    currentBid: number;
  } & Listing_Key)[];
}

export interface GetVisitorStatsData {
  visitStats: ({
    lastHour?: number | null;
    last24h?: number | null;
  })[];
}

export interface IncrementClickCountData {
  listing_update?: Listing_Key | null;
}

export interface IncrementClickCountVariables {
  listingId: UUIDString;
}

export interface ListLeaderboardData {
  listings: ({
    id: UUIDString;
    displayName: string;
    url: string;
    tagline?: string | null;
    iconUrl?: string | null;
    currentBid: number;
    clickCount: number;
    updatedAt: TimestampString;
  } & Listing_Key)[];
}

export interface ListLeaderboardVariables {
  limit?: number | null;
}

export interface ListRecentBidsData {
  bids: ({
    id: UUIDString;
    amount: number;
    bidderName?: string | null;
    displayName: string;
    url: string;
    createdAt: TimestampString;
  } & Bid_Key)[];
}

export interface ListRecentBidsVariables {
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

interface ListLeaderboardRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListLeaderboardVariables): QueryRef<ListLeaderboardData, ListLeaderboardVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: ListLeaderboardVariables): QueryRef<ListLeaderboardData, ListLeaderboardVariables>;
  operationName: string;
}
export const listLeaderboardRef: ListLeaderboardRef;

export function listLeaderboard(vars?: ListLeaderboardVariables, options?: ExecuteQueryOptions): QueryPromise<ListLeaderboardData, ListLeaderboardVariables>;
export function listLeaderboard(dc: DataConnect, vars?: ListLeaderboardVariables, options?: ExecuteQueryOptions): QueryPromise<ListLeaderboardData, ListLeaderboardVariables>;

interface GetTopListingRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetTopListingData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetTopListingData, undefined>;
  operationName: string;
}
export const getTopListingRef: GetTopListingRef;

export function getTopListing(options?: ExecuteQueryOptions): QueryPromise<GetTopListingData, undefined>;
export function getTopListing(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetTopListingData, undefined>;

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

