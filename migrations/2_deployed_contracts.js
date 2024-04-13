const Election = artifacts.require('Election')
const QuadraNFT = artifacts.require('QuadraNFT')

module.exports = async function (deployer) {
  await deployer.deploy(QuadraNFT);
  const quadraNFT = await QuadraNFT.deployed();

  await deployer.deploy(Election, quadraNFT.address);
  const election = await Election.deployed();
  quadraNFT.grantAdminRole(election.address);
}
