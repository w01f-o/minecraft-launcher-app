import { FC, InputHTMLAttributes } from 'react'

interface ToggleSwitcherProps extends InputHTMLAttributes<HTMLInputElement> {}

const ToggleSwitcher: FC<ToggleSwitcherProps> = ({ ...props }) => {
  return (
    <label className="inline-flex items-center cursor-pointer select-none text-dark dark:text-white">
      <div className="relative">
        <input type="checkbox" className="peer sr-only" {...props} />
        <div className="block h-8 rounded-full box bg-white w-14 peer-checked:bg-blue transition duration-150 ring-2 ring-blue"></div>
        <div className="absolute flex items-center justify-center w-6 h-6 transition duration-150 bg-blue rounded-full dot left-1 top-1 peer-checked:translate-x-full peer-checked:bg-white"></div>
      </div>
    </label>
  )
}

export default ToggleSwitcher
