export const lightTheme = {
  bg: '#FAFAF7',
  bgSecondary: '#F5F0E8',
  bgAvantPropos: 'linear-gradient(170deg, #F7F2EA 0%, #EDE6D8 40%, #F0EBE1 100%)',
  text: '#1A1A1A',
  textSecondary: '#3A3A3A',
  textMuted: '#6B6B6B',
  textLight: '#9A9A9A',
  textVeryLight: '#BFBFBF',
  border: '#E8E5DF',
  borderLight: '#D8D5CF',
  billet: '#2C4A7C',
  avantPropos: '#B8860B',
  pensee: '#6B4C8C',
  cardBg: '#FAFAF7',
  ornament: '#C4B08A',
  ornamentLight: '#D4C4A4',
}

export const darkTheme = {
  bg: '#0F0F0F',
  bgSecondary: '#1A1814',
  bgAvantPropos: 'linear-gradient(170deg, #1A1814 0%, #1F1B14 40%, #1C1812 100%)',
  text: '#F0EDE5',
  textSecondary: '#D0CDC5',
  textMuted: '#8A8A8A',
  textLight: '#6A6A6A',
  textVeryLight: '#4A4A4A',
  border: '#2A2A2A',
  borderLight: '#3A3A3A',
  billet: '#7BA3D9',
  avantPropos: '#D4AE51',
  pensee: '#A78CC7',
  cardBg: '#0F0F0F',
  ornament: '#5A4C36',
  ornamentLight: '#4A3F2C',
}

export function getTheme(isDark: boolean) {
  return isDark ? darkTheme : lightTheme
}