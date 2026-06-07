export const colors = {
  primary: '#2D6A4F',
  primaryLight: '#52B788',
  primaryDark: '#1B4332',
  accent: '#F77F00',
  accentLight: '#FBBF24',
  background: '#F9FAFB',
  surface: '#FFFFFF',
  surfaceAlt: '#F3F4F6',
  text: '#111827',
  textSecondary: '#6B7280',
  textDisabled: '#9CA3AF',
  textInverse: '#FFFFFF',
  border: '#E5E7EB',
  borderFocus: '#2D6A4F',
  error: '#DC2626',
  errorLight: '#FEE2E2',
  success: '#16A34A',
  successLight: '#DCFCE7',
  overlay: 'rgba(0,0,0,0.5)',
};

export const typography = {
  h1: { fontSize: 28, fontWeight: '700', lineHeight: 36, color: colors.text },
  h2: { fontSize: 22, fontWeight: '700', lineHeight: 30, color: colors.text },
  h3: { fontSize: 18, fontWeight: '600', lineHeight: 26, color: colors.text },
  body: { fontSize: 16, fontWeight: '400', lineHeight: 24, color: colors.text },
  bodySmall: { fontSize: 14, fontWeight: '400', lineHeight: 20, color: colors.text },
  caption: { fontSize: 12, fontWeight: '400', lineHeight: 16, color: colors.textSecondary },
  buttonLabel: { fontSize: 16, fontWeight: '600' },
  buttonLabelSmall: { fontSize: 14, fontWeight: '600' },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 6,
  md: 12,
  lg: 20,
  full: 9999,
};

export const shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
};
