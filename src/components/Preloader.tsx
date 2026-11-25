import { useEffect, useState } from 'react';
import { Dumbbell } from 'lucide-react';

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setFading(true), 260);
    const hideTimer = window.setTimeout(() => setVisible(false), 560);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B0C0E] text-zinc-100 transition-opacity duration-300 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-lime-400/30 bg-zinc-900 text-lime-400">
          <Dumbbell className="h-7 w-7" />
        </div>
        <span className="font-display text-2xl font-bold tracking-wide text-white">
          Center of Gravity Gym
        </span>
        <div className="h-0.5 w-36 overflow-hidden rounded-full bg-zinc-800">
          <div className="h-full w-full origin-left animate-[pulse_0.6s_ease-in-out_infinite] bg-lime-400" />
        </div>
      </div>
    </div>
  );
}
