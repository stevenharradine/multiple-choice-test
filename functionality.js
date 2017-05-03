var numberOfQuestions = questions.length

var questionEl = document.getElementById ("question")
var optionsFormEl = document.getElementById ("options")
var correctCounter = 0
var wrongCounter = 0
var wrongDetails = []

var questionIndex = 0

nextQuestion ()

function nextQuestion (e) {
	var item = questions[questionIndex]

	questionEl.innerHTML = item.question

	optionsFormEl.innerHTML = ""
	item.options.forEach (function (option) {
		optionsFormEl.innerHTML += "<input class='option' type='radio' name='question' value='"+ option.isCorrect + "'>" + option.option + "<br />"
	})
	optionsFormEl.innerHTML += "<input type='submit' value='save' />"

	optionsFormEl.onsubmit = function () {
		var optionsEl = document.getElementsByClassName ("option");
		numberOfOptions = optionsEl.length

		isAllCorrect = true

		for (var i = 0; i < numberOfOptions; i++) {
			var thisValue = optionsEl[i].value == "true"	// cast to boolean
			if (optionsEl[i].checked != thisValue) {
				isAllCorrect = false
			}
		}

		if (isAllCorrect) {
			console.log ("Correct")
			correctCounter++
		} else {
			console.log ("Wrong")
			wrongCounter++
			wrongDetails.push (questions[questionIndex])
		}

		if (questionIndex + 1 > questions.length - 1) {
			done ()
		} else {
			questionIndex++
			nextQuestion ()
		}
		

		return false
	}
}

function done () {
	var title = correctCounter >= wrongCounter ? "Pass" : "Fail"
	var containerEl = document.getElementsByClassName("container")[0]

	containerEl.style.position = ""
	containerEl.style.top = ""
	containerEl.style.left = ""
	containerEl.style.height = "100%"
	containerEl.style.transform = ""
	containerEl.style.margin = "auto"

	containerEl.innerHTML = ""
	containerEl.innerHTML += "<h1>"+ title +"</h1>"
	containerEl.innerHTML += "Correct questions: " + correctCounter + "<br />"
	containerEl.innerHTML += "Wrong questions: " + wrongCounter + "<br />"
	containerEl.innerHTML += "Total questions: " + questions.length + "<br />"
	containerEl.innerHTML += "<br />"
	containerEl.innerHTML += "<h2>Details</h2>"

	wrongDetails.forEach (function (item) {
		containerEl.innerHTML += item.question + "<br />"
		item.options.forEach (function (option) {
			if (option.isCorrect) {
				containerEl.innerHTML += "<pre>&#9;</pre>" + option.option + "<br />"
			}
		})
	})
}