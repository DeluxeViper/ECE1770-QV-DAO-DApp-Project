const Election = artifacts.require('Election')

module.exports = async function (deployer) {
  await deployer.deploy(Election)
}
