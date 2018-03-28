import CryptoJS from 'crypto-js'

export function create_jwt(data) {
  var header = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify({ alg: 'HS256', typ: 'JWT' })))
  var payload = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(data)))

  return header + '.' + payload + '.' + CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(header + '.' + payload, 'secret'))
}