import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';

const Globe3D = () => {
  const globeEl = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const markers = [
    {
      lat: 28.6139,
      lng: 77.2090,
      size: 0.2,
      color: 'lime',
      label: 'Ghaziabad, India',
    }
  ];

  // Resize observer to make the globe responsive
  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.contentRect) {
          setDimensions({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  // Configure globe settings (rotation, zoom, etc.)
  useEffect(() => {
    const interval = setInterval(() => {
      if (globeEl.current && globeEl.current.controls) {
        const controls = globeEl.current.controls();
        if (controls) {
          controls.autoRotate = true;
          controls.autoRotateSpeed = 1.0;
          controls.enableDamping = true;
          controls.enableZoom = false;
          clearInterval(interval);
        }
      }
    }, 200);

    if (globeEl.current) {
      globeEl.current.pointOfView(
        { lat: 28.6139, lng: 77.2090, altitude: 1.8 },
        1500
      );
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-32 sm:h-40 lg:h-56 xl:h-64"
    >
      {dimensions.width > 0 && dimensions.height > 0 && (
        <Globe
          ref={globeEl}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundColor="rgba(0,0,0,0)"
          width={dimensions.width}
          height={dimensions.height}
          pointsData={markers}
          pointAltitude="size"
          pointColor={() => 'rgba(0,255,0,0.8)'}
          pointLabel="label"
          pointRadius={0.6}
          onPointClick={(point) => alert(point.label)}
        />
      )}
    </div>
  );
};

export default Globe3D;
