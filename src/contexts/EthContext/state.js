const actions = {
  init: "INIT",
  addUser: "ADD_USER"
};

const initialState = {
  artifact: null,
  web3: null,
  accounts: null,
  networkID: null,
  contract: null,
  users: {},
  nft_contract_address : null,
};

const reducer = (state, action) => {
  const { type, data } = action;
  switch (action.type) {
    case actions.init:
      return { ...state, ...action.data };
    case actions.addUser:
      const {username, password} = action.data;
      return {
        ...state,
        users: {...state.users, [username]: password}
      };
    default:
      throw new Error("Undefined reducer action type");
  }
};

export { actions, initialState, reducer };
