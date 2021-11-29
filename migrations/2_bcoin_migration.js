const BCoin = artifacts.require("BCoin");

module.exports = function (deployer) {
  deployer.deploy(BCoin);
};
