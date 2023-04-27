import classNames from 'classnames'

const Spinner = () => (
  <div
    role="status"
    className={classNames(
      'z-10',
      'opacity-100',
      'transition-opacity',
      'duration-300',
      'fixed',
      'top-1/2',
      'left-1/2',
      '-translate-y-1/2',
      '-translate-x-1/2'
    )}
  >
    <div
      className={classNames(
        'h-12',
        'w-12',
        'animate-spin',
        'rounded-[50%]',
        'border-8',
        'border-x-slate-700',
        'border-b-slate-700',
        'border-t-white'
      )}
    />
    <span className="sr-only">Laddar...</span>
  </div>
)

export default Spinner
