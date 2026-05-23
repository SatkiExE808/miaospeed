// Minimal stub geoip handler. Replace with a real implementation if you want
// the built-in default to return a meaningful country/region. The signature
// matches what service/macros/geo/engine.go expects (called as handler()).
function handler() {
  return { country: "", region: "", asn: "", org: "" };
}
