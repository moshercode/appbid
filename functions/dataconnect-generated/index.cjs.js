const { validateAdminArgs } = require('firebase-admin/data-connect');

const connectorConfig = {
  connector: 'appbid',
  serviceId: 'appbid-service-id',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

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

function listLeaderboard(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, false);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ListLeaderboard', inputVars, inputOpts);
}
exports.listLeaderboard = listLeaderboard;

function getTopListing(dcOrOptions, options) {
  const { dc: dcInstance, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrOptions, options, undefined);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetTopListing', undefined, inputOpts);
}
exports.getTopListing = getTopListing;

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

