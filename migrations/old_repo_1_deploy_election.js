const Election = artifacts.require("Election");
const QuadraDAO = artifacts.require("QuadraDAO");

const {PUBLIC_KEY} = process.env;

module.exports = async function (deployer) {
  await deployer.deploy(QuadraDAO, PUBLIC_KEY);
  await deployer.deploy(Election, PUBLIC_KEY, QuadraDAO.address);
  
  
  // const accounts = await web3.eth.getAccounts();
  // console.log(accounts);

  // //add admin account ( accounts[0] )
  // await deployer.deploy(QuadraDAO, "0x2E775d66CFcFDA4003059a3F7D566fbB886bdD45");
  // await deployer.deploy(Election, "0x2E775d66CFcFDA4003059a3F7D566fbB886bdD45", QuadraDAO.address);
};
