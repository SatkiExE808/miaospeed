// Default ip_resolve script.
//
// Called by service/macros/geo.ExecIpCheck — must return an array of IP strings.
// The miaospeed JS VM exposes a built-in `fetch(url, opts)` that proxies through
// the node being tested; we use that to ask api.ipify.org / api6.ipify.org for
// the exit IPv4 + IPv6. Returns [] on full failure (geo macro tolerates empty).
function ip_resolve_default() {
  var out = [];
  try {
    var v4 = fetch("https://api.ipify.org", { timeout: 5000, retry: 1 });
    if (v4 && v4.body) {
      var ip = String(v4.body).trim();
      if (ip) out.push(ip);
    }
  } catch (e) {}
  try {
    var v6 = fetch("https://api6.ipify.org", { timeout: 5000, retry: 1 });
    if (v6 && v6.body) {
      var ip6 = String(v6.body).trim();
      if (ip6 && out.indexOf(ip6) < 0) out.push(ip6);
    }
  } catch (e) {}
  return out;
}
