'use client';

import { useEffect, useRef, useState } from 'react';

export default function Whiteboard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [stroke, setStroke] = useState(3);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#fff';
  }, []);

  function pos(e: React.PointerEvent) {
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function down(e: React.PointerEvent) {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const { x, y } = pos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = stroke;
    setDrawing(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  function move(e: React.PointerEvent) {
    if (!drawing) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const { x, y } = pos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function up(e: React.PointerEvent) {
    setDrawing(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  }

  function clear() {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-2">
        <button className="btn" onClick={clear}>
          Clear
        </button>
        <label className="text-sm text-white/70">Stroke: {stroke}px</label>
        <input
          type="range"
          min={1}
          max={20}
          value={stroke}
          onChange={(e) => setStroke(parseInt(e.target.value))}
          className="w-40"
          title="Stroke width"
        />
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/40 h-[70vh] overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full touch-none"
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
        />
      </div>
    </div>
  );
}
