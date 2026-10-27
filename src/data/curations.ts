import { DailyCuratedContent } from '../types';

export const CURATED_PLAYLIST: DailyCuratedContent[] = [
  {
    youtubeUrl: 'https://www.youtube.com/watch?v=1ZYbU85XA2U', // Calming meditation
    musicTitle: '맑은 아침을 여는 432Hz 숲속 피아노 명상음악',
    musicDescription: '복잡한 생각을 가라앉히고 자연의 파동에 주파수를 맞추는 아침 이완 사운드',
    musicCategory: '숲 & 피아노',
    quoteContent: '아침에 눈을 떴을 때 살아있다는 것, 숨을 쉬고 생각하며 즐거워하고 사랑할 수 있다는 것이 얼마나 큰 특권인지 생각하라.',
    quoteAuthor: '마르쿠스 아우렐리우스 (명상록)',
    reflectionPrompt: '오늘 하루, 나에게 주어진 가장 감사한 순간 하나는 무엇인가요?'
  },
  {
    youtubeUrl: 'https://www.youtube.com/watch?v=MCgXbVqA_xQ', // Singing bowl
    musicTitle: '부정적인 에너지를 정화하는 티베트 싱잉볼 사운드',
    musicDescription: '깊은 공명음으로 뇌파를 알파파로 이끌며 마음속 묵은 긴장을 비워냅니다.',
    musicCategory: '싱잉볼 & 사운드배스',
    quoteContent: '행복의 문 하나가 닫히면 다른 문이 열린다. 하지만 우리는 종종 닫힌 문만 멍하니 바라보다가 우리를 향해 열린 다른 문을 보지 못한다.',
    quoteAuthor: '헬렌 켈러',
    reflectionPrompt: '어제까지의 아쉬움을 뒤로하고, 오늘 새롭게 바라보고 싶은 가능성은 무엇인가요?'
  },
  {
    youtubeUrl: 'https://www.youtube.com/watch?v=WUXOeF_W9dA', // Gentle morning acoustic
    musicTitle: '따스한 햇살과 커피 한 잔 같은 어쿠스틱 명상 루틴',
    musicDescription: '새벽의 고요함 속에서 긍정적인 활력과 편안한 에너지를 채워주는 멜로디',
    musicCategory: '따스한 어쿠스틱',
    quoteContent: '당신이 할 수 있다고 믿든, 할 수 없다고 믿든, 믿는 대로 될 것이다.',
    quoteAuthor: '헨리 포드',
    reflectionPrompt: '오늘 스스로에게 심어주고 싶은 가장 단단한 믿음의 한마디는 무엇인가요?'
  },
  {
    youtubeUrl: 'https://www.youtube.com/watch?v=inpok4MKVLM', // 528hz miracle tone
    musicTitle: '기적의 주파수 528Hz 마음 평온 호흡 가이드',
    musicDescription: '심장 박동과 호흡을 정렬하여 불안을 내려놓고 온전한 평온을 찾는 사운드',
    musicCategory: '주파수 명상 (528Hz)',
    quoteContent: '인생은 우리가 만드는 것이다. 항상 그래왔고, 앞으로도 영원히 그럴 것이다.',
    quoteAuthor: '할머니 모지스 (그랜마 모지스)',
    reflectionPrompt: '오늘 하루라는 하얀 캔버스 위에 어떤 기분과 태도를 채워넣고 싶으신가요?'
  },
  {
    youtubeUrl: 'https://www.youtube.com/watch?v=2OEL4P1Rz04', // River & cello
    musicTitle: '흐르는 시냇물과 첼로가 선사하는 깊은 내면의 휴식',
    musicDescription: '조급함을 멈추고 강물처럼 유연하고 너그러운 마음가짐을 선물하는 아침 명상',
    musicCategory: '시냇물 & 첼로',
    quoteContent: '고요히 머무는 법을 알 때 비로소 우리는 본래의 나를 만날 수 있다. 맑은 물에는 달이 그대로 비치듯 마음이 고요해야 진실이 보인다.',
    quoteAuthor: '법정 스님',
    reflectionPrompt: '오늘 나를 조급하게 만드는 일들 중, 조금 내려놓아도 괜찮은 것은 무엇일까요?'
  },
  {
    youtubeUrl: 'https://www.youtube.com/watch?v=hlWiI4xVXKY', // Deep calm
    musicTitle: '호흡에 온전히 집중하는 10분 마인드풀니스 배경음',
    musicDescription: '코끝을 스치는 들숨과 날숨에 집중하며 현재 이 순간에 닻을 내리는 시간',
    musicCategory: '마인드풀니스 집중',
    quoteContent: '남들이 가지 않은 길을 걷는 것을 두려워하지 마라. 길은 걸어감으로써 비로소 만들어진다.',
    quoteAuthor: '로버트 프로스트',
    reflectionPrompt: '오늘 하루 중 내가 주도적으로 용기 있게 선택하고 싶은 한 가지는 무엇인가요?'
  },
  {
    youtubeUrl: 'https://www.youtube.com/watch?v=sTanvWkG8_Q', // Rain & Zen
    musicTitle: '창가에 맺힌 아침 이슬과 대나무 숲의 청량한 명상음',
    musicDescription: '머릿속 안개를 걷어내고 상쾌한 통찰력과 집중력을 일깨워주는 청량한 사운드',
    musicCategory: '자연의 소리',
    quoteContent: '매일 아침 눈을 뜰 때마다 오늘이 내 남은 인생의 첫날이라는 사실을 기억하라.',
    quoteAuthor: '작자 미상',
    reflectionPrompt: '오늘 하루, 나 자신과 주변 사람들에게 어떤 밝은 온기를 전하고 싶나요?'
  }
];

/**
 * Returns deterministic curation based on date string (YYYY-MM-DD)
 */
export function getCuratedContentForDate(dateStr: string): DailyCuratedContent {
  const parts = dateStr.split('-');
  const year = parseInt(parts[0], 10) || 2026;
  const month = parseInt(parts[1], 10) || 1;
  const day = parseInt(parts[2], 10) || 1;
  
  // Hash to select deterministically
  const seed = (year * 372 + month * 31 + day) % CURATED_PLAYLIST.length;
  return CURATED_PLAYLIST[seed];
}
