export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getExpiry() {
  return new Date(Date.now() + 10 * 60 * 1000); // 10 min
}