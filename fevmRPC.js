import '@ethersproject/shims';
import 'text-encoding';

import { ethers } from 'ethers';
import { Buffer } from 'buffer';
const fa = require("@glif/filecoin-address");

import { DAPP_CONTRACT } from "@env"

const networkInfo = {
  defaultNetwork: "hyperspace",
  networks: {
    hyperspace: {
      chainId: 3141,
      url: "https://api.hyperspace.node.glif.io/rpc/v1",
    },
  },
}
// To do for contract compile
// 1. `yarn compile-contracts` WILL COMPILE ANY BASIC CONTRACTS
// 2. Change import to the new artifacts/abi.json

// or just use vscode solidity extension to compile (Need to do if import like @openzepplin in contracts):
// https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity
import * as ContractABI from './bin/contracts/FitMint.json'
import * as SolidityOutput from './bin/contracts/FitMint-solc-output.json'
const byteCode = '60806040523480156200001157600080fd5b50604051806040016040528060058152602001644d696e747360d81b815250604051806040016040528060088152602001674669744d696e747360c01b81525081600390816200006291906200018f565b5060046200007182826200018f565b5050506200008e620000886200009460201b60201c565b62000098565b6200025b565b3390565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b634e487b7160e01b600052604160045260246000fd5b600181811c908216806200011557607f821691505b6020821081036200013657634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200018a57600081815260208120601f850160051c81016020861015620001655750805b601f850160051c820191505b81811015620001865782815560010162000171565b5050505b505050565b81516001600160401b03811115620001ab57620001ab620000ea565b620001c381620001bc845462000100565b846200013c565b602080601f831160018114620001fb5760008415620001e25750858301515b600019600386901b1c1916600185901b17855562000186565b600085815260208120601f198616915b828110156200022c578886015182559484019460019091019084016200020b565b50858210156200024b5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b610af7806200026b6000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c806370a0823111610097578063a457c2d711610066578063a457c2d7146101eb578063a9059cbb146101fe578063dd62ed3e14610211578063f2fde38b1461022457600080fd5b806370a0823114610197578063715018a6146101c05780638da5cb5b146101c857806395d89b41146101e357600080fd5b806323b872dd116100d357806323b872dd1461014d578063313ce56714610160578063395093511461016f57806340c10f191461018257600080fd5b806306fdde03146100fa578063095ea7b31461011857806318160ddd1461013b575b600080fd5b610102610237565b60405161010f9190610941565b60405180910390f35b61012b6101263660046109ab565b6102c9565b604051901515815260200161010f565b6002545b60405190815260200161010f565b61012b61015b3660046109d5565b6102e3565b6040516012815260200161010f565b61012b61017d3660046109ab565b610307565b6101956101903660046109ab565b610329565b005b61013f6101a5366004610a11565b6001600160a01b031660009081526020819052604090205490565b61019561033f565b6005546040516001600160a01b03909116815260200161010f565b610102610353565b61012b6101f93660046109ab565b610362565b61012b61020c3660046109ab565b6103e2565b61013f61021f366004610a33565b6103f0565b610195610232366004610a11565b61041b565b60606003805461024690610a66565b80601f016020809104026020016040519081016040528092919081815260200182805461027290610a66565b80156102bf5780601f10610294576101008083540402835291602001916102bf565b820191906000526020600020905b8154815290600101906020018083116102a257829003601f168201915b5050505050905090565b6000336102d7818585610494565b60019150505b92915050565b6000336102f18582856105b8565b6102fc858585610632565b506001949350505050565b6000336102d781858561031a83836103f0565b6103249190610aa0565b610494565b6103316107d6565b61033b8282610830565b5050565b6103476107d6565b61035160006108ef565b565b60606004805461024690610a66565b6000338161037082866103f0565b9050838110156103d55760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b6102fc8286868403610494565b6000336102d7818585610632565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6104236107d6565b6001600160a01b0381166104885760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016103cc565b610491816108ef565b50565b6001600160a01b0383166104f65760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016103cc565b6001600160a01b0382166105575760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016103cc565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b60006105c484846103f0565b9050600019811461062c578181101561061f5760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016103cc565b61062c8484848403610494565b50505050565b6001600160a01b0383166106965760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016103cc565b6001600160a01b0382166106f85760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016103cc565b6001600160a01b038316600090815260208190526040902054818110156107705760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016103cc565b6001600160a01b03848116600081815260208181526040808320878703905593871680835291849020805487019055925185815290927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a361062c565b6005546001600160a01b031633146103515760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016103cc565b6001600160a01b0382166108865760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016103cc565b80600260008282546108989190610aa0565b90915550506001600160a01b038216600081815260208181526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35050565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600060208083528351808285015260005b8181101561096e57858101830151858201604001528201610952565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b03811681146109a657600080fd5b919050565b600080604083850312156109be57600080fd5b6109c78361098f565b946020939093013593505050565b6000806000606084860312156109ea57600080fd5b6109f38461098f565b9250610a016020850161098f565b9150604084013590509250925092565b600060208284031215610a2357600080fd5b610a2c8261098f565b9392505050565b60008060408385031215610a4657600080fd5b610a4f8361098f565b9150610a5d6020840161098f565b90509250929050565b600181811c90821680610a7a57607f821691505b602082108103610a9a57634e487b7160e01b600052602260045260246000fd5b50919050565b808201808211156102dd57634e487b7160e01b600052601160045260246000fdfea2646970667358221220e6b369ed396e0e2a3e52089fc1891be1837a8665630541ddad703c127cf4e7bf64736f6c63430008120033'
// 3. Deploy the contract
// 4. Use ABI + Contract Deploy address to Interface
// const DAPP_CONTRACT = "Test"

// Note: ankr rpc was hacked so def want to change this
global.Buffer = global.Buffer || Buffer;
const FevmProviderUrl = 'https://api.hyperspace.node.glif.io/rpc/v1'

const getTokens = async (key) => {
  try {
    let cleanKey = key.replace(/["]/g, "");

    let provider = new ethers.providers.JsonRpcProvider(FevmProviderUrl);
    const wallet = new ethers.Wallet(cleanKey, provider);

    const { chainId } = await provider.getNetwork()
    console.log(chainId)
    console.log(provider);
    console.log(DAPP_CONTRACT);

    const f4Address = fa.newDelegatedEthAddress(DAPP_CONTRACT).toString();
    console.log("Ethereum Contract address (this addresss should work for most tools):", DAPP_CONTRACT);
    console.log("f4address Contract (also known as t4 address on testnets):", f4Address);

    //store taskargs as useable variables
    const account = cleanKey
    const networkId = networkInfo.networks.hyperspace.chainId
    console.log("Reading FitMints owned by", wallet, "on network", networkId)
    const FitMints = await ethers.Contract(f4Address, ContractABI.abi, provider)

    //Call the getBalance method
    let result = BigInt(await FitMints.balanceOf(account)).toString()
    console.log("Amount of Mints owned by", account, "is", result)

  } catch (error) {
    console.log(error)
  }
}


const MintTokens = async (key, amount) => {
  try {
    let cleanKey = key.replace(/["]/g, "");
    let provider = new ethers.providers.JsonRpcProvider(FevmProviderUrl, networkInfo.networks.hyperspace);
    const wallet = new ethers.Wallet(cleanKey, provider);
    const signer = wallet.connect(provider);

    const f4ContractAddress = fa.newDelegatedEthAddress(DAPP_CONTRACT).toString();
    const f4WalletAddress = fa.newDelegatedEthAddress(wallet.address).toString();
    const f4ActorAddress = fa.newActorAddress(wallet.address).toString();

    console.log("Ethereum Contract address in .env (this address should work for most tools):", DAPP_CONTRACT);
    console.log("f4address Contract (also known as t4 address on testnets):", f4ContractAddress);

    console.log("f4address Actor (also known as t4 address on testnets):", f4ActorAddress);
    console.log("f4address Wallet (also known as t4 address on testnets):", f4WalletAddress);
    console.log("Provider:", provider);
    console.log("Eth Wallet:", wallet);
    console.log("Minting FitMint");

    const FitMints = new ethers.Contract(DAPP_CONTRACT, ContractABI.abi, signer)
    console.log("Contract:", FitMints)

    // //Call the mint method
    let result = await FitMints.mint(wallet.address, amount, { gasLimit: 30000 })
    if(result) {
      console.log("Minting Token:", result)
      return result
    } else {
      return {"result": result.toString()}
    }
  } catch (error) {
    console.log(error)
    return error
  }
}

export default {
  getTokens,
  MintTokens,
};