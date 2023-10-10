var height;
var width;
var wall;
var numOfColors;
var colors = [];
var cellColors = [];

function generateColors(number)
{
    var hex = ["a", "b", "c", "d", "e", "f", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    var color = "#"
    for(let i = 0; i < number; i++)
    {
        for(let j = 0; j < 6; j++)
        {
            var index = Math.round(Math.random() * 15)
            var value = hex[index]
            color += value
        }
        colors.push(color)
        color = "#"
    }
}

function pickColor(colors)
{
    var index = Math.round(Math.random() * (colors.length - 1))
    return colors[index]
}

function displayWall()
{
    wall = document.getElementById("wall")
    width = document.getElementById("width").value
    height = document.getElementById("height").value
    numOfColors = document.getElementById("numOfColors").value
    wall.style.setProperty('grid-template-columns', 'repeat(' + width + ', 1fr)')
    wall.style.setProperty('grid-template-rows', 'repeat(' + height + ', 1fr)')

    if(wall.hasChildNodes())
    {
        while(wall.firstChild)
            wall.removeChild(wall.firstChild);
    }
    colors = []
    generateColors(numOfColors)
    cellColors = []
    var cells = []

    for(let i = 0; i < height * width; i++)
    {
        let cell = document.createElement("div")
        cells.push(cell)
        cell.innerText = ""
        wall.appendChild(cell)
    }
    for(let i = 0; i < height * width; i++)
    {
        let randomColor = pickColor(colors);
        cells[i].style.setProperty("background-color", randomColor)
        cellColors[i] = randomColor
        cells[i].addEventListener("click", 
        function()
        {
            let invertedColor = invertColor(cellColors[i])
            cells[i].style.setProperty("background-color", invertedColor)
            cellColors[i] = invertedColor
        }
        )
    }

    for(let i = 0; i < height * width; i++)
    {
        cells[i].addEventListener('click', function()
        {
            var r = Math.floor(i / width)
            var c = Math.floor(i - r * width)
            
            var tempR = r
            var tempC = c

            while(r - 1 >= 0 && c - 1 >= 0)
            {
                let indexDiag = Math.floor((r - 1) * width + (c - 1))
                let invertedColor = invertColor(cellColors[indexDiag])
                cells[indexDiag].style.setProperty("background-color", invertedColor)
                cellColors[indexDiag] = invertedColor
                r--
                c--
            }
            r = tempR
            c = tempC
            while(r + 1 < height && c + 1 < width)
            {
                let indexDiag = Math.floor((r + 1) * width + (c + 1))
                let invertedColor = invertColor(cellColors[indexDiag])
                cells[indexDiag].style.setProperty("background-color", invertedColor)
                cellColors[indexDiag] = invertedColor
                r++
                c++
            }
            r = tempR
            c = tempC
            while(r - 1 >= 0 && c + 1 < width)
            {
                let indexDiag = Math.floor((r - 1) * width + (c + 1))
                let invertedColor = invertColor(cellColors[indexDiag])
                cells[indexDiag].style.setProperty("background-color", invertedColor)
                cellColors[indexDiag] = invertedColor
                r--
                c++
            }
            r = tempR
            c = tempC
            while(r + 1 < height && c - 1 >= 0)
            {
                let indexDiag = Math.floor((r + 1) * width + (c - 1))
                let invertedColor = invertColor(cellColors[indexDiag])
                cells[indexDiag].style.setProperty("background-color", invertedColor)
                cellColors[indexDiag] = invertedColor
                r++
                c--
            }
            r = tempR
            c = tempC
        })
    }
}

function invertColor(hexColor)
{
    let rHex = hexColor.charAt(1) + hexColor.charAt(2)
    let gHex = hexColor.charAt(3) + hexColor.charAt(4)
    let bHex = hexColor.charAt(5) + hexColor.charAt(6)
    let r = (255 - (parseInt(rHex, 16))).toString(16)
    let g = (255 - (parseInt(gHex, 16))).toString(16)
    let b = (255 - (parseInt(bHex, 16))).toString(16)

    return "#" + r + g + b
}




