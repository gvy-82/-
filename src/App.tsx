import { useState, useMemo, useCallback, useEffect, useRef } from 'react';

interface PlanetData {
  id: string;
  name: string;
  nameRu: string;
  color: string;
  gradient: string;
  size: number;
  orbitRadius: number;
  orbitDuration: number;
  realDiameter: string;
  realDistance: string;
  orbitalPeriod: string;
  description: string;
  hasRing?: boolean;
  moons: number;
  type: string;
  emoji: string;
}

const planets: PlanetData[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    nameRu: 'Меркурий',
    color: '#b5b5b5',
    gradient: 'radial-gradient(circle at 35% 35%, #e0e0e0, #b5b5b5, #6e6e6e)',
    size: 8,
    orbitRadius: 70,
    orbitDuration: 8,
    realDiameter: '4 879 км',
    realDistance: '57.9 млн км',
    orbitalPeriod: '88 дней',
    description: 'Самая маленькая и ближайшая к Солнцу планета. Температура колеблется от −180°C до +430°C. Поверхность покрыта кратерами, похожа на Луну.',
    moons: 0,
    type: 'Скалистая',
    emoji: '☿'
  },
  {
    id: 'venus',
    name: 'Venus',
    nameRu: 'Венера',
    color: '#e8cda0',
    gradient: 'radial-gradient(circle at 35% 35%, #f5e6c8, #e8cda0, #c4956a)',
    size: 12,
    orbitRadius: 105,
    orbitDuration: 14,
    realDiameter: '12 104 км',
    realDistance: '108.2 млн км',
    orbitalPeriod: '225 дней',
    description: 'Самая горячая планета (+462°C) из-за мощного парникового эффекта. Атмосфера из CO₂. Вращается в обратном направлении — солнце восходит на западе.',
    moons: 0,
    type: 'Скалистая',
    emoji: '♀'
  },
  {
    id: 'earth',
    name: 'Earth',
    nameRu: 'Земля',
    color: '#4a90d9',
    gradient: 'radial-gradient(circle at 35% 35%, #6bb5ff, #4a90d9, #1a5c2e)',
    size: 13,
    orbitRadius: 145,
    orbitDuration: 20,
    realDiameter: '12 756 км',
    realDistance: '149.6 млн км',
    orbitalPeriod: '365.25 дней',
    description: 'Наш дом! Единственная известная планета с жизнью. 71% поверхности покрыт водой. Имеет один естественный спутник — Луну.',
    moons: 1,
    type: 'Скалистая',
    emoji: '🌍'
  },
  {
    id: 'mars',
    name: 'Mars',
    nameRu: 'Марс',
    color: '#c1440e',
    gradient: 'radial-gradient(circle at 35% 35%, #e8734a, #c1440e, #7a2a08)',
    size: 10,
    orbitRadius: 185,
    orbitDuration: 30,
    realDiameter: '6 792 км',
    realDistance: '227.9 млн км',
    orbitalPeriod: '687 дней',
    description: 'Красная планета — цвет от оксида железа. Имеет самый высокий вулкан — Олимп (21.9 км) и гигантский каньон Долины Маринер.',
    moons: 2,
    type: 'Скалистая',
    emoji: '♂'
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    nameRu: 'Юпитер',
    color: '#c88b3a',
    gradient: 'radial-gradient(circle at 35% 35%, #e8c87a, #c88b3a, #8b5e20)',
    size: 28,
    orbitRadius: 250,
    orbitDuration: 55,
    realDiameter: '142 984 км',
    realDistance: '778.6 млн км',
    orbitalPeriod: '11.86 лет',
    description: 'Крупнейшая планета — в 11 раз больше Земли. Большое Красное Пятно — гигантский шторм, бушующий более 350 лет. Имеет 95 спутников.',
    moons: 95,
    type: 'Газовый гигант',
    emoji: '♃'
  },
  {
    id: 'saturn',
    name: 'Saturn',
    nameRu: 'Сатурн',
    color: '#e4d191',
    gradient: 'radial-gradient(circle at 35% 35%, #f5e8b8, #e4d191, #b89e5a)',
    size: 24,
    orbitRadius: 320,
    orbitDuration: 80,
    realDiameter: '120 536 км',
    realDistance: '1 433.5 млн км',
    orbitalPeriod: '29.46 лет',
    description: 'Знаменита великолепными кольцами из льда и камней шириной 282 000 км, но толщиной всего ~10 м. Средняя плотность меньше воды!',
    hasRing: true,
    moons: 146,
    type: 'Газовый гигант',
    emoji: '♄'
  },
  {
    id: 'uranus',
    name: 'Uranus',
    nameRu: 'Уран',
    color: '#7ec8e3',
    gradient: 'radial-gradient(circle at 35% 35%, #b8e8f5, #7ec8e3, #4a8fa5)',
    size: 18,
    orbitRadius: 385,
    orbitDuration: 110,
    realDiameter: '51 118 км',
    realDistance: '2 872.5 млн км',
    orbitalPeriod: '84.01 лет',
    description: 'Ледяной гигант, вращающийся «на боку» — ось наклонена на 98°. Температура опускается до −224°C. Имеет 27 известных спутников.',
    moons: 27,
    type: 'Ледяной гигант',
    emoji: '♅'
  },
  {
    id: 'neptune',
    name: 'Neptune',
    nameRu: 'Нептун',
    color: '#3f54ba',
    gradient: 'radial-gradient(circle at 35% 35%, #6b7ee8, #3f54ba, #1a2a6c)',
    size: 17,
    orbitRadius: 440,
    orbitDuration: 140,
    realDiameter: '49 528 км',
    realDistance: '4 495.1 млн км',
    orbitalPeriod: '164.8 лет',
    description: 'Самая далёкая планета. Ветры достигают 2 100 км/ч — сильнейшие в Солнечной системе. Обнаружен математически, до наблюдения в телескоп.',
    moons: 16,
    type: 'Ледяной гигант',
    emoji: '♆'
  }
];

function generateStars(count: number) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 2 + Math.random() * 4,
      delay: Math.random() * 3,
      size: 1 + Math.random() * 1.5
    });
  }
  return stars;
}

function App() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [showLabels, setShowLabels] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const stars = useMemo(() => generateStars(250), []);

  // Responsive scaling
  useEffect(() => {
    const updateScale = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const minDim = Math.min(w, h);
      // Scale to fit the solar system in viewport
      const neededSize = 440 * 2 + 80; // max orbit * 2 + padding
      const newScale = Math.min(1, minDim / neededSize);
      setScale(newScale);
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const handlePlanetClick = useCallback((planet: PlanetData) => {
    setSelectedPlanet(prev => prev?.id === planet.id ? null : planet);
  }, []);

  const handleBackgroundClick = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.planet') || (e.target as HTMLElement).closest('.info-panel') || (e.target as HTMLElement).closest('.controls-panel')) return;
    setSelectedPlanet(null);
  }, []);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const getSpeedLabel = (s: number) => {
    if (s === 0.25) return '¼×';
    if (s === 0.5) return '½×';
    if (s === 1) return '1×';
    if (s === 2) return '2×';
    if (s === 4) return '4×';
    if (s === 8) return '8×';
    return `${s}×`;
  };

  return (
    <div
      ref={containerRef}
      className={`solar-system-container ${!isPlaying ? 'paused' : ''}`}
      onClick={handleBackgroundClick}
    >
      {/* Stars background */}
      <div className="stars">
        {stars.map(star => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              '--duration': `${star.duration}s`,
              '--delay': `${star.delay}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Solar system scaled container */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${scale})`,
          width: '100%',
          height: '100%',
          transformOrigin: 'center center',
        }}
      >
        {/* Sun */}
        <div className="sun" />

        {/* Orbit paths */}
        {planets.map(planet => (
          <div
            key={`orbit-${planet.id}`}
            className="orbit-path"
            style={{
              width: `${planet.orbitRadius * 2}px`,
              height: `${planet.orbitRadius * 2}px`,
            }}
          />
        ))}

        {/* Planets */}
        {planets.map(planet => (
          <div
            key={planet.id}
            className="planet-orbit"
            style={{
              width: '0px',
              height: '0px',
              '--orbit-duration': `${planet.orbitDuration / speed}s`,
            } as React.CSSProperties}
          >
            <div
              className={`planet ${selectedPlanet?.id === planet.id ? 'selected' : ''}`}
              style={{
                width: `${planet.size}px`,
                height: `${planet.size}px`,
                background: planet.gradient,
                left: `${planet.orbitRadius - planet.size / 2}px`,
                top: `${-planet.size / 2}px`,
                boxShadow: selectedPlanet?.id === planet.id
                  ? `0 0 ${planet.size}px ${planet.color}80, 0 0 ${planet.size * 2}px ${planet.color}40`
                  : `0 0 ${planet.size / 2}px ${planet.color}30`,
              }}
              onClick={(e) => {
                e.stopPropagation();
                handlePlanetClick(planet);
              }}
            >
              {showLabels && (
                <span className="planet-label" style={{ opacity: 0.8, fontSize: '11px' }}>
                  {planet.nameRu}
                </span>
              )}
              {planet.hasRing && (
                <div
                  className="saturn-ring"
                  style={{
                    width: `${planet.size * 2}px`,
                    height: `${planet.size * 0.6}px`,
                    borderWidth: '2px',
                    borderColor: 'rgba(210, 180, 140, 0.5)',
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Title */}
      <div className="absolute top-4 left-4 z-50 pointer-events-none">
        <h1 className="text-lg md:text-xl font-bold text-white/90 tracking-wide flex items-center gap-2">
          <span className="text-2xl">🌌</span> Солнечная Система
        </h1>
        <p className="text-xs text-white/40 mt-1 ml-9">Нажмите на планету для подробной информации</p>
      </div>

      {/* Planet list sidebar */}
      <div className="absolute top-4 left-4 mt-16 z-50 hidden md:flex flex-col gap-1">
        {planets.map(planet => (
          <button
            key={`list-${planet.id}`}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all ${
              selectedPlanet?.id === planet.id
                ? 'bg-white/15 text-white border border-white/20'
                : 'bg-transparent text-white/50 hover:text-white/80 hover:bg-white/5'
            }`}
            onClick={() => handlePlanetClick(planet)}
          >
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ background: planet.gradient }}
            />
            {planet.nameRu}
          </button>
        ))}
      </div>

      {/* Info Panel */}
      {selectedPlanet && (
        <div className="info-panel" onClick={e => e.stopPropagation()}>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-14 h-14 rounded-full flex-shrink-0 relative"
              style={{
                background: selectedPlanet.gradient,
                boxShadow: `0 0 20px ${selectedPlanet.color}50`,
              }}
            >
              {selectedPlanet.hasRing && (
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    width: '36px',
                    height: '10px',
                    border: '1.5px solid rgba(210, 180, 140, 0.6)',
                    borderRadius: '50%',
                    transform: 'translate(-50%, -50%) rotateX(70deg)',
                  }}
                />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{selectedPlanet.nameRu}</h2>
              <p className="text-sm text-blue-300/70">{selectedPlanet.name}</p>
              <span className="inline-block mt-1 px-2 py-0.5 text-[10px] rounded-full bg-white/10 text-white/60">
                {selectedPlanet.type}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-300/90 mb-4 leading-relaxed">
            {selectedPlanet.description}
          </p>

          <div className="space-y-0">
            <InfoRow icon="📏" label="Диаметр" value={selectedPlanet.realDiameter} />
            <InfoRow icon="☀️" label="До Солнца" value={selectedPlanet.realDistance} />
            <InfoRow icon="🔄" label="Орбит. период" value={selectedPlanet.orbitalPeriod} />
            <InfoRow icon="🌙" label="Спутники" value={String(selectedPlanet.moons)} />
          </div>

          <button
            className="mt-4 w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm text-gray-300 cursor-pointer"
            onClick={() => setSelectedPlanet(null)}
          >
            ✕ Закрыть
          </button>
        </div>
      )}

      {/* Controls Panel */}
      <div className="controls-panel" onClick={e => e.stopPropagation()}>
        <button
          className={`control-btn ${isPlaying ? '' : 'active'}`}
          onClick={togglePlay}
          title={isPlaying ? 'Пауза' : 'Воспроизведение'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>

        <div className="w-px h-6 bg-white/10" />

        <div className="speed-control">
          <span className="text-[10px] opacity-50">🐢</span>
          <input
            type="range"
            className="speed-slider"
            min="0.25"
            max="8"
            step="0.25"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
          />
          <span className="text-[10px] opacity-50">🐇</span>
          <span className="text-xs font-mono min-w-[36px] text-center text-blue-300">
            {getSpeedLabel(speed)}
          </span>
        </div>

        <div className="w-px h-6 bg-white/10" />

        <button
          className="control-btn"
          onClick={() => setSpeed(1)}
          title="Сбросить скорость"
        >
          ↺
        </button>

        <button
          className={`control-btn ${showLabels ? 'active' : ''}`}
          onClick={() => setShowLabels(!showLabels)}
          title="Показать/скрыть названия"
        >
          Aa
        </button>
      </div>

      {/* Mobile planet selector */}
      <div className="absolute bottom-20 left-0 right-0 z-50 md:hidden">
        <div className="flex justify-center gap-2 px-4 overflow-x-auto">
          {planets.map(planet => (
            <button
              key={`mobile-${planet.id}`}
              className={`flex-shrink-0 w-8 h-8 rounded-full border-2 transition-all ${
                selectedPlanet?.id === planet.id
                  ? 'border-white scale-125'
                  : 'border-white/20 hover:border-white/50'
              }`}
              style={{ background: planet.gradient }}
              onClick={() => handlePlanetClick(planet)}
              title={planet.nameRu}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-white/5">
      <span className="text-xs text-gray-400 flex items-center gap-1.5">
        <span>{icon}</span>
        {label}
      </span>
      <span className="text-sm font-medium text-white/90">{value}</span>
    </div>
  );
}

export default App;
