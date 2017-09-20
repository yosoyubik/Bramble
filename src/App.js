import React, { Component } from 'react';
import getWeb3 from './utils/getWeb3';

import IPFS from 'ipfs-api';
import ipfs from 'ipfs';
import bs58 from 'bs58';
import multihash from 'multihashes';

// Contracts
import RegistryManager from '../build/contracts/RegistryManager.json';
import SampleDb from '../build/contracts/SampleDb.json';

import './css/oswald.css';
import './css/open-sans.css';
import './css/pure-min.css';
import './App.css';

import contract from 'truffle-contract';


// class SampleWatcher extends Component {
//   
// }
// 
// class Users extends Componend {
//   
// }
// 
// class UserEntry extends Component {
//   
// }


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      samples: [],
      web3: null,
      ipfsApi: null
    }
    // bind methods. source: https://github.com/ipfs/js-ipfs-api
    this.captureFile = this.captureFile.bind(this);
    this.saveToIpfs = this.saveToIpfs.bind(this);
    this.arrayBufferToString = this.arrayBufferToString.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  captureFile (event) {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.onloadend = () => this.saveToIpfs(reader);
    reader.readAsArrayBuffer(file);
  }
  saveToIpfs (reader) {
    let ipfsHash;
    const buffer = Buffer.from(reader.result);
    const registryManager = contract(RegistryManager);
    registryManager.setProvider(this.state.web3.currentProvider);
    
    this.ipfsApi.add(buffer).then((response) => {
      ipfsHash = response[0].hash;
      this.state.web3.eth.getAccounts((error, accounts) => {
        registryManager.deployed()
          .then(registryInstance => {
            var multiHash = multihash.decode(bs58.decode(ipfsHash));
            var digest = `0x${multiHash.digest.toString('hex')}`;
            var code = multiHash.code;
            var length = multiHash.length;
            console.log('UI Sample', digest, code, length);
            return registryInstance.submitSample(digest, code, length, {from: accounts[0], gas:999999});
          }).catch((err) => {
            console.error(err);
          });
        });
    }).catch((err) => {
      console.error(err);
    });
  }

  arrayBufferToString (arrayBuffer) {
    return String.fromCharCode.apply(null, new Uint16Array(arrayBuffer))
  }

  handleSubmit (event) {
    event.preventDefault()
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    // Bypass web3 injected by MetaMask
    window.web3 = undefined;
    getWeb3.then(results => {
      this.setState({
        web3: results.web3
      });
      // Instantiate contract once web3 provided.
      this.instantiateContract();
    }).catch(() => {
      console.log('Error finding web3.');
    });
    // connect to ipfs daemon API server
    this.ipfsApi = IPFS('127.0.0.1', '5001', {protocol: 'http'});
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * TODO: Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */
    const sampleDB = contract(SampleDb);
    sampleDB.setProvider(this.state.web3.currentProvider);
    this.state.web3.eth.getAccounts((error, accounts) => {
      console.log('Accounts', accounts);
      sampleDB.deployed()
        .then(sampleDbInstance => {
          var event = sampleDbInstance.NewSample();
          event.watch((error, result) => {
            if (error) {
              console.log(error);
            }else {
              var digest = multihash.fromHexString(result.args._ipfshash.replace('0x', ''));
              var code = parseInt(result.args._hashFunc, 10);
              var length = parseInt(result.args._length, 10);
              var address = result.args._from;
              
              var ipfsPath = bs58.encode(multihash.encode(digest, code, length));
              console.log('New Sample', ipfsPath);
              this.setState((prevState) => {
                  return {
                      samples: [...prevState.samples, [address, ipfsPath]]
                  }
              });
            }
          });
        });
    });
  }

  render() {
    const list = this.state.samples.map((item, i) => {
        var maxLen = -1;
        console.log(item[1]);
        // `${item[0].slice(0, maxLen)}...${item[0].slice(-maxLen, item[0].length-1)}`
        return <tr key={i}><td>{item[0]}</td><td><a target="_blank"href={'https://ipfs.io/ipfs/' + item[1]}>Link</a></td></tr>;
    });
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h2>Sample Dashboard</h2>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>User Public ID</th>
                    <th>IPFS Hash</th> 
                  </tr>
                </thead>
                <tbody>
                  {list}
                </tbody>
              </table>
            </div>
          </div>
          
          <div>
              <form className="form-group" id="captureMedia" onSubmit={this.handleSubmit}>
                <input className="form-control" type="file" onChange={this.captureFile} />
              </form>
          </div>
        </main>
      </div>
    );
  }
}

export default App
