import React, { useState, useEffect } from 'react';

const SportsPredictionApp = () => {
  // States for our application
  const [sport, setSport] = useState('soccer');
  const [teams, setTeams] = useState([]);
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [homeStats, setHomeStats] = useState({ wins: 0, losses: 0, draws: 0 });
  const [awayStats, setAwayStats] = useState({ wins: 0, losses: 0, draws: 0 });
  const [prediction, setPrediction] = useState(null);
  const [confidenceLevel, setConfidenceLevel] = useState(0);
  
  // Sample data - in a real app, this would come from an API
  const sampleData = {
    soccer: [
      { name: 'Manchester United', wins: 15, losses: 7, draws: 8 },
      { name: 'Liverpool', wins: 18, losses: 3, draws: 9 },
      { name: 'Chelsea', wins: 16, losses: 8, draws: 6 },
      { name: 'Arsenal', wins: 17, losses: 9, draws: 4 },
      { name: 'Manchester City', wins: 20, losses: 2, draws: 8 },
    ],
    basketball: [
      { name: 'LA Lakers', wins: 40, losses: 20, draws: 0 },
      { name: 'Boston Celtics', wins: 35, losses: 25, draws: 0 },
      { name: 'Chicago Bulls', wins: 30, losses: 30, draws: 0 },
      { name: 'Golden State Warriors', wins: 38, losses: 22, draws: 0 },
      { name: 'Miami Heat', wins: 32, losses: 28, draws: 0 },
    ],
    football: [
      { name: 'Kansas City Chiefs', wins: 12, losses: 5, draws: 0 },
      { name: 'Buffalo Bills', wins: 11, losses: 6, draws: 0 },
      { name: 'San Francisco 49ers', wins: 10, losses: 7, draws: 0 },
      { name: 'Green Bay Packers', wins: 9, losses: 8, draws: 0 },
      { name: 'Tampa Bay Buccaneers', wins: 8, losses: 9, draws: 0 },
    ],
  };
  
  // Load teams when sport changes
  useEffect(() => {
    setTeams(sampleData[sport] || []);
    setHomeTeam('');
    setAwayTeam('');
    setPrediction(null);
    setConfidenceLevel(0);
  }, [sport]);
  
  // Update stats when teams are selected
  useEffect(() => {
    if (homeTeam) {
      const team = teams.find(t => t.name === homeTeam);
      if (team) setHomeStats(team);
    }
    
    if (awayTeam) {
      const team = teams.find(t => t.name === awayTeam);
      if (team) setAwayStats(team);
    }
  }, [homeTeam, awayTeam, teams]);
  
  // Prediction algorithm
  const makePrediction = () => {
    if (!homeTeam || !awayTeam) return;
    
    // Simple prediction based on win ratio
    const homeWinRatio = homeStats.wins / (homeStats.wins + homeStats.losses + homeStats.draws);
    const awayWinRatio = awayStats.wins / (awayStats.wins + awayStats.losses + awayStats.draws);
    
    // Home advantage factor (1.2x)
    const homeAdvantage = 1.2;
    const adjustedHomeRatio = homeWinRatio * homeAdvantage;
    
    // Calculate prediction
    if (adjustedHomeRatio > awayWinRatio * 1.1) {
      setPrediction('home');
      setConfidenceLevel(Math.round((adjustedHomeRatio - awayWinRatio) * 100));
    } else if (awayWinRatio > adjustedHomeRatio * 1.1) {
      setPrediction('away');
      setConfidenceLevel(Math.round((awayWinRatio - adjustedHomeRatio) * 100));
    } else {
      setPrediction('draw');
      setConfidenceLevel(Math.round(100 - Math.abs(adjustedHomeRatio - awayWinRatio) * 200));
    }
  };
  
  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-blue-800">Sports Bet Prediction App</h1>
      
      {/* Sport Selection */}
      <div className="w-full max-w-md mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Select Sport:
        </label>
        <select 
          className="w-full p-2 border border-gray-300 rounded"
          value={sport}
          onChange={(e) => setSport(e.target.value)}
        >
          <option value="soccer">Soccer</option>
          <option value="basketball">Basketball</option>
          <option value="football">American Football</option>
        </select>
      </div>
      
      {/* Team Selection */}
      <div className="w-full max-w-md flex flex-col md:flex-row justify-between mb-6">
        <div className="w-full md:w-5/12">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Home Team:
          </label>
          <select 
            className="w-full p-2 border border-gray-300 rounded"
            value={homeTeam}
            onChange={(e) => setHomeTeam(e.target.value)}
          >
            <option value="">Select Home Team</option>
            {teams.map((team) => (
              <option key={`home-${team.name}`} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="w-full md:w-5/12 mt-4 md:mt-0">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Away Team:
          </label>
          <select 
            className="w-full p-2 border border-gray-300 rounded"
            value={awayTeam}
            onChange={(e) => setAwayTeam(e.target.value)}
            disabled={!homeTeam}
          >
            <option value="">Select Away Team</option>
            {teams
              .filter((team) => team.name !== homeTeam)
              .map((team) => (
                <option key={`away-${team.name}`} value={team.name}>
                  {team.name}
                </option>
              ))}
          </select>
        </div>
      </div>
      
      {/* Team Stats Display */}
      {homeTeam && awayTeam && (
        <div className="w-full max-w-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Team Statistics</h2>
          <div className="flex justify-between">
            <div className="w-5/12 bg-white p-4 rounded shadow">
              <h3 className="font-bold text-blue-600">{homeTeam}</h3>
              <p>Wins: {homeStats.wins}</p>
              <p>Losses: {homeStats.losses}</p>
              <p>Draws: {homeStats.draws}</p>
              <p className="font-semibold mt-2">
                Win Rate: {((homeStats.wins / (homeStats.wins + homeStats.losses + homeStats.draws)) * 100).toFixed(1)}%
              </p>
            </div>
            
            <div className="w-5/12 bg-white p-4 rounded shadow">
              <h3 className="font-bold text-red-600">{awayTeam}</h3>
              <p>Wins: {awayStats.wins}</p>
              <p>Losses: {awayStats.losses}</p>
              <p>Draws: {awayStats.draws}</p>
              <p className="font-semibold mt-2">
                Win Rate: {((awayStats.wins / (awayStats.wins + awayStats.losses + awayStats.draws)) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Prediction Button */}
      <button 
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline mb-6"
        onClick={makePrediction}
        disabled={!homeTeam || !awayTeam}
      >
        Generate Prediction
      </button>
      
      {/* Prediction Results */}
      {prediction && (
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Prediction Result</h2>
          <div className="text-center">
            <p className="text-xl mb-2">
              {prediction === 'home' ? (
                <span className="font-bold text-green-600">{homeTeam} will likely win</span>
              ) : prediction === 'away' ? (
                <span className="font-bold text-red-600">{awayTeam} will likely win</span>
              ) : (
                <span className="font-bold text-blue-600">Match will likely end in a draw</span>
              )}
            </p>
            <p className="text-gray-700">
              Confidence Level: <span className="font-bold">{confidenceLevel}%</span>
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-3">
              <div 
                className={`${
                  prediction === 'home' ? 'bg-green-600' : 
                  prediction === 'away' ? 'bg-red-600' : 'bg-blue-600'
                } h-4 rounded-full`}
                style={{ width: `${confidenceLevel}%` }}
              ></div>
            </div>
            <p className="mt-6 text-sm text-gray-600 italic">
              Note: This prediction is based on historical win-loss records and home advantage.
              Always bet responsibly.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SportsPredictionApp;
