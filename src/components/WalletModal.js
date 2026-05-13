import { useState, useEffect } from 'react'

const WalletModal = ({ onClose, onConnect }) => {
  const [wallets, setWallets] = useState([])

  useEffect(() => {
    const detected = new Map()

    const handleAnnounce = (e) => {
      const { info, provider } = e.detail
      if (!detected.has(info.uuid)) {
        detected.set(info.uuid, { info, provider })
        setWallets(Array.from(detected.values()))
      }
    }

    window.addEventListener('eip6963:announceProvider', handleAnnounce)
    window.dispatchEvent(new Event('eip6963:requestProvider'))

    setTimeout(() => {
      if (detected.size === 0 && window.ethereum) {
        const name = window.ethereum.isMetaMask ? 'MetaMask' :
                     window.ethereum.isCoinbaseWallet ? 'Coinbase Wallet' :
                     window.ethereum.isRabby ? 'Rabby' :
                     window.ethereum.isTrust ? 'Trust Wallet' :
                     window.ethereum.isOKExWallet ? 'OKX Wallet' :
                     window.ethereum.isTokenPocket ? 'TokenPocket' :
                     window.ethereum.isBitKeep ? 'BitKeep' :
                     'Injected Wallet'

        detected.set('legacy', {
          info: { name, icon: '' },
          provider: window.ethereum
        })
        setWallets(Array.from(detected.values()))
      }
    }, 500)

    return () => window.removeEventListener('eip6963:announceProvider', handleAnnounce)
  }, [])

  const handleConnect = async (provider) => {
    try {
      const accounts = await provider.request({ method: 'eth_requestAccounts' })
      onConnect(accounts[0])
      onClose()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="wallet-overlay" onClick={onClose}>
      <div className="wallet-modal" onClick={(e) => e.stopPropagation()}>
        <div className="wallet-modal-header">
          <h2>Connect Wallet</h2>
          <button className="wallet-close" onClick={onClose}>&times;</button>
        </div>
        <div className="wallet-list">
          {wallets.length === 0 && (
            <p className="wallet-empty">No wallet detected. Please install MetaMask.</p>
          )}
          {wallets.map((wallet) => (
            <button
              key={wallet.info.uuid || wallet.info.name}
              className="wallet-option"
              onClick={() => handleConnect(wallet.provider)}
            >
              {wallet.info.icon ? (
                <img src={wallet.info.icon} alt="" className="wallet-icon-img" />
              ) : (
                <span className="wallet-icon-fallback">💼</span>
              )}
              <span className="wallet-name">{wallet.info.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WalletModal
