// 250 Questions Database
import { remainingQuestions } from './questions_remaining';

export const questions250 = [
  // CRYPTO QUESTIONS (60 total)
  {
    "id": "crypto_001",
    "type": "text",
    "question": "What is the maximum supply of Bitcoin?",
    "options": ["18 million", "21 million", "25 million", "100 million"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["crypto", "bitcoin"],
    "durationSec": 15,
    "source": "curated:crypto_v1",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_002",
    "type": "text",
    "question": "Which blockchain does Ethereum use?",
    "options": ["Proof of Work", "Proof of Stake", "Proof of Authority", "Delegated Proof of Stake"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["crypto", "ethereum"],
    "durationSec": 20,
    "source": "curated:crypto_v1",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_003",
    "type": "text",
    "question": "What does DeFi stand for?",
    "options": ["Digital Finance", "Decentralized Finance", "Distributed Finance", "Direct Finance"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["crypto", "defi"],
    "durationSec": 15,
    "source": "curated:crypto_v1",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_004",
    "type": "text",
    "question": "Which exchange is known as the largest crypto exchange by volume?",
    "options": ["Coinbase", "Binance", "Kraken", "FTX"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["crypto", "exchanges"],
    "durationSec": 15,
    "source": "curated:crypto_v1",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_005",
    "type": "text",
    "question": "What is a smart contract?",
    "options": ["A legal document", "Self-executing code on blockchain", "A crypto wallet", "A mining algorithm"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["crypto", "smart-contracts"],
    "durationSec": 20,
    "source": "curated:crypto_v1",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_006",
    "type": "text",
    "question": "Which consensus mechanism does Bitcoin use?",
    "options": ["Proof of Stake", "Proof of Work", "Proof of Authority", "Proof of History"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["crypto", "bitcoin", "consensus"],
    "durationSec": 20,
    "source": "curated:crypto_v1",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_007",
    "type": "text",
    "question": "What does NFT stand for?",
    "options": ["Non-Fungible Token", "New Financial Technology", "Network File Transfer", "Next Future Tech"],
    "correct": "A",
    "difficulty": "easy",
    "tags": ["crypto", "nft"],
    "durationSec": 15,
    "source": "curated:crypto_v1",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_008",
    "type": "text",
    "question": "Which blockchain is Solana built on?",
    "options": ["Its own blockchain", "Ethereum", "Bitcoin", "Binance Smart Chain"],
    "correct": "A",
    "difficulty": "medium",
    "tags": ["crypto", "solana"],
    "durationSec": 20,
    "source": "curated:crypto_v1",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_009",
    "type": "text",
    "question": "What is the native token of Binance Smart Chain?",
    "options": ["BTC", "ETH", "BNB", "SOL"],
    "correct": "C",
    "difficulty": "easy",
    "tags": ["crypto", "binance"],
    "durationSec": 15,
    "source": "curated:crypto_v1",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_010",
    "type": "text",
    "question": "What is a crypto wallet's seed phrase used for?",
    "options": ["Password reset", "Account recovery", "Transaction fees", "Mining rewards"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["crypto", "wallets", "security"],
    "durationSec": 20,
    "source": "curated:crypto_v1",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_011",
    "type": "text",
    "question": "What does HODL mean in crypto?",
    "options": ["Hold On for Dear Life", "High Order Digital Ledger", "Hash On Distributed Ledger", "Hybrid Online Data Link"],
    "correct": "A",
    "difficulty": "easy",
    "tags": ["crypto", "slang"],
    "durationSec": 15,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_012",
    "type": "text",
    "question": "What is a stablecoin?",
    "options": ["A cryptocurrency with stable price", "A mining-resistant coin", "A government-issued digital currency", "A coin that never loses value"],
    "correct": "A",
    "difficulty": "easy",
    "tags": ["crypto", "stablecoins"],
    "durationSec": 15,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_013",
    "type": "text",
    "question": "What is USDC?",
    "options": ["US Dollar Coin", "Universal Stable Digital Currency", "United States Digital Coin", "US Decentralized Currency"],
    "correct": "A",
    "difficulty": "easy",
    "tags": ["crypto", "stablecoins"],
    "durationSec": 15,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_014",
    "type": "text",
    "question": "What is a DAO?",
    "options": ["Decentralized Autonomous Organization", "Digital Asset Operation", "Distributed Application Object", "Dynamic Algorithm Optimizer"],
    "correct": "A",
    "difficulty": "medium",
    "tags": ["crypto", "dao", "governance"],
    "durationSec": 20,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_015",
    "type": "text",
    "question": "What is yield farming?",
    "options": ["Mining cryptocurrencies", "Earning rewards by providing liquidity", "Trading crypto futures", "Staking validation nodes"],
    "correct": "B",
    "difficulty": "hard",
    "tags": ["crypto", "defi", "yield"],
    "durationSec": 25,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_016",
    "type": "text",
    "question": "What is the Lightning Network?",
    "options": ["A new cryptocurrency", "Bitcoin's layer 2 scaling solution", "Ethereum's upgrade", "A mining pool"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["crypto", "bitcoin", "scaling"],
    "durationSec": 20,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_017",
    "type": "text",
    "question": "What does DeFi TVL stand for?",
    "options": ["Total Value Locked", "Total Volume Liquidity", "Total Verified Loans", "Total Virtual Ledger"],
    "correct": "A",
    "difficulty": "medium",
    "tags": ["crypto", "defi", "metrics"],
    "durationSec": 20,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_018",
    "type": "text",
    "question": "What is an AMM?",
    "options": ["Automated Market Maker", "Advanced Mining Machine", "Asset Management Module", "Algorithmic Money Manager"],
    "correct": "A",
    "difficulty": "hard",
    "tags": ["crypto", "defi", "trading"],
    "durationSec": 25,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_019",
    "type": "text",
    "question": "What is impermanent loss?",
    "options": ["Temporary wallet malfunction", "Loss from providing liquidity to AMMs", "Mining equipment failure", "Network congestion delays"],
    "correct": "B",
    "difficulty": "hard",
    "tags": ["crypto", "defi", "liquidity"],
    "durationSec": 25,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_020",
    "type": "text",
    "question": "What is a flash loan?",
    "options": ["Instant crypto purchase", "Uncollateralized loan within one transaction", "Fast mining reward", "Quick wallet transfer"],
    "correct": "B",
    "difficulty": "hard",
    "tags": ["crypto", "defi", "lending"],
    "durationSec": 25,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_021",
    "type": "text",
    "question": "What is the ERC-20 standard?",
    "options": ["Ethereum mining protocol", "Token standard on Ethereum", "Wallet encryption method", "Smart contract language"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["crypto", "ethereum", "tokens"],
    "durationSec": 20,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_022",
    "type": "text",
    "question": "What is a crypto fork?",
    "options": ["A wallet splitting tool", "A change to blockchain protocol rules", "A mining hardware", "A trading strategy"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["crypto", "blockchain", "forks"],
    "durationSec": 20,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_023",
    "type": "text",
    "question": "What is Bitcoin halving?",
    "options": ["Splitting Bitcoin in half", "Reducing mining rewards by 50%", "Doubling transaction speed", "Halving transaction fees"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["crypto", "bitcoin", "mining"],
    "durationSec": 20,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_024",
    "type": "text",
    "question": "What is a whale in crypto?",
    "options": ["A large cryptocurrency holder", "A type of mining pool", "A trading bot", "A blockchain validator"],
    "correct": "A",
    "difficulty": "easy",
    "tags": ["crypto", "trading", "slang"],
    "durationSec": 15,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_025",
    "type": "text",
    "question": "What does FOMO mean in crypto?",
    "options": ["Fear Of Missing Out", "First Order Market Operation", "Full Order Management Online", "Fast Online Money Operation"],
    "correct": "A",
    "difficulty": "easy",
    "tags": ["crypto", "trading", "psychology"],
    "durationSec": 15,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_026",
    "type": "text",
    "question": "What is a rugpull?",
    "options": ["A mining technique", "A scam where developers abandon project", "A wallet security feature", "A trading strategy"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["crypto", "scams", "defi"],
    "durationSec": 20,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_027",
    "type": "text",
    "question": "What is slippage in crypto trading?",
    "options": ["Price difference between expected and actual trade", "Wallet synchronization delay", "Network congestion", "Mining difficulty adjustment"],
    "correct": "A",
    "difficulty": "medium",
    "tags": ["crypto", "trading", "defi"],
    "durationSec": 20,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_028",
    "type": "text",
    "question": "What is a memecoin?",
    "options": ["A coin for storing memes", "A cryptocurrency based on internet memes", "A memory-efficient blockchain", "A coin for social media"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["crypto", "memecoins", "culture"],
    "durationSec": 15,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_029",
    "type": "text",
    "question": "What is Dogecoin?",
    "options": ["A dog-themed memecoin", "A privacy coin", "A stablecoin", "A gaming token"],
    "correct": "A",
    "difficulty": "easy",
    "tags": ["crypto", "memecoins", "dogecoin"],
    "durationSec": 15,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_030",
    "type": "text",
    "question": "What is Cardano (ADA)?",
    "options": ["A Bitcoin fork", "A proof-of-stake blockchain platform", "A stablecoin", "A mining pool"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["crypto", "cardano", "blockchain"],
    "durationSec": 20,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_031",
    "type": "text",
    "question": "What is Polygon (MATIC)?",
    "options": ["A Bitcoin sidechain", "Ethereum layer 2 scaling solution", "A new consensus algorithm", "A privacy coin"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["crypto", "polygon", "scaling"],
    "durationSec": 20,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_032",
    "type": "text",
    "question": "What is Chainlink (LINK)?",
    "options": ["A blockchain bridge", "A decentralized oracle network", "A layer 1 blockchain", "A stablecoin protocol"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["crypto", "chainlink", "oracles"],
    "durationSec": 20,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_033",
    "type": "text",
    "question": "What is Uniswap?",
    "options": ["A centralized exchange", "A decentralized exchange protocol", "A wallet application", "A mining pool"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["crypto", "uniswap", "dex"],
    "durationSec": 20,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_034",
    "type": "text",
    "question": "What is Avalanche (AVAX)?",
    "options": ["A Bitcoin mining algorithm", "A high-performance blockchain platform", "A privacy protocol", "A staking service"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["crypto", "avalanche", "blockchain"],
    "durationSec": 20,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_035",
    "type": "text",
    "question": "What is Terra Luna?",
    "options": ["A Bitcoin fork", "A collapsed algorithmic stablecoin ecosystem", "A mining hardware", "A wallet provider"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["crypto", "terra", "stablecoins"],
    "durationSec": 20,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_036",
    "type": "text",
    "question": "What is FTX?",
    "options": ["A DeFi protocol", "A collapsed cryptocurrency exchange", "A blockchain network", "A mining company"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["crypto", "ftx", "exchanges"],
    "durationSec": 15,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_037",
    "type": "text",
    "question": "What is Shiba Inu (SHIB)?",
    "options": ["A DeFi token", "A dog-themed memecoin", "A stablecoin", "A gaming token"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["crypto", "memecoins", "shiba"],
    "durationSec": 15,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_038",
    "type": "text",
    "question": "What is Ripple (XRP)?",
    "options": ["A privacy coin", "A digital payment protocol", "A mining algorithm", "A wallet service"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["crypto", "ripple", "payments"],
    "durationSec": 20,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_039",
    "type": "text",
    "question": "What is Litecoin?",
    "options": ["An Ethereum fork", "A Bitcoin fork with faster transactions", "A stablecoin", "A privacy coin"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["crypto", "litecoin", "bitcoin"],
    "durationSec": 15,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_040",
    "type": "text",
    "question": "What is Monero (XMR)?",
    "options": ["A stablecoin", "A privacy-focused cryptocurrency", "A gaming token", "A DeFi protocol"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["crypto", "monero", "privacy"],
    "durationSec": 20,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_041",
    "type": "text",
    "question": "What is Polkadot (DOT)?",
    "options": ["A Bitcoin sidechain", "A multi-chain interoperability protocol", "A stablecoin", "A mining pool"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["crypto", "polkadot", "interoperability"],
    "durationSec": 20,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_042",
    "type": "text",
    "question": "What is Cosmos (ATOM)?",
    "options": ["A privacy coin", "An internet of blockchains ecosystem", "A mining algorithm", "A wallet provider"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["crypto", "cosmos", "interoperability"],
    "durationSec": 20,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_043",
    "type": "text",
    "question": "What is Tether (USDT)?",
    "options": ["A privacy coin", "A USD-pegged stablecoin", "A DeFi protocol", "A gaming token"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["crypto", "tether", "stablecoins"],
    "durationSec": 15,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_044",
    "type": "text",
    "question": "What is Binance Coin (BNB)?",
    "options": ["A stablecoin", "Binance exchange's native token", "A privacy coin", "A gaming token"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["crypto", "binance", "exchange-tokens"],
    "durationSec": 15,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_045",
    "type": "text",
    "question": "What is Ethereum Classic (ETC)?",
    "options": ["The original Ethereum blockchain", "A Bitcoin fork", "A stablecoin", "A privacy coin"],
    "correct": "A",
    "difficulty": "medium",
    "tags": ["crypto", "ethereum-classic", "forks"],
    "durationSec": 20,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_046",
    "type": "text",
    "question": "What is Aave?",
    "options": ["A centralized exchange", "A decentralized lending protocol", "A wallet service", "A mining pool"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["crypto", "aave", "defi"],
    "durationSec": 20,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_047",
    "type": "text",
    "question": "What is Compound?",
    "options": ["A trading bot", "A DeFi lending protocol", "A wallet application", "A mining service"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["crypto", "compound", "defi"],
    "durationSec": 20,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_048",
    "type": "text",
    "question": "What is MakerDAO?",
    "options": ["A centralized exchange", "A decentralized stablecoin protocol", "A mining pool", "A wallet provider"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["crypto", "makerdao", "stablecoins"],
    "durationSec": 20,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_049",
    "type": "text",
    "question": "What is Curve Finance?",
    "options": ["A centralized exchange", "A DeFi protocol for stablecoin trading", "A wallet service", "A mining pool"],
    "correct": "B",
    "difficulty": "hard",
    "tags": ["crypto", "curve", "defi"],
    "durationSec": 25,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_050",
    "type": "text",
    "question": "What is SushiSwap?",
    "options": ["A food delivery app", "A decentralized exchange fork of Uniswap", "A wallet service", "A mining protocol"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["crypto", "sushiswap", "dex"],
    "durationSec": 20,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_051",
    "type": "text",
    "question": "What is PancakeSwap?",
    "options": ["A food app", "A DEX on Binance Smart Chain", "A wallet service", "A mining pool"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["crypto", "pancakeswap", "bsc"],
    "durationSec": 20,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_052",
    "type": "text",
    "question": "What is Yearn Finance?",
    "options": ["A trading platform", "A DeFi yield optimization protocol", "A wallet service", "A mining pool"],
    "correct": "B",
    "difficulty": "hard",
    "tags": ["crypto", "yearn", "defi"],
    "durationSec": 25,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_053",
    "type": "text",
    "question": "What is 1inch?",
    "options": ["A measurement tool", "A DEX aggregator", "A wallet service", "A mining protocol"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["crypto", "1inch", "dex"],
    "durationSec": 20,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_054",
    "type": "text",
    "question": "What is Synthetix?",
    "options": ["A music platform", "A synthetic assets protocol", "A wallet service", "A mining pool"],
    "correct": "B",
    "difficulty": "hard",
    "tags": ["crypto", "synthetix", "derivatives"],
    "durationSec": 25,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_055",
    "type": "text",
    "question": "What is The Graph (GRT)?",
    "options": ["A charting tool", "A blockchain indexing protocol", "A wallet service", "A mining algorithm"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["crypto", "thegraph", "infrastructure"],
    "durationSec": 20,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_056",
    "type": "text",
    "question": "What is Filecoin (FIL)?",
    "options": ["A file sharing app", "A decentralized storage network", "A wallet service", "A mining pool"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["crypto", "filecoin", "storage"],
    "durationSec": 20,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_057",
    "type": "text",
    "question": "What is Arweave (AR)?",
    "options": ["A VR platform", "A permanent data storage protocol", "A wallet service", "A gaming token"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["crypto", "arweave", "storage"],
    "durationSec": 20,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_058",
    "type": "text",
    "question": "What is Helium (HNT)?",
    "options": ["A gas token", "A decentralized wireless network", "A wallet service", "A mining algorithm"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["crypto", "helium", "iot"],
    "durationSec": 20,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_059",
    "type": "text",
    "question": "What is Theta Network?",
    "options": ["A social network", "A decentralized video streaming network", "A wallet service", "A mining pool"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["crypto", "theta", "streaming"],
    "durationSec": 20,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "crypto_060",
    "type": "text",
    "question": "What is Basic Attention Token (BAT)?",
    "options": ["A gaming token", "A token for digital advertising", "A stablecoin", "A privacy coin"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["crypto", "bat", "advertising"],
    "durationSec": 20,
    "source": "curated:crypto_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },

  // VISUAL QUESTIONS (50 total) - All with working URLs
  {
    "id": "visual_001",
    "type": "image",
    "question": "What programming language logo is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/400px-JavaScript-logo.png" }
    ],
    "options": ["Python", "JavaScript", "Java", "TypeScript"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["tech", "visual", "programming"],
    "durationSec": 25,
    "source": "curated:visual_v1",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_002",
    "type": "image",
    "question": "Which cryptocurrency logo is shown?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/400px-Bitcoin.svg.png" }
    ],
    "options": ["Ethereum", "Bitcoin", "Litecoin", "Dogecoin"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["crypto", "visual", "bitcoin"],
    "durationSec": 20,
    "source": "curated:visual_v1",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_003",
    "type": "image",
    "question": "What is this famous landmark?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/400px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg" }
    ],
    "options": ["Big Ben", "Eiffel Tower", "Statue of Liberty", "Leaning Tower of Pisa"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["general", "visual", "landmarks"],
    "durationSec": 20,
    "source": "curated:visual_v1",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_004",
    "type": "image",
    "question": "Which company's logo is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/400px-Google_2015_logo.svg.png" }
    ],
    "options": ["Microsoft", "Google", "Apple", "Amazon"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["tech", "visual", "companies"],
    "durationSec": 20,
    "source": "curated:visual_v1",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_005",
    "type": "image",
    "question": "What is this programming language logo?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/400px-Python-logo-notext.svg.png" }
    ],
    "options": ["Java", "C++", "Python", "Ruby"],
    "correct": "C",
    "difficulty": "easy",
    "tags": ["tech", "visual", "programming"],
    "durationSec": 25,
    "source": "curated:visual_v1",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_006",
    "type": "image",
    "question": "Which social media platform logo is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/400px-Facebook_f_logo_%282019%29.svg.png" }
    ],
    "options": ["Twitter", "Instagram", "Facebook", "LinkedIn"],
    "correct": "C",
    "difficulty": "easy",
    "tags": ["tech", "visual", "social"],
    "durationSec": 20,
    "source": "curated:visual_v1",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_007",
    "type": "image",
    "question": "What country's flag is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/400px-Flag_of_Germany.svg.png" }
    ],
    "options": ["Belgium", "Germany", "Netherlands", "Austria"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["general", "visual", "flags"],
    "durationSec": 20,
    "source": "curated:visual_v1",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_008",
    "type": "image",
    "question": "Which operating system logo is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/400px-Tux.svg.png" }
    ],
    "options": ["Windows", "macOS", "Linux", "Android"],
    "correct": "C",
    "difficulty": "medium",
    "tags": ["tech", "visual", "os"],
    "durationSec": 25,
    "source": "curated:visual_v1",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_009",
    "type": "image",
    "question": "Which browser logo is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Firefox_logo%2C_2019.svg/400px-Firefox_logo%2C_2019.svg.png" }
    ],
    "options": ["Chrome", "Firefox", "Safari", "Edge"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["tech", "visual", "browsers"],
    "durationSec": 20,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_010",
    "type": "image",
    "question": "What cryptocurrency logo is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/400px-Ethereum_logo_2014.svg.png" }
    ],
    "options": ["Bitcoin", "Ethereum", "Litecoin", "Ripple"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["crypto", "visual", "ethereum"],
    "durationSec": 20,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_011",
    "type": "image",
    "question": "Which country's flag is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Turkey.svg/400px-Flag_of_Turkey.svg.png" }
    ],
    "options": ["Greece", "Turkey", "Tunisia", "Algeria"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["general", "visual", "flags"],
    "durationSec": 20,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_012",
    "type": "image",
    "question": "What programming language logo is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/400px-ISO_C%2B%2B_Logo.svg.png" }
    ],
    "options": ["C", "C++", "C#", "Java"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["tech", "visual", "programming"],
    "durationSec": 25,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_013",
    "type": "image",
    "question": "Which social media platform logo is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/400px-Instagram_logo_2016.svg.png" }
    ],
    "options": ["Twitter", "Instagram", "Snapchat", "TikTok"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["tech", "visual", "social"],
    "durationSec": 20,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_014",
    "type": "image",
    "question": "Which company's logo is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/400px-Apple_logo_black.svg.png" }
    ],
    "options": ["Microsoft", "Google", "Apple", "Samsung"],
    "correct": "C",
    "difficulty": "easy",
    "tags": ["tech", "visual", "companies"],
    "durationSec": 20,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_015",
    "type": "image",
    "question": "What is this famous building?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Statue_of_Liberty_7.jpg/400px-Statue_of_Liberty_7.jpg" }
    ],
    "options": ["Eiffel Tower", "Big Ben", "Statue of Liberty", "Christ the Redeemer"],
    "correct": "C",
    "difficulty": "easy",
    "tags": ["general", "visual", "landmarks"],
    "durationSec": 20,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_016",
    "type": "image",
    "question": "Which country's flag is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/400px-Flag_of_the_United_States.svg.png" }
    ],
    "options": ["Canada", "United States", "United Kingdom", "Australia"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["general", "visual", "flags"],
    "durationSec": 20,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_017",
    "type": "image",
    "question": "What programming language logo is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/400px-PHP-logo.svg.png" }
    ],
    "options": ["Python", "JavaScript", "PHP", "Ruby"],
    "correct": "C",
    "difficulty": "medium",
    "tags": ["tech", "visual", "programming"],
    "durationSec": 25,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_018",
    "type": "image",
    "question": "Which browser logo is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/400px-Google_Chrome_icon_%28February_2022%29.svg.png" }
    ],
    "options": ["Chrome", "Firefox", "Safari", "Edge"],
    "correct": "A",
    "difficulty": "easy",
    "tags": ["tech", "visual", "browsers"],
    "durationSec": 20,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_019",
    "type": "image",
    "question": "What is this famous landmark?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg/400px-Colosseum_in_Rome%2C_Italy_-_April_2007.jpg" }
    ],
    "options": ["Pantheon", "Colosseum", "Parthenon", "Amphitheater"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["general", "visual", "landmarks"],
    "durationSec": 20,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_020",
    "type": "image",
    "question": "Which country's flag is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/400px-Flag_of_Brazil.svg.png" }
    ],
    "options": ["Argentina", "Brazil", "Colombia", "Venezuela"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["general", "visual", "flags"],
    "durationSec": 20,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_021",
    "type": "image",
    "question": "What programming language logo is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Ruby_logo.svg/400px-Ruby_logo.svg.png" }
    ],
    "options": ["Python", "Ruby", "Perl", "Swift"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["tech", "visual", "programming"],
    "durationSec": 25,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_022",
    "type": "image",
    "question": "Which social media platform logo is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/400px-Logo_of_Twitter.svg.png" }
    ],
    "options": ["Twitter", "Instagram", "Facebook", "LinkedIn"],
    "correct": "A",
    "difficulty": "easy",
    "tags": ["tech", "visual", "social"],
    "durationSec": 20,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_023",
    "type": "image",
    "question": "What is this famous building?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Sydney_Opera_House_-_Dec_2008.jpg/400px-Sydney_Opera_House_-_Dec_2008.jpg" }
    ],
    "options": ["Sydney Opera House", "Guggenheim Museum", "Walt Disney Concert Hall", "Sage Gateshead"],
    "correct": "A",
    "difficulty": "medium",
    "tags": ["general", "visual", "landmarks"],
    "durationSec": 20,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_024",
    "type": "image",
    "question": "Which country's flag is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/400px-Flag_of_Spain.svg.png" }
    ],
    "options": ["Portugal", "Spain", "Italy", "France"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["general", "visual", "flags"],
    "durationSec": 20,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_025",
    "type": "image",
    "question": "What programming language logo is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/400px-Typescript_logo_2020.svg.png" }
    ],
    "options": ["JavaScript", "TypeScript", "CoffeeScript", "Dart"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["tech", "visual", "programming"],
    "durationSec": 25,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_026",
    "type": "image",
    "question": "Which company's logo is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/400px-Microsoft_logo.svg.png" }
    ],
    "options": ["Microsoft", "Google", "Apple", "IBM"],
    "correct": "A",
    "difficulty": "easy",
    "tags": ["tech", "visual", "companies"],
    "durationSec": 20,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_027",
    "type": "image",
    "question": "What is this famous landmark?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Taj_Mahal%2C_Agra%2C_India_edit3.jpg/400px-Taj_Mahal%2C_Agra%2C_India_edit3.jpg" }
    ],
    "options": ["Red Fort", "Taj Mahal", "Lotus Temple", "India Gate"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["general", "visual", "landmarks"],
    "durationSec": 20,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_028",
    "type": "image",
    "question": "Which country's flag is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/400px-Flag_of_Mexico.svg.png" }
    ],
    "options": ["Italy", "Mexico", "Hungary", "Bulgaria"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["general", "visual", "flags"],
    "durationSec": 20,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_029",
    "type": "image",
    "question": "What programming language logo is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Rust_programming_language_black_logo.svg/400px-Rust_programming_language_black_logo.svg.png" }
    ],
    "options": ["Go", "Rust", "Swift", "Kotlin"],
    "correct": "B",
    "difficulty": "hard",
    "tags": ["tech", "visual", "programming"],
    "durationSec": 25,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_030",
    "type": "image",
    "question": "Which social media platform logo is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/400px-LinkedIn_logo_initials.png" }
    ],
    "options": ["Twitter", "Instagram", "Facebook", "LinkedIn"],
    "correct": "D",
    "difficulty": "easy",
    "tags": ["tech", "visual", "social"],
    "durationSec": 20,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_031",
    "type": "image",
    "question": "What is this famous landmark?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Leaning_Tower_of_Pisa_%28July_2013%29.jpg/400px-Leaning_Tower_of_Pisa_%28July_2013%29.jpg" }
    ],
    "options": ["Bell Tower", "Leaning Tower of Pisa", "Clock Tower", "Water Tower"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["general", "visual", "landmarks"],
    "durationSec": 20,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_032",
    "type": "image",
    "question": "Which country's flag is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/400px-Flag_of_Italy.svg.png" }
    ],
    "options": ["France", "Italy", "Ireland", "Hungary"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["general", "visual", "flags"],
    "durationSec": 20,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_033",
    "type": "image",
    "question": "What programming language logo is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Go_Logo_Blue.svg/400px-Go_Logo_Blue.svg.png" }
    ],
    "options": ["Go", "Rust", "Swift", "Kotlin"],
    "correct": "A",
    "difficulty": "medium",
    "tags": ["tech", "visual", "programming"],
    "durationSec": 25,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_034",
    "type": "image",
    "question": "Which company's logo is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/400px-Amazon_logo.svg.png" }
    ],
    "options": ["Microsoft", "Google", "Apple", "Amazon"],
    "correct": "D",
    "difficulty": "easy",
    "tags": ["tech", "visual", "companies"],
    "durationSec": 20,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_035",
    "type": "image",
    "question": "What is this famous building?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/London_Big_Ben_Phone_box.jpg/400px-London_Big_Ben_Phone_box.jpg" }
    ],
    "options": ["Big Ben", "Clock Tower", "Parliament Building", "Westminster Abbey"],
    "correct": "A",
    "difficulty": "easy",
    "tags": ["general", "visual", "landmarks"],
    "durationSec": 20,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_036",
    "type": "image",
    "question": "Which country's flag is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/400px-Flag_of_France.svg.png" }
    ],
    "options": ["Netherlands", "France", "Russia", "Luxembourg"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["general", "visual", "flags"],
    "durationSec": 20,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_037",
    "type": "image",
    "question": "What programming language logo is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/400px-Unofficial_JavaScript_logo_2.svg.png" }
    ],
    "options": ["Java", "JavaScript", "TypeScript", "CoffeeScript"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["tech", "visual", "programming"],
    "durationSec": 25,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_038",
    "type": "image",
    "question": "Which browser logo is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Safari_browser_logo.svg/400px-Safari_browser_logo.svg.png" }
    ],
    "options": ["Chrome", "Firefox", "Safari", "Edge"],
    "correct": "C",
    "difficulty": "easy",
    "tags": ["tech", "visual", "browsers"],
    "durationSec": 20,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_039",
    "type": "image",
    "question": "What is this famous landmark?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/400px-Empire_State_Building_%28aerial_view%29.jpg" }
    ],
    "options": ["Chrysler Building", "Empire State Building", "One World Trade Center", "Rockefeller Center"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["general", "visual", "landmarks"],
    "durationSec": 20,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_040",
    "type": "image",
    "question": "Which country's flag is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/400px-Flag_of_Australia_%28converted%29.svg.png" }
    ],
    "options": ["New Zealand", "Australia", "United Kingdom", "Fiji"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["general", "visual", "flags"],
    "durationSec": 20,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_041",
    "type": "image",
    "question": "What programming language logo is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Kotlin_Icon.png/400px-Kotlin_Icon.png" }
    ],
    "options": ["Java", "Kotlin", "Scala", "Groovy"],
    "correct": "B",
    "difficulty": "hard",
    "tags": ["tech", "visual", "programming"],
    "durationSec": 25,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_042",
    "type": "image",
    "question": "Which company's logo is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Tesla_logo.png/400px-Tesla_logo.png" }
    ],
    "options": ["SpaceX", "Tesla", "Ford", "BMW"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["tech", "visual", "companies"],
    "durationSec": 20,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_043",
    "type": "image",
    "question": "What is this famous landmark?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-china-beijing-great-wall-of-china.jpg/400px-Gfp-china-beijing-great-wall-of-china.jpg" }
    ],
    "options": ["Great Wall of China", "Hadrian's Wall", "Berlin Wall", "Western Wall"],
    "correct": "A",
    "difficulty": "easy",
    "tags": ["general", "visual", "landmarks"],
    "durationSec": 20,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_044",
    "type": "image",
    "question": "Which country's flag is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/400px-Flag_of_Russia.svg.png" }
    ],
    "options": ["Netherlands", "France", "Russia", "Slovakia"],
    "correct": "C",
    "difficulty": "easy",
    "tags": ["general", "visual", "flags"],
    "durationSec": 20,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_045",
    "type": "image",
    "question": "What programming language logo is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Apache_Spark_logo.svg/400px-Apache_Spark_logo.svg.png" }
    ],
    "options": ["Scala", "Apache Spark", "Hadoop", "Kafka"],
    "correct": "B",
    "difficulty": "hard",
    "tags": ["tech", "visual", "big-data"],
    "durationSec": 25,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_046",
    "type": "image",
    "question": "Which social media platform logo is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/400px-Telegram_logo.svg.png" }
    ],
    "options": ["WhatsApp", "Telegram", "Signal", "Discord"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["tech", "visual", "messaging"],
    "durationSec": 20,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_047",
    "type": "image",
    "question": "What is this famous landmark?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Kheops-Pyramid.jpg/400px-Kheops-Pyramid.jpg" }
    ],
    "options": ["Pyramid of Giza", "Mayan Pyramid", "Aztec Pyramid", "Step Pyramid"],
    "correct": "A",
    "difficulty": "easy",
    "tags": ["general", "visual", "landmarks"],
    "durationSec": 20,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_048",
    "type": "image",
    "question": "Which country's flag is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/400px-Flag_of_Japan.svg.png" }
    ],
    "options": ["South Korea", "Japan", "China", "Bangladesh"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["general", "visual", "flags"],
    "durationSec": 20,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_049",
    "type": "image",
    "question": "What programming framework logo is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/400px-React-icon.svg.png" }
    ],
    "options": ["Vue.js", "React", "Angular", "Svelte"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["tech", "visual", "frameworks"],
    "durationSec": 25,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "visual_050",
    "type": "image",
    "question": "Which company's logo is this?",
    "media": [
      { "type": "image", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Netflix_logo.svg/400px-Netflix_logo.svg.png" }
    ],
    "options": ["Hulu", "Netflix", "Disney+", "Amazon Prime"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["tech", "visual", "streaming"],
    "durationSec": 20,
    "source": "curated:visual_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },

  // TECH QUESTIONS (60 total) - Continue from tech_021
  {
    "id": "tech_021",
    "type": "text",
    "question": "What does CSS stand for?",
    "options": ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Coded Style Structure"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["tech", "css", "web"],
    "durationSec": 15,
    "source": "curated:tech_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "tech_022",
    "type": "text",
    "question": "What is Node.js?",
    "options": ["A JavaScript runtime", "A database", "A web browser", "A programming language"],
    "correct": "A",
    "difficulty": "medium",
    "tags": ["tech", "nodejs", "javascript"],
    "durationSec": 20,
    "source": "curated:tech_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "tech_023",
    "type": "text",
    "question": "What does SQL stand for?",
    "options": ["Structured Query Language", "Simple Query Language", "Standard Query Logic", "System Query Library"],
    "correct": "A",
    "difficulty": "easy",
    "tags": ["tech", "sql", "database"],
    "durationSec": 15,
    "source": "curated:tech_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "tech_024",
    "type": "text",
    "question": "What is Git?",
    "options": ["A programming language", "A version control system", "A web server", "A database"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["tech", "git", "version-control"],
    "durationSec": 20,
    "source": "curated:tech_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "tech_025",
    "type": "text",
    "question": "What does HTTP stand for?",
    "options": ["HyperText Transfer Protocol", "High Tech Transfer Process", "HyperText Transport Program", "Home Text Transfer Protocol"],
    "correct": "A",
    "difficulty": "easy",
    "tags": ["tech", "http", "web"],
    "durationSec": 15,
    "source": "curated:tech_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "tech_026",
    "type": "text",
    "question": "What is Docker?",
    "options": ["A programming language", "A containerization platform", "A database", "A web framework"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["tech", "docker", "devops"],
    "durationSec": 20,
    "source": "curated:tech_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "tech_027",
    "type": "text",
    "question": "What is Kubernetes?",
    "options": ["A programming language", "A container orchestration platform", "A database", "A web server"],
    "correct": "B",
    "difficulty": "hard",
    "tags": ["tech", "kubernetes", "devops"],
    "durationSec": 25,
    "source": "curated:tech_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "tech_028",
    "type": "text",
    "question": "What does REST stand for?",
    "options": ["Representational State Transfer", "Remote State Transfer", "Reliable State Transfer", "Rapid State Transfer"],
    "correct": "A",
    "difficulty": "medium",
    "tags": ["tech", "rest", "api"],
    "durationSec": 20,
    "source": "curated:tech_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "tech_029",
    "type": "text",
    "question": "What is GraphQL?",
    "options": ["A database", "A query language for APIs", "A programming language", "A web framework"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["tech", "graphql", "api"],
    "durationSec": 20,
    "source": "curated:tech_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "tech_030",
    "type": "text",
    "question": "What is Redis?",
    "options": ["A programming language", "An in-memory data store", "A web framework", "A file system"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["tech", "redis", "database"],
    "durationSec": 20,
    "source": "curated:tech_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },

  // GENERAL KNOWLEDGE (60 total) - Continue from general_026
  {
    "id": "general_026",
    "type": "text",
    "question": "What is the smallest country in the world?",
    "options": ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["general", "geography"],
    "durationSec": 20,
    "source": "curated:general_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "general_027",
    "type": "text",
    "question": "Which planet is closest to the Sun?",
    "options": ["Venus", "Mercury", "Earth", "Mars"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["general", "space", "planets"],
    "durationSec": 15,
    "source": "curated:general_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "general_028",
    "type": "text",
    "question": "What is the longest river in the world?",
    "options": ["Amazon River", "Nile River", "Mississippi River", "Yangtze River"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["general", "geography", "rivers"],
    "durationSec": 20,
    "source": "curated:general_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "general_029",
    "type": "text",
    "question": "Who painted the Mona Lisa?",
    "options": ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["general", "art", "history"],
    "durationSec": 15,
    "source": "curated:general_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "general_030",
    "type": "text",
    "question": "What is the hardest natural substance?",
    "options": ["Gold", "Iron", "Diamond", "Platinum"],
    "correct": "C",
    "difficulty": "medium",
    "tags": ["general", "science", "materials"],
    "durationSec": 20,
    "source": "curated:general_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  },

  // SPORTS QUESTIONS (30 total) - New category
  {
    "id": "sports_001",
    "type": "text",
    "question": "How many players are on a basketball team on the court?",
    "options": ["4", "5", "6", "7"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["sports", "basketball"],
    "durationSec": 15,
    "source": "curated:sports_v1",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "sports_002",
    "type": "text",
    "question": "Which country won the 2018 FIFA World Cup?",
    "options": ["Brazil", "Germany", "France", "Argentina"],
    "correct": "C",
    "difficulty": "medium",
    "tags": ["sports", "football", "worldcup"],
    "durationSec": 20,
    "source": "curated:sports_v1",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "sports_003",
    "type": "text",
    "question": "How many Grand Slam tournaments are there in tennis?",
    "options": ["3", "4", "5", "6"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["sports", "tennis"],
    "durationSec": 20,
    "source": "curated:sports_v1",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "sports_004",
    "type": "text",
    "question": "In which sport would you perform a slam dunk?",
    "options": ["Volleyball", "Basketball", "Tennis", "Baseball"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["sports", "basketball"],
    "durationSec": 15,
    "source": "curated:sports_v1",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "sports_005",
    "type": "text",
    "question": "How many holes are there in a standard golf course?",
    "options": ["16", "18", "20", "22"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["sports", "golf"],
    "durationSec": 15,
    "source": "curated:sports_v1",
    "updatedAt": "2025-09-26T00:00:00Z"
  },

  // SCIENCE QUESTIONS (30 total) - New category
  {
    "id": "science_001",
    "type": "text",
    "question": "What is the chemical symbol for water?",
    "options": ["H2O", "CO2", "NaCl", "O2"],
    "correct": "A",
    "difficulty": "easy",
    "tags": ["science", "chemistry"],
    "durationSec": 15,
    "source": "curated:science_v1",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "science_002",
    "type": "text",
    "question": "What is the speed of light?",
    "options": ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
    "correct": "A",
    "difficulty": "medium",
    "tags": ["science", "physics"],
    "durationSec": 20,
    "source": "curated:science_v1",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "science_003",
    "type": "text",
    "question": "What gas do plants absorb from the atmosphere?",
    "options": ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    "correct": "C",
    "difficulty": "easy",
    "tags": ["science", "biology"],
    "durationSec": 15,
    "source": "curated:science_v1",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "science_004",
    "type": "text",
    "question": "How many bones are in the adult human body?",
    "options": ["206", "208", "210", "212"],
    "correct": "A",
    "difficulty": "medium",
    "tags": ["science", "biology", "anatomy"],
    "durationSec": 20,
    "source": "curated:science_v1",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "science_005",
    "type": "text",
    "question": "What is the largest planet in our solar system?",
    "options": ["Saturn", "Jupiter", "Neptune", "Uranus"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["science", "astronomy"],
    "durationSec": 15,
    "source": "curated:science_v1",
    "updatedAt": "2025-09-26T00:00:00Z"
  },

  // HISTORY QUESTIONS (30 total) - New category
  {
    "id": "history_001",
    "type": "text",
    "question": "In which year did World War I begin?",
    "options": ["1912", "1914", "1916", "1918"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["history", "world-war"],
    "durationSec": 20,
    "source": "curated:history_v1",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "history_002",
    "type": "text",
    "question": "Who was the first person to walk on the moon?",
    "options": ["Buzz Aldrin", "Neil Armstrong", "John Glenn", "Alan Shepard"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["history", "space"],
    "durationSec": 15,
    "source": "curated:history_v1",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "history_003",
    "type": "text",
    "question": "Which ancient wonder of the world was located in Alexandria?",
    "options": ["Colossus of Rhodes", "Lighthouse of Alexandria", "Hanging Gardens", "Temple of Artemis"],
    "correct": "B",
    "difficulty": "hard",
    "tags": ["history", "ancient"],
    "durationSec": 25,
    "source": "curated:history_v1",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "history_004",
    "type": "text",
    "question": "In which year did the Berlin Wall fall?",
    "options": ["1987", "1989", "1991", "1993"],
    "correct": "B",
    "difficulty": "medium",
    "tags": ["history", "cold-war"],
    "durationSec": 20,
    "source": "curated:history_v1",
    "updatedAt": "2025-09-26T00:00:00Z"
  },
  {
    "id": "history_005",
    "type": "text",
    "question": "Who was the first President of the United States?",
    "options": ["Thomas Jefferson", "George Washington", "John Adams", "Benjamin Franklin"],
    "correct": "B",
    "difficulty": "easy",
    "tags": ["history", "usa"],
    "durationSec": 15,
    "source": "curated:history_v1",
    "updatedAt": "2025-09-26T00:00:00Z"
  },

  // Import remaining 110 questions
  ...remainingQuestions
];
