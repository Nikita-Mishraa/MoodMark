const calendar = document.getElementById("calendar")
const picker = document.getElementById("picker")

const emojis = ["😊","😐","😞","😤","🥰","😴","🔥","🌧️"]

const today = new Date()
const year = today.getFullYear()
const month = today.getMonth()

let selectedDate = null

const moods = JSON.parse(localStorage.getItem("moods")) || {}

function daysInMonth(y, m) {
  return new Date(y, m + 1, 0).getDate()
}

function firstDay(y, m) {
  return new Date(y, m, 1).getDay()
}

function renderCalendar() {
  calendar.innerHTML = ""

  const totalDays = daysInMonth(year, month)
  const start = firstDay(year, month)

  for (let i = 0; i < start; i++) {
    calendar.appendChild(document.createElement("div"))
  }

  for (let day = 1; day <= totalDays; day++) {
    const cell = document.createElement("div")
    cell.className = "day"

    const key = `${year}-${month+1}-${day}`
    cell.innerHTML = `
      <span>${day}</span>
      <span class="emoji">${moods[key] || ""}</span>
    `

    cell.onclick = () => openPicker(key)
    calendar.appendChild(cell)
  }
}

function openPicker(dateKey) {
  selectedDate = dateKey
  picker.innerHTML = `${emojis.map(e => `<button>${e}</button>`).join("")}
  <button class="clear">✕</button>`
  picker.style.display = "flex"

  document.querySelectorAll("#picker button").forEach(btn => {
    btn.onclick = () => {
    if (btn.classList.contains("clear")) {
      delete moods[selectedDate]
      localStorage.setItem("moods", JSON.stringify(moods))
      picker.style.display = "none"
      renderCalendar()
    } else {
      saveMood(btn.textContent)
    }
  }
})
}

function saveMood(emoji) {
  moods[selectedDate] = emoji
  localStorage.setItem("moods", JSON.stringify(moods))
  picker.style.display = "none"
  renderCalendar()
}

renderCalendar()
