// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// @ts-nocheck

export default function Card({ children, className }) {
  return <div className={`card ${className}`}>{children}</div>
}
