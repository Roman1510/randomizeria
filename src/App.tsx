import { useState, useEffect, Suspense } from 'react'
import { Item, Team } from './types'
import useLocalStorage from './hooks/useLocalStorage'
import ItemForm from './components/ItemForm'
import ItemList from './components/ItemList'
import RandomResult from './components/RandomResult'
import TeamTabs from './components/TeamTabs'
import Button from './components/GlowButton'
import { STORAGE_KEYS, ERROR_MESSAGES } from './const/constants'
import CucumberViewer from './components/CucumberView'

const CucumberLoader = () => (
  <div className="flex flex-col items-center justify-center h-full w-full">
    <div className="w-16 h-16 border-4 border-purple-400 border-t-purple-600 rounded-full animate-spin mb-4"></div>
    <p className="text-purple-300 font-medium text-5xl">
      Loading some veggies 🥒...
    </p>
  </div>
)

const App = () => {
  const [teams, setTeams] = useLocalStorage<Team[]>(
    STORAGE_KEYS.PICKER_TEAMS,
    []
  )
  const [activeTeamId, setActiveTeamId] = useLocalStorage<string>(
    STORAGE_KEYS.ACTIVE_TEAM_ID,
    ''
  )
  const [randomItem, setRandomItem] = useState<Item | null>(null)
  const [error, setError] = useState<string>('')

  const activeTeam = teams.find((team) => team.id === activeTeamId) || teams[0]

  useEffect(() => {
    if (
      teams.length > 0 &&
      (!activeTeamId || !teams.find((team) => team.id === activeTeamId))
    ) {
      setActiveTeamId(teams[0].id)
    }
  }, [teams, activeTeamId, setActiveTeamId])

  const handleAddItem = (text: string) => {
    if (!activeTeam) return

    const newItem: Item = {
      id: Date.now().toString(),
      text,
    }

    const updatedTeams = teams.map((team) =>
      team.id === activeTeam.id
        ? { ...team, items: [...team.items, newItem] }
        : team
    )

    setTeams(updatedTeams)
  }

  const handleRemoveItem = (id: string) => {
    if (!activeTeam) return

    const updatedTeams = teams.map((team) =>
      team.id === activeTeam.id
        ? { ...team, items: team.items.filter((item) => item.id !== id) }
        : team
    )

    setTeams(updatedTeams)
  }

  const handlePickRandomItem = () => {
    if (!activeTeam || activeTeam.items.length === 0) {
      setError(ERROR_MESSAGES.NO_ITEMS)
      setRandomItem(null)
      return
    }

    const randomIndex = Math.floor(Math.random() * activeTeam.items.length)
    setRandomItem(activeTeam.items[randomIndex])
    setError('')
  }

  const handleClearAllItems = () => {
    if (!activeTeam) return

    const updatedTeams = teams.map((team) =>
      team.id === activeTeam.id ? { ...team, items: [] } : team
    )

    setTeams(updatedTeams)
    setRandomItem(null)
    setError('')
  }

  const handleTeamChange = (teamId: string) => {
    setActiveTeamId(teamId)
    setRandomItem(null)
    setError('')
  }

  const handleAddTeam = (name: string) => {
    const newTeam: Team = {
      id: Date.now().toString(),
      name,
      items: [],
    }

    setTeams([...teams, newTeam])
    setActiveTeamId(newTeam.id)
  }

  const handleRenameTeam = (teamId: string, newName: string) => {
    const updatedTeams = teams.map((team) =>
      team.id === teamId ? { ...team, name: newName } : team
    )

    setTeams(updatedTeams)
  }

  const handleDeleteTeam = (teamId: string) => {
    if (teams.length === 1) return

    const updatedTeams = teams.filter((team) => team.id !== teamId)
    setTeams(updatedTeams)

    if (activeTeamId === teamId) {
      setActiveTeamId(updatedTeams[0].id)
      setRandomItem(null)
      setError('')
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 relative">
      <div className="hidden md:block md:w-1/2 h-screen md:h-auto items-center justify-center">
        <div className="w-full h-full max-h-screen">
          <Suspense fallback={<CucumberLoader />}>
            <CucumberViewer />
          </Suspense>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white bg-opacity-15 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden p-6 border border-purple-300 border-opacity-40">
          <h1 className="text-3xl font-bold mb-6 text-center text-purple-800 drop-shadow-md">
            Rando-Mizeria
          </h1>

          <TeamTabs
            teams={teams}
            activeTeamId={activeTeamId}
            onTeamChange={handleTeamChange}
            onAddTeam={handleAddTeam}
            onRenameTeam={handleRenameTeam}
            onDeleteTeam={handleDeleteTeam}
          />

          <ItemForm onAddItem={handleAddItem} />

          <div className="my-8">
            <div className="bg-white bg-opacity-10 rounded-2xl p-4 shadow-inner">
              <ItemList
                items={activeTeam?.items || []}
                onRemoveItem={handleRemoveItem}
              />
              {error && (
                <p className="text-red-300 mt-4 text-sm text-center font-medium">
                  {error}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <Button
              onClick={handlePickRandomItem}
              variant="primary"
              size="lg"
              fullWidth
            >
              Pick Random Item
            </Button>
            <Button onClick={handleClearAllItems} variant="danger" size="lg">
              Clear All
            </Button>
          </div>

          <RandomResult item={randomItem} />
        </div>
      </div>

      <div className="absolute bottom-2 right-2 text-xs text-purple-300 font-medium">
        Made in Poland with ❤️ by
        <a
          href="https://github.com/Roman1510"
          className="ml-1 hover:text-purple-200 transition-colors"
        >
          roman1510@github.com
        </a>
      </div>
    </div>
  )
}

export default App
