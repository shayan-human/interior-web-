export default function GoldDivider({ width = "60px" }: { width?: string }) {
  return (
    <div
      style={{
        height: "1px",
        background: "var(--gold)",
        opacity: 0.4,
        width: width,
      }}
    />
  );
}
