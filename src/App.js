import axios from 'axios'
import { useEffect, useState } from 'react'
import img from './image/img.png'


function App() {
  const [chosenLevel, setChosenLevel] = useState('')
  const [words, setWords] = useState(null)
  const [correctAnswers, setCorrectAnswers] = useState([])
  const [clicked, setClicked] = useState([])
  const [score, setScore] = useState(0)

const getRandomWords = () => {
  const options = {
    method: 'GET',
    url: 'https://twinword-word-association-quiz.p.rapidapi.com/type1/',
    params: {level: chosenLevel, area: 'sat'},
    headers: {
      'x-rapidapi-host': 'twinword-word-association-quiz.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
    }
  };

  axios.request(options).then((response) => {
    console.log(response.data);
    setWords(response.data)
  }).catch((error)=> {
    console.error(error);
  });
}

console.log(words && words.quizlist)

useEffect(()=>{
  if(chosenLevel) getRandomWords()
},[chosenLevel])

const checkAnswer = (option,optIndex, correctAnswer) =>{
  console.log(optIndex, correctAnswer)
  if (optIndex === correctAnswer){
    setCorrectAnswers([...correctAnswers,option])
    setScore((score) => score +1)
  }else{
    setScore((score) => score)

  }

  setClicked([...clicked, option])
}

console.log(correctAnswers)
console.log(clicked)


  return (
    <div className="app">

   {!chosenLevel && <div className="level-selector">
    <img src={img} alt="" width={"55%"} />
    <div className="">
    <h1>Word Quiz Game</h1>
    <p>Select Your Level To start</p>
      <select
        name="levels"
        id="levels" value={""}
        onChange={(e)=> setChosenLevel(e.target.value)}
        >
        <option value={null}>Select a Level</option>
        <option value="1">Level 1</option>
        <option value="2">Level 2</option>
        <option value="3">Level 3</option>
        <option value="4">Level 4</option>
        <option value="5">Level 5</option>
        <option value="6">Level 6</option>
        <option value="7">Level 7</option>
        <option value="8">Level 8</option>
        <option value="9">Level 9</option>
        <option value="10">Level 10</option>
      </select>
    </div>
    </div>}

    {chosenLevel && words && <div className="question-area">
      <h1>Welcome to Level: {chosenLevel}</h1>
      <h3>Your Score Is: {score} / 10</h3>

    <div className="questions">
      {words.quizlist.map((question, _questionIndex)=> (
        <div key={_questionIndex} className="question-box">
          {question.quiz.map((tip, _index)=> (
            <p key={_index}>{tip}</p>
          ))}

          <div className="question-buttons">
            {question.option.map((option, _optionIndex)=> (
              <div key={_optionIndex} className="question-button">
                <button
                disabled={clicked.includes(option)}
                onClick={()=> checkAnswer(option,_optionIndex + 1, question.correct)}
                >
                  {option}
                </button>

              {correctAnswers.includes(option) &&<p className="correct">Correct!</p>}
              {clicked.includes(option) && !correctAnswers.includes(option) &&<p className="wrong">Wrong!</p>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

    <button onClick={()=> {
      setChosenLevel(null)
      setScore(0)
      }}>Go Back</button>

    </div>

    }

    </div>
  );
}

export default App;
