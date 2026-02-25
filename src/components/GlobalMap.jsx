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
// North Pacific arc (typical transpacific route over Alaska/Bering Sea)
const ARC_NORTH = { lat: 58, lng: 180 }
// Rotation offset so plane nose aligns with arc (emoji default varies by OS; try 0, 45, 90 if sharp)
const PLANE_NOSE_OFFSET_DEG = 40

export default function GlobalMap({ progress = 0 }) {
  const usaPos = useMemo(() => latLngToPercent(USA.lat, USA.lng), [])
  const tokyoPos = useMemo(() => latLngToPercent(TOKYO.lat, TOKYO.lng), [])
  const arcPos = useMemo(() => latLngToPercent(ARC_NORTH.lat, ARC_NORTH.lng), [])

  // Quadratic Bezier: start (USA), control (arc north), end (Tokyo). B(t) = (1-t)²P0 + 2(1-t)tP1 + t²P2
  const pathD = useMemo(
    () => `M ${usaPos.x} ${usaPos.y} Q ${arcPos.x} ${arcPos.y} ${tokyoPos.x} ${tokyoPos.y}`,
    [usaPos, arcPos, tokyoPos]
  )

  const planePos = useMemo(() => {
    const t = Math.max(0, Math.min(1, progress / 100))
    const x = (1 - t) ** 2 * usaPos.x + 2 * (1 - t) * t * arcPos.x + t ** 2 * tokyoPos.x
    const y = (1 - t) ** 2 * usaPos.y + 2 * (1 - t) * t * arcPos.y + t ** 2 * tokyoPos.y
    return { x, y }
  }, [usaPos, arcPos, tokyoPos, progress])

  // Tangent angle along the curve at t so the plane nose is inline with the arc.
  // B'(t) = 2(1-t)(P1-P0) + 2t(P2-P1). Emoji nose direction varies by OS; offset via PLANE_NOSE_OFFSET_DEG.
  const planeAngle = useMemo(() => {
    const t = Math.max(0, Math.min(1, progress / 100))
    const dx = 2 * (1 - t) * (arcPos.x - usaPos.x) + 2 * t * (tokyoPos.x - arcPos.x)
    const dy = 2 * (1 - t) * (arcPos.y - usaPos.y) + 2 * t * (tokyoPos.y - arcPos.y)
    const rad = Math.atan2(dy, dx)
    return (rad * 180) / Math.PI + PLANE_NOSE_OFFSET_DEG
  }, [usaPos, arcPos, tokyoPos, progress])

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
          {/* Path goes USA → Tokyo. Traversed = Tokyo to plane = end of path (blue). Untraversed = USA to plane = start of path (white). */}
          <path
            d={pathD}
            fill="none"
            stroke="white"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={100}
            strokeDasharray={progress <= 0 ? '0 100' : `${progress} ${100 - progress}`}
            strokeDashoffset={0}
          />
          <path
            d={pathD}
            fill="none"
            stroke="#2563eb"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={100}
            strokeDasharray={progress >= 100 ? '0 100' : `${100 - progress} ${progress}`}
            strokeDashoffset={progress >= 100 ? 0 : -progress}
          />
        </svg>
        <span
          className={styles.planeEmoji}
          style={{
            left: `${planePos.x}%`,
            top: `${planePos.y}%`,
            transform: `translate(-50%, -50%) rotate(${planeAngle}deg)`,
          }}
          title={`${Math.round(progress)}% of the way to Tokyo`}
          aria-hidden
        >
          ✈️
        </span>
        <div
          className={styles.markerWrap}
          style={{ left: `${usaPos.x}%`, top: `${usaPos.y}%` }}
          title="USA"
        >
          <span className={styles.markerTip} aria-hidden />
          <span className={styles.marker}>USA</span>
        </div>
        <div
          className={styles.markerWrap}
          style={{ left: `${tokyoPos.x}%`, top: `${tokyoPos.y}%` }}
          title="Tokyo"
        >
          <span className={styles.markerTip} aria-hidden />
          <span className={styles.marker}>Tokyo</span>
        </div>
      </div>
    </div>
  )
}
