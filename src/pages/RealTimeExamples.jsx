import { useState } from 'react'

export default function RealTimeExamples() {
  const [selected, setSelected] = useState('root')

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem', color: '#fff' }}>
      <h1 style={{ color: '#00d4ff', textAlign: 'center', marginBottom: '2rem' }}>Real-Time Examples</h1>
      
      <div style={{ background: '#0a0e27', border: '2px solid #00d4ff', borderRadius: '8px', padding: '2rem', marginBottom: '2rem' }}>
        <button 
          onClick={() => setSelected('root')}
          style={{ padding: '1rem 2rem', background: selected === 'root' ? '#a78bfa' : '#00d4ff', color: '#0a0e27', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 'bold' }}
        >
          🔍 Search Algorithms
        </button>

        {selected === 'root' && (
          <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setSelected('linear')}
              style={{ padding: '1rem 2rem', background: '#00d4ff', color: '#0a0e27', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}
            >
              📍 Linear Search
            </button>
            <button 
              onClick={() => setSelected('binary')}
              style={{ padding: '1rem 2rem', background: '#00d4ff', color: '#0a0e27', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}
            >
              ⚡ Binary Search
            </button>
          </div>
        )}

        {selected === 'linear' && (
          <div style={{ marginTop: '2rem', background: 'rgba(167, 139, 250, 0.1)', border: '2px solid #a78bfa', borderRadius: '8px', padding: '1.5rem' }}>
            <h3 style={{ color: '#a78bfa', marginBottom: '1rem' }}>Linear Search Examples</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ color: '#e0e0e0', padding: '0.5rem 0' }}>▸ Searching name in attendance sheet</li>
              <li style={{ color: '#e0e0e0', padding: '0.5rem 0' }}>▸ Finding contact in phone</li>
              <li style={{ color: '#e0e0e0', padding: '0.5rem 0' }}>▸ Checking items in shopping list</li>
            </ul>
          </div>
        )}

        {selected === 'binary' && (
          <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setSelected('2d')}
              style={{ padding: '1rem 2rem', background: '#00d4ff', color: '#0a0e27', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}
            >
              📐 2D Binary Search
            </button>
            <button 
              onClick={() => setSelected('3d')}
              style={{ padding: '1rem 2rem', background: '#00d4ff', color: '#0a0e27', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}
            >
              🎯 3D Binary Search
            </button>
          </div>
        )}

        {selected === '2d' && (
          <div style={{ marginTop: '2rem', background: 'rgba(167, 139, 250, 0.1)', border: '2px solid #a78bfa', borderRadius: '8px', padding: '1.5rem' }}>
            <h3 style={{ color: '#a78bfa', marginBottom: '1rem' }}>2D Binary Search Examples</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ color: '#e0e0e0', padding: '0.5rem 0' }}>▸ Finding coordinates in grid</li>
              <li style={{ color: '#e0e0e0', padding: '0.5rem 0' }}>▸ Searching in 2D matrices</li>
              <li style={{ color: '#e0e0e0', padding: '0.5rem 0' }}>▸ Image processing</li>
            </ul>
          </div>
        )}

        {selected === '3d' && (
          <div style={{ marginTop: '2rem', background: 'rgba(167, 139, 250, 0.1)', border: '2px solid #a78bfa', borderRadius: '8px', padding: '1.5rem' }}>
            <h3 style={{ color: '#a78bfa', marginBottom: '1rem' }}>3D Binary Search Examples</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ color: '#e0e0e0', padding: '0.5rem 0' }}>▸ Medical CT scan search</li>
              <li style={{ color: '#e0e0e0', padding: '0.5rem 0' }}>▸ Game engine spatial data</li>
              <li style={{ color: '#e0e0e0', padding: '0.5rem 0' }}>▸ 3D model vertex search</li>
            </ul>
          </div>
        )}
      </div>

      <div style={{ background: '#0a0e27', border: '2px solid #00d4ff', borderRadius: '8px', padding: '2rem' }}>
        <h2 style={{ color: '#00d4ff', textAlign: 'center', marginBottom: '2rem' }}>Advanced Algorithm Comparison</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: 'rgba(0, 212, 255, 0.2)', borderBottom: '2px solid #00d4ff' }}>
                <th style={{ padding: '1rem', color: '#00d4ff', textAlign: 'left', borderRight: '1px solid #00d4ff' }}>Algorithm</th>
                <th style={{ padding: '1rem', color: '#00d4ff', textAlign: 'left', borderRight: '1px solid #00d4ff' }}>Time</th>
                <th style={{ padding: '1rem', color: '#00d4ff', textAlign: 'left', borderRight: '1px solid #00d4ff' }}>Space</th>
                <th style={{ padding: '1rem', color: '#00d4ff', textAlign: 'left', borderRight: '1px solid #00d4ff' }}>Best For</th>
                <th style={{ padding: '1rem', color: '#00d4ff', textAlign: 'left', borderRight: '1px solid #00d4ff' }}>Pros</th>
                <th style={{ padding: '1rem', color: '#00d4ff', textAlign: 'left' }}>Cons</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(0, 212, 255, 0.2)' }}>
                <td style={{ padding: '1rem', color: '#e0e0e0', borderRight: '1px solid rgba(0, 212, 255, 0.1)' }}>Linear Search</td>
                <td style={{ padding: '1rem', color: '#e0e0e0', borderRight: '1px solid rgba(0, 212, 255, 0.1)' }}>O(n)</td>
                <td style={{ padding: '1rem', color: '#e0e0e0', borderRight: '1px solid rgba(0, 212, 255, 0.1)' }}>O(1)</td>
                <td style={{ padding: '1rem', color: '#e0e0e0', borderRight: '1px solid rgba(0, 212, 255, 0.1)' }}>Unsorted</td>
                <td style={{ padding: '1rem', color: '#e0e0e0', borderRight: '1px solid rgba(0, 212, 255, 0.1)' }}>Simple</td>
                <td style={{ padding: '1rem', color: '#e0e0e0' }}>Slow</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(0, 212, 255, 0.2)' }}>
                <td style={{ padding: '1rem', color: '#e0e0e0', borderRight: '1px solid rgba(0, 212, 255, 0.1)' }}>Binary Search</td>
                <td style={{ padding: '1rem', color: '#e0e0e0', borderRight: '1px solid rgba(0, 212, 255, 0.1)' }}>O(log n)</td>
                <td style={{ padding: '1rem', color: '#e0e0e0', borderRight: '1px solid rgba(0, 212, 255, 0.1)' }}>O(1)</td>
                <td style={{ padding: '1rem', color: '#e0e0e0', borderRight: '1px solid rgba(0, 212, 255, 0.1)' }}>Sorted</td>
                <td style={{ padding: '1rem', color: '#e0e0e0', borderRight: '1px solid rgba(0, 212, 255, 0.1)' }}>Fast</td>
                <td style={{ padding: '1rem', color: '#e0e0e0' }}>Needs sort</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(0, 212, 255, 0.2)' }}>
                <td style={{ padding: '1rem', color: '#e0e0e0', borderRight: '1px solid rgba(0, 212, 255, 0.1)' }}>2D Binary</td>
                <td style={{ padding: '1rem', color: '#e0e0e0', borderRight: '1px solid rgba(0, 212, 255, 0.1)' }}>O(log n × log m)</td>
                <td style={{ padding: '1rem', color: '#e0e0e0', borderRight: '1px solid rgba(0, 212, 255, 0.1)' }}>O(1)</td>
                <td style={{ padding: '1rem', color: '#e0e0e0', borderRight: '1px solid rgba(0, 212, 255, 0.1)' }}>2D data</td>
                <td style={{ padding: '1rem', color: '#e0e0e0', borderRight: '1px solid rgba(0, 212, 255, 0.1)' }}>Efficient</td>
                <td style={{ padding: '1rem', color: '#e0e0e0' }}>Complex</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(0, 212, 255, 0.2)' }}>
                <td style={{ padding: '1rem', color: '#e0e0e0', borderRight: '1px solid rgba(0, 212, 255, 0.1)' }}>3D Binary</td>
                <td style={{ padding: '1rem', color: '#e0e0e0', borderRight: '1px solid rgba(0, 212, 255, 0.1)' }}>O(log n × log m × log p)</td>
                <td style={{ padding: '1rem', color: '#e0e0e0', borderRight: '1px solid rgba(0, 212, 255, 0.1)' }}>O(1)</td>
                <td style={{ padding: '1rem', color: '#e0e0e0', borderRight: '1px solid rgba(0, 212, 255, 0.1)' }}>3D space</td>
                <td style={{ padding: '1rem', color: '#e0e0e0', borderRight: '1px solid rgba(0, 212, 255, 0.1)' }}>Powerful</td>
                <td style={{ padding: '1rem', color: '#e0e0e0' }}>Very complex</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', color: '#e0e0e0', borderRight: '1px solid rgba(0, 212, 255, 0.1)' }}>Jump Search</td>
                <td style={{ padding: '1rem', color: '#e0e0e0', borderRight: '1px solid rgba(0, 212, 255, 0.1)' }}>O(√n)</td>
                <td style={{ padding: '1rem', color: '#e0e0e0', borderRight: '1px solid rgba(0, 212, 255, 0.1)' }}>O(1)</td>
                <td style={{ padding: '1rem', color: '#e0e0e0', borderRight: '1px solid rgba(0, 212, 255, 0.1)' }}>Sorted</td>
                <td style={{ padding: '1rem', color: '#e0e0e0', borderRight: '1px solid rgba(0, 212, 255, 0.1)' }}>Better</td>
                <td style={{ padding: '1rem', color: '#e0e0e0' }}>Slower</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
