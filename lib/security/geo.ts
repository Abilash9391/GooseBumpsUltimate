import geoip from "geoip-lite";

export function getLocation(ip: string) {
  const geo = geoip.lookup(ip);

  return {
    country: geo?.country,
    city: geo?.city,
    region: geo?.region,
  };
}