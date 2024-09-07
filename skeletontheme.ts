/* c8 ignore start */
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const canvas: CustomThemeConfig = {
	name: 'canvas',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `system-ui`,
		'--theme-font-family-heading': `system-ui`,
		'--theme-font-color-base': 'var(--color-surface-600)',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '9999px',
		'--theme-rounded-container': '24px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': 'var(--color-surface-600)',
		'--on-secondary': 'var(--color-surface-600)',
		'--on-tertiary': 'var(--color-surface-600)',
		'--on-success': 'var(--color-surface-600)',
		'--on-warning': 'var(--color-surface-600)',
		'--on-error': 'var(--color-surface-600)',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #96aae8
		'--color-primary-50': '239 242 252', // #eff2fc
		'--color-primary-100': '234 238 250', // #eaeefa
		'--color-primary-200': '229 234 249', // #e5eaf9
		'--color-primary-300': '213 221 246', // #d5ddf6
		'--color-primary-400': '182 196 239', // #b6c4ef
		'--color-primary-500': '150 170 232', // #96aae8
		'--color-primary-600': '135 153 209', // #8799d1
		'--color-primary-700': '113 128 174', // #7180ae
		'--color-primary-800': '90 102 139', // #5a668b
		'--color-primary-900': '74 83 114', // #4a5372
		// secondary | #ab96e8
		'--color-secondary-50': '242 239 252', // #f2effc
		'--color-secondary-100': '238 234 250', // #eeeafa
		'--color-secondary-200': '234 229 249', // #eae5f9
		'--color-secondary-300': '221 213 246', // #ddd5f6
		'--color-secondary-400': '196 182 239', // #c4b6ef
		'--color-secondary-500': '171 150 232', // #ab96e8
		'--color-secondary-600': '154 135 209', // #9a87d1
		'--color-secondary-700': '128 113 174', // #8071ae
		'--color-secondary-800': '103 90 139', // #675a8b
		'--color-secondary-900': '84 74 114', // #544a72
		// tertiary | #96d3e8
		'--color-tertiary-50': '239 248 252', // #eff8fc
		'--color-tertiary-100': '234 246 250', // #eaf6fa
		'--color-tertiary-200': '229 244 249', // #e5f4f9
		'--color-tertiary-300': '213 237 246', // #d5edf6
		'--color-tertiary-400': '182 224 239', // #b6e0ef
		'--color-tertiary-500': '150 211 232', // #96d3e8
		'--color-tertiary-600': '135 190 209', // #87bed1
		'--color-tertiary-700': '113 158 174', // #719eae
		'--color-tertiary-800': '90 127 139', // #5a7f8b
		'--color-tertiary-900': '74 103 114', // #4a6772
		// success | #aae896
		'--color-success-50': '242 252 239', // #f2fcef
		'--color-success-100': '238 250 234', // #eefaea
		'--color-success-200': '234 249 229', // #eaf9e5
		'--color-success-300': '221 246 213', // #ddf6d5
		'--color-success-400': '196 239 182', // #c4efb6
		'--color-success-500': '170 232 150', // #aae896
		'--color-success-600': '153 209 135', // #99d187
		'--color-success-700': '128 174 113', // #80ae71
		'--color-success-800': '102 139 90', // #668b5a
		'--color-success-900': '83 114 74', // #53724a
		// warning | #e8d496
		'--color-warning-50': '252 249 239', // #fcf9ef
		'--color-warning-100': '250 246 234', // #faf6ea
		'--color-warning-200': '249 244 229', // #f9f4e5
		'--color-warning-300': '246 238 213', // #f6eed5
		'--color-warning-400': '239 225 182', // #efe1b6
		'--color-warning-500': '232 212 150', // #e8d496
		'--color-warning-600': '209 191 135', // #d1bf87
		'--color-warning-700': '174 159 113', // #ae9f71
		'--color-warning-800': '139 127 90', // #8b7f5a
		'--color-warning-900': '114 104 74', // #72684a
		// error | #e89daa
		'--color-error-50': '252 240 242', // #fcf0f2
		'--color-error-100': '250 235 238', // #faebee
		'--color-error-200': '249 231 234', // #f9e7ea
		'--color-error-300': '246 216 221', // #f6d8dd
		'--color-error-400': '239 186 196', // #efbac4
		'--color-error-500': '232 157 170', // #e89daa
		'--color-error-600': '209 141 153', // #d18d99
		'--color-error-700': '174 118 128', // #ae7680
		'--color-error-800': '139 94 102', // #8b5e66
		'--color-error-900': '114 77 83', // #724d53
		// surface | #41445a
		'--color-surface-50': '227 227 230', // #e3e3e6
		'--color-surface-100': '217 218 222', // #d9dade
		'--color-surface-200': '208 208 214', // #d0d0d6
		'--color-surface-300': '179 180 189', // #b3b4bd
		'--color-surface-400': '122 124 140', // #7a7c8c
		'--color-surface-500': '65 68 90', // #41445a
		'--color-surface-600': '59 61 81', // #3b3d51
		'--color-surface-700': '49 51 68', // #313344
		'--color-surface-800': '39 41 54', // #272936
		'--color-surface-900': '32 33 44' // #20212c
	}
};
/* c8 ignore stop */
