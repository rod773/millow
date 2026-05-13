import { useState } from 'react'
import logo from '../assets/logo.svg'
import WalletModal from './WalletModal'

const Navigation = ({ account, setAccount }) => {
  const [walletModalOpen, setWalletModalOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleConnect = (account) => {
    setAccount(account)
  }

  const disconnectHandler = () => {
    setAccount(null)
    setDropdownOpen(false)
  }

  return (
    <>
      <nav>
        <ul className='nav__links'>
          <li><a href="/">Buy</a></li>
          <li><a href="/">Rent</a></li>
          <li><a href="/">Sell</a></li>
        </ul>

        <div className='nav__brand'>
          <img src={logo} alt="Logo" />
          <h1>Millow</h1>
        </div>

        {account ? (
          <div className="nav__account-wrapper">
            <button
              type="button"
              className='nav__connect'
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {account.slice(0, 6) + '...' + account.slice(38, 42)}
            </button>
            {dropdownOpen && (
              <div className="nav__dropdown">
                <button onClick={disconnectHandler}>Disconnect</button>
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            className='nav__connect'
            onClick={() => setWalletModalOpen(true)}
          >
            Connect
          </button>
        )}
      </nav>

      {walletModalOpen && (
        <WalletModal
          onClose={() => setWalletModalOpen(false)}
          onConnect={handleConnect}
        />
      )}
    </>
  );
}

export default Navigation;