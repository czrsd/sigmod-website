import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const eslintConfig = [
    ...nextVitals,
    ...nextTypescript,
    {
        ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
    },
    {
        rules: {
            'react/display-name': 'off',
            'react-hooks/set-state-in-effect': 'warn',
            'react-hooks/refs': 'warn',
        },
    },
];

export default eslintConfig;
