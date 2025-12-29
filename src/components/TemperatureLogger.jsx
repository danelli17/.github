import { useState } from 'react'

function TemperatureLogger() {
  const [equipmentName, setEquipmentName] = useState('')
  const [temperature, setTemperature] = useState('')
  const [staffInitials, setStaffInitials] = useState('')
  const [logs, setLogs] = useState([])

  const isHighTemperature = temperature && parseFloat(temperature) > 5

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newLog = {
      id: Date.now(),
      equipmentName,
      temperature: parseFloat(temperature),
      staffInitials,
      timestamp: new Date().toISOString(),
      isWarning: isHighTemperature
    }

    // Add new log and keep only the last 10
    setLogs(prevLogs => [newLog, ...prevLogs].slice(0, 10))

    // Reset form
    setEquipmentName('')
    setTemperature('')
    setStaffInitials('')
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
  }

  return (
    <div className="space-y-8">
      {/* Logging Form */}
      <div className="glass-strong rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-white mb-6">
          Log Equipment Temperature
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Equipment Name */}
          <div>
            <label 
              htmlFor="equipmentName" 
              className="block text-xl font-bold text-white mb-3"
            >
              Equipment Name
            </label>
            <input
              type="text"
              id="equipmentName"
              value={equipmentName}
              onChange={(e) => setEquipmentName(e.target.value)}
              className="w-full h-14 px-4 text-lg font-semibold text-white bg-black/40 border-2 border-white/30 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50"
              placeholder="e.g., Walk-in Fridge"
              required
            />
          </div>

          {/* Temperature */}
          <div>
            <label 
              htmlFor="temperature" 
              className="block text-xl font-bold text-white mb-3"
            >
              Temperature (°C)
            </label>
            <input
              type="number"
              id="temperature"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              className={`w-full h-14 px-4 text-lg font-semibold text-white bg-black/40 border-2 rounded-lg focus:outline-none focus:ring-2 ${
                isHighTemperature
                  ? 'border-red-500 bg-red-900/40 focus:border-red-400 focus:ring-red-400/50'
                  : 'border-white/30 focus:border-blue-400 focus:ring-blue-400/50'
              }`}
              placeholder="Enter temperature"
              required
            />
            {isHighTemperature && (
              <p className="mt-2 text-lg font-bold text-red-400 flex items-center gap-2">
                <span className="text-2xl">⚠️</span>
                WARNING: Temperature above 5°C - Safety Risk!
              </p>
            )}
          </div>

          {/* Staff Initials */}
          <div>
            <label 
              htmlFor="staffInitials" 
              className="block text-xl font-bold text-white mb-3"
            >
              Staff Initials
            </label>
            <input
              type="text"
              id="staffInitials"
              value={staffInitials}
              onChange={(e) => setStaffInitials(e.target.value.toUpperCase())}
              maxLength="4"
              className="w-full h-14 px-4 text-lg font-semibold text-white bg-black/40 border-2 border-white/30 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 uppercase"
              placeholder="e.g., JD"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-14 text-xl font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-blue-400/50"
          >
            Log Temperature
          </button>
        </form>
      </div>

      {/* Recent Logs Table */}
      {logs.length > 0 && (
        <div className="glass-strong rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Recent Logs (Last 10)
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-white/30">
                  <th className="text-left py-4 px-4 text-lg font-bold text-white">
                    Equipment
                  </th>
                  <th className="text-left py-4 px-4 text-lg font-bold text-white">
                    Temperature
                  </th>
                  <th className="text-left py-4 px-4 text-lg font-bold text-white">
                    Staff
                  </th>
                  <th className="text-left py-4 px-4 text-lg font-bold text-white">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr 
                    key={log.id}
                    className={`border-b border-white/10 ${
                      log.isWarning ? 'bg-red-900/30' : ''
                    }`}
                  >
                    <td className="py-4 px-4 text-lg font-semibold text-white">
                      {log.equipmentName}
                    </td>
                    <td className={`py-4 px-4 text-lg font-bold ${
                      log.isWarning ? 'text-red-400' : 'text-white'
                    }`}>
                      {log.temperature.toFixed(1)}°C
                      {log.isWarning && ' ⚠️'}
                    </td>
                    <td className="py-4 px-4 text-lg font-semibold text-white">
                      {log.staffInitials}
                    </td>
                    <td className="py-4 px-4 text-base font-medium text-white">
                      {formatTimestamp(log.timestamp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default TemperatureLogger
