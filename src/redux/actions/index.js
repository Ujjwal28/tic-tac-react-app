export function creator(flag) {
  return { type: "SET_CREATOR", flag: flag };
}

export function player(flag) {
  return { type: "SET_PLAYER", flag: flag };
}
