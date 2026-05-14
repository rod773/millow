import { useEffect, useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ethers } from 'ethers';

import Navigation from '../src/components/Navigation';
import Search from '../src/components/Search';
import Home from '../src/components/Home';
import Alert from '../src/components/Alert';

import RealEstate from '../src/abis/RealEstate.json'
import Escrow from '../src/abis/Escrow.json'

import config from '../src/config.json';

export default function Index() {
  const [provider, setProvider] = useState(null)
  const [escrow, setEscrow] = useState(null)

  const [account, setAccount] = useState(null)

  const [homes, setHomes] = useState([])
  const [home, setHome] = useState({})
  const [toggle, setToggle] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
  const [titleAnimKey, setTitleAnimKey] = useState(0);

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)
    const network = await provider.getNetwork()

    const chainConfig = config[network.chainId]
    if (!chainConfig) {
      setAlertMsg('Smart contract not deployed to detected network')
      return
    }

    const realEstate = new ethers.Contract(chainConfig.realEstate.address, RealEstate, provider)
    const totalSupply = await realEstate.totalSupply()
    const homes = []

    for (var i = 1; i <= totalSupply; i++) {
      const uri = await realEstate.tokenURI(i)
      const response = await fetch(uri)
      const metadata = await response.json()
      homes.push(metadata)
    }

    setHomes(homes)

    const escrow = new ethers.Contract(chainConfig.escrow.address, Escrow, provider)
    setEscrow(escrow)
  }

  const loaded = useRef(false)

  useEffect(() => {
    if (loaded.current) return
    loaded.current = true
    loadBlockchainData()
  }, [])

  const togglePop = (home) => {
    setHome(home)
    toggle ? setToggle(false) : setToggle(true);
  }

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
      <Search titleAnimKey={titleAnimKey} />

      <div className='cards__section'>

        <h3>Homes For You</h3>

        <hr />

        <div className='cards'>
          {homes.map((home, index) => (
            <div className='card' key={index} onClick={() => togglePop(home)}>
              <div className='card__image'>
                <img src={home.image} alt="Home" />
              </div>
              <div className='card__info'>
                <h4>{home.attributes[0].value} ETH</h4>
                <p>
                  <strong>{home.attributes[2].value}</strong> bds |
                  <strong>{home.attributes[3].value}</strong> ba |
                  <strong>{home.attributes[4].value}</strong> sqft
                </p>
                <p>{home.address}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {toggle && (
        <Home home={home} provider={provider} escrow={escrow} togglePop={togglePop} />
      )}

      <AnimatePresence>
        {alertMsg && (
          <Alert message={alertMsg} onClose={() => { setAlertMsg(null); setTitleAnimKey(k => k + 1) }} />
        )}
      </AnimatePresence>

    </div>
  );
}
