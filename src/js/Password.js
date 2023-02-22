export const Password = (pass) => {
  const _joinOptions = () => {
    const options = {
      low: 'abcdefghjkmnpqrstuvwxyz',
      upr: 'ABCDEFGHJKLMNPQRSTUVWXYZ',
      num: '123456789',
      chr: '?!@&*()[]',
    }

    let join = options.low

    if (pass.uppercase) {
      join += options.upr
    }

    if (pass.number) {
      join += options.num
    }

    if (pass.charset) {
      join += options.chr
    }

    return join
  }

  const _percent = () => {
    let percent = Math.round((pass.length / 64) * 25)

    if (pass.uppercase) {
      percent += 15
    }

    if (pass.number) {
      percent += 25
    }

    if (pass.charset) {
      percent += 35
    }

    pass.percent = percent
  }

  const _quality = () => {
    if (pass.percent > 69) {
      pass.quality = 'safe'
    } else if (pass.percent > 50) {
      pass.quality = 'warning'
    } else {
      pass.quality = 'critical'
    }
  }

  const _pass = () => {
    let newPass = ''
    for (let i = 0; i < pass.length; i++) {
      const randomNumber = Math.floor(Math.random() * join.length)
      newPass += join.substring(randomNumber, randomNumber + 1)
    }
    pass.hash = newPass
  }

  const join = _joinOptions()
  _percent()
  _quality()
  _pass()

  return pass
}
