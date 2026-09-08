'use client'

export function ActivityChart() {
  // Données statiques pour le graphique
  const data = [
    { label: 'Lun', value: 8 },
    { label: 'Mar', value: 12 },
    { label: 'Mer', value: 6 },
    { label: 'Jeu', value: 18 },
    { label: 'Ven', value: 10 },
    { label: 'Sam', value: 4 },
    { label: 'Dim', value: 2 },
  ]

  const maxValue = Math.max(...data.map(d => d.value))

  return (
    <div className="w-full">
      <div className="flex items-end justify-between h-32 gap-1">
        {data.map((item, index) => {
          const height = (item.value / maxValue) * 100
          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full bg-accent/20 rounded-t-sm transition-all duration-500 hover:bg-accent/40"
                style={{ height: `${Math.max(height, 4)}%` }}
              >
                <div
                  className="w-full bg-accent rounded-t-sm transition-all duration-500"
                  style={{ height: `${height}%` }}
                />
              </div>
              <span className="text-xs text-foreground-secondary/60">{item.label}</span>
            </div>
          )
        })}
      </div>
      <div className="mt-2 text-center">
        <p className="text-xs text-foreground-secondary/40">Activité de la semaine</p>
      </div>
    </div>
  )
}
