import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Premium Neon Palette
                primary: {
                    DEFAULT: '#00F0FF', // Neon Teal
                    hover: '#00D7E6',
                },
                accent: {
                    DEFAULT: '#8A2BE2', // Electric Violet
                    hover: '#7A1ED1',
                },
                background: {
                    deep: '#050505',
                    dark: '#0A0A0A',
                },
                luxury: {
                    white: '#E0E0E0',
                    muted: '#B0B0B0',
                    border: 'rgba(255, 255, 255, 0.08)',
                }
            },
            fontFamily: {
                space: ['var(--font-display)', 'Space Grotesk', 'sans-serif'],
                inter: ['var(--font-main)', 'Inter', 'sans-serif'],
            },
            letterSpacing: {
                tighter: '-0.05em',
                tightest: '-0.08em',
                widest: '0.4em',
            },
            backdropBlur: {
                '3xl': '32px',
                '4xl': '40px',
            },
            backgroundImage: {
                'neural-gradient': 'radial-gradient(circle at 50% 0%, #111928 0%, #050505 40%)',
                'neon-glow': 'linear-gradient(180deg, rgba(0, 240, 255, 0.1) 0%, rgba(138, 43, 226, 0.1) 100%)',
            }
        },
    },
    plugins: [],
}
export default config
