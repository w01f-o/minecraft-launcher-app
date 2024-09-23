import { FC, InputHTMLAttributes } from 'react'
import clsx from 'clsx'

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  minify?: boolean
}

const Field: FC<FieldProps> = ({ minify, ...props }) => {
  return (
    <input
      {...props}
      className={clsx(
        'bg-blue_light rounded-2xl px-6 py-3 text-xl focus:outline-none focus:ring-2 transition',
        {
          'text-center w-28': minify
        }
      )}
    ></input>
  )
}

export default Field
