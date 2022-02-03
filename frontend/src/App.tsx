import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Web3 from 'web3';
import { ABI } from './BCoinABI';

const RINKEBY_NET_ID = 4;

function App() {
  const haveProvider = !!Web3.givenProvider;
  const [netId, setNetId] = useState(0);
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(0);
  const [mintAmount, setMintAmount] = useState(0.01);

  useEffect(() => {
    if (haveProvider) {
      const interval = setInterval(() => {

        const web3 = new Web3(Web3.givenProvider);
        web3.eth.net.getId().then(newNetId => {
          setNetId(newNetId)
        });

        web3.eth.getAccounts().then(accounts => {
          setAccount(accounts[0] || '')
        })
      }, 1000)

      return () => clearInterval(interval);
    }

  }, [haveProvider])

  useEffect(() => {
    if (account) {
      const web3 = new Web3(Web3.givenProvider);
      const contract = new web3.eth.Contract(ABI, '0x5b0f16b4005E753ecBCcD12C5B684A959042c246');

      contract.methods.balanceOf(account).call()
        .then(setBalance)
    }
  }, [account])

  if (!haveProvider) {
    return <NoMetamask />
  }
  if (netId !== RINKEBY_NET_ID) {
    return <SwitchNetwork />
  }
  if (!account) {
    return <Connect />
  }


  const handleMint = () => {
    const web3 = new Web3(Web3.givenProvider);
    const contract = new web3.eth.Contract(ABI, '0x5b0f16b4005E753ecBCcD12C5B684A959042c246');

    contract.methods.mint().send({
      from: account,
      value: Web3.utils.toWei(mintAmount + '')
    })
  }

  return (
    <div className="container p-4">
      <h2>Your great life savings</h2>
      <div className='card p-1'>
        <div>Account <span className='text-primary'>{account}</span> balance is <span className='text-primary'>{Web3.utils.fromWei(balance + '', 'ether')}</span></div>

        <input type='number' className='form-control mt-3' value={mintAmount}
          onChange={e => setMintAmount(e.target.valueAsNumber)}
          step="0.01" />
        <button className='btn btn-primary mt-1' onClick={handleMint}>Mint!!</button>
      </div>

    </div >
  );
}

function Connect() {
  const handleConnect = () => {
    Web3.givenProvider.send('eth_requestAccounts')
  }

  return <div className='container'>
    <h4>Please connect your account</h4>
    <button className='btn btn-primary' onClick={handleConnect}>Connect the awesomness</button>
  </div>
}

function SwitchNetwork() {
  return <div className='container'>
    <h4>Please Switch network to Rinkeby</h4>
  </div>

}

function NoMetamask() {
  return <div className='container'>
    <h4>Please install THE wallet</h4>
    <a href='https://metamask.io/'>
      <button className='btn btn-primary'>Get Metamask</button>
    </a>
  </div>
}


export default App;
