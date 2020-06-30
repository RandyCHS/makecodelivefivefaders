function startup () {
    strip.setAll(0x000000)
    for (let index = 0; index <= num_pixels - 1; index++) {
        strip.setPixelColor(index, 0x00ffff)
        pause(20)
    }
}
function read_faders () {
    Red_fader = Math.map(pins.A0.analogRead(), 0, 1023, 0, 255)
    Green_fader = Math.map(pins.A1.analogRead(), 0, 1023, 0, 255)
    Blue_fader = Math.map(pins.A2.analogRead(), 0, 1023, 0, 255)
    mode_fader = Math.map(pins.A3.analogRead(), 0, 1023, 0, 3)
    count_fader = Math.map(pins.A4.analogRead(), 0, 1023, 0, num_pixels - 1)
    bright_fader = Math.map(pins.A4.analogRead(), 0, 1023, 0, 255)
}
let bright_fader = 0
let count_fader = 0
let mode_fader = 0
let Blue_fader = 0
let Green_fader = 0
let Red_fader = 0
let strip: light.NeoPixelStrip = null
let num_pixels = 0
num_pixels = 16
strip = light.createStrip(pins.D9, num_pixels)
strip.setMode(NeoPixelMode.RGBW)
light.setBrightness(20)
startup()
forever(function () {
    read_faders()
    if (mode_fader < 1) {
        strip.setPixelColor(count_fader, light.rgb(Red_fader, Green_fader, Blue_fader))
    } else if (mode_fader >= 1 && mode_fader < 2) {
        strip.showAnimationFrame(light.rainbowAnimation)
        strip.setBrightness(bright_fader)
    } else if (mode_fader >= 2 && mode_fader < 3) {
        strip.showAnimationFrame(light.theaterChaseAnimation)
        strip.setBrightness(bright_fader)
    } else if (mode_fader >= 3) {
        strip.showAnimationFrame(light.colorWipeAnimation)
        strip.setBrightness(bright_fader)
    }
})
