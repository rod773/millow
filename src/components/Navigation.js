import { useState } from 'react'
import WalletModal from './WalletModal'

const Navigation = ({ account, setAccount }) => {
  const [walletModalOpen, setWalletModalOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
        <button
          className="nav__hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav__links${mobileMenuOpen ? ' nav__links--open' : ''}`}>
          <li><a href="/" onClick={() => setMobileMenuOpen(false)}>Buy</a></li>
          <li><a href="/" onClick={() => setMobileMenuOpen(false)}>Rent</a></li>
          <li><a href="/" onClick={() => setMobileMenuOpen(false)}>Sell</a></li>
        </ul>

        <div className='nav__brand'>
          <img src="/assets/logo.svg" alt="Logo" />
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

      {mobileMenuOpen && <div className="nav__mobile-overlay" onClick={() => setMobileMenuOpen(false)} />}

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