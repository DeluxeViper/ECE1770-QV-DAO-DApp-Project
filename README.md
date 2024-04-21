## Final Report
The report is mentioned in the Folder Titled "Final Report" 

# Quadratic DAO 

The app is deployed on: https://quadradao-app.azurewebsites.net

## Dependencies
Install these prerequisites to follow along with the tutorial. See free video tutorial or a full explanation of each prerequisite.
- NPM: https://nodejs.org
- Truffle: https://github.com/trufflesuite/truffle
- Ganache-CLI: https://docs.nethereum.com/en/latest/ethereum-and-clients/ganache-cli/
- Tailwind CSS: https://tailwindcss.com/
To deploy the Dapp on Azure Portal, you need a workable Azure(https://portal.azure.com/) account.

## Step 2. Install dependencies
```sh
$ cd <PROJECT NAME>
$ yarn install # or npm install
---------------------------------
- install node 

# install Truffle and Ganache globally
$ npm install -g truffle ganache-cli

# install openzeppelin: 
$ npm install @openzeppelin/contracts

- install Metamask
```

## Step 3. Start Ganache-CLI (skip if you want to deploy on Sepolia)
Open the terminal and run the command below.
```sh
$ ganache-cli
```

## Step 4. Compile & Deploy Smart Contract
`$ truffle migrate --reset`
Migrate your smart contract each time your restart ganache.
Use `--network development` flag if you want to deploy on ganache.
Use `--network sepolia` flag if you want to deploy on sepolia


## Step 5. Run the Front End Application
`$ yarn start`
Visit this URL in your browser: http://localhost:3000


-----------------------------



## Installation



## Configeration
At root folder, create an .env file:

```
PUBLIC_KEY=<Your_PUBLIC_KEY_TO_DEPLOY_CONTRACTS>
PRIVATE_KEY=<Your_PRIVATE_KEY_TO_DEPLOY_CONTRACTS>
SEPOLIA_API=<Your_SEPOLIA_NODE_ENDPOINT>
```

To use the Github Action to deploy on Sepolia and Azure, you need to add the above envs as well as your `AZURE_WEBAPP_PUBLISH_PROFILE` downloaded from Azure to Github secrets.

## Notes 

## FAQ
- **How to access different user priviledges?**
   For admin roles, signup then login with username and password both to 'admin' (NOTE: case sensitive, all lowercase). It will take you to list of all users where you can whitelist them and mint nfts for them.

   For normal user/voter, sign up and login with any username or password, where you can request to get whitelisted and access nfts for anonymous voting. 

   When a user requests the services mentioned above, the list on the admin page is updated in real time (you might to refresh the page). 

- **How do I use this with Ganache (or any other network)?**

  The Truffle project is set to deploy to Ganache by default. If you'd like to change this, it's as easy as modifying the Truffle config file! Check out [our documentation on adding network configurations](https://trufflesuite.com/docs/truffle/reference/configuration/#networks). From there, you can run `truffle migrate` pointed to another network, restart the React dev server, and see the change take place.

- **Where can I find more resources?**

  This Box is a sweet combo of [Truffle](https://trufflesuite.com) and [Webpack](https://webpack.js.org). Either one would be a great place to start!




