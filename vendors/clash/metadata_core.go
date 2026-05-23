//go:build core

package clash

import (
	"net/netip"
	"net/url"
	"strconv"

	"github.com/metacubex/mihomo/constant"
)

func urlToMetadata(rawURL string, network constant.NetWork) (addr constant.Metadata, err error) {
	u, err := url.Parse(rawURL)
	if err != nil {
		return
	}

	portStr := u.Port()
	if portStr == "" {
		switch u.Scheme {
		case "https":
			portStr = "443"
		case "http":
			portStr = "80"
		default:
			return
		}
	}

	portInt, err := strconv.Atoi(portStr)
	if err != nil {
		return
	}

	// Mihomo uses netip.Addr for DstIP and uint16 for DstPort (different from Dreamacro/clash).
	addr = constant.Metadata{
		NetWork: network,
		Host:    u.Hostname(),
		DstIP:   netip.Addr{},
		DstPort: uint16(portInt),
	}
	return
}
