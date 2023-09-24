export default [
	{
	  "inputs": [
		{
		  "internalType": "contract IWorldID",
		  "name": "_worldId",
		  "type": "address"
		},
		{
		  "internalType": "string",
		  "name": "_appId",
		  "type": "string"
		},
		{
		  "internalType": "string",
		  "name": "_actionId",
		  "type": "string"
		}
	  ],
	  "stateMutability": "nonpayable",
	  "type": "constructor"
	},
	{
	  "inputs": [],
	  "name": "InvalidNullifier",
	  "type": "error"
	},
	{
	  "anonymous": false,
	  "inputs": [
		{
		  "indexed": true,
		  "internalType": "address",
		  "name": "_from",
		  "type": "address"
		},
		{
		  "indexed": false,
		  "internalType": "uint256",
		  "name": "_root",
		  "type": "uint256"
		}
	  ],
	  "name": "TestReach",
	  "type": "event"
	},
	{
	  "inputs": [
		{
		  "internalType": "address",
		  "name": "signal",
		  "type": "address"
		},
		{
		  "internalType": "uint256",
		  "name": "root",
		  "type": "uint256"
		},
		{
		  "internalType": "uint256",
		  "name": "nullifierHash",
		  "type": "uint256"
		},
		{
		  "internalType": "uint256[8]",
		  "name": "proof",
		  "type": "uint256[8]"
		}
	  ],
	  "name": "verifyAndExecute",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	}
  ] as const
