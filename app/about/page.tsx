'use client';

import FullPageScroll from '@/components/FullPageScroll';
import { useLang } from '@/components/LanguageContext';

/* ---------------- 手绘线条图标 ---------------- */

const iconProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24',
  'aria-hidden': true,
} as const;

// 折角文档
const IconDoc = () => (
  <svg {...iconProps} className="w-5 h-5 text-teal-700 shrink-0">
    <path d="M6 3.5h7.5L19 9v11a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 20V5a1.5 1.5 0 0 1 1-1.5z" />
    <path d="M13.5 3.5V9H19" />
    <path d="M8.5 13h7M8.5 16h5" />
  </svg>
);

// 外链跳转
const IconExternal = () => (
  <svg {...iconProps} className="w-5 h-5 text-teal-700 shrink-0">
    <rect x="4" y="4" width="16" height="16" rx="2.5" />
    <path d="M10 14l5-5M11 9h4v4" />
  </svg>
);

// 奖章
const IconMedal = () => (
  <svg {...iconProps} className="w-5 h-5 text-teal-700 shrink-0">
    <circle cx="12" cy="14" r="5.5" />
    <path d="M12 11.8l1 1.9 2.1.3-1.5 1.5.35 2.1-1.95-1-1.95 1 .35-2.1-1.5-1.5 2.1-.3z" />
    <path d="M8.5 9.2L6 3.5h4l2 4.2L14 3.5h4l-2.5 5.7" />
  </svg>
);

/* ---------------- 数据 ---------------- */

interface ActivityImage {
  src: string;
  captionZh: string;
  captionEn: string;
}

interface ActivityLink {
  kind: 'pdf' | 'web';
  href: string;
  labelZh: string;
  labelEn: string;
}

interface Activity {
  index: string;
  shortEn: string; // 翻页圆点悬停提示
  tagEn: string;
  tagZh: string;
  nameZh: string;
  nameEn: string;
  yearShort: string;
  timeZh: string;
  timeEn: string;
  roleZh: string;
  roleEn: string;
  introZh: string;
  introEn: string;
  images?: ActivityImage[];
  links?: ActivityLink[];
}

interface Honor {
  index: string;
  level: 'international' | 'national' | 'school';
  nameZh: string;
  nameEn: string;
  gradeZh: string;
  gradeEn: string;
  descZh: string;
  descEn: string;
  link?: ActivityLink;
  wide?: boolean; // 宽行（占满整行）
}

// 与 Common App Honors 栏一致（BBO / USABO 附证书）
const honors: Honor[] = [
  {
    index: '01',
    level: 'international',
    nameZh: '英国生物奥林匹克竞赛 2026 · 全球金奖',
    nameEn: 'Global Gold, British Biology Olympiad (BBO) 2026',
    gradeZh: '11 年级',
    gradeEn: 'Grade 11',
    descZh:
      'BBO 是全球规模最大的中学生生物赛事之一，每年吸引数万名选手参赛；全球金奖授予成绩位列前茅的选手。',
    descEn:
      'The BBO is one of the world\u2019s largest high-school biology competitions, drawing tens of thousands of contestants each year; Global Gold is its highest award tier.',
    link: { kind: 'pdf', href: '/assets/bbo-cert', labelZh: '获奖证书', labelEn: 'Certificate' },
  },
  {
    index: '02',
    level: 'international',
    nameZh: '美国生物奥林匹克（USA-China 赛区）2026 · 全国银奖',
    nameEn: 'China National Silver, USABO (BioOlympiad Initiative USA-China) 2026',
    gradeZh: '11 年级',
    gradeEn: 'Grade 11',
    descZh:
      'USABO 以全英文考核大学先修水平的生物学，覆盖从分子到生态的全部主线；全国银奖为国际赛道奖项。',
    descEn:
      'The USA Biology Olympiad tests college-level biology entirely in English, from molecules to ecosystems; the National Silver Award belongs to the international track.',
    link: { kind: 'pdf', href: '/assets/usabo-cert', labelZh: '获奖证书', labelEn: 'Certificate' },
  },
  {
    index: '03',
    level: 'national',
    nameZh: 'CTB 区域 High Distinction · 生命科学与健康赛道',
    nameEn: 'CTB Regional High Distinction — Life Sciences & Health',
    gradeZh: '11 年级',
    gradeEn: 'Grade 11',
    descZh:
      '凭乳糖不耐受研究项目获 CTB 全国论坛华北区团队二等奖——该奖项为国家级，属生命科学与健康赛道；论文以共同第一作者身份发表于期刊《进展》。',
    descEn:
      'North China 2nd prize at the CTB national forum — a national-level Regional High Distinction in the Life Sciences & Health track — for our lactose-intolerance research, published in Advance as co-first author.',
    link: { kind: 'pdf', href: '/assets/ctb-paper', labelZh: '发表论文', labelEn: 'Published paper' },
  },
  {
    index: '04',
    level: 'school',
    nameZh: '校长荣誉奖',
    nameEn: 'Principal Honor Award',
    gradeZh: '12 年级',
    gradeEn: 'Grade 12',
    descZh:
      '校内最高荣誉，授予毕业年级在学术、课外活动与品格三方面均位列前 10% 的学生，于学年末综合评定。',
    descEn:
      'The school\u2019s highest honor, awarded at year-end to seniors in the top 10% across academics, extracurriculars, and character.',
  },
  {
    index: '05',
    level: 'school',
    nameZh: '优秀志愿者',
    nameEn: 'Outstanding Volunteer',
    gradeZh: '10、11 年级',
    gradeEn: 'Grades 10 & 11',
    descZh:
      '连续两年获评，表彰全学年持续投入的志愿服务：高一、高二均参与韩国中学生来访接待（带领参观，1 天）、新生 Orientation 引导（1 周）、毕业典礼家长引导（1 天）、招生志愿者（3 天）、校园开放日（1 天）、高三毕业大戏引导（1 天），以及校运动会的检录与秩序维护。',
    descEn:
      'Awarded two years running for year-round service: hosting visiting Korean middle-school students (1 day), guiding new-student Orientation (1 week), ushering families at the graduation ceremony (1 day) and the senior-year musical (1 day), admissions volunteering (3 days), campus open house (1 day), and check-in & crowd control at the school sports meet.',
    wide: true,
  },
];

// 顺序与 Common App 活动列表一致，末尾追加环保社团
const activities: Activity[] = [
  {
    index: '01',
    shortEn: 'Website',
    tagZh: '全栈开发 · 教育',
    tagEn: 'Full-stack · Education',
    nameZh: '生物学习网站开发和推广',
    nameEn: 'Biochem-niche Website',
    yearShort: '25–26',
    timeZh: '2025.09 至今 · 持续迭代',
    timeEn: 'Sep 2025 – Present · Continuously iterating',
    roleZh: '创建者 · 独立开发者与运营者',
    roleEn: 'Founder & solo developer',
    introZh:
      '在付馨悦老师的鼓励与课内 PBL 项目式学习框架下，独立搭建并运营面向学校生物社区的 AP 生物学习平台 Biochem-niche——就是你现在正在浏览的这个网站。毫无全栈经验的我在课余从零自学网页开发，联调 Supabase 数据库与 Vercel 部署时遭遇环境变量、认证与路由重定向的连环报错，最终交叉比对 Error Logs 逐一打通。目标只有一个：帮老师定位知识盲区，帮学生自主学习，让没有资源的学生也能公平地获取知识。',
    introEn:
      "Encouraged by my advisor Ms. Fu within the course's PBL framework, I independently built and now operate Biochem-niche — the very site you are browsing. With no prior full-stack experience, I taught myself web development after class; wiring the Supabase database to Vercel deployment meant an afternoon of cross-reading cryptic error logs until the data flowed. The goal: help teachers spot knowledge gaps, help students learn independently, and make quality resources fair for everyone.",
    images: [
      { src: '/assets/website-dev', captionZh: '网站开发与调试的日常', captionEn: 'Building and debugging Biochem-niche' },
      { src: '/assets/website-photo', captionZh: '迭代平台功能', captionEn: 'Iterating on platform features' },
    ],
    links: [
      { kind: 'pdf', href: '/assets/site-proposal', labelZh: '开题报告', labelEn: 'Project Proposal' },
      { kind: 'pdf', href: '/assets/site-midterm', labelZh: '中期汇报', labelEn: 'Midterm Report' },
      { kind: 'pdf', href: '/assets/site-final', labelZh: '结题汇报', labelEn: 'Final Report' },
      { kind: 'pdf', href: '/assets/site-paper', labelZh: '项目论文', labelEn: 'Project Paper' },
      { kind: 'pdf', href: '/assets/site-improvements', labelZh: '高三改进汇总', labelEn: 'Grade-12 Improvement Summary' },
    ],
  },
  {
    index: '02',
    shortEn: 'Monitor',
    tagZh: '领导力 · 服务',
    tagEn: 'Leadership · Service',
    nameZh: '班长 · AP 学生会生活部长',
    nameEn: 'Class Monitor & Head of Life Dept., AP Student Union',
    yearShort: '25–26',
    timeZh: '2025.03 至今 · 已连任',
    timeEn: 'Mar 2025 – Present · Re-elected',
    roleZh: '班长（统筹班委团队）；生活部长（牵头 AP 年级卫生管理）',
    roleEn: 'Class monitor; Dept. head in the student union',
    introZh:
      '班长：统筹班委团队、组织班委会与家长会总结环节，以坦诚尖锐的述职报告与改进方案高票连任；期中考后迭代 6 版、亲撰数千字总结稿，引入 SMART 原则量化诊断班级痛点，并发起“班级日志”。学生会：制定标准化卫生检查细则、统筹干事巡查、对接家校落实整改。领导力的本质是服务、共情与榜样。',
    introEn:
      'As class monitor I coordinated the class committee and won re-election with a candid review speech and concrete fixes; after midterms I drafted six iterations of a SMART-based diagnosis of class pain points and launched a "class journal". In the student union I led hygiene management across the AP division with standardized inspection rules. Leadership, I learned, means service, empathy, and example.',
    images: [
      { src: '/assets/class-monitor', captionZh: '与全班同学的新年合影', captionEn: 'New-Year photo with my class' },
    ],
  },
  {
    index: '03',
    shortEn: 'CTB',
    tagZh: '科研 · 创新',
    tagEn: 'Research · Innovation',
    nameZh: 'CTB 全球青年研究创新论坛',
    nameEn: 'China Thinks Big (CTB)',
    yearShort: '25–26',
    timeZh: '2025.09 – 2026.05 · 历时约半年',
    timeEn: 'Sep 2025 – May 2026 · About 6 months',
    roleZh: '队长 · 核心主导（方案设计、结果分析、论文定稿）',
    roleEn: 'Team lead — design, analysis & paper',
    introZh:
      '独立组队完成“长效解决乳糖不耐受的可行性方案及验证”（转基因益生菌疗法的可行性分析与多维风险评估）。在没有老师指导的情况下从零搭建研究框架，比对 30 余篇权威期刊文献，重新分析人群调研数据，并请教老师后彻底调整研究框架，建立起严密的合规性与长期安全风险评估模型。最终获全国论坛华北区团队二等奖（国家级奖项，生命科学与健康赛道），论文以共同第一作者身份发表于学术期刊《进展》（Advance，国内统一刊号 CN 50-1076/N，万方、维普收录）。',
    introEn:
      "Led a self-organized team on \"a long-term solution for lactose intolerance\" — a feasibility analysis and multi-dimensional risk assessment of a probiotic therapy. With no faculty supervision, I built the research framework from scratch, reviewed 30+ journal papers, re-analyzed our survey data, and rebuilt the compliance and long-term safety model after consulting a teacher. We won 2nd prize (North China) at the national forum — a national-level award in the Life Sciences & Health track — and the paper was published, with me as co-first author, in Advance (进展, CN 50-1076/N), a nationally registered periodical indexed by Wanfang Data and VIP (CQVIP), two of China's major academic databases.",
    images: [
      { src: '/assets/ctb', captionZh: '全国论坛展区合影', captionEn: 'At the national forum exhibition' },
    ],
    links: [
      { kind: 'pdf', href: '/assets/ctb-paper', labelZh: '论文发表版（期刊《进展》，中文）', labelEn: 'Published paper (journal Advance, in Chinese)' },
    ],
  },
  {
    index: '04',
    shortEn: 'CIS',
    tagZh: '神经生物学 · 阿尔兹海默症',
    tagEn: "Neurobiology · Alzheimer's",
    nameZh: 'CIS 跨学科研究项目',
    nameEn: 'CIS Interdisciplinary Research Program',
    yearShort: '25–26',
    timeZh: '11 年级 · 全年 · 每周 4 小时 · 共 35 周',
    timeEn: 'Grade 11 · All year · 4 hrs/week · 35 weeks',
    roleZh: '参与者（跟随专业导师，团队协作）',
    roleEn: 'Participant · Mentor-led team research',
    introZh:
      '参加 CIS（The Center for Interdisciplinary Scholarship）跨学科研究项目，主题为阿尔兹海默症：跟随专业导师学习神经生物学理论与科研方法，参与实验数据整理、文献检索与分析，与团队协作完成研究阶段性报告，深入探索可能涉及的基因突变、发病机制与潜在干预方向。这次经历让我打破单一学科的思维局限，深刻理解跨学科融合（生物＋数据＋临床）的价值。',
    introEn:
      "Joined the CIS interdisciplinary research program on Alzheimer's disease — studying neurobiology theory and research methods under a faculty mentor, organizing experimental data, analyzing literature, and co-authoring a staged research report on gene mutations, pathogenesis, and potential interventions. It taught me to break single-discipline thinking and value the fusion of biology, data, and clinical insight.",
    links: [
      { kind: 'pdf', href: '/assets/cis-paper', labelZh: '研究论文', labelEn: 'Research paper' },
      { kind: 'pdf', href: '/assets/cis-transcript', labelZh: 'CIS 成绩单', labelEn: 'CIS Transcript' },
      { kind: 'pdf', href: '/assets/cis-evaluation', labelZh: 'CIS 教授评价', labelEn: "Professor's Evaluation" },
    ],
  },
  {
    index: '05',
    shortEn: 'Club',
    tagZh: '创始人 · 社群',
    tagEn: 'Founder · Community',
    nameZh: '生物信息科研社团',
    nameEn: 'Bioinformatics Research Club',
    yearShort: '25–26',
    timeZh: '2025.09 至今 · 已组织 5 次活动',
    timeEn: 'Sep 2025 – Present · 5 sessions held',
    roleZh: '创始人 · 社长',
    roleEn: 'Founder & President',
    introZh:
      '牵头成立校内首个生物信息科研社团，完成章程制定与招新运营。面对缺乏编程基础的社员，我把自己沉淀的核心数据库文档毫无保留地分享，并亲自带大家实操：以 NCBI 检索基因序列与文献，用 UniProt 查询蛋白质序列与亚细胞定位，引入 STRING 构建 PPI 网络寻找核心基因，借助 KEGG 通路图谱做功能富集分析，最终合作完成社团的生物高阶分析学习成果。',
    introEn:
      "Founded the school's first bioinformatics research club — charter, recruitment, and operations. I shared my self-taught database notes openly and led members hands-on: NCBI for sequences and literature, UniProt for protein sequences and subcellular localization, STRING for PPI networks to find driver genes, and KEGG for enrichment analysis — together producing the club's advanced-analysis project.",
    images: [
      { src: '/assets/bioinfo-club', captionZh: '社团社徽', captionEn: 'Club emblem' },
    ],
  },
  {
    index: '06',
    shortEn: 'Qinling',
    tagZh: '生态 · 野外考察',
    tagEn: 'Ecology · Fieldwork',
    nameZh: '秦岭实地科研考察',
    nameEn: 'Qinling Field Research Expedition',
    yearShort: '2026',
    timeZh: '2026.05 – 2026.06 · 全天实地考察',
    timeEn: 'May – Jun 2026 · Full-day field surveys',
    roleZh: '团队的领导者与队长',
    roleEn: 'Team leader',
    introZh:
      '依托秦岭国家级自然保护区，以佛坪县三官庙管护站为核心调研地，带领团队用样方调查法系统考察人工林与次生林的乔木、灌木、草本三个垂直层次，记录种类、数量、高度、胸径、冠幅与盖度等指标；以香农与辛普森多样性指数量化评估两种恢复模式。结果发现：次生林的多层次物种多样性与群落均匀度整体优于人工林，而人工林呈现明显的优势种垄断。考察为秦岭人工林近自然化改造与生物多样性保护提供了详实的数据参考。',
    introEn:
      'In the Qinling National Nature Reserve (Sanguanmiao station, Foping), I led a quadrat-survey team comparing tree, shrub, and herb layers between plantation and secondary forests — recording species, counts, height, DBH, crown width, and coverage, then quantifying both restoration modes with Shannon and Simpson diversity indices. Secondary forests proved more diverse and even across layers, while plantations showed clear dominance by a single species — solid data for near-natural restoration and biodiversity conservation in the Qinling mountains.',
    images: [
      { src: '/assets/qinling', captionZh: '秦岭样方调查', captionEn: 'Quadrat survey in the Qinling mountains' },
    ],
    links: [
      { kind: 'pdf', href: '/assets/qinling-paper', labelZh: '研究论文：人工林与次生林植物群落差异（最新版）', labelEn: 'Research paper (latest version)' },
      { kind: 'pdf', href: '/assets/qinling-slides', labelZh: '考察展示 PPT', labelEn: 'Field-trip presentation slides' },
      { kind: 'pdf', href: '/assets/qinling-cert', labelZh: '秦岭科考证书', labelEn: 'Field-research certificate' },
    ],
  },
  {
    index: '07',
    shortEn: 'Basketball',
    tagZh: '体育 · 团队',
    tagEn: 'Sports · Teamwork',
    nameZh: '篮球社团',
    nameEn: 'Basketball Club',
    yearShort: '24–26',
    timeZh: '2024.09 至今 · 每周 2–3 次训练',
    timeEn: 'Sep 2024 – Present · 2–3 sessions weekly',
    roleZh: '队员 · 协助组织校内赛事',
    roleEn: 'Team member',
    introZh:
      '坚持参与日常训练与校内外友谊赛，高一随队征战 BIBA 国际学校篮球联赛。高强度训练磨砺了我的毅力与抗压能力，让我学会与队友并肩作战、以平常心面对输赢——球场上“再练一遍”的心态，后来被我带进了学习与科研。',
    introEn:
      'Trained 2–3 times a week and competed in the BIBA inter-school league. The intensity built my resilience and taught me to face wins and losses with equanimity — the "one more drill" mindset on the court later carried over into my studies and research.',
    images: [
      { src: '/assets/basketball', captionZh: '校内训练赛', captionEn: 'Practice game at the school gym' },
    ],
  },
  {
    index: '08',
    shortEn: 'UCL',
    tagZh: '生物信息 · 暑期科研',
    tagEn: 'Bioinformatics · Summer Research',
    nameZh: 'UCL 生物信息学夏校',
    nameEn: 'UCL Bioinformatics Summer School',
    yearShort: '2025',
    timeZh: '2025.07 – 2025.08 · 10 年级（高一）暑假',
    timeEn: 'Jul – Aug 2025 · Summer after Grade 10',
    roleZh: '参与者 · 独立完成综述报告',
    roleEn: 'Participant · Independent review report',
    introZh:
      '系统学习生物信息学数据分析、基因功能研究等专业知识与实操技能；独立完成文献调研，结合课程所学分析基因数据，最终完成 FAM131A 未知功能基因的功能推测综述报告，得到夏校导师的专业点评与认可。全英文的授课与研究环境显著提升了我的专业英语能力。',
    introEn:
      'Systematically studied bioinformatic data analysis and gene-function research, then independently completed a literature-based review proposing functions for the uncharacterized gene FAM131A — commended by the course mentor. The all-English research environment sharpened my academic English as well.',
    images: [
      { src: '/assets/ucl-summer', captionZh: 'UCL 实验课', captionEn: 'Lab session at UCL' },
    ],
    links: [
      { kind: 'pdf', href: '/assets/ucl-report', labelZh: '夏校综述报告（FAM131A 基因功能推测）', labelEn: 'Summer-school review report' },
    ],
  },
  {
    index: '09',
    shortEn: 'Harvard',
    tagZh: '学术荣誉 · 前 10%',
    tagEn: 'Academic Honor · Top 10%',
    nameZh: "Dean's List 冬校（哈佛大学）",
    nameEn: "Dean's List Winter School, Harvard",
    yearShort: '2025',
    timeZh: '2025.01 – 2025.02 · 高一寒假',
    timeEn: 'Jan – Feb 2025 · Grade-10 winter',
    roleZh: '参与者（GPA 年级前 10% 获推荐入选）',
    roleEn: 'Participant, nominated on top-10% GPA',
    introZh:
      '第一次独自走出国门，进入哈佛大学体验真实的大学课堂。在哈佛教授的合成生物学课程中，我第一次近距离接触前沿研究，看到基因线路如何被设计与编程——由此坚定了深耕生物的决心，“去海外读大学”也从模糊念头变成了清晰目标。',
    introEn:
      'My first time abroad on my own, sitting in real university classrooms at Harvard. A synthetic-biology course taught by Harvard faculty gave me my first close look at frontier research — how gene circuits are designed and programmed — and turned "studying abroad" from a vague idea into a clear goal.',
    images: [
      { src: '/assets/deans-list-1', captionZh: '冬校结业证书颁发', captionEn: 'Certificate ceremony' },
      { src: '/assets/deans-list-2', captionZh: '哈佛大学怀德纳图书馆前', captionEn: 'In front of Widener Library' },
    ],
  },
  {
    index: '10',
    shortEn: 'PAP',
    tagZh: '公众演讲',
    tagEn: 'Public Speaking',
    nameZh: 'PAP 学法分享宣讲',
    nameEn: 'PAP Peer Advising Program Talk',
    yearShort: '25–26',
    timeZh: '2025.09 至今 · 旗舰宣讲 2025.11',
    timeEn: 'Sep 2025 – Present · Flagship talk Nov 2025',
    roleZh: '组织者 · 主讲人（全程策划并主持）',
    roleEn: 'Organizer & speaker',
    introZh:
      '全程策划并主持 PAP（Peer Advising Program）社团校园宣讲，面向全体高一学弟学妹，负责宣讲流程设计与内容筹备，分享自己学习生物的经历与经验。这次经历让我突破了公众表达的紧张感，提升了逻辑表达与现场应变能力，也体会到把科研价值传递给后来者的成就感。',
    introEn:
      'Planned and hosted the PAP campus talk end-to-end — designing the flow, preparing the content, and sharing my biology-learning journey with all first-year students. It broke my fear of public speaking, sharpened my on-stage logic, and let me taste the joy of passing scientific value on to younger peers.',
    images: [
      { src: '/assets/pap-talk', captionZh: '宣讲现场', captionEn: 'Live at the PAP talk' },
    ],
    links: [
      { kind: 'web', href: 'https://mp.weixin.qq.com/s/OETmB34rC-7_AZCMGs4gHg', labelZh: '学校公众号宣传报道', labelEn: "Report on the school's WeChat official account" },
    ],
  },
  {
    index: '11',
    shortEn: 'Eco Club',
    tagZh: '环保 · 新媒体科普',
    tagEn: 'Environment · Science Media',
    nameZh: 'AP Green 环保社团',
    nameEn: 'AP Green Environmental Club',
    yearShort: '26–27',
    timeZh: '2026.09 至今 · 12 年级',
    timeEn: 'Sep 2026 – Present · Grade 12',
    roleZh: '成员 · 社团中文抖音账号运营',
    roleEn: "Member · runs the club's Chinese Douyin channel",
    introZh:
      '12 年级加入 BJSDFZ AP Green 环保社团，负责运营社团的中文抖音账号，把环境与健康的交叉议题做成大众看得懂的图文与短视频。我撰写并发布了科普文章《垃圾污染对人类健康的影响》，沿着微塑料、焚烧废气与填埋渗滤液三条线索，梳理垃圾污染进入环境、最终影响人体健康的路径与危害，希望让更多普通人意识到：垃圾分类与减量，保护的不只是环境，也是我们自己。',
    introEn:
      "In Grade 12 I joined the AP Green Environmental Club and took over its Chinese-language Douyin channel, turning environment-and-health issues into content the general public can actually understand. I wrote and published the article \"How Waste Pollution Affects Human Health\", tracing how microplastics, incineration emissions, and landfill leachate travel through the environment and ultimately into our bodies — because sorting and reducing waste protects not only the planet, but ourselves.",
    images: [
      { src: '/assets/eco-club-logo', captionZh: 'BJSDFZ AP Green 社团徽记', captionEn: 'AP Green club emblem' },
    ],
    links: [
      { kind: 'web', href: 'https://www.douyin.com/article/7694258825570229755', labelZh: '科普文章：《垃圾污染对人类健康的影响》（抖音）', labelEn: 'Article: How Waste Pollution Affects Human Health (Douyin)' },
      { kind: 'web', href: 'https://www.douyin.com/user/MS4wLjABAAAA9DrSbe46eDx1Io37c8Mz5XzCkf1wukRu_m2dxeWUKjE?from_tab_name=main&vid=7694258825570229755', labelZh: '社团抖音账号主页', labelEn: "Club's Douyin channel" },
      { kind: 'pdf', href: '/assets/eco-article', labelZh: '文章存档（PDF，中文）', labelEn: 'Article archive (PDF, in Chinese)' },
    ],
  },
];

/* ---------------- 单个活动页 ---------------- */

function ActivityPage({ a, total }: { a: Activity; total: number }) {
  const { lang } = useLang();
  const zh = lang === 'zh';
  return (
    <div className="w-full max-w-6xl mx-auto text-left grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
      {/* 档案栏：大编号 + 元信息 */}
      <div className="lg:col-span-4 flex flex-wrap items-end justify-between gap-x-5 gap-y-2 lg:block">
        <div>
          <div className="font-mono text-4xl sm:text-5xl lg:text-6xl leading-none text-slate-900">
            {a.index}
            <span className="text-slate-300 text-xl sm:text-2xl lg:text-3xl">⁄{total}</span>
          </div>
          <p className="mt-2 sm:mt-3 text-[9px] sm:text-[11px] tracking-[0.28em] text-teal-700 font-medium uppercase">
            {zh ? a.tagZh : a.tagEn}
          </p>
        </div>
        <dl className="min-w-0 max-w-full text-right lg:text-left lg:mt-8 space-y-3">
          <div>
            <dt className="text-[10px] uppercase tracking-widest text-slate-400 mb-0.5">
              {zh ? '时间' : 'Time'}
            </dt>
            <dd className="text-[13px] sm:text-sm font-medium text-slate-800 break-words">
              {zh ? a.timeZh : a.timeEn}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-widest text-slate-400 mb-0.5">
              {zh ? '角色' : 'Role'}
            </dt>
            <dd className="text-[13px] sm:text-sm font-medium text-slate-800 break-words">
              {zh ? a.roleZh : a.roleEn}
            </dd>
          </div>
        </dl>
      </div>

      {/* 内容栏 */}
      <div className="lg:col-span-8 min-w-0">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
          {zh ? a.nameZh : a.nameEn}
        </h2>

        <div className="mt-4 pt-4 border-t border-slate-200">
          <p className="text-[13px] sm:text-[15px] text-slate-600 leading-relaxed sm:leading-loose">
            {zh ? a.introZh : a.introEn}
          </p>
        </div>

        {a.images && a.images.length > 0 && (
          <div className="mt-5 flex flex-wrap justify-center gap-4">
            {a.images.map((img, i) => (
              <figure key={img.src} className="min-w-0 text-center">
                {/* 默认去色，悬停显色：档案翻阅感 */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={zh ? `${a.nameZh} — ${img.captionZh}` : `${a.nameEn} — ${img.captionEn}`}
                  loading="lazy"
                  onError={(e) => {
                    // 素材缺失（如图片尚未上传）时整块隐藏，避免出现破图
                    const fig = e.currentTarget.closest('figure');
                    if (fig) (fig as HTMLElement).style.display = 'none';
                  }}
                  className={`block w-auto max-w-full mx-auto border border-slate-200 bg-white grayscale-[45%] hover:grayscale-0 transition duration-500 ${
                    a.images!.length > 1 ? 'max-h-[150px] sm:max-h-[200px] lg:max-h-[220px]' : 'max-h-[180px] sm:max-h-[230px] lg:max-h-[270px]'
                  }`}
                />
                <figcaption className="mt-1.5 font-mono text-[9px] sm:text-[10px] tracking-wide text-slate-400">
                  FIG. {a.index}.{i + 1} — {zh ? img.captionZh : img.captionEn}
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        {a.links && a.links.length > 0 && (
          <div className="mt-5">
            {a.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 sm:gap-4 border-t border-slate-200 last:border-b py-2.5 -mx-2 px-2 hover:bg-slate-50 transition-colors"
              >
                {link.kind === 'pdf' ? <IconDoc /> : <IconExternal />}
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-medium text-slate-800 truncate">
                    {zh ? link.labelZh : link.labelEn}
                  </span>
                  <span className="block text-[11px] sm:text-xs text-slate-400 mt-0.5 truncate">
                    {link.kind === 'pdf'
                      ? zh
                        ? 'PDF · 新标签页打开，可下载'
                        : 'PDF · Opens in a new tab, downloadable'
                      : zh
                      ? '外部链接 · 新标签页打开'
                      : 'External link · Opens in a new tab'}
                  </span>
                </span>
                <span className="shrink-0 text-[11px] uppercase tracking-widest text-slate-400 underline underline-offset-4 group-hover:text-teal-700 transition-colors">
                  {zh ? '打开 ↗' : 'Open ↗'}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- 荣誉墙（Intro 之后第一页） ---------------- */

const levelStyle: Record<Honor['level'], { zh: string; en: string; cls: string }> = {
  international: { zh: '国际级', en: 'International', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
  national: { zh: '国家级', en: 'National', cls: 'bg-teal-50 text-teal-700 border-teal-200' },
  school: { zh: '校级', en: 'School', cls: 'bg-slate-100 text-slate-600 border-slate-200' },
};

function HonorCard({ h }: { h: Honor }) {
  const { lang } = useLang();
  const zh = lang === 'zh';
  const lv = levelStyle[h.level];
  return (
    <div
      className={`relative rounded-xl border border-slate-200 bg-white p-4 sm:p-5 text-left shadow-[0_1px_2px_rgba(15,23,42,0.04)] ${
        h.wide ? 'sm:col-span-2' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-xl sm:text-2xl leading-none text-slate-300">{h.index}</span>
        <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${lv.cls}`}>
          {zh ? lv.zh : lv.en}
        </span>
      </div>
      <h3 className="mt-2 text-sm sm:text-base font-bold text-slate-900 leading-snug">
        {zh ? h.nameZh : h.nameEn}
      </h3>
      <p className="mt-0.5 text-[10px] sm:text-[11px] uppercase tracking-widest text-slate-400">
        {zh ? h.gradeZh : h.gradeEn}
      </p>
      <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-slate-600">
        {zh ? h.descZh : h.descEn}
      </p>
      {h.link && (
        <a
          href={h.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-teal-700 underline underline-offset-4 hover:text-teal-800"
        >
          <IconDoc />
          {zh ? h.link.labelZh : h.link.labelEn} ↗
        </a>
      )}
    </div>
  );
}

function HonorsPage() {
  const { lang } = useLang();
  const zh = lang === 'zh';
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-left">
        <p className="text-[10px] sm:text-[11px] tracking-[0.28em] text-teal-700 font-medium mb-3 sm:mb-4">
          HONORS · 2024 — 2026
        </p>
        <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
          {zh ? '荣誉与奖项' : 'Honors & Awards'}
        </h2>
        <p className="mt-2 sm:mt-3 text-[13px] sm:text-[15px] text-slate-600 leading-relaxed max-w-2xl">
          {zh
            ? '五项荣誉，从国际竞赛到校园服务——它们与后面十一段经历一一对应。'
            : 'Five honors, from international olympiads to campus service — each maps to one of the eleven experiences that follow.'}
        </p>
      </div>
      <div className="mt-5 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {honors.map((h) => (
          <HonorCard key={h.index} h={h} />
        ))}
      </div>
      <p className="mt-5 sm:mt-8 text-[9px] sm:text-[10px] tracking-[0.3em] text-slate-400 text-left">
        {zh ? '继续向下滚动，查看对应的十一段经历 · SCROLL' : 'SCROLL ON FOR THE ELEVEN EXPERIENCES BEHIND THEM'}
      </p>
    </div>
  );
}

/* ---------------- 页面 ---------------- */

export default function AboutPage() {
  const { lang } = useLang();
  const zh = lang === 'zh';

  const goTo = (pageIndex: number) => {
    window.dispatchEvent(new CustomEvent('fps:goto', { detail: pageIndex }));
  };

  // 说明页
  const cover = (
    <div key="cover" className="w-full max-w-5xl mx-auto text-left">
      <p className="text-[10px] sm:text-[11px] tracking-[0.28em] text-teal-700 font-medium mb-4 sm:mb-6">
        PERSONAL INTRO · 2024 — 2026
      </p>
      <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight">
        {zh ? '王致远' : 'Zhiyuan Wang'}
      </h1>
      <p className="mt-2 sm:mt-3 text-xs sm:text-base tracking-[0.3em] text-slate-400 uppercase">
        {zh ? 'Ivan Wang · Zhiyuan Wang' : 'Ivan Wang · 王致远'}
      </p>
      <p className="mt-5 sm:mt-7 text-slate-600 leading-relaxed sm:leading-loose max-w-2xl text-[13px] sm:text-[15px]">
        {zh
          ? '北京师范大学附属中学国际部学生，AP 生物与生物信息学方向。接下来的第一页是荣誉墙，再往后是 2024–2026 年间对我最重要的十一段经历——从球场、班级到实验室，再到秦岭的山野。'
          : 'A student at the High School Affiliated to Beijing Normal University (International Department), focused on AP Biology and bioinformatics. The next page is my honors wall, followed by the eleven experiences that shaped me most between 2024 and 2026 — from the court and the classroom to the lab and the Qinling mountains.'}
      </p>

      {/* 荣誉墙入口 */}
      <button
        onClick={() => goTo(1)}
        className="group mt-6 sm:mt-8 flex w-full items-center gap-3 sm:gap-4 rounded-xl border border-amber-200 bg-amber-50/60 px-4 py-3 text-left transition-colors hover:border-amber-300 hover:bg-amber-50"
      >
        <IconMedal />
        <span className="flex-1 min-w-0">
          <span className="block text-sm font-semibold text-slate-800 group-hover:text-amber-800 transition-colors">
            {zh ? '荣誉与奖项' : 'Honors & Awards'}
          </span>
          <span className="block text-[11px] text-slate-500 mt-0.5">
            {zh ? 'BBO 全球金奖 · USABO 全国银奖 · CTB · 校长荣誉奖 · 优秀志愿者' : 'BBO Global Gold · USABO Silver · CTB · Principal Honor · Volunteering'}
          </span>
        </span>
        <span className="shrink-0 text-[11px] uppercase tracking-widest text-amber-700/70 underline underline-offset-4 group-hover:text-amber-800 transition-colors">
          {zh ? '查看 ↗' : 'View ↗'}
        </span>
      </button>

      {/* 档案目录（点击跳转到对应活动页） */}
      <div className="mt-6 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-12">
        {activities.map((a, i) => (
          <button
            key={a.index}
            onClick={() => goTo(i + 2)}
            className="group flex items-baseline gap-3 sm:gap-4 py-1.5 sm:py-3 border-b border-slate-200 transition-colors hover:border-teal-400 text-left"
          >
            <span className="font-mono text-xs sm:text-sm text-slate-300 group-hover:text-teal-600 transition-colors w-6 sm:w-7 shrink-0">
              {a.index}
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] sm:text-sm font-semibold text-slate-800 truncate group-hover:text-teal-700 transition-colors">
                {zh ? a.nameZh : a.nameEn}
              </div>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-slate-300 group-hover:text-slate-400 transition-colors shrink-0">
              {a.yearShort}
            </span>
          </button>
        ))}
      </div>

      <p className="mt-6 sm:mt-10 text-[9px] sm:text-[10px] tracking-[0.3em] text-slate-400">
        {zh ? '向下滚动：先看荣誉墙，再进入每页一段的经历 · SCROLL' : 'SCROLL — HONORS FIRST, THEN ONE PAGE PER EXPERIENCE'}
      </p>
    </div>
  );

  const pages = [
    cover,
    <HonorsPage key="honors" />,
    ...activities.map((a) => <ActivityPage key={a.index} a={a} total={activities.length} />),
  ];

  const bgColors = pages.map((_, i) => (i % 2 === 0 ? 'bg-white' : 'bg-slate-50'));
  const dotLabels = ['Intro', 'Honors', ...activities.map((a) => a.shortEn)];

  return <FullPageScroll pages={pages} bgColors={bgColors} dotLabels={dotLabels} />;
}
