// Default geoip script.
//
// Called by service/macros/geo with `ip` available via the closure that the
// engine sets up; expected to return { country, region, asn, org, ... } for
// that IP. We fetch ipinfo.io directly (useHost=true so it doesn't go through
// the proxy being tested); if it fails we return a minimal stub so the
// geo-check macro doesn't crash on a nil result.
function handler(ip) {
  try {
    var url = "https://ipinfo.io/" + ip + "/json";
    var r = fetch(url, { timeout: 5000, retry: 1, useHost: true });
    if (r && r.body) {
      var d = safeParse(r.body);
      if (d && d.ip) {
        return {
          ip:                  d.ip || ip,
          country:             d.country || "",
          country_code:        d.country || "",
          city:                d.city || "",
          region:              d.region || "",
          continent_code:      "",
          organization:        d.org || "",
          isp:                 d.org || "",
          asn:                 d.org ? (parseInt(String(d.org).replace(/^AS/, "")) || 0) : 0,
          asn_organization:    d.org || "",
          longitude:           d.loc ? (parseFloat(String(d.loc).split(",")[1]) || 0) : 0,
          latitude:            d.loc ? (parseFloat(String(d.loc).split(",")[0]) || 0) : 0,
          timezone:            d.timezone || "",
          stackType:           ip.indexOf(":") < 0 ? "IPv4" : "IPv6",
        };
      }
    }
  } catch (e) {}
  return { ip: ip, country: "", country_code: "", city: "", region: "",
           continent_code: "", organization: "", isp: "", asn: 0,
           asn_organization: "", longitude: 0, latitude: 0, timezone: "",
           stackType: ip.indexOf(":") < 0 ? "IPv4" : "IPv6" };
}
