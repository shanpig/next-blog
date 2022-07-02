import Container from './container'
import { Typography } from '@material-tailwind/react'

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <Typography variant='h5' ><div className="font-mono">Proudly presented by shanpig.</div></Typography>

      </Container>
    </footer>
  )
}

export default Footer
