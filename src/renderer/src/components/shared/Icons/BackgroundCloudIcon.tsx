import { FC, SVGAttributes } from 'react'

interface BackgroundCloudProps extends SVGAttributes<HTMLOrSVGElement> {
  variant?: 'left' | 'top' | 'bottom'
}

const BackgroundCloudIcon: FC<BackgroundCloudProps> = ({ variant, ...props }) => {
  switch (variant) {
    case 'left':
      return (
        <svg width="129" height="419" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M68.386 50.111c0 51.321-11.769 60.639 5.35 80.19 17.12 19.551 48.675 49.576 51.97 63.387 3.294 13.812 8.559 49.336-18.343 66.443-26.901 17.107-56.554 30.854-53.497 68.734 3.057 37.88-17.069 63.642-27.514 71.789-14.01 10.182-45.702 27.035-60.376 12.982-14.673-14.052 14.776-280.28 31.335-411.638C21.003-3.348 68.387-1.21 68.387 50.11Z"
            fill="url(#a)"
          />
          <defs>
            <radialGradient
              id="a"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="rotate(63.564 -165.32 110.79) scale(552.404 179.377)"
            >
              <stop stopColor="#ACBFEF" />
              <stop offset="1" stopColor="#CFDBF9" />
            </radialGradient>
          </defs>
        </svg>
      )

    case 'top':
      return (
        <svg width="411" height="189" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.636 78.054c24.695 29.77 62.88 24.808 78.887 18.606C109.443 90 146.8 78.054 158.377 78.744c11.577.689 25.106.964 43.216 24.118s22.722 26.875 24.01 27.564c9.832 6.202 35.396 14.885 58.994 0 23.598-14.884 30.098-28.942 36.357-32.388 6.258-3.445 23.048-18.33 63.11-3.445C424.125 109.478 438.713 163.733 441 189L429.338-26 13.636-1.882c-10.29 14.242-24.696 50.167 0 79.936Z"
            fill="#BBCCF4"
          />
        </svg>
      )

    case 'bottom':
      return (
        <svg width="258" height="76" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M94.692.257c59.136-3.929 82.718 38.421 98.357 47.26 15.639 8.838 32.989 15.548 39.71 17.799 5.498 2.046 18.205 9.82 25.047 24.55 6.842 14.731-169.02 6.138-257.806 0C6.924 61.634 35.555 4.186 94.692.257Z"
            fill="url(#a)"
          />
          <defs>
            <radialGradient
              id="a"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="matrix(32.28145 66.3884 -384.83447 187.12628 129 49)"
            >
              <stop stopColor="#ACBFEF" />
              <stop offset="1" stopColor="#BFCEF4" />
            </radialGradient>
          </defs>
        </svg>
      )

    default:
      return null
  }
}

export default BackgroundCloudIcon
