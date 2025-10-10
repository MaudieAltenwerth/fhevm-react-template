export const CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000'; // Replace with deployed address

export const CONTRACT_ABI = [
  'function contractOwner() view returns (address)',
  'function currentSeason() view returns (uint256)',
  'function totalTeams() view returns (uint256)',
  'function athleteCounter() view returns (uint256)',
  'function teamCounter() view returns (uint256)',
  'function proposalCounter() view returns (uint256)',
  'function registerTeam(string _teamName, string _league, address _teamManager, uint32 _salaryCap) returns (uint256)',
  'function registerAthlete(string _name, string _position, uint256 _teamId, address _athleteAddress, uint32 _salary, uint32 _bonus, uint256 _contractDurationMonths) returns (uint256)',
  'function proposeContract(uint256 _athleteId, uint256 _teamId, uint32 _proposedSalary, uint32 _proposedBonus, uint256 _contractDuration) returns (uint256)',
  'function approveContract(uint256 _proposalId)',
  'function updateAthleteSalary(uint256 _athleteId, uint32 _newSalary, uint32 _newBonus)',
  'function checkSalaryCap(uint256 _teamId) returns (bool)',
  'function getAthleteInfo(uint256 _athleteId) view returns (string name, string position, uint256 teamId, bool isActive, uint256 contractStart, uint256 contractEnd, address athleteAddress)',
  'function getTeamInfo(uint256 _teamId) view returns (string teamName, string league, address teamManager, uint256[] athleteIds, bool isActive)',
  'function getProposalInfo(uint256 _proposalId) view returns (uint256 athleteId, uint256 teamId, uint256 contractDuration, bool isPending, bool isApproved, address proposer, uint256 timestamp)',
  'function startNewSeason()',
  'function deactivateAthlete(uint256 _athleteId)',
  'function deactivateTeam(uint256 _teamId)',
  'function getCurrentStats() view returns (uint256 season, uint256 totalAthletes, uint256 activeTeams, uint256 totalProposals)',
  'function getMyAthletes(address _address) view returns (uint256[])',
  'function getMyTeams(address _manager) view returns (uint256[])',
  'event AthleteRegistered(uint256 indexed athleteId, string name, uint256 teamId)',
  'event TeamRegistered(uint256 indexed teamId, string teamName, address manager)',
  'event SalaryUpdated(uint256 indexed athleteId, uint256 timestamp)',
  'event ContractProposed(uint256 indexed proposalId, uint256 athleteId, uint256 teamId)',
  'event ContractApproved(uint256 indexed proposalId, uint256 athleteId, uint256 teamId)',
  'event PayrollUpdated(uint256 indexed teamId, uint256 timestamp)',
  'event SeasonStarted(uint256 indexed season, uint256 timestamp)',
];

export const SEPOLIA_CHAIN_ID = 11155111;
export const SEPOLIA_RPC_URL = 'https://sepolia.infura.io/v3/YOUR_INFURA_KEY';
