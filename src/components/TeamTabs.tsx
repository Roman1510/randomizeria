import { useState } from 'react'
import { Team } from '../types'
import Button from './GlowButton'

interface TeamTabsProps {
  teams: Team[]
  activeTeamId: string
  onTeamChange: (teamId: string) => void
  onAddTeam: (name: string) => void
  onRenameTeam: (teamId: string, newName: string) => void
  onDeleteTeam: (teamId: string) => void
}

const TeamTabs = ({
  teams,
  activeTeamId,
  onTeamChange,
  onAddTeam,
  onRenameTeam,
  onDeleteTeam,
}: TeamTabsProps) => {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTeamName, setNewTeamName] = useState('')
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  )

  const handleAddTeam = () => {
    if (newTeamName.trim()) {
      onAddTeam(newTeamName.trim())
      setNewTeamName('')
      setShowAddForm(false)
    }
  }

  const handleStartEdit = (team: Team) => {
    setEditingTeamId(team.id)
    setEditingName(team.name)
  }

  const handleSaveEdit = () => {
    if (editingTeamId && editingName.trim()) {
      onRenameTeam(editingTeamId, editingName.trim())
    }
    setEditingTeamId(null)
    setEditingName('')
  }

  const handleCancelEdit = () => {
    setEditingTeamId(null)
    setEditingName('')
  }

  const handleDeleteTeam = (teamId: string) => {
    if (teams.length === 1) {
      alert('Cannot delete the last team!')
      return
    }
    setShowDeleteConfirm(teamId)
  }

  const confirmDelete = () => {
    if (showDeleteConfirm) {
      onDeleteTeam(showDeleteConfirm)
      setShowDeleteConfirm(null)
    }
  }

  return (
    <div className="mb-6">
      {/* Team Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {teams.map((team) => (
          <div key={team.id} className="relative group">
            {editingTeamId === team.id ? (
              <div className="flex items-center gap-1 bg-purple-500 bg-opacity-80 rounded-lg px-3 py-2">
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveEdit()
                    if (e.key === 'Escape') handleCancelEdit()
                  }}
                  className="bg-purple-500 bg-opacity-20 text-white text-sm px-2 py-1 rounded border-none outline-none min-w-0 w-20"
                  autoFocus
                  maxLength={20}
                />
                <button
                  onClick={handleSaveEdit}
                  className="text-green-300 hover:text-green-200 text-sm"
                >
                  ✓
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="text-red-300 hover:text-red-200 text-sm"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div
                onClick={() => onTeamChange(team.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm relative cursor-pointer ${
                  activeTeamId === team.id
                    ? 'bg-purple-800  bg-opacity-80 text-white shadow-lg'
                    : 'bg-purple-300 bg-opacity-10 text-purple-200 hover:bg-opacity-30 hover:text-white'
                }`}
              >
                <div className="cursor-pointer"> {team.name}</div>
                <span className="ml-2 text-xs opacity-75 cursor-pointer">
                  ({team.items.length})
                </span>

                {/* Action buttons - only show on hover */}
                <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleStartEdit(team)
                    }}
                    className="w-5 h-5 bg-blue-500 hover:bg-blue-400 text-white text-xs rounded-full flex items-center justify-center"
                    title="Rename team"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteTeam(team.id)
                    }}
                    className="w-5 h-5 bg-red-500 hover:bg-red-400 text-white text-xs rounded-full flex items-center justify-center"
                    title="Delete team"
                  >
                    🚫
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add Team Button */}
        {!showAddForm ? (
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 rounded-lg bg-green-500 bg-opacity-60 hover:bg-opacity-80 text-white font-medium transition-all duration-300 text-sm"
          >
            + Add Team
          </button>
        ) : (
          <div className="flex items-center gap-2 bg-green-500 bg-opacity-60 rounded-lg px-3 py-2">
            <input
              type="text"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddTeam()
                if (e.key === 'Escape') {
                  setShowAddForm(false)
                  setNewTeamName('')
                }
              }}
              placeholder="Team name"
              className="bg-green-500 bg-opacity-20 text-white text-sm px-2 py-1 rounded border-none outline-none placeholder-purple-200 min-w-0 w-24"
              autoFocus
              maxLength={20}
            />
            <button
              onClick={handleAddTeam}
              className="text-green-200 hover:text-green-100 text-sm"
            >
              ✓
            </button>
            <button
              onClick={() => {
                setShowAddForm(false)
                setNewTeamName('')
              }}
              className="text-red-300 hover:text-red-200 text-sm"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-xl p-6 max-w-sm mx-4">
            <h3 className="text-lg font-bold text-purple-800 mb-4">
              Delete Team
            </h3>
            <p className="text-purple-700 mb-6">
              Are you sure you want to delete this team and all its items?
            </p>
            <div className="flex gap-3">
              <Button
                onClick={confirmDelete}
                variant="danger"
                size="sm"
                fullWidth
              >
                Delete
              </Button>
              <Button
                onClick={() => setShowDeleteConfirm(null)}
                variant="secondary"
                size="sm"
                fullWidth
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TeamTabs
