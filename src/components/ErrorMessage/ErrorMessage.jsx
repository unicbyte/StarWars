import UiVideo from 'components/UI/UiVideo/UiVideo'
import s from './ErrorMessage.module.css'
import video from './video/han-solo.mp4'

const ErrorMessage = () => {
  return <>
    <p className={s.text}>
      The dark side of the force has won.<br />
      We cannot display data.<br />
      Come back when we fix everything.
    </p>
    <UiVideo src={video} classes={s.video} playbackRate={1.0}/>
  </>
}

export default ErrorMessage
