// Minimal stub for ip_resolve_default(). Returns empty strings so callers
// fall back to their own discovery. Replace with a real implementation
// (e.g. fetch from ifconfig.me / ipinfo.io) if you want a meaningful default.
function ip_resolve_default() {
  return { in: "", out: "" };
}
