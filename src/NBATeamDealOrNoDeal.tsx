import React, { useState, useEffect } from 'react';
import { Trophy, Users } from 'lucide-react';

// Player pools by position
const PLAYER_POOLS = {
  PG: [
    { name: "Stephen Curry", tier: "S", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201939.png" },
    { name: "Luka Dončić", tier: "S", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1629029.png" },
    { name: "Shai Gilgeous-Alexander", tier: "S", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1628983.png" },
    { name: "Tyrese Haliburton", tier: "A", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1630169.png" },
    { name: "Ja Morant", tier: "A", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1629630.png" },
    { name: "Damian Lillard", tier: "A", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203081.png" },
    { name: "De'Aaron Fox", tier: "A", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1628368.png" },
    { name: "Jalen Brunson", tier: "A", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1628973.png" },
    { name: "Trae Young", tier: "B", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1629027.png" },
    { name: "Jamal Murray", tier: "B", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1627750.png" },
    { name: "Darius Garland", tier: "B", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1629636.png" },
    { name: "LaMelo Ball", tier: "B", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1630163.png" },
    { name: "Kyrie Irving", tier: "B", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/202681.png" },
    { name: "Dejounte Murray", tier: "B", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1627749.png" },
    { name: "Tyrese Maxey", tier: "B", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1630178.png" },
    { name: "Mike Conley", tier: "C", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201144.png" },
    { name: "Derrick White", tier: "C", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1628401.png" },
    { name: "Chris Paul", tier: "C", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/101108.png" },
    { name: "Dennis Schröder", tier: "D", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203471.png" },
    { name: "Tyus Jones", tier: "D", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1626145.png" },
  ],
  SG: [
    { name: "Devin Booker", tier: "S", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1626164.png" },
    { name: "Anthony Edwards", tier: "S", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1630162.png" },
    { name: "Donovan Mitchell", tier: "A", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1628378.png" },
    { name: "Jaylen Brown", tier: "A", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1627759.png" },
    { name: "Jalen Williams", tier: "A", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1631116.png" },
    { name: "Zach LaVine", tier: "B", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203897.png" },
    { name: "Bradley Beal", tier: "B", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203078.png" },
    { name: "Dejounte Murray", tier: "B", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1627749.png" },
    { name: "CJ McCollum", tier: "B", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203468.png" },
    { name: "Jordan Poole", tier: "B", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1629673.png" },
    { name: "Klay Thompson", tier: "C", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/202691.png" },
    { name: "Norman Powell", tier: "C", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1626181.png" },
    { name: "Gary Trent Jr.", tier: "C", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1629018.png" },
    { name: "Kentavious Caldwell-Pope", tier: "C", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203484.png" },
    { name: "Tim Hardaway Jr.", tier: "D", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203501.png" },
    { name: "Malik Beasley", tier: "D", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1627736.png" },
  ],
  SF: [
    { name: "LeBron James", tier: "S", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/2544.png" },
    { name: "Kevin Durant", tier: "S", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201142.png" },
    { name: "Kawhi Leonard", tier: "S", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/202695.png" },
    { name: "Jayson Tatum", tier: "A", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1628369.png" },
    { name: "Paolo Banchero", tier: "A", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1631094.png" },
    { name: "Scottie Barnes", tier: "A", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1630567.png" },
    { name: "DeMar DeRozan", tier: "B", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201942.png" },
    { name: "Paul George", tier: "B", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/202331.png" },
    { name: "Brandon Ingram", tier: "B", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1627742.png" },
    { name: "Jimmy Butler", tier: "B", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/202710.png" },
    { name: "Mikal Bridges", tier: "B", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1628969.png" },
    { name: "OG Anunoby", tier: "C", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1628384.png" },
    { name: "Tobias Harris", tier: "C", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/202699.png" },
    { name: "Harrison Barnes", tier: "C", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203084.png" },
    { name: "Bojan Bogdanovic", tier: "D", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/202711.png" },
    { name: "Kelly Oubre Jr.", tier: "D", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1626162.png" },
  ],
  PF: [
    { name: "Giannis Antetokounmpo", tier: "S", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203507.png" },
    { name: "Nikola Jokić", tier: "S", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203999.png" },
    { name: "Anthony Davis", tier: "S", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203076.png" },
    { name: "Zion Williamson", tier: "A", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1629627.png" },
    { name: "Pascal Siakam", tier: "A", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1627783.png" },
    { name: "Julius Randle", tier: "A", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203944.png" },
    { name: "Lauri Markkanen", tier: "B", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1628374.png" },
    { name: "Jaren Jackson Jr.", tier: "B", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1628991.png" },
    { name: "Draymond Green", tier: "B", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203110.png" },
    { name: "Jerami Grant", tier: "B", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203924.png" },
    { name: "Aaron Gordon", tier: "B", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203932.png" },
    { name: "John Collins", tier: "C", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1628381.png" },
    { name: "PJ Washington", tier: "C", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1629023.png" },
    { name: "Jae Crowder", tier: "C", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203109.png" },
    { name: "Kyle Kuzma", tier: "D", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1628398.png" },
    { name: "Trey Lyles", tier: "D", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1626168.png" },
  ],
  C: [
    { name: "Joel Embiid", tier: "S", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203954.png" },
    { name: "Victor Wembanyama", tier: "S", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1641705.png" },
    { name: "Bam Adebayo", tier: "A", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1628389.png" },
    { name: "Domantas Sabonis", tier: "A", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1627734.png" },
    { name: "Chet Holmgren", tier: "A", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1631096.png" },
    { name: "Rudy Gobert", tier: "A", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203497.png" },
    { name: "Kristaps Porziņģis", tier: "B", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/204001.png" },
    { name: "Alperen Şengün", tier: "B", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1630578.png" },
    { name: "Myles Turner", tier: "B", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1626167.png" },
    { name: "Jarrett Allen", tier: "B", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1628386.png" },
    { name: "Brook Lopez", tier: "B", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201572.png" },
    { name: "Nikola Vučević", tier: "C", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/202696.png" },
    { name: "Clint Capela", tier: "C", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203991.png" },
    { name: "Isaiah Stewart", tier: "C", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1630191.png" },
    { name: "Daniel Gafford", tier: "D", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1629655.png" },
    { name: "Mason Plumlee", tier: "D", img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203486.png" },
  ]
};

const TIER_VALUE = { S: 100, A: 80, B: 60, C: 40, D: 20 };
const POSITIONS = ['PG', 'SG', 'SF', 'PF', 'C'];
const opensPerRound = [0, 3, 2, 2, 1, 1];
const multipliers = [0, 0.18, 0.28, 0.38, 0.50, 0.65];



const shuffle = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const tierFromOffer = (v) => {
  if (v >= 90) return "S";
  if (v >= 70) return "A";
  if (v >= 50) return "B";
  if (v >= 30) return "C";
  return "D";
};

export default function NBATeamDealOrNoDeal() {
  const [completedTeam, setCompletedTeam] = useState([]);
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    initPositionGame();
  }, [currentPositionIndex]);

  const initPositionGame = () => {
    const position = POSITIONS[currentPositionIndex];
    const pool = PLAYER_POOLS[position];
    const desired = { S: 2, A: 3, B: 3, C: 1, D: 1 };

  let tenPlayers = [];
  for (const [tier, count] of Object.entries(desired)) {
    const tierPlayers = shuffle(pool.filter(p => p.tier === tier));
    tenPlayers.push(...tierPlayers.slice(0, count));
  }

  // If we somehow got less than 10 (missing tiers), fill randomly
  if (tenPlayers.length < 10) {
    const remaining = pool.filter(p => !tenPlayers.some(x => x.name === p.name));
    tenPlayers.push(...shuffle(remaining).slice(0, 10 - tenPlayers.length));
  }

    
    const cases = shuffle(tenPlayers).map((p, i) => ({
      id: i + 1,
      opened: false,
      player: p,
      value: TIER_VALUE[p.tier]
    }));

    setGameState({
      phase: "pick",
      round: 0,
      opensLeft: 0,
      chosenCaseId: null,
      cases,
      revealLog: [],
      lastOffer: null,
      offeredNames: new Set()
    });
  };

  const onCaseClick = (id) => {
    if (!gameState) return;
    
    const c = gameState.cases.find(x => x.id === id);
    if (!c || c.opened) return;
    if (gameState.phase === "banker" || gameState.phase === "end") return;

    if (gameState.phase === "pick") {
      setGameState(prev => ({
        ...prev,
        chosenCaseId: id,
        round: 1,
        opensLeft: opensPerRound[1],
        phase: "open"
      }));
      return;
    }

    if (gameState.phase === "finalSwap") {
      // In final swap, clicking either case reveals it and finishes
      finishPosition(c);
      return;
    }

    if (gameState.phase === "open") {
      if (gameState.opensLeft <= 0) return;
      if (id === gameState.chosenCaseId) return;

      const newCases = gameState.cases.map(cs => 
        cs.id === id ? { ...cs, opened: true } : cs
      );
      
      const newLog = [...gameState.revealLog, 
        `Opened Case #${c.id}: ${c.player.name} (${c.player.tier})`
      ];
      
      const newOpensLeft = gameState.opensLeft - 1;

      if (newOpensLeft === 0) {
        setGameState(prev => ({
          ...prev,
          cases: newCases,
          opensLeft: 0,
          revealLog: newLog,
          phase: "banker"
        }));
        setTimeout(() => showBankerOffer(newCases, newLog), 100);
      } else {
        setGameState(prev => ({
          ...prev,
          cases: newCases,
          opensLeft: newOpensLeft,
          revealLog: newLog
        }));
      }
    }
  };

  const bankerOfferValue = (cases) => {
    const remaining = cases.filter(c => !c.opened && c.id !== gameState.chosenCaseId);
    const expected = remaining.reduce((sum, c) => sum + c.value, 0) / remaining.length;
    const m = multipliers[gameState.round] ?? 0.5;
    return Math.round(expected * m);
  };

  const pickBankerPlayer = (targetTier, cases) => {
    const position = POSITIONS[currentPositionIndex];
    const onBoardNames = new Set(cases.map(c => c.player.name));
    const pool = PLAYER_POOLS[position].filter(p => 
      !onBoardNames.has(p.name) && !gameState.offeredNames.has(p.name)
    );

    if (!pool.length) return null;

    const tierOrder = ["S", "A", "B", "C", "D"];
    const targetIdx = tierOrder.indexOf(targetTier);

    for (let dist = 0; dist < tierOrder.length; dist++) {
      const tiersToTry = [];
      if (targetIdx - dist >= 0) tiersToTry.push(tierOrder[targetIdx - dist]);
      if (dist !== 0 && targetIdx + dist < tierOrder.length) {
        tiersToTry.push(tierOrder[targetIdx + dist]);
      }

      for (const t of tiersToTry) {
        const candidates = pool.filter(p => p.tier === t);
        if (candidates.length) {
          return candidates[Math.floor(Math.random() * candidates.length)];
        }
      }
    }

    return pool[Math.floor(Math.random() * pool.length)];
  };

  const showBankerOffer = (cases, log) => {
    const offerValue = bankerOfferValue(cases);
    const tier = tierFromOffer(offerValue);
    const offerPlayer = pickBankerPlayer(tier, cases);

    const newOfferedNames = new Set(gameState.offeredNames);
    if (offerPlayer) newOfferedNames.add(offerPlayer.name);

    const newLog = [...log, 
      offerPlayer 
        ? `Banker Offer: ${offerPlayer.name} (${offerPlayer.tier})`
        : `Banker Offer: ${tier}-tier (${offerValue} pts)`
    ];

    setGameState(prev => ({
      ...prev,
      lastOffer: { offerValue, tier, player: offerPlayer },
      offeredNames: newOfferedNames,
      revealLog: newLog
    }));
  };

  const onDeal = () => {
    const player = gameState.lastOffer?.player;
    if (!player) return;

    const position = POSITIONS[currentPositionIndex];
    const newTeamMember = { position, player };
    
    setCompletedTeam(prev => [...prev, newTeamMember]);
    
    const allCasesOpened = gameState.cases.map(c => ({ ...c, opened: true }));
    
    setGameState(prev => ({
      ...prev,
      phase: "end",
      cases: allCasesOpened
    }));
  };

  const onNoDeal = () => {
    if (gameState.round === 5) {
      // Go to final swap phase where player clicks to reveal
      setGameState(prev => ({ ...prev, phase: "finalSwap" }));
      return;
    }

    setGameState(prev => ({
      ...prev,
      round: prev.round + 1,
      opensLeft: opensPerRound[prev.round + 1],
      phase: "open"
    }));
  };

  const onKeep = () => {
    const finalCase = gameState.cases.find(c => c.id === gameState.chosenCaseId);
    if (finalCase) {
      finishPosition(finalCase);
    }
  };

  const onSwap = () => {
    const unopened = gameState.cases.filter(c => !c.opened);
    const other = unopened.find(c => c.id !== gameState.chosenCaseId);
    if (other) {
      finishPosition(other);
    }
  };

  const finishPosition = (finalCase) => {
    if (!finalCase) return;
    
    const position = POSITIONS[currentPositionIndex];
    const newTeamMember = { position, player: finalCase.player };
    
    setCompletedTeam(prev => [...prev, newTeamMember]);
    
    const allCasesOpened = gameState.cases.map(c => ({ ...c, opened: true }));
    
    const resultLog = [...gameState.revealLog, `You got: ${finalCase.player.name} (${finalCase.player.tier})`];
    
    setGameState(prev => ({
      ...prev,
      phase: "end",
      cases: allCasesOpened,
      revealLog: resultLog
    }));
  };

  const onNextPosition = () => {
    if (currentPositionIndex < POSITIONS.length - 1) {
      setCurrentPositionIndex(prev => prev + 1);
    }
  };

  const onRestartAll = () => {
    setCompletedTeam([]);
    setCurrentPositionIndex(0);
  };

  if (!gameState) return <div className="p-8">Loading...</div>;

  const currentPosition = POSITIONS[currentPositionIndex];
  const isLastPosition = currentPositionIndex === POSITIONS.length - 1;
  const allPositionsComplete = completedTeam.length === POSITIONS.length;

  const unopened = gameState.cases.filter(c => !c.opened);
  const chosen = unopened.find(c => c.id === gameState.chosenCaseId);
  const other = unopened.find(c => c.id !== gameState.chosenCaseId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-3">
            <Trophy className="w-10 h-10 text-yellow-400" />
            NBA Team Deal or No Deal
          </h1>
        </div>
        {completedTeam.length > 0 && (
          <div className="bg-slate-800/50 rounded-lg p-4 mb-6 border-2 border-purple-500/30">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Your Team ({completedTeam.length}/5)
            </h2>
            <div className="grid grid-cols-5 gap-3">
              {POSITIONS.map(pos => {
                const member = completedTeam.find(m => m.position === pos);
                return (
                  <div key={pos} className="bg-slate-700/50 rounded p-3 text-center">
                    <div className="text-xs text-purple-300 font-bold mb-2">{pos}</div>
                    {member ? (
                      <div>
                        <img 
                          src={member.player.img} 
                          alt={member.player.name}
                          className="w-28 h-28 mx-auto mb-2 rounded object-cover"
                        />
                        <div className="text-xs font-semibold">{member.player.name}</div>
                        <div className="text-xs text-yellow-400">{member.player.tier}-tier</div>
                      </div>
                    ) : (
                      <div className="text-gray-500 text-xs py-6">TBD</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {allPositionsComplete && (
          <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg p-8 mb-6 text-center">
            <h2 className="text-3xl font-bold mb-4">🏆 Team Complete! 🏆</h2>
            <p className="text-xl mb-6">You've built your championship roster!</p>
            <button
              onClick={onRestartAll}
              className="bg-white text-purple-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-100"
            >
              Build New Team
            </button>
          </div>
        )}

        {!allPositionsComplete && (
          <div>
            <div className="bg-slate-800/50 rounded-lg p-4 mb-6 border-2 border-yellow-500/50">
              <h2 className="text-2xl font-bold text-center mb-2">
                Drafting: {currentPosition}
              </h2>
              <p className="text-center text-purple-300">
                Position {currentPositionIndex + 1} of {POSITIONS.length}
              </p>
            </div>

            <div className="grid grid-cols-10 gap-6">
              <div className="col-span-3">
                <div className="bg-slate-800/50 rounded-lg p-4 mb-4">
                  <div className="text-xl font-bold mb-2">
                    {gameState.phase === "pick" && "Pick your case"}
                    {gameState.phase === "open" && `Round ${gameState.round}: Open ${Math.max(0, gameState.opensLeft)} case(s)`}
                    {gameState.phase === "banker" && "Banker Offer!"}
                    {gameState.phase === "finalSwap" && "Final Decision!"}
                    {gameState.phase === "end" && "Round Complete"}
                  </div>
                  
                  {gameState.phase === "banker" && gameState.lastOffer && (
                    <div className="bg-purple-900/50 p-4 rounded-lg mb-4">
                      <div className="text-lg font-bold mb-2">
                        Banker offers: {gameState.lastOffer.player?.name || `${gameState.lastOffer.tier}-tier`}
                      </div>
                      {gameState.lastOffer.player && (
                        <div className="flex items-center gap-3 mb-3">
                          <img 
                            src={gameState.lastOffer.player.img} 
                            alt={gameState.lastOffer.player.name}
                            className="w-20 h-20 rounded object-cover"
                          />
                          <div className="text-yellow-400 text-lg">
                            {gameState.lastOffer.player.tier}-tier
                          </div>
                        </div>
                      )}
                      <div className="flex gap-3">
                        <button
                          onClick={onDeal}
                          className="flex-1 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-bold"
                        >
                          DEAL
                        </button>
                        <button
                          onClick={onNoDeal}
                          className="flex-1 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-bold"
                        >
                          {gameState.round === 5 ? "FINAL" : "NO DEAL"}
                        </button>
                      </div>
                    </div>
                  )}

                  {gameState.phase === "finalSwap" && chosen && other && (
                    <div className="bg-purple-900/50 p-4 rounded-lg mb-4">
                      <div className="text-lg font-bold mb-3">
                        Click on a case to reveal your final player!
                      </div>
                      <div className="text-sm text-purple-300">
                        Case #{chosen.id} (your original) or Case #{other.id}?
                      </div>
                    </div>
                  )}

                  {gameState.phase === "end" && (
                    <div className="bg-green-900/50 p-4 rounded-lg mb-4">
                      <div className="text-lg font-bold mb-3">
                        Position complete!
                      </div>
                      <button
                        onClick={isLastPosition ? onRestartAll : onNextPosition}
                        className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-3 rounded-lg font-bold"
                      >
                        {isLastPosition ? "View Final Team" : `Next: ${POSITIONS[currentPositionIndex + 1]}`}
                      </button>
                    </div>
                  )}
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <h3 className="font-bold mb-2">Game Log</h3>
                  <ul className="text-sm space-y-1">
                    {gameState.revealLog.map((log, i) => (
                      <li key={i} className="text-purple-300">{log}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="col-span-7">
                  <div className="grid grid-cols-5 gap-2">
                  {gameState.cases.map(c => (
                    <button
                      key={c.id}
                      onClick={() => onCaseClick(c.id)}
                      disabled={c.opened || gameState.phase === "banker" || gameState.phase === "end"}
                      className={`
                        aspect-square rounded-lg font-bold text-lg transition-all
                        ${c.opened 
                          ? 'bg-slate-700/50 cursor-default' 
                          : c.id === gameState.chosenCaseId
                          ? 'bg-yellow-600 hover:bg-yellow-700'
                          : 'bg-purple-600 hover:bg-purple-700 cursor-pointer'
                        }
                        ${(gameState.phase === "banker" || gameState.phase === "end") && !c.opened ? 'opacity-50' : ''}
                        ${gameState.phase === "finalSwap" && !c.opened ? 'animate-pulse' : ''}
                      `}
                    >
                      {c.opened ? (
                        <div className="flex flex-col items-center justify-center p-1">
                          <img 
                            src={c.player.img} 
                            alt={c.player.name}
                            className="w-28 h-28 mx-auto mb-2 rounded object-cover"

                          />
                          <div className="text-xs leading-tight">{c.player.name}</div>
                          <div className="text-xs text-yellow-400">{c.player.tier}</div>
                        </div>
                      ) : (
                        c.id
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}