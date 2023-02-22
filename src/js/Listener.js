import { Password } from './Password.js'

export const Listener = () => {
  const $passDisplay = document.querySelector('.pass-display')
  const $passLength = document.querySelector('.pass-length')
  const $labels = document.querySelectorAll('label')
  const $lengthValue = document.querySelector('.length-value')
  const $qualityBar = document.querySelector('.quality-bar')
  const $btnCopy = document.querySelector('.btn-copy')
  const $btnRenew = document.querySelector('.btn-renew')

  const pass = {
    hash: '',
    uppercase: true,
    number: true,
    charset: true,
    length: $passLength.value,
    quality: '',
    percent: '',
  }

  ;[...$labels].map((label) => {
    label.addEventListener('click', (e) => {
      pass[`${e.target.innerText}`] = !pass[`${e.target.innerText}`]
      setPass(pass)
    })
  })

  $passLength.addEventListener('input', (e) => {
    pass.length = e.target.value

    if (pass.length > 43) {
      $passDisplay.style.fontSize = 'xx-small'
    } else if (pass.length > 30) {
      $passDisplay.style.fontSize = 'smaller'
    } else if (pass.length > 15) {
      $passDisplay.style.fontSize = 'large'
    } else {
      $passDisplay.style.fontSize = 'xx-large'
    }

    setPass(pass)
  })

  $btnCopy.addEventListener('click', () => {
    navigator.clipboard.writeText(pass.hash)
  })

  $btnRenew.addEventListener('click', () => {
    window.location.reload()
  })

  const setPass = (pass) => {
    const password = Password(pass)
    $passDisplay.innerText = password.hash
    $lengthValue.innerText = pass.length
    $qualityBar.style.width = `${pass.percent}%`
    $qualityBar.style.backgroundColor = `var(--${pass.quality})`
  }

  setPass(pass)
}
