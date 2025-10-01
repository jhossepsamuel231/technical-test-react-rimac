export const isDni = (v: string) => /^\d{8}$/.test(v)
export const isRuc = (v: string) => /^(10|20)\d{9}$/.test(v)
export const isPhone = (v: string) => /^\d{9}$/.test(v)
