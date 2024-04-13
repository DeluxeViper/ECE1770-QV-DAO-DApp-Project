import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { initialState as defaultInitialState, reducer, actions } from './state';

const loadInitialState = () => {
  const usersData = localStorage.getItem('users');
  return usersData ? { ...defaultInitialState, users: JSON.parse(usersData) } : defaultInitialState;
};

function EthProvider({ children }) {
  const initialState = loadInitialState();
  const [state, dispatch] = useReducer(reducer, initialState);

  const addUser = (username, password) => {
    const updatedUsers = { ...state.users, [username]: password };
    dispatch({
      type: actions.addUser,
      data: {username, password},
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    console.log('Added user:', username); // Confirm user is added
    console.log('Updated state:', state); // Check the updated state
  };

  const init = useCallback(
    async artifact => {
      if (artifact) {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();
        const { abi } = artifact;
        let address, contract;
        try {
          address = artifact.networks[networkID].address;

          contract = new web3.eth.Contract(abi, address);
        } catch (err) {
          console.error(err);
        }
        dispatch({
          type: actions.init,
          data: { artifact, web3, accounts, networkID, contract }
        });
      }
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact = require("../../contracts/Election.json");
        init(artifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider value={{ ...state, addUser}}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;