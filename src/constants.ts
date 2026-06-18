export const VERSION_URL = 'https://ddragon.leagueoflegends.com/api/versions.json'
export const CHAMP_DATA_URL = (v: string) => `https://ddragon.leagueoflegends.com/cdn/${v}/data/pt_BR/champion.json`
export const CHAMP_IMG_URL = (v: string, id: string) => `https://ddragon.leagueoflegends.com/cdn/${v}/img/champion/${id}.png`
export const SPLASH_URL = (id: string) => `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`

export const FLASH_MS = 50
export const ANSWER_MS = 3000
export const REVEAL_MS = 1200
