import { useEffect, useState } from "react";

interface Props {
  total: number;
  activeIndex: number;
  duration?: number; // in ms
  onNext?: () => void;
}

const TopProgressBar = ({
  total,
  activeIndex,
  duration = 3000,
  onNext,
}: Props) => {
  const [widths, setWidths] = useState<number[]>(Array(total).fill(0));

  useEffect(() => {
    if (activeIndex === 0) {
      setWidths(Array(total).fill(0));
    } else {
      const updated = widths.map((_, i) => {
        if (i < activeIndex) return 100;
        if (i === activeIndex) return 0;
        return 0;
      });
      setWidths(updated);
    }
    console.log(total, activeIndex, widths);

    const timer = setTimeout(() => {
      if (onNext) onNext();
    }, duration);

    // Animate current segment
    let frame: number;
    const start = performance.now();
    const animate = (time: number) => {
      const progress = Math.min(((time - start) / duration) * 100, 100);
      setWidths((prev) =>
        prev.map((w, i) => (i === activeIndex ? progress : w))
      );
      if (progress < 100) {
        frame = requestAnimationFrame(animate);
      }
    };
    frame = requestAnimationFrame(animate);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [activeIndex]);

  return (
    <div className="w-full h-5 px-2 pt-5 flex gap-1 z-50">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className="h-0.5 flex-1 bg-gray-400 bg-opacity-30 rounded-full overflow-hidden"
        >
          <div
            className="h-full bg-white rounded-full transition-all"
            style={{
              width: `${widths[index]}%`,
              transition: index === activeIndex ? "none" : "width 0.3s ease",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default TopProgressBar;
