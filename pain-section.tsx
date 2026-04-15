@import 'tailwindcss';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));

:root {
  /* NiStor Brand Colors */
  --navy: #0D2137;
  --teal: #0D7377;
  --light-teal: #7EC8C8;
  --white: #FFFFFF;
  --gray: #F7F8FA;
  
  --background: var(--white);
  --foreground: var(--navy);
  --card: var(--white);
  --card-foreground: var(--navy);
  --popover: var(--white);
  --popover-foreground: var(--navy);
  --primary: var(--teal);
  --primary-foreground: var(--white);
  --secondary: var(--gray);
  --secondary-foreground: var(--navy);
  --muted: var(--gray);
  --muted-foreground: #64748b;
  --accent: var(--light-teal);
  --accent-foreground: var(--navy);
  --destructive: #ef4444;
  --destructive-foreground: var(--white);
  --border: #e2e8f0;
  --input: #e2e8f0;
  --ring: var(--teal);
  --radius: 0.5rem;
}

@theme inline {
  --font-sans: 'Arial', sans-serif;
  --font-serif: 'Georgia', serif;
  --font-mono: 'Geist Mono', monospace;
  
  /* NiStor Custom Colors */
  --color-navy: #0D2137;
  --color-teal: #0D7377;
  --color-light-teal: #7EC8C8;
  --color-gray: #F7F8FA;
  
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
