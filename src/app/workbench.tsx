"use client";

import { useRef, useState } from "react";

type Panel = { id: string; x: number; y: number; w: number; h: number; title: string; };

export default function Workbench() {
  const [panels, setPanels] = useState<Panel[]>([
    { id: "notes", x: 20,  y: 20,  w: 360, h: 220, title: "Notes" },
    { id: "tasks", x: 420, y: 20,  w: 360, h: 220, title: "Tasks" },
    { id: "logs",  x: 20,  y: 260, w: 760, h: 220, title: "Logs" },
  ]);

  const dragId = useRef<string | null>(null);
  const offset = useRef<{dx: number; dy: number}>({ dx: 0, dy: 0 });

  function onPointerDown(e: React.PointerEvent, id: string) {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragId.current = id;
    const p = panels.find(p => p.id === id)!;
    offset.current = { dx: e.clientX - p.x, dy: e.clientY - p.y };
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragId.current) return;
    setPanels(ps => ps.map(p =>
      p.id === dragId.current
        ? { ...p, x: e.clientX - offset.current.dx, y: e.clientY - offset.current.dy }
        : p
    ));
  }

  function onPointerUp(e: React.PointerEvent) {
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    dragId.current = null;
  }

  return (
    <div className="relative h-[70vh] rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900 to-black overflow-hidden"
         onPointerMove={onPointerMove} onPointerUp={onPointerUp}>
      {panels.map(p => (
        <div key={p.id}
             className="absolute card select-none"
             style={{ left: p.x, top: p.y, width: p.w, height: p.h }}>
          <div className="flex h-10 items-center justify-between border-b border-white/10"
               onPointerDown={(e) => onPointerDown(e, p.id)}>
            <div className="px-3 font-medium">{p.title}</div>
            <div className="px-3 text-xs text-white/50">drag</div>
          </div>
          <div className="p-3 h-[calc(100%-2.5rem)] overflow-auto text-sm text-white/80">
            {p.id === "notes" && <Notes />}
            {p.id === "tasks" && <Tasks />}
            {p.id === "logs"  && <Logs />}
          </div>
        </div>
      ))}
    </div>
  );
}

function Notes() {
  const [txt, setTxt] = useState("");
  return (
    <textarea value={txt} onChange={e => setTxt(e.target.value)}
      className="w-full h-full bg-transparent outline-none resize-none" placeholder="Write notes..." />
  );
}
function Tasks() {
  const [items, setItems] = useState<string[]>([]);
  const [inp, setInp] = useState("");
  return (
    <div className="space-y-2">
      <form onSubmit={e => { e.preventDefault(); if (inp.trim()) { setItems(i=>[...i, inp.trim()]); setInp(""); }}}>
        <input value={inp} onChange={e=>setInp(e.target.value)} placeholder="Add task..."
          className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none" />
      </form>
      <ul className="space-y-1">{items.map((t,i)=><li key={i}>• {t}</li>)}</ul>
    </div>
  );
}
function Logs() {
  const [logs, setLogs] = useState<string[]>(["Workbench ready (no 3D)."]);
  return (
    <div className="space-y-2">
      <button className="btn" onClick={()=>setLogs(l=>[...l, `Ping @ ${new Date().toLocaleTimeString()}`])}>Add Log</button>
      <ul className="text-xs space-y-1">{logs.map((l,i)=><li key={i}>{l}</li>)}</ul>
    </div>
  );
}
