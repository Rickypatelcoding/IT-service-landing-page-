export default function MaterialIcon({ children, sx = {}, className = '', ...props }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={sx}
      aria-hidden="true"
      {...props}
    >
      {children}
    </span>
  )
}
