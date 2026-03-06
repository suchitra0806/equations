"use client";

interface SkeletonCardProps {
  lines?: number;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ lines = 3 }) => {
  const safeLines = Math.max(1, Math.min(lines, 6));

  return (
    <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-secondary)] px-4 py-3 shimmer">
      <div className="h-4 w-20 rounded-full bg-[color:var(--bg-tertiary)] mb-3" />
      {Array.from({ length: safeLines }).map((_, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className="h-3 w-full rounded-full bg-[color:var(--bg-tertiary)] mb-2 last:mb-0"
        />
      ))}
    </div>
  );
};

export default SkeletonCard;

