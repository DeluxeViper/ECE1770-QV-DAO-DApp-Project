
export const calculateRemainingTokens = (connectedAccount, maxTokensPerAddress, voters) => {
  if (voters === null || voters.length === 0) {
    return maxTokensPerAddress;
  }
  console.log('connectedAccount')
  console.log(connectedAccount)

  let totalNumTokensSpent = 0
  voters.forEach((voter, i) => {
    console.log("voter, " + i)
    console.log(voter)
    if (voter.voter.toLowerCase() === connectedAccount) {
      totalNumTokensSpent += Number(voter.numTokens)
    }
  });

  console.log(`totalNumTokensSpent: ${totalNumTokensSpent}, maxTokensPerAddress: ${maxTokensPerAddress}, connectedAccount: ${connectedAccount}`)


  return totalNumTokensSpent > Number(maxTokensPerAddress) ? 0 : (Number(maxTokensPerAddress) - totalNumTokensSpent);
}
