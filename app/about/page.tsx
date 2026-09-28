'use client';

import FullPageScroll from '@/components/FullPageScroll';

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
  hint: string;
}

interface Activity {
  index: string;
  tagEn: string;
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

const activities: Activity[] = [
  {
    index: '01',
    tagEn: 'Sports · Teamwork',
    nameZh: '篮球社团',
    nameEn: 'Basketball Club',
    yearShort: '24–26',
    timeZh: '2024.09 – 2026.06 · 每周 2–3 次训练',
    timeEn: 'Sep 2024 – Jun 2026 · 2–3 sessions weekly',
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
    index: '02',
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
    index: '03',
    tagEn: 'Leadership · Service',
    nameZh: '班长 · AP 学生会生活部长',
    nameEn: 'Class Monitor & Head of Life Dept., AP Student Union',
    yearShort: '25–26',
    timeZh: '2025.03 – 2026.06 · 连任至今',
    timeEn: 'Mar 2025 – Jun 2026 · Re-elected',
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
    index: '04',
    tagEn: 'Bioinformatics · Summer Research',
    nameZh: 'UCL 生物信息学夏校',
    nameEn: 'UCL Bioinformatics Summer School',
    yearShort: '2025',
    timeZh: '2025.07 – 2025.08 · 高一暑假',
    timeEn: 'Jul – Aug 2025 · Grade-10 summer',
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
      {
        kind: 'pdf',
        href: '/assets/ucl-report',
        labelZh: '夏校综述报告（FAM131A 基因功能推测）',
        labelEn: 'Summer-school review report',
        hint: 'PDF · 新标签页打开，可下载',
      },
    ],
  },
  {
    index: '05',
    tagEn: 'Founder · Community',
    nameZh: '生物信息科研社团',
    nameEn: 'Bioinformatics Research Club',
    yearShort: '25–26',
    timeZh: '2025.09 – 2026.06 · 已组织 5 次活动',
    timeEn: 'Sep 2025 – Jun 2026 · 5 sessions held',
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
    tagEn: 'Research · Innovation',
    nameZh: 'CTB 全球青年研究创新论坛',
    nameEn: 'China Thinks Big (CTB)',
    yearShort: '25–26',
    timeZh: '2025.09 – 2026.05 · 历时约半年',
    timeEn: 'Sep 2025 – May 2026 · About 6 months',
    roleZh: '队长 · 核心主导（方案设计、结果分析、论文定稿）',
    roleEn: 'Team lead — design, analysis & paper',
    introZh:
      '独立组队完成“长效解决乳糖不耐受的可行性方案及验证”（转基因益生菌疗法的可行性分析与多维风险评估）。在没有老师指导的情况下从零搭建研究框架，比对 30 余篇权威期刊文献，重新分析人群调研数据，并请教老师后彻底调整研究框架，建立起严密的合规性与长期安全风险评估模型。最终获全国论坛华北区团队二等奖，论文发表于学术期刊《进展》。',
    introEn:
      'Led a self-organized team on "a long-term solution for lactose intolerance" — a feasibility analysis and multi-dimensional risk assessment of a probiotic therapy. With no faculty supervision, I built the research framework from scratch, reviewed 30+ journal papers, re-analyzed our survey data, and rebuilt the compliance and long-term safety model after consulting a teacher. We won 2nd prize (North China) at the national forum, and the paper was published in the journal Progress.',
    images: [
      { src: '/assets/ctb', captionZh: '全国论坛展区合影', captionEn: 'At the national forum exhibition' },
    ],
    links: [
      {
        kind: 'pdf',
        href: '/assets/ctb-paper',
        labelZh: '论文发表版（期刊《进展》）',
        labelEn: 'Published paper (journal Progress)',
        hint: 'PDF · 新标签页打开，可下载',
      },
    ],
  },
  {
    index: '07',
    tagEn: 'Public Speaking',
    nameZh: 'PAP 学法分享宣讲',
    nameEn: 'PAP Peer Advising Program Talk',
    yearShort: '2025',
    timeZh: '2025.11 · 单次大型宣讲',
    timeEn: 'Nov 2025 · One-off campus talk',
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
      {
        kind: 'web',
        href: 'https://mp.weixin.qq.com/s/OETmB34rC-7_AZCMGs4gHg',
        labelZh: '学校公众号宣传报道',
        labelEn: "Report on the school's WeChat official account",
        hint: '微信文章 · 新标签页打开',
      },
    ],
  },
  {
    index: '08',
    tagEn: 'Full-stack · Education',
    nameZh: '生物学习网站开发和推广',
    nameEn: 'Biochem-niche Website',
    yearShort: '25–26',
    timeZh: '2025.09 – 2026.06 · 持续迭代至今',
    timeEn: 'Sep 2025 – Jun 2026 · Iterating',
    roleZh: '创建者 · 独立开发者与运营者',
    roleEn: 'Founder & solo developer',
    introZh:
      '在付馨悦老师的鼓励与课内 PBL 项目式学习框架下，独立搭建并运营面向学校生物社区的 AP 生物学习平台 Biochem-niche——就是你现在正在浏览的这个网站。毫无全栈经验的我在课余从零自学网页开发，联调 Supabase 数据库与 Vercel 部署时遭遇环境变量、认证与路由重定向的连环报错，最终交叉比对 Error Logs 逐一打通。目标只有一个：帮老师定位知识盲区，帮学生自主学习，让没有资源的学生也能公平地获取知识。',
    introEn:
      "Encouraged by my advisor Ms. Fu within the course's PBL framework, I independently built and now operate Biochem-niche — the very site you are browsing. With no prior full-stack experience, I taught myself web development after class; wiring the Supabase database to Vercel deployment meant an afternoon of cross-reading cryptic error logs until the data flowed. The goal: help teachers spot knowledge gaps, help students learn independently, and make quality resources fair for everyone.",
  },
  {
    index: '09',
    tagEn: "Neurobiology · Alzheimer's",
    nameZh: 'CIS 跨学科研究项目',
    nameEn: 'CIS Interdisciplinary Research Program',
    yearShort: '2026',
    timeZh: '2026.06 – 2026.08 · 9 周 · 每周 3 小时',
    timeEn: 'Jun – Aug 2026 · 9 weeks',
    roleZh: '参与者（跟随专业导师，团队协作）',
    roleEn: 'Participant · Mentor-led team research',
    introZh:
      '参加 CIS（The Center for Interdisciplinary Scholarship）跨学科研究项目，主题为阿尔兹海默症：跟随专业导师学习神经生物学理论与科研方法，参与实验数据整理、文献检索与分析，与团队协作完成研究阶段性报告，深入探索可能涉及的基因突变、发病机制与潜在干预方向。这次经历让我打破单一学科的思维局限，深刻理解跨学科融合（生物＋数据＋临床）的价值。',
    introEn:
      "Joined the CIS interdisciplinary research program on Alzheimer's disease — studying neurobiology theory and research methods under a faculty mentor, organizing experimental data, analyzing literature, and co-authoring a staged research report on gene mutations, pathogenesis, and potential interventions. It taught me to break single-discipline thinking and value the fusion of biology, data, and clinical insight.",
    links: [
      {
        kind: 'pdf',
        href: '/assets/cis-paper',
        labelZh: '研究论文',
        labelEn: 'Research paper',
        hint: 'PDF · 新标签页打开，可下载',
      },
    ],
  },
  {
    index: '10',
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
      {
        kind: 'pdf',
        href: '/assets/qinling-paper',
        labelZh: '研究论文：人工林与次生林植物群落差异',
        labelEn: 'Research paper',
        hint: 'PDF · 新标签页打开，可下载',
      },
      {
        kind: 'pdf',
        href: '/assets/qinling-slides',
        labelZh: '考察展示 PPT',
        labelEn: 'Field-trip presentation slides',
        hint: 'PDF · 新标签页打开，可下载',
      },
    ],
  },
];

/* ---------------- 单个活动页 ---------------- */

function ActivityPage({ a, total }: { a: Activity; total: number }) {
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
            {a.tagEn}
          </p>
        </div>
        <dl className="min-w-0 max-w-full text-right lg:text-left lg:mt-8 space-y-3">
          <div>
            <dt className="text-[10px] uppercase tracking-widest text-slate-400 mb-0.5">时间 · Time</dt>
            <dd className="text-[13px] sm:text-sm font-medium text-slate-800 break-words">{a.timeZh}</dd>
            <dd className="text-[11px] sm:text-xs text-slate-400 mt-0.5">{a.timeEn}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-widest text-slate-400 mb-0.5">角色 · Role</dt>
            <dd className="text-[13px] sm:text-sm font-medium text-slate-800 break-words">{a.roleZh}</dd>
            <dd className="text-[11px] sm:text-xs text-slate-400 mt-0.5">{a.roleEn}</dd>
          </div>
        </dl>
      </div>

      {/* 内容栏 */}
      <div className="lg:col-span-8 min-w-0">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">{a.nameZh}</h2>
        <p className="mt-1 sm:mt-1.5 text-sm sm:text-base lg:text-lg text-slate-400">{a.nameEn}</p>

        <div className="mt-4 pt-4 border-t border-slate-200">
          <p className="text-[13px] sm:text-[15px] text-slate-600 leading-relaxed sm:leading-loose">{a.introZh}</p>
          <p className="mt-2.5 text-xs sm:text-[13px] text-slate-400 leading-relaxed">{a.introEn}</p>
        </div>

        {a.images && a.images.length > 0 && (
          <div className={`mt-5 grid gap-4 ${a.images.length > 1 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
            {a.images.map((img, i) => (
              <figure key={img.src} className="min-w-0">
                {/* 默认去色，悬停显色：档案翻阅感 */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={`${a.nameZh} — ${img.captionZh}`}
                  loading="lazy"
                  className={`block w-auto max-w-full mx-auto border border-slate-200 bg-white grayscale-[45%] hover:grayscale-0 transition duration-500 ${
                    a.images!.length > 1 ? 'max-h-[150px] sm:max-h-[200px] lg:max-h-[220px]' : 'max-h-[180px] sm:max-h-[230px] lg:max-h-[270px]'
                  }`}
                />
                <figcaption className="mt-1.5 font-mono text-[9px] sm:text-[10px] tracking-wide text-slate-400 text-center">
                  FIG. {a.index}.{i + 1} — {img.captionZh} · {img.captionEn}
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
                  <span className="block text-sm font-medium text-slate-800 truncate">{link.labelZh}</span>
                  <span className="block text-[11px] sm:text-xs text-slate-400 mt-0.5 truncate">
                    {link.labelEn} — {link.hint}
                  </span>
                </span>
                <span className="shrink-0 text-[11px] uppercase tracking-widest text-slate-400 underline underline-offset-4 group-hover:text-teal-700 transition-colors">
                  打开 · Open ↗
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- 页面 ---------------- */

export default function AboutPage() {
  // 说明页
  const cover = (
    <div key="cover" className="w-full max-w-5xl mx-auto text-left">
      <p className="text-[10px] sm:text-[11px] tracking-[0.28em] text-teal-700 font-medium mb-4 sm:mb-6">
        PERSONAL INTRO · 2024 — 2026
      </p>
      <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight">王致远</h1>
      <p className="mt-2 sm:mt-3 text-xs sm:text-base tracking-[0.3em] text-slate-400 uppercase">
        Ivan Wang · Zhiyuan Wang
      </p>
      <p className="mt-5 sm:mt-7 text-slate-600 leading-relaxed sm:leading-loose max-w-2xl text-[13px] sm:text-[15px]">
        北京师范大学附属中学国际部学生，AP 生物与生物信息学方向。以下是 2024–2026
        年间对我最重要的十段经历——从球场、班级到实验室，再到秦岭的山野。
      </p>
      <p className="mt-2 text-xs sm:text-[13px] text-slate-400 leading-relaxed max-w-2xl">
        A student at the High School Affiliated to Beijing Normal University (International
        Department), focused on AP Biology and bioinformatics. Below are the ten experiences that
        shaped me most between 2024 and 2026 — from the court and the classroom to the lab and the
        Qinling mountains.
      </p>

      {/* 档案目录 */}
      <div className="mt-6 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-12">
        {activities.map((a) => (
          <div
            key={a.index}
            className="group flex items-baseline gap-3 sm:gap-4 py-1.5 sm:py-3 border-b border-slate-200 transition-colors hover:border-teal-400"
          >
            <span className="font-mono text-xs sm:text-sm text-slate-300 group-hover:text-teal-600 transition-colors w-6 sm:w-7 shrink-0">
              {a.index}
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] sm:text-sm font-semibold text-slate-800 truncate">{a.nameZh}</div>
              <div className="hidden sm:block text-xs text-slate-400 truncate">{a.nameEn}</div>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-slate-300 group-hover:text-slate-400 transition-colors shrink-0">
              {a.yearShort}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-6 sm:mt-10 text-[9px] sm:text-[10px] tracking-[0.3em] text-slate-400">
        向下滚动，每页一段经历 · SCROLL — ONE PAGE PER EXPERIENCE
      </p>
    </div>
  );

  const pages = [
    cover,
    ...activities.map((a) => <ActivityPage key={a.index} a={a} total={activities.length} />),
  ];

  const bgColors = pages.map((_, i) => (i % 2 === 0 ? 'bg-white' : 'bg-slate-50'));

  return <FullPageScroll pages={pages} bgColors={bgColors} />;
}
