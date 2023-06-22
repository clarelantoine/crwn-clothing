import './button.styles.scss'

const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted'
}

export default function Button({children, buttonType, ...otherPorps})
{
  return (
    <button 
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherPorps}
    >
      {children}
    </button>
  )
}