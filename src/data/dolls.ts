export interface Doll {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  trait: string;
  image: string;
  color: string;
}

// 十大定制手办原型——每一个人都可以定制属于自己的独特玩偶
export const dolls: Doll[] = [
  {
    id: 'zhengyin',
    name: '小琳',
    nameEn: 'Lin',
    description: '温柔体贴的女儿形象，会撒娇会关心，用你真实的声音和模样定制，替远方的你陪伴父母。',
    trait: '陪伴 · 撒娇 · 暖心',
    image: '/images/dolls/zhengyin.jpg',
    color: '#DEB887',
  },
  {
    id: 'pianyin',
    name: '小辉',
    nameEn: 'Hui',
    description: '活泼可爱的幼年分身，用你的童年照片定制，会跳舞会唱歌，治愈每一个疲惫的夜晚。',
    trait: '可爱 · 跳舞 · 治愈',
    image: '/images/dolls/pianyin.jpg',
    color: '#9B59B6',
  },
  {
    id: 'zhengguan',
    name: '小明',
    nameEn: 'Ming',
    description: '懂事孝顺的儿子形象，温和有礼，用逝者的声音和记忆定制，为失独老人守住一份牵挂。',
    trait: '孝顺 · 温和 · 守护',
    image: '/images/dolls/zhengguan.jpg',
    color: '#1ABC9C',
  },
  {
    id: 'pianguan',
    name: '小美',
    nameEn: 'Mei',
    description: '元气满满的女团偶像，能唱能跳会投影，用你最喜欢的风格定制，成为你专属的唱跳搭子。',
    trait: '唱跳 · 元气 · 活力',
    image: '/images/dolls/pianguan.jpg',
    color: '#E74C3C',
  },
  {
    id: 'zhengcai',
    name: '小宝',
    nameEn: 'Bao',
    description: '软糯可爱的安抚宝宝，会哼摇篮曲会讲故事，用胎教音乐和妈妈心跳声定制，陪伴新手妈妈。',
    trait: '安抚 · 可爱 · 温柔',
    image: '/images/dolls/zhengcai.jpg',
    color: '#D2691E',
  },
  {
    id: 'piancai',
    name: '小光',
    nameEn: 'Guang',
    description: '阳光开朗的大男孩，报喜不报忧，用出国前的合影和告别录音定制，替游子陪伴远方的妈妈。',
    trait: '阳光 · 开朗 · 温暖',
    image: '/images/dolls/piancai.jpg',
    color: '#F39C12',
  },
  {
    id: 'shishen',
    name: '小甜',
    nameEn: 'Tian',
    description: '甜甜蜜蜜的情侣分身，会讲情话会分享日常，用你们之间的甜蜜对话定制，跨越距离传递爱意。',
    trait: '甜蜜 · 浪漫 · 陪伴',
    image: '/images/dolls/shishen.jpg',
    color: '#FF9F9F',
  },
  {
    id: 'shangguan',
    name: '小杰',
    nameEn: 'Jie',
    description: '聪明好学的少年形象，嘴巴甜会背诗，用孙子小时候的声音定制，为空巢老人带来天伦之乐。',
    trait: '聪明 · 乖巧 · 暖心',
    image: '/images/dolls/shangguan.jpg',
    color: '#8E44AD',
  },
  {
    id: 'bijian',
    name: '小雨',
    nameEn: 'Yu',
    description: '古灵精怪的闺蜜小精灵，会讲八卦会吐槽，用你们一起疯的日常定制，成为独居女孩的贴心伙伴。',
    trait: '俏皮 · 有趣 · 陪伴',
    image: '/images/dolls/bijian.jpg',
    color: '#95A5A6',
  },
  {
    id: 'jiecai',
    name: '小阳',
    nameEn: 'Yang',
    description: '黏人可爱的宠物替代型玩偶，会撒娇会等门，用主人的脚步声和生活习惯定制，缓解养宠困扰。',
    trait: '黏人 · 可爱 · 忠诚',
    image: '/images/dolls/jiecai.jpg',
    color: '#C0392B',
  },
];
