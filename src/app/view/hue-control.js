window.modules.HueControl = (({
  Utils: { queryId }
}) => {
  const dom = {
    hueSlider: queryId('hue-slider'),
    hueValueDisplay: queryId('hue-value'),
    toleranceText: queryId('tolerance-text'),
    toleranceValueDisplay: queryId('tolerance-value'),
    monoToggle: queryId('mono-toggle'),
    saturationAxis: queryId('saturation-axis')
  }

  const setup = ({ onToggleMono, onChangeHue }) => {
    dom.monoToggle.addEventListener('change', event => {
      onToggleMono(event.target.checked)
    })

    dom.hueSlider.addEventListener('input', event => {
      const hue = Number(event.target.value)
      onChangeHue(hue)
    })
  }

  const render = ({ colorList, hue, mono }) => {
    const sliderPos = hue / 360

    dom.hueSlider.classList.toggle('mono', !!mono)
    dom.toleranceText.classList.toggle('hidden', !!mono)
    dom.saturationAxis.classList.toggle('hidden', !!mono)
    if (mono) {
      dom.hueValueDisplay.innerText = 0
    } else {
      dom.hueValueDisplay.innerText = hue
    }

    dom.hueSlider.style.setProperty('--pos', sliderPos)
    dom.hueSlider.value = hue
    dom.toleranceValueDisplay.innerHTML = colorList.tolerance
  }

  return {
    setup,
    render
  }
})(window.modules)
