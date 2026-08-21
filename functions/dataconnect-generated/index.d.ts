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

export interface CreateListingData {
  newListing: Listing_Key;
  bid_insert: Bid_Key;
}

export interface CreateListingVariables {
  displayName: string;
  url: string;
  tagline?: string | null;
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

export interface ListLeaderboardData {
  listings: ({
    id: UUIDString;
    displayName: string;
    url: string;
    tagline?: string | null;
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
  ownerEmail?: string | null;
  stripeSessionId?: string | null;
}

/** Generated Node Admin SDK operation action function for the 'CreateListing' Mutation. Allow users to execute without passing in DataConnect. */
export function createListing(dc: DataConnect, vars: CreateListingVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateListingData>>;
/** Generated Node Admin SDK operation action function for the 'CreateListing' Mutation. Allow users to pass in custom DataConnect instances. */
export function createListing(vars: CreateListingVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateListingData>>;

/** Generated Node Admin SDK operation action function for the 'PlaceBid' Mutation. Allow users to execute without passing in DataConnect. */
export function placeBid(dc: DataConnect, vars: PlaceBidVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<PlaceBidData>>;
/** Generated Node Admin SDK operation action function for the 'PlaceBid' Mutation. Allow users to pass in custom DataConnect instances. */
export function placeBid(vars: PlaceBidVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<PlaceBidData>>;

/** Generated Node Admin SDK operation action function for the 'ListLeaderboard' Query. Allow users to execute without passing in DataConnect. */
export function listLeaderboard(dc: DataConnect, vars?: ListLeaderboardVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListLeaderboardData>>;
/** Generated Node Admin SDK operation action function for the 'ListLeaderboard' Query. Allow users to pass in custom DataConnect instances. */
export function listLeaderboard(vars?: ListLeaderboardVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListLeaderboardData>>;

/** Generated Node Admin SDK operation action function for the 'GetTopListing' Query. Allow users to execute without passing in DataConnect. */
export function getTopListing(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<GetTopListingData>>;
/** Generated Node Admin SDK operation action function for the 'GetTopListing' Query. Allow users to pass in custom DataConnect instances. */
export function getTopListing(options?: OperationOptions): Promise<ExecuteOperationResponse<GetTopListingData>>;

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

