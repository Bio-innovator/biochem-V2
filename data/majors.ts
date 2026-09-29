// 专业方向静态数据库 —— 随代码直接发布，不再依赖数据库
// 专业名称参考哈佛、耶鲁、普林斯顿、宾大、哥伦比亚、康奈尔、布朗等校的
// 生物相关学科设置（本科 12 个 + 研究生 6 个），内容为自撰中英双语介绍

export interface Major {
  id: string;
  nameEn: string;
  nameZh: string;
  level: 'undergraduate' | 'graduate';
  descriptionZh: string;
  descriptionEn: string;
  skillsZh: string;
  skillsEn: string;
  careersZh: string;
  careersEn: string;
}

export const MAJORS: Major[] = [
  // ---------------- 本科 Undergraduate ----------------
  {
    id: 'mcb',
    nameEn: 'Molecular and Cellular Biology',
    nameZh: '分子与细胞生物学',
    level: 'undergraduate',
    descriptionZh:
      '研究细胞与分子层面的生命机制，涵盖基因表达调控、细胞信号转导、蛋白质结构与功能。哈佛的 MCB 是该方向的代表项目，也是通往医学院的主流路径之一。',
    descriptionEn:
      'Studies life at the molecular and cellular level — gene regulation, signaling, and protein function. Harvard\'s MCB is a flagship program and a classic pre-med path.',
    skillsZh: '分子克隆、蛋白纯化、细胞培养、荧光显微成像',
    skillsEn: 'Molecular cloning, protein purification, cell culture, fluorescence microscopy',
    careersZh: '医学院、科研机构、生物技术公司、制药企业',
    careersEn: 'Medicine, research institutes, biotech, pharma',
  },
  {
    id: 'biochemistry',
    nameEn: 'Biochemistry',
    nameZh: '生物化学',
    level: 'undergraduate',
    descriptionZh:
      '站在化学与生物的交叉点上研究生命分子——酶、代谢通路与核酸化学，课程强调实验化学功底与定量分析能力。',
    descriptionEn:
      'Explores the molecules of life — enzymes, metabolism, and nucleic-acid chemistry — at the interface of chemistry and biology, with strong quantitative training.',
    skillsZh: '酶动力学、色谱与电泳、结构解析、定量分析',
    skillsEn: 'Enzyme kinetics, chromatography & electrophoresis, structural analysis',
    careersZh: '制药、临床诊断、科研、医学院',
    careersEn: 'Pharma, clinical diagnostics, research, medicine',
  },
  {
    id: 'neuroscience',
    nameEn: 'Neuroscience',
    nameZh: '神经科学',
    level: 'undergraduate',
    descriptionZh:
      '从分子、神经环路到行为多个层级研究神经系统。布朗、哥伦比亚等校设有独立本科专业，常与医学研究和人工智能交叉。',
    descriptionEn:
      'Studies the nervous system from molecules and circuits to behavior. A standalone major at Brown and Columbia, often crossing into medicine and AI.',
    skillsZh: '电生理记录、动物行为学实验、脑成像、数据分析',
    skillsEn: 'Electrophysiology, behavioral assays, brain imaging, data analysis',
    careersZh: '神经科研、医学、脑机接口、制药',
    careersEn: 'Neuroscience research, medicine, neurotech, pharma',
  },
  {
    id: 'eeb',
    nameEn: 'Ecology and Evolutionary Biology',
    nameZh: '生态学与进化生物学',
    level: 'undergraduate',
    descriptionZh:
      '研究物种多样性、进化机制与生态系统动态，包含大量野外调查与统计建模，是普林斯顿与耶鲁的招牌方向。',
    descriptionEn:
      'Biodiversity, evolution, and ecosystem dynamics with heavy fieldwork and statistical modeling — signature programs at Princeton and Yale.',
    skillsZh: '样方与野外调查、物种鉴定、统计建模、GIS 分析',
    skillsEn: 'Quadrat & field surveys, taxonomy, statistical modeling, GIS',
    careersZh: '生态保护机构、环境咨询、科研院所、自然资源管理',
    careersEn: 'Conservation, environmental consulting, research, resource management',
  },
  {
    id: 'bme',
    nameEn: 'Biomedical Engineering',
    nameZh: '生物医学工程',
    level: 'undergraduate',
    descriptionZh:
      '用工程手段解决医学问题：医学影像、生物材料、器械设计与组织工程，课程横跨生物、物理与工程，哥伦比亚与宾大均有强势项目。',
    descriptionEn:
      'Applies engineering to medicine — imaging, biomaterials, devices, and tissue engineering — spanning biology, physics, and engineering at Columbia and Penn.',
    skillsZh: '生物材料、信号处理、CAD 制图、原型设计',
    skillsEn: 'Biomaterials, signal processing, CAD, prototyping',
    careersZh: '医疗器械、生物材料企业、临床工程、继续深造',
    careersEn: 'Medical devices, biomaterials, clinical engineering, grad school',
  },
  {
    id: 'bioengineering',
    nameEn: 'Bioengineering',
    nameZh: '生物工程',
    level: 'undergraduate',
    descriptionZh:
      '宾大的代表性交叉学科，覆盖合成生物学、药物递送与生物系统的设计改造，强调“设计—构建—测试”的工程思维。',
    descriptionEn:
      'Penn\'s flagship interdisciplinary track — synthetic biology, drug delivery, and biological systems design, built on the design-build-test cycle.',
    skillsZh: '基因线路设计、发酵工艺、系统建模、实验自动化',
    skillsEn: 'Gene-circuit design, fermentation, systems modeling, lab automation',
    careersZh: '合成生物学公司、生物制造、制药、科技创业',
    careersEn: 'Synbio companies, biomanufacturing, pharma, startups',
  },
  {
    id: 'compbio',
    nameEn: 'Computational Biology',
    nameZh: '计算生物学',
    level: 'undergraduate',
    descriptionZh:
      '用算法与统计方法处理基因组等大规模生物数据，是生物与计算机科学的交叉学科，康奈尔、布朗均设有本科项目。',
    descriptionEn:
      'Applies algorithms and statistics to large-scale genomic data — the CS–biology crossover, with undergraduate programs at Cornell and Brown.',
    skillsZh: 'Python / R、序列比对分析、机器学习、统计推断',
    skillsEn: 'Python / R, sequence analysis, machine learning, statistical inference',
    careersZh: '生物信息岗位、药企数据科学、科研机构',
    careersEn: 'Bioinformatics, data science in pharma, research',
  },
  {
    id: 'cpb',
    nameEn: 'Chemical and Physical Biology',
    nameZh: '化学与物理生物学',
    level: 'undergraduate',
    descriptionZh:
      '哈佛特色专业，用物理与化学的定量工具研究生物体系——单分子技术、生物物理与化学生物学的结合，适合数理基础扎实的学生。',
    descriptionEn:
      'A Harvard specialty — studying biological systems with quantitative tools from physics and chemistry, from single-molecule methods to chemical biology.',
    skillsZh: '单分子技术、光谱学、定量建模、仪器搭建',
    skillsEn: 'Single-molecule techniques, spectroscopy, quantitative modeling, instrumentation',
    careersZh: '科研院所、制药研发、医学院、交叉学科深造',
    careersEn: 'Research, pharma R&D, medicine, interdisciplinary grad study',
  },
  {
    id: 'microimm',
    nameEn: 'Microbiology and Immunology',
    nameZh: '微生物学与免疫学',
    level: 'undergraduate',
    descriptionZh:
      '研究细菌、病毒与宿主免疫系统之间的攻防，涵盖感染机制、疫苗与免疫疗法，与公共健康议题紧密相连。',
    descriptionEn:
      'Microbes and the immune system — infection mechanisms, vaccines, and immunotherapy — tightly linked to public health.',
    skillsZh: '微生物培养、流式细胞术、免疫学实验、生物安全规范',
    skillsEn: 'Microbial culture, flow cytometry, immunological assays, biosafety',
    careersZh: '疫苗研发、临床检验、公共卫生机构、科研',
    careersEn: 'Vaccine R&D, clinical labs, public health, research',
  },
  {
    id: 'genetics',
    nameEn: 'Genetics and Genomics',
    nameZh: '遗传学与基因组学',
    level: 'undergraduate',
    descriptionZh:
      '从孟德尔遗传到高通量测序，研究基因如何决定性状、驱动进化并导致疾病，是精准医学的学科基础。',
    descriptionEn:
      'From Mendelian inheritance to high-throughput sequencing — how genes shape traits, drive evolution, and cause disease; the foundation of precision medicine.',
    skillsZh: '基因组数据分析、CRISPR 基因编辑、群体遗传学',
    skillsEn: 'Genomic data analysis, CRISPR editing, population genetics',
    careersZh: '基因诊断、精准医疗、科研机构、种业公司',
    careersEn: 'Genetic diagnostics, precision medicine, research, breeding',
  },
  {
    id: 'plantbio',
    nameEn: 'Plant Biology',
    nameZh: '植物生物学',
    level: 'undergraduate',
    descriptionZh:
      '康奈尔的传统强项：植物发育、光合作用与环境适应、作物改良，把分子生物学连接到农业、生态与食品安全。',
    descriptionEn:
      'A Cornell strength — plant development, photosynthesis, environmental adaptation, and crop improvement, linking molecular biology to agriculture and food security.',
    skillsZh: '植物分子生物学、温室实验、田间试验设计',
    skillsEn: 'Plant molecular biology, greenhouse experiments, field-trial design',
    careersZh: '农业科技、种业公司、生态研究机构',
    careersEn: 'Agri-tech, seed companies, ecological research',
  },
  {
    id: 'cogsci',
    nameEn: 'Cognitive Science',
    nameZh: '认知科学',
    level: 'undergraduate',
    descriptionZh:
      '耶鲁、宾大等校的交叉专业，从心理学、神经科学与计算的角度研究心智与行为，可选择神经科学或计算方向深化。',
    descriptionEn:
      'An interdisciplinary major at Yale and Penn — mind and behavior through psychology, neuroscience, and computation, with tracks into neuroscience or AI.',
    skillsZh: '实验设计、行为数据分析、计算建模',
    skillsEn: 'Experimental design, behavioral data analysis, computational modeling',
    careersZh: '科研机构、用户体验研究、医学、人工智能',
    careersEn: 'Research, UX research, medicine, AI',
  },
  // ---------------- 研究生 Graduate ----------------
  {
    id: 'bioinformatics',
    nameEn: 'Bioinformatics',
    nameZh: '生物信息学',
    level: 'graduate',
    descriptionZh:
      '研究生阶段深入组学数据分析、算法开发与数据库构建，是连接湿实验与计算的核心桥梁，就业面横跨学术界与产业界。',
    descriptionEn:
      'Graduate-level omics analysis, algorithm development, and database building — the bridge between wet lab and computation, valued in both academia and industry.',
    skillsZh: '组学分析流程、算法开发、数据库构建与可视化',
    skillsEn: 'Omics pipelines, algorithm development, databases & visualization',
    careersZh: '药企、基因测序公司、科研院所',
    careersEn: 'Pharma, genomics companies, research institutes',
  },
  {
    id: 'molbio',
    nameEn: 'Molecular Biology',
    nameZh: '分子生物学',
    level: 'graduate',
    descriptionZh:
      '经典的博士方向，围绕中心法则研究复制、转录与翻译的精细调控，系统训练课题设计、实验技术与学术写作。',
    descriptionEn:
      'The classic PhD track — replication, transcription, and translation — with rigorous training in project design, bench skills, and scientific writing.',
    skillsZh: '分子实验技术、课题设计、学术论文写作',
    skillsEn: 'Molecular techniques, project design, academic writing',
    careersZh: '高校教职、研究所、药企研发',
    careersEn: 'Academia, research institutes, pharma R&D',
  },
  {
    id: 'immunology',
    nameEn: 'Immunology',
    nameZh: '免疫学',
    level: 'graduate',
    descriptionZh:
      '深入研究先天与适应性免疫、肿瘤免疫与自身免疫疾病，与临床转化联系紧密，是当下生物医药的热门方向。',
    descriptionEn:
      'Innate and adaptive immunity, tumor immunology, and autoimmune disease — closely tied to clinical translation and a hot area in biomedicine.',
    skillsZh: '流式细胞术、动物模型、单细胞测序',
    skillsEn: 'Flow cytometry, animal models, single-cell sequencing',
    careersZh: '药企免疫管线、临床科研、学术界',
    careersEn: 'Pharma immuno-oncology pipelines, clinical research, academia',
  },
  {
    id: 'epidemiology',
    nameEn: 'Epidemiology and Public Health',
    nameZh: '流行病学与公共卫生',
    level: 'graduate',
    descriptionZh:
      '用统计方法与人群数据研究疾病的分布、成因与干预策略，新冠疫情后全球需求显著上升，常春藤各校均设有公共卫生学院。',
    descriptionEn:
      'Studies disease distribution and interventions with population-level data and statistics; demand surged after COVID-19, with schools of public health across the Ivy League.',
    skillsZh: '流行病学方法、生物统计、卫生政策分析',
    skillsEn: 'Epidemiological methods, biostatistics, health policy analysis',
    careersZh: '疾控中心、国际组织、卫生政策机构',
    careersEn: 'CDC, international organizations, health policy',
  },
  {
    id: 'biotech',
    nameEn: 'Biotechnology',
    nameZh: '生物技术',
    level: 'graduate',
    descriptionZh:
      '面向产业的硕士项目，融合分子技术、生物工艺与商业化课程，培养直通生物医药产业的复合型人才。',
    descriptionEn:
      'An industry-oriented master\'s combining molecular techniques, bioprocessing, and commercialization — a direct pipeline into biopharma.',
    skillsZh: '生物工艺开发、GMP 规范、项目管理',
    skillsEn: 'Bioprocess development, GMP, project management',
    careersZh: '生物医药公司、技术转移办公室、产品管理',
    careersEn: 'Biopharma, tech transfer, product management',
  },
  {
    id: 'neurobiology',
    nameEn: 'Neurobiology',
    nameZh: '神经生物学',
    level: 'graduate',
    descriptionZh:
      '研究生层面聚焦神经环路与分子机制，常用模式动物、光遗传与成像技术解析大脑的工作原理，与阿尔兹海默症等疾病研究直接相关。',
    descriptionEn:
      'Graduate focus on neural circuits and molecular mechanisms, using model organisms, optogenetics, and imaging to decode the brain — directly relevant to diseases like Alzheimer\'s.',
    skillsZh: '神经环路示踪、光遗传学、钙成像',
    skillsEn: 'Circuit tracing, optogenetics, calcium imaging',
    careersZh: '神经科学研究、药企、脑科学研究机构',
    careersEn: 'Neuroscience research, pharma, brain-science institutes',
  },
];

export const UNDERGRAD_MAJORS = MAJORS.filter((m) => m.level === 'undergraduate');
export const GRADUATE_MAJORS = MAJORS.filter((m) => m.level === 'graduate');
