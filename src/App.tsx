import { useState } from 'react';
import './index.scss';

interface QuestionsType {
  title: string;
  variants: string[];
  correct: number;
}

const questions: QuestionsType[] = [
  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'фреймворк', 'приложение'],
    correct: 0,
  },
  {
    title: 'Компонент - это ... ',
    variants: [
      'приложение',
      'часть приложения или страницы',
      'то, что я не знаю что такое',
    ],
    correct: 1,
  },
  {
    title: 'Что такое JSX?',
    variants: [
      'Это простой HTML',
      'Это функция',
      'Это тот же HTML, но с возможностью выполнять JS-код',
    ],
    correct: 2,
  },
];

type ResultProps = {
  correct: number;
};

const Result: React.FC<ResultProps> = ({ correct }) => {
  return (
    <div className='result'>
      <img
        src='https://cdn-icons-png.flaticon.com/512/2278/2278992.png'
        alt='img'
      />
      <h2>
        Вы отгадали {correct} ответа из {questions.length}
      </h2>
      <a href='/'>
        <button>Попробовать снова</button>
      </a>
    </div>
  );
};

type GameProps = {
  question: QuestionsType;
  onClickVariant: (index: number) => void;
  step: number;
};

const Game: React.FC<GameProps> = ({ question, onClickVariant, step }) => {
  const persentage = Math.round((step / questions.length) * 100);
  return (
    <>
      <div className='progress'>
        <div
          style={{ width: `${persentage}%` }}
          className='progress__inner'></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {question.variants.map((variant, index) => (
          <li onClick={() => onClickVariant(index)} key={variant}>
            {variant}
          </li>
        ))}
      </ul>
    </>
  );
};

export const App = () => {
  const [step, setStep] = useState<number>(0);

  const [correct, setCorrect] = useState<number>(0);

  const question = questions[step];

  const onClickVariant = (index: number) => {
    setStep(step + 1);

    if (index === question.correct) {
      setCorrect(correct + 1);
    }
  };
  return (
    <div className='App'>
      {step !== questions.length ? (
        <Game question={question} onClickVariant={onClickVariant} step={step} />
      ) : (
        <Result correct={correct} />
      )}
    </div>
  );
};
