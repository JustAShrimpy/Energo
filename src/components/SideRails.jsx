export default function SideRails() {
  return (
    <div className="side-rails" aria-hidden="true">
      <div className="side-rail rail-left">
        <span className="rail-line" />
        <span className="rail-pulse" />
        <span className="rail-pulse delay-2" />
        <span className="rail-node node-a" />
        <span className="rail-node node-b" />
        <span className="rail-node node-c" />
      </div>

      <div className="side-rail rail-right">
        <span className="rail-line" />
        <span className="rail-pulse" />
        <span className="rail-pulse delay-3" />
        <span className="rail-node node-a" />
        <span className="rail-node node-b" />
        <span className="rail-node node-c" />
      </div>

      <span className="side-orb orb-a" />
      <span className="side-orb orb-b" />
      <span className="side-orb orb-c" />
      <span className="side-orb orb-d" />
    </div>
  )
}
