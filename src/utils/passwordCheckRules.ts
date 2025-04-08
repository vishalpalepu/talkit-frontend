const passwordCheckRules = (password : string ="", name : string ="") => {
  return {
  noName : !password.toLowerCase().includes(name.toLowerCase()),
  hasNumber : /[0-9]/.test(password),
  hasUpper : /[A-Z]/.test(password),
  hasLower : /[a-z]/.test(password),
  hasSymbol : /[!@#$%^&*(),.?":{}|<>]/.test(password)}
}
export default passwordCheckRules;