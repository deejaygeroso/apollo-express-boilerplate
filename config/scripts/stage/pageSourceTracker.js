console.log("Adally script is running...")
const host = window.location.host
const currentLocation = window.location.pathname
const urlForScanning = host + currentLocation

const nodes = document.querySelectorAll("*")
const numberOfNodes = nodes.length

const cleanPathname = pathname => {
  return pathname.replace("/", "_").replace(".", "_")
}

const storedNodesLabel = cleanPathname(`adallyNodes-${currentLocation}`)
const storedNodeCharCountLabel = cleanPathname(`adallyNodeCharCount-${currentLocation}`)
const storedTimestampLabel = cleanPathname(`adallyTimestamp-${currentLocation}`)

const storedNodes = localStorage.getItem(storedNodesLabel)
const storedNodeCharCount = localStorage.getItem(storedNodeCharCountLabel)
const storedTimestamp = localStorage.getItem(storedTimestampLabel)

const stringifyNodes = nodeArray => {
  const nodeData = []

  for (let i = 0; i < numberOfNodes; i++) {
    let current = nodes[i]
    let childElementCount = current.childElementCount
    let innerHTML = current.innerHTML
    let innerText = current.innerText
    let nodeName = current.nodeName

    nodeData.push({
      childElementCount,
      innerHTML,
      innerText,
      nodeName
    })
  }

  return JSON.stringify(nodeData)
}

const notifyServer = websiteId => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    const url = urlForScanning

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve("Ping succeeded!")
      } else {
        reject(JSON.parse(xhr.response))
      }
    }

    xhr.open("POST", "https://beta-server.adally.com/api/audit/single-url", true)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify({ url, websiteId }))
  })
}

const getDateDifferenceInMinutes = (date1, date2) => {
  const dateDifference = Math.abs(new Date(date1 - date2))
  const dateDifferenceInMinutes = Math.floor(dateDifference / 1000 / 60)
  return dateDifferenceInMinutes
}

const updateLocalStorage = objectValues => {
  const { stringifiedNodes, stringifiedNodeCharCount, timestampNow } = objectValues
  localStorage.setItem(storedNodesLabel, stringifiedNodes)
  localStorage.setItem(storedNodeCharCountLabel, stringifiedNodeCharCount)
  localStorage.setItem(storedTimestampLabel, timestampNow)
}

const executeScript = async () => {
  try {
    const currentScript = document.currentScript
    const websiteId = currentScript.getAttribute("website-id")
    const stringifiedNodes = stringifyNodes(nodes)
    const stringifiedNodeCharCount = stringifiedNodes.length

    if (!(stringifiedNodeCharCount == storedNodeCharCount && stringifiedNodes == storedNodes)) {
      console.log("Changes detected!")
      const dateNow = new Date()
      const timestampNow = dateNow.getTime()
      const previousTimestamp = parseInt(storedTimestamp)
      const previousDate = new Date(previousTimestamp)
      const dateDifference = getDateDifferenceInMinutes(dateNow, previousDate)

      if (storedTimestamp) {
        console.log(`Last ping recorded: ${dateDifference} minutes ago`)
      }

      if (dateDifference >= 30 || !storedTimestamp) {
        console.log("Pinging server now...")

        const notifyServerResponse = await notifyServer(websiteId)
        console.log("Request done!")

        updateLocalStorage({
          stringifiedNodes,
          stringifiedNodeCharCount,
          timestampNow
        })
      } else {
        console.log("Cannot ping right now. We need at least 30 minutes of stable page changes before pinging the server.")
      }
    }
  } catch (error) {
    console.log("An error occurred:", error)
  }
}

executeScript()
