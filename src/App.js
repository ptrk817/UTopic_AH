import React, { useState } from 'react';
import Header from './components/Header';
import RandomButton from './components/RandomButton';
import TopicCard from './components/TopicCard';

function App() {
  const topics = [
    "요즘 가장 행복했던 순간은?",
    "내가 가장 좋아하는 음식은?",
    "평생 한 곳에서만 살 수 있다면 어디?",
    "제일 기억에 남는 여행은?",
    "만약 로또에 당첨된다면?",
    "가장 최근에 본 영화는 뭐야?",
    "요즘 푹 빠진 취미는?",
    "제일 좋아하는 계절은?",
  ];

  const [currentTopic, setCurrentTopic] = useState("");

  const getRandomTopic = () => {
    const randomIndex = Math.floor(Math.random() * topics.length);
    setCurrentTopic(topics[randomIndex]);
  };

  return (
    <div>
      <Header />
      <RandomButton getTopic={getRandomTopic} />
      {currentTopic && <TopicCard topic={currentTopic} />}
    </div>
  );
}

export default App;
