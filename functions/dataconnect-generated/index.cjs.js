const { validateAdminArgs } = require('firebase-admin/data-connect');

const connectorConfig = {
  connector: 'appbid',
  serviceId: 'appbid-service-id',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

function logVisit(dcOrOptions, options) {
  const { dc: dcInstance, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrOptions, options, undefined);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('LogVisit', undefined, inputOpts);
}
exports.logVisit = logVisit;

function incrementClickCount(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('IncrementClickCount', inputVars, inputOpts);
}
exports.incrementClickCount = incrementClickCount;

function createListing(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('CreateListing', inputVars, inputOpts);
}
exports.createListing = createListing;

function placeBid(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('PlaceBid', inputVars, inputOpts);
}
exports.placeBid = placeBid;

function listWeeklyLeaderboard(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, false);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ListWeeklyLeaderboard', inputVars, inputOpts);
}
exports.listWeeklyLeaderboard = listWeeklyLeaderboard;

function listMonthlyLeaderboard(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, false);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ListMonthlyLeaderboard', inputVars, inputOpts);
}
exports.listMonthlyLeaderboard = listMonthlyLeaderboard;

function listAnnualLeaderboard(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, false);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ListAnnualLeaderboard', inputVars, inputOpts);
}
exports.listAnnualLeaderboard = listAnnualLeaderboard;

function listRecentBids(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, false);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ListRecentBids', inputVars, inputOpts);
}
exports.listRecentBids = listRecentBids;

function getListingById(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetListingById', inputVars, inputOpts);
}
exports.getListingById = getListingById;

function getListingByUrl(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetListingByUrl', inputVars, inputOpts);
}
exports.getListingByUrl = getListingByUrl;

function getVisitorStats(dcOrOptions, options) {
  const { dc: dcInstance, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrOptions, options, undefined);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetVisitorStats', undefined, inputOpts);
}
exports.getVisitorStats = getVisitorStats;

