import { useMemo } from 'react'
import styles from './GlobalMap.module.css'

const EARTH_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg'

// Map layout: left 50% = 0° to 180° (right half of image), right 50% = -180° to 0° (left half of image)
function latLngToPercent(lat, lng) {
  let x
  if (lng >= 0 && lng <= 180) {
    x = (lng / 180) * 50
  } else if (lng >= -180 && lng < 0) {
    x = 50 + ((lng + 180) / 180) * 50
  } else {
    x = lng >= 0 ? 25 : 97.5
  }
  const y = ((90 - lat) / 180) * 100
  return { x, y }
}

const USA = { lat: 39.8283, lng: -98.5795, label: 'USA' }
const TOKYO = { lat: 35.6762, lng: 139.6503, label: 'Tokyo' }

export default function GlobalMap({ progress = 0 }) {
  const usaPos = useMemo(() => latLngToPercent(USA.lat, USA.lng), [])
  const tokyoPos = useMemo(() => latLngToPercent(TOKYO.lat, TOKYO.lng), [])

  const planePos = useMemo(() => {
    const t = Math.max(0, Math.min(100, progress)) / 100
    return {
      x: usaPos.x + (tokyoPos.x - usaPos.x) * t,
      y: usaPos.y + (tokyoPos.y - usaPos.y) * t,
    }
  }, [usaPos, tokyoPos, progress])

  // Angle so the nose points along the line toward Tokyo. Derivative direction is (dx, dy).
  // The ✈️ emoji typically has its nose pointing up; add 90° so "up" aligns with the line direction.
  const planeAngle = useMemo(() => {
    const dx = tokyoPos.x - usaPos.x
    const dy = tokyoPos.y - usaPos.y
    const rad = Math.atan2(dy, dx)
    return (-rad * 180) / Math.PI + 38
  }, [usaPos, tokyoPos])

  return (
    <div className={styles.wrap}>
      <div className={styles.worldMap} role="img" aria-label="World map centered on Pacific, USA and Tokyo">
        <div
          className={styles.worldMapPanner}
          style={{ backgroundImage: `url(${EARTH_IMAGE})` }}
          aria-hidden
        />
        <div
          className={styles.worldMapPannerAmericas}
          style={{ backgroundImage: `url(${EARTH_IMAGE})` }}
          aria-hidden
        />
        <svg className={styles.overlay} viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="globalMapRouteGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor="var(--success)" />
            </linearGradient>
          </defs>
          <path
            d={`M ${usaPos.x} ${usaPos.y} L ${tokyoPos.x} ${tokyoPos.y}`}
            fill="none"
            stroke="url(#globalMapRouteGrad)"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        </svg>
        <span
          className={styles.planeEmoji}
          style={{
            left: `${planePos.x}%`,
            top: `${planePos.y}%`,
            transform: `translate(-50%, -50%) rotate(${planeAngle}deg)`,
          }}
          aria-hidden
        >
          ✈️
        </span>
        <span
          className={styles.marker}
          style={{ left: `${usaPos.x}%`, top: `${usaPos.y}%` }}
          title="USA"
        >
          USA
        </span>
        <span
          className={styles.marker}
          style={{ left: `${tokyoPos.x}%`, top: `${tokyoPos.y}%` }}
          title="Tokyo"
        >
          Tokyo
        </span>
      </div>
    </div>
  )
}
