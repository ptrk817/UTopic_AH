import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import RandomButton from './components/RandomButton';
import TopicCard from './components/TopicCard';

function App() {
  const [topics, setTopics] = useState([
    "요즘 가장 행복했던 순간은?",
    "내가 가장 좋아하는 음식은?",
    "평생 한 곳에서만 살 수 있다면 어디?",
    "제일 기억에 남는 여행은?",
    "만약 로또에 당첨된다면?",
    "가장 최근에 본 영화는 뭐야?",
    "요즘 푹 빠진 취미는?",
    "제일 좋아하는 계절은?",
    "내가 제일 창피했던 순간은?",
    "가장 기억에 남는 선물은?",
    "만약 하루 동안 투명인간이 된다면 뭘 할 거야?",
    "어릴 적 장래희망은 뭐였어?",
    "제일 좋아하는 노래 또는 가수는?",
    "내 인생에서 가장 웃겼던 일은?",
    "최근 가장 감동받았던 순간은?",
    "만약 지금 당장 세계 어디든 갈 수 있다면 어디로 갈래?",
    "제일 무서웠던 경험은?",
    "요즘 제일 자주 하는 앱은?",
    "가장 좋아하는 술 또는 안주는?",
    "나에게 가장 큰 영향을 준 사람은?",
    "어릴 적 부모님 몰래 했던 가장 큰 장난은?",
    "내가 영화나 드라마 주인공이 된다면 어떤 스토리가 좋을까?",
    "지금까지 살면서 가장 황당했던 순간은?",
    "만약 타임머신이 있다면 과거와 미래 중 어디로 가고 싶어?",
    "평생 단 하나의 음식만 먹어야 한다면 뭘 선택할래?",
    "최근 가장 많이 웃었던 순간은?",
    "지금의 나를 한마디로 표현하면?",
    "내가 생각하는 완벽한 하루는?",
    "제일 기억에 남는 첫인상은 누구였어?",
    "다시 돌아가고 싶은 순간이 있다면 언제일까?",
    "내가 생각하는 최고의 여행지 또는 장소는?",
    "살면서 가장 민망했던 실수는?",
    "죽기 전에 꼭 해보고 싶은 건?"
  ]);

  const [currentTopic, setCurrentTopic] = useState("");
  const [newTopic, setNewTopic] = useState("");
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds

  useEffect(() => {
    let timer;
    if (timerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [timerRunning, timeLeft]);

  const getRandomTopic = () => {
    const randomIndex = Math.floor(Math.random() * topics.length);
    setCurrentTopic(topics[randomIndex]);
    setTimerRunning(true);
    setTimeLeft(900); // Reset to 15 minutes
  };

  const extendTimer = () => {
    setTimeLeft(900); // Extend by 15 minutes
  };

  const handleNewTopicChange = (e) => {
    setNewTopic(e.target.value);
  };

  const handleAddTopic = () => {
    if (newTopic.trim()) {
      setTopics((prevTopics) => {
        const updatedTopics = [...prevTopics, newTopic.trim()];
        setCurrentTopic(updatedTopics[updatedTopics.length - 1]); // Immediately set new topic
        return updatedTopics;
      });
      setNewTopic(""); // Clear the input field
      setTimerRunning(true); // Start timer
      setTimeLeft(900); // Reset to 15 minutes
    }
  };

  return (
    <div>
      <Header />
      <RandomButton getTopic={getRandomTopic} />
      <div>
        {currentTopic && <TopicCard topic={currentTopic} />}
      </div>
      {timerRunning && (
        <div>
          <p style={{ fontSize: '50px', textAlign: 'center' }}>
            타이머: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
          </p>
          {!timerRunning && timeLeft === 0 && (
            <div style={{ textAlign: 'center' }}>
              <button onClick={extendTimer} style={{ fontSize: '20px', padding: '10px 20px' }}>타이머 연장</button>
            </div>
          )}
        </div>
      )}
      <div>
        <input
          type="text"
          placeholder="새로운 질문을 입력하세요"
          value={newTopic}
          onChange={handleNewTopicChange}
          style={{ width: '100%', height: '60px', fontSize: '16px' }}
        />
        <button onClick={handleAddTopic} style={{ fontSize: '16px', marginTop: '10px' }}>질문 추가</button>
      </div>
    </div>
  );
}

export default App;
