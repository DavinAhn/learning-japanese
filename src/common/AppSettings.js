const prefix = 'app.settings';

const AppSettings = {
  shownFuriganaWhenLearning: {
    desc: '학습할 때 후리가나 보이기',
    key: `${prefix}.shownFuriganaWhenLearning`,
    default: true,
  },
  shownFuriganaWhenTesting: {
    desc: '테스트할 때 후리가나 보이기',
    key: `${prefix}.shownFuriganaWhenTesting`,
    default: false,
  },
  numberOfTestProblems: {
    desc: '테스트 문제 수',
    key: `${prefix}.numberOfTestProblems`,
    default: 100,
    case: [10, 20, 50, 100, 200, 300, 500],
  },
  setsToExcloudeInTest: {
    desc: '테스트에서 제외시킬 문제 세트',
    key: `${prefix}.setsToExcloudeInTest`,
    default: [],
  },
  focusOnRecentProblemSet: {
    desc: '최근 문제 세트 위주로 테스트할지',
    key: `${prefix}.focusOnRecentProblemSet`,
    default: false,
  },
  recentProblemSetRatio: {
    desc: '최근 문제 세트 위주로 테스트할 때 비중을 얼마나 둘지',
    key: `${prefix}.recentProblemSetRatio`,
    default: 80,
    case: [
      { label: '100%', value: 100, },
      { label: '90%', value: 90, },
      { label: '80%', value: 80, },
      { label: '70%', value: 70, },
      { label: '60%', value: 60, },
      { label: '50%', value: 50, },
    ],
  },
  shouldPerfectAnswer: {
    desc: '음과 뜻이 모두 맞을 때만 정답으로 보기',
    key: `${prefix}.shouldPerfectAnswer`,
    default: false,
  },
}

export default AppSettings;
export const settingsVersion = 1;
