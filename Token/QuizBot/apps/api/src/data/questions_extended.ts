// Extended questions - will be merged with main questions.ts
export const extendedQuestions = [
  // More Crypto Questions (21-60)
  {
    "id": "crypto_021",
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
    "id": "crypto_022",
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
    "id": "crypto_023",
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
    "id": "crypto_024",
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
    "id": "crypto_025",
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
    "id": "crypto_026",
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
    "id": "crypto_027",
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
    "id": "crypto_028",
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
    "id": "crypto_029",
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
    "id": "crypto_030",
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

  // Tech Questions (16-60)
  {
    "id": "tech_016",
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
    "id": "tech_017",
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
    "id": "tech_018",
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
    "id": "tech_019",
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
    "id": "tech_020",
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

  // Visual Questions with Working URLs (9-50)
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

  // General Knowledge Questions (21-60)
  {
    "id": "general_021",
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
    "id": "general_022",
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
    "id": "general_023",
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
    "id": "general_024",
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
    "id": "general_025",
    "type": "text",
    "question": "What is the hardest natural substance?",
    "options": ["Gold", "Iron", "Diamond", "Platinum"],
    "correct": "C",
    "difficulty": "medium",
    "tags": ["general", "science", "materials"],
    "durationSec": 20,
    "source": "curated:general_v2",
    "updatedAt": "2025-09-26T00:00:00Z"
  }
];
