import { createSignal, createMemo, createEffect } from 'solid-js'
import { colord } from 'colord'

import styles from './App.module.css'

import findColor, { COLOR_NAMES } from './utils/colorNames'
import classNames from './utils/classNames'

const getRandomColor = () => {
  const [hex] = COLOR_NAMES[Math.floor(Math.random() * COLOR_NAMES.length)]
  return `#${hex}`
}

function App() {
  const [color, setColor] = createSignal(getRandomColor())

  const handleColorChange = (e) => setColor(e.target.value)

  const matchedColor = () => findColor(color())
  const isLight = () => colord(color()).isLight()

  // createEffect(() => {
  //   console.log({ color: color(), matchedColor: matchedColor() });
  // });

  return (
    <main
      class={classNames(
        'min-h-screen flex flex-col items-center justify-center font-bold',
        isLight() ? 'text-black' : 'text-white'
      )}
      style={{
        'background-color': color(),
      }}
    >
      <div class="flex flex-col gap-3 justify-center items-center">
        {() => {
          const [valid, exactMatch, colorName, colorCode] = matchedColor()
          return (
            <>
              <h1 class="text-3xl font-bold">{colorName}</h1>
              <p>Exact Match: {exactMatch ? 'Yes' : 'No'}</p>
              <p>
                Closest Match: <span class="lowercase">{colorCode}</span>
              </p>
            </>
          )
        }}
        <input
          type="color"
          class={classNames(
            'uppercase rounded p-0.5 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-500 transition hover:scale-105 active:scale-110',
            isLight() ? 'bg-swamp text-white' : 'bg-white text-swamp'
          )}
          value={color()}
          onInput={handleColorChange}
        />
        <input
          type="text"
          pattern="[a-fA-F0-9]{6}"
          title="hex format"
          class={classNames(
            'lowercase px-2 py-1 rounded focus:outline-none focus:ring focus:ring-blue-500',
            isLight()
              ? 'bg-swamp text-white selection:bg-yellow-300 selection:text-swamp'
              : 'bg-white text-swamp selection:bg-swamp selection:text-yellow-300'
          )}
          value={color()}
          onChange={handleColorChange}
        />
      </div>
    </main>
  )
}

export default App
