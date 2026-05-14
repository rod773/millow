import { useState, useEffect } from 'react'
import { Web3Modal } from '@web3modal/standalone'

const WalletModal = ({ onClose, onConnect }) => {
  const [wallets, setWallets] = useState([])
  const [connecting, setConnecting] = useState(null)

  useEffect(() => {
    const detected = new Map()

    const handleAnnounce = (e) => {
      try {
        const { info, provider } = e.detail
        if (!detected.has(info.uuid)) {
          detected.set(info.uuid, { info, provider })
          setWallets(Array.from(detected.values()))
        }
      } catch (_) {}
    }

    window.addEventListener('eip6963:announceProvider', handleAnnounce)
    try { window.dispatchEvent(new Event('eip6963:requestProvider')) } catch (_) {}

    setTimeout(() => {
      try {
        if (detected.size === 0 && window.ethereum) {
          const p = window.ethereum
          const name = p.isMetaMask ? 'MetaMask' :
                       p.isCoinbaseWallet ? 'Coinbase Wallet' :
                       p.isRabby ? 'Rabby' :
                       p.isTrust ? 'Trust Wallet' :
                       p.isOKExWallet ? 'OKX Wallet' :
                       p.isTokenPocket ? 'TokenPocket' :
                       p.isBitKeep ? 'BitKeep' :
                       'Injected Wallet'

          detected.set('legacy', {
            info: { name, icon: '' },
            provider: p
          })
          setWallets(Array.from(detected.values()))
        }
      } catch (_) {}
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

  const handleWalletConnect = async () => {
    const projectId = prompt(
      'Enter your WalletConnect Project ID from https://cloud.walletconnect.com:'
    )
    if (!projectId) return

    setConnecting('walletconnect')
    try {
      const web3Modal = new Web3Modal({
        projectId,
        themeMode: 'light',
      })
      const provider = await web3Modal.connect()
      await handleConnect(provider)
    } catch (err) {
      console.error(err)
    }
    setConnecting(null)
  }

  const handleCoinbase = async () => {
    setConnecting('coinbase')
    try {
      const { default: CoinbaseWalletSDK } = await import('@coinbase/wallet-sdk')
      const sdk = new CoinbaseWalletSDK({
        appName: 'Millow',
        appLogoUrl: null,
        chainIds: [1],
      })
      const provider = sdk.makeWeb3Provider()
      await handleConnect(provider)
    } catch (err) {
      console.error(err)
    }
    setConnecting(null)
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
            <div className="wallet-empty">
              <p>No wallet detected</p>
              <a
                href="https://metamask.io/download/"
                target="_blank"
                rel="noopener noreferrer"
                className="wallet-install"
              >
                Install MetaMask
              </a>
            </div>
          )}
          {wallets.map((wallet) => (
            <button
              key={wallet.info.uuid || wallet.info.name}
              className="wallet-option"
              onClick={() => handleConnect(wallet.provider)}
              disabled={!!connecting}
            >
              {wallet.info.icon ? (
                <img src={wallet.info.icon} alt="" className="wallet-icon-img" />
              ) : (
                <span className="wallet-icon-fallback">Wallet</span>
              )}
              <span className="wallet-name">{wallet.info.name}</span>
            </button>
          ))}
        </div>

        {wallets.length > 0 && (
          <div className="wallet-divider">
            <span>More options</span>
          </div>
        )}

        <div className="wallet-extra">
          <button
            className="wallet-option"
            onClick={handleWalletConnect}
            disabled={!!connecting}
          >
            <span className="wallet-icon-wc">
              <svg viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="6" fill="#3396FF" />
                <path d="M7.2 8.4c2.4-2.34 6.3-2.34 8.7 0l.3.27a.32.32 0 010 .45l-.93.93a.16.16 0 01-.24 0l-.3-.27a4.8 4.8 0 00-6.66 0l-.3.27a.16.16 0 01-.24 0l-.93-.93a.32.32 0 010-.45zm10.5 1.8l.84.84a.32.32 0 010 .45l-3.9 3.9a.33.33 0 01-.45 0l-2.73-2.73a.1.1 0 00-.12 0l-2.73 2.73a.33.33 0 01-.45 0L4.2 11.55a.32.32 0 010-.45l.84-.84-1.32-1.32a.32.32 0 010-.45L7.5 5.07c1.8-1.8 4.8-1.8 6.6 0l4.08 4.08c.12.12.12.33 0 .45z" fill="#fff" />
              </svg>
            </span>
            <span className="wallet-name">WalletConnect</span>
          </button>
          <button
            className="wallet-option"
            onClick={handleCoinbase}
            disabled={!!connecting}
          >
            <span className="wallet-icon-cb">
              <svg viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="6" fill="#0052FF" />
                <path d="M12 3a9 9 0 100 18 9 9 0 000-18zm2.25 11.25h-4.5v-4.5h4.5v4.5z" fill="#fff" />
              </svg>
            </span>
            <span className="wallet-name">Coinbase Wallet</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default WalletModal
