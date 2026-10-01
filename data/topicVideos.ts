// 每个知识点的推荐讲解视频（1-2 个，全部为真实可访问的链接，2026-10 逐一核实）
// key = KnowledgeTopic.titleEn
// 来源以 Amoeba Sisters / Bozeman Science / Khan Academy / Crash Course 等权威教育频道为主

export interface TopicVideo {
  title: string;
  url: string;
  source: string;
  descZh: string;
  descEn: string;
}

export const TOPIC_VIDEOS: Record<string, TopicVideo[]> = {
  // ---------- Unit 1 ----------
  'Atomic Structure and Chemical Bonds': [
    {
      title: 'Covalent Bonding',
      url: 'https://www.youtube.com/watch?v=Mo4Vfqt5v2A',
      source: 'Bozeman Science',
      descZh: '讲解共价键的形成、共用电子对与分子结构，是理解生物大分子的基础。',
      descEn: 'How covalent bonds form and share electrons — the basis of all biomolecules.',
    },
    {
      title: 'Ionic Bonding',
      url: 'https://www.youtube.com/watch?v=hiyTfhjeF_U',
      source: 'Bozeman Science',
      descZh: '讲解离子键、电子转移与离子化合物，与共价键形成对照。',
      descEn: 'Electron transfer and ionic compounds, contrasted with covalent bonding.',
    },
  ],
  'Carbohydrates': [
    {
      title: 'Biomolecules (Updated)',
      url: 'https://www.youtube.com/watch?v=1Dx7LDwINLU',
      source: 'Amoeba Sisters',
      descZh: '四大生物分子总览，其中碳水化合物部分讲解单糖、二糖与多糖的结构和供能作用。',
      descEn: 'Overview of the four biomolecules; the carbohydrate section covers mono-/di-/polysaccharides.',
    },
    {
      title: 'Biological Molecules — Crash Course Biology #3',
      url: 'https://www.youtube.com/watch?v=H8WJ2KENlK0',
      source: 'Crash Course',
      descZh: '从“你吃什么就是什么”切入，讲碳水化合物等生物分子的元素组成与功能。',
      descEn: 'Elemental composition and functions of carbohydrates and other biological molecules.',
    },
  ],
  'Carbon: The Backbone of Life': [
    {
      title: 'Biological Molecules — Crash Course Biology #3',
      url: 'https://www.youtube.com/watch?v=H8WJ2KENlK0',
      source: 'Crash Course',
      descZh: '解释碳原子为何能形成四个键、搭建生命大分子的骨架。',
      descEn: 'Why carbon\u2019s four bonds make it the backbone of organic molecules.',
    },
    {
      title: 'Biomolecules (Updated)',
      url: 'https://www.youtube.com/watch?v=1Dx7LDwINLU',
      source: 'Amoeba Sisters',
      descZh: '以碳为中心串联糖类、脂质、蛋白质和核酸四类大分子。',
      descEn: 'Connects the four macromolecule families around carbon chemistry.',
    },
  ],
  'Lipids': [
    {
      title: 'Lipids（视频页）',
      url: 'http://www.bozemanscience.com/lipids',
      source: 'Bozeman Science',
      descZh: '讲解甘油三酯、磷脂与固醇的结构差异，以及脂质储能和成膜的功能。',
      descEn: 'Structure of triglycerides, phospholipids and steroids; energy storage and membranes.',
    },
    {
      title: 'Biomolecules (Updated)',
      url: 'https://www.youtube.com/watch?v=1Dx7LDwINLU',
      source: 'Amoeba Sisters',
      descZh: '脂质章节讲解疏水性、饱和/不饱和脂肪酸与细胞膜的关系。',
      descEn: 'The lipid section covers hydrophobicity, saturation and membrane roles.',
    },
  ],
  'Nucleic Acids': [
    {
      title: 'DNA vs. RNA (Updated)',
      url: 'https://www.youtube.com/watch?v=JQByjprj_mA',
      source: 'Amoeba Sisters',
      descZh: '对比 DNA 与 RNA 的结构（五碳糖、碱基、链数）与功能分工。',
      descEn: 'Structural and functional comparison of DNA and RNA.',
    },
    {
      title: 'DNA and RNA — Part 1',
      url: 'https://www.youtube.com/watch?v=qoERVSWKmGk',
      source: 'Bozeman Science',
      descZh: '讲解核酸的核苷酸组成、方向性，以及证明 DNA 是遗传物质的经典实验。',
      descEn: 'Nucleotide structure and the classic experiments identifying DNA as genetic material.',
    },
  ],
  'Properties of Water': [
    {
      title: 'Properties of Water',
      url: 'https://www.youtube.com/watch?v=3jwAGWky98c',
      source: 'Amoeba Sisters',
      descZh: '讲解极性、氢键、内聚/附着力、高比热等水的关键性质及其生命意义。',
      descEn: 'Polarity, hydrogen bonding, cohesion/adhesion and high specific heat of water.',
    },
    {
      title: 'Water: A Polar Molecule',
      url: 'https://www.youtube.com/watch?v=iOOvX0jmhJ4',
      source: 'Bozeman Science',
      descZh: '从电负性出发解释水分子的极性如何产生氢键与诸多“反常”性质。',
      descEn: 'How electronegativity makes water polar and gives it its unusual properties.',
    },
  ],
  'Proteins': [
    {
      title: 'Protein Structure and Folding',
      url: 'https://www.youtube.com/watch?v=hok2hyED9go',
      source: 'Amoeba Sisters',
      descZh: '讲解氨基酸、肽键与蛋白质一至四级结构，以及折叠与功能的关系。',
      descEn: 'Amino acids, peptide bonds, four levels of protein structure and folding.',
    },
    {
      title: 'Biological Molecules — Crash Course Biology #3',
      url: 'https://www.youtube.com/watch?v=H8WJ2KENlK0',
      source: 'Crash Course',
      descZh: '把蛋白质放回四大生物分子框架中，讲其结构与催化的功能。',
      descEn: 'Proteins in the context of all four biomolecules: structure and function.',
    },
  ],

  // ---------- Unit 2 ----------
  'Cell Membrane Structure': [
    {
      title: 'Inside the Cell Membrane',
      url: 'https://www.youtube.com/watch?v=qBCVVszQQNs',
      source: 'Amoeba Sisters',
      descZh: '详解流动镶嵌模型：磷脂双层、胆固醇、膜蛋白与糖链的位置和作用。',
      descEn: 'The fluid mosaic model: phospholipids, cholesterol, membrane proteins and carbohydrates.',
    },
    {
      title: 'Cell Transport',
      url: 'https://www.youtube.com/watch?v=Ptmlvtei8hw',
      source: 'Amoeba Sisters',
      descZh: '从膜的选择透过性出发，概览被动与主动运输的方式。',
      descEn: 'Selective permeability and an overview of passive vs. active transport.',
    },
  ],
  'Mitochondria and Chloroplasts': [
    {
      title: 'Endosymbiotic Theory',
      url: 'https://www.youtube.com/watch?v=FGnS-Xk0ZqU',
      source: 'Amoeba Sisters',
      descZh: '讲解线粒体和叶绿体起源于内共生的证据（双层膜、自有 DNA 等）。',
      descEn: 'Evidence that mitochondria and chloroplasts originated by endosymbiosis.',
    },
    {
      title: 'Cell Organelles and Structures Review',
      url: 'https://www.youtube.com/watch?v=6mgkoqcm6Sg',
      source: 'Amoeba Sisters',
      descZh: '细胞器总复习，其中线粒体与叶绿体部分对应能量转换功能。',
      descEn: 'Organelle review including mitochondria and chloroplasts as energy converters.',
    },
  ],
  'Prokaryotic vs. Eukaryotic Cells': [
    {
      title: 'Prokaryotic vs. Eukaryotic Cells (Updated)',
      url: 'https://www.youtube.com/watch?v=Pxujitlv8wc',
      source: 'Amoeba Sisters',
      descZh: '对比原核与真核细胞的异同，并介绍三域系统。',
      descEn: 'Similarities and differences between prokaryotic and eukaryotic cells; the three domains.',
    },
    {
      title: 'Introduction to Cells: The Grand Cell Tour',
      url: 'https://www.youtube.com/watch?v=8IlzKri08kk',
      source: 'Amoeba Sisters',
      descZh: '细胞结构全景导览，涵盖动植物细胞的主要细胞器。',
      descEn: 'A grand tour of cell structures and organelles in animal and plant cells.',
    },
  ],
  'The Cytoskeleton': [
    {
      title: 'Cell Organelles and Structures Review',
      url: 'https://www.youtube.com/watch?v=6mgkoqcm6Sg',
      source: 'Amoeba Sisters',
      descZh: '细胞器总复习，包含中心体与细胞骨架相关结构的形态与功能。',
      descEn: 'Organelle review including centrioles and cytoskeletal structures.',
    },
    {
      title: 'Introduction to Cells: The Grand Cell Tour',
      url: 'https://www.youtube.com/watch?v=8IlzKri08kk',
      source: 'Amoeba Sisters',
      descZh: '细胞导览中讲解维持细胞形态的骨架结构。',
      descEn: 'The cell tour covers structural elements that maintain cell shape.',
    },
  ],
  'The Endomembrane System': [
    {
      title: 'Endomembrane System | Structure of a Cell',
      url: 'https://www.youtube.com/watch?v=vC-cEWJxDRY',
      source: 'Khan Academy',
      descZh: '讲解内质网、高尔基体、囊泡与溶酶体如何协同完成蛋白质加工与运输。',
      descEn: 'How the ER, Golgi, vesicles and lysosomes cooperate in protein processing and trafficking.',
    },
    {
      title: 'Introduction to Cells: The Grand Cell Tour',
      url: 'https://www.youtube.com/watch?v=8IlzKri08kk',
      source: 'Amoeba Sisters',
      descZh: '细胞导览中呈现内膜系统各细胞器的空间关系。',
      descEn: 'Spatial overview of endomembrane organelles in the cell tour.',
    },
  ],
  'The Nucleus and Ribosomes': [
    {
      title: 'Introduction to Cells: The Grand Cell Tour',
      url: 'https://www.youtube.com/watch?v=8IlzKri08kk',
      source: 'Amoeba Sisters',
      descZh: '讲解细胞核（核膜、核孔、染色质）与核糖体的位置和作用。',
      descEn: 'The nucleus (envelope, pores, chromatin) and ribosomes in the cell tour.',
    },
    {
      title: 'Protein Synthesis (Updated)',
      url: 'https://www.youtube.com/watch?v=oefAI2x2CQM',
      source: 'Amoeba Sisters',
      descZh: '从核糖体执行翻译的角度，串联细胞核与核糖体的功能配合。',
      descEn: 'How the nucleus and ribosomes cooperate through protein synthesis.',
    },
  ],
  'Transport Across Membranes': [
    {
      title: 'Cell Transport',
      url: 'https://www.youtube.com/watch?v=Ptmlvtei8hw',
      source: 'Amoeba Sisters',
      descZh: '系统讲解扩散、易化扩散、渗透、主动运输与胞吞胞吐。',
      descEn: 'Diffusion, facilitated diffusion, osmosis, active transport, endo-/exocytosis.',
    },
    {
      title: 'Osmosis and Water Potential (Updated)',
      url: 'https://www.youtube.com/watch?v=L-osEc07vMs',
      source: 'Amoeba Sisters',
      descZh: '深入讲解渗透、水势与溶液张力（高渗/低渗/等渗）对细胞的影响。',
      descEn: 'Osmosis, water potential and tonicity effects on cells.',
    },
  ],

  // ---------- Unit 3 ----------
  'ATP: Energy Currency': [
    {
      title: 'What is ATP?',
      url: 'https://www.youtube.com/watch?v=23ZzI6WZS28',
      source: 'Amoeba Sisters',
      descZh: '讲解 ATP 的结构、ATP-ADP 循环，以及它为什么被称为细胞的“能量货币”。',
      descEn: 'ATP structure, the ATP-ADP cycle, and why ATP is the cell\u2019s energy currency.',
    },
    {
      title: 'ATP & Respiration — Crash Course Biology #7',
      url: 'https://www.youtube.com/watch?v=00jbG_cfGuQ',
      source: 'Crash Course',
      descZh: '把 ATP 与细胞呼吸联系起来，讲能量如何从食物流向 ATP。',
      descEn: 'Connects ATP with cellular respiration: energy flow from food to ATP.',
    },
  ],
  'Electron Transport Chain and Oxidative Phosphorylation': [
    {
      title: 'Electron Transport Chain',
      url: 'https://www.youtube.com/watch?v=LQmTKxI4Wn4',
      source: 'Harvard Online (HarvardX)',
      descZh: '分子级动画展示电子传递链、质子梯度与 ATP 合酶的工作过程。',
      descEn: 'Molecular animation of the ETC, proton gradient and ATP synthase.',
    },
    {
      title: 'Cellular Respiration (UPDATED)',
      url: 'https://www.youtube.com/watch?v=eJ9Zjc-jdys',
      source: 'Amoeba Sisters',
      descZh: '细胞呼吸总览，其中第 4:43 起专讲电子传递链与化学渗透。',
      descEn: 'Respiration overview; ETC and chemiosmosis begin around 4:43.',
    },
  ],
  'Enzyme Catalysis': [
    {
      title: 'Enzymes (Updated)',
      url: 'https://www.youtube.com/watch?v=qgVFkRn8f10',
      source: 'Amoeba Sisters',
      descZh: '讲解酶的活性位点、活化能、诱导契合模型，以及温度/pH 对酶活性的影响。',
      descEn: 'Active sites, activation energy, induced fit, and effects of temperature and pH.',
    },
  ],
  'Glycolysis': [
    {
      title: 'Cellular Respiration (UPDATED)',
      url: 'https://www.youtube.com/watch?v=eJ9Zjc-jdys',
      source: 'Amoeba Sisters',
      descZh: '第 3:05 起讲解糖酵解的位置、投入产出与净得 ATP。',
      descEn: 'Glycolysis location, inputs/outputs and net ATP from 3:05.',
    },
    {
      title: 'ATP & Respiration — Crash Course Biology #7',
      url: 'https://www.youtube.com/watch?v=00jbG_cfGuQ',
      source: 'Crash Course',
      descZh: '讲解糖酵解如何把葡萄糖拆成丙酮酸并产生少量 ATP 与 NADH。',
      descEn: 'How glycolysis splits glucose into pyruvate with some ATP and NADH.',
    },
  ],
  'Photosynthesis: Calvin Cycle': [
    {
      title: 'Photosynthesis: Calvin Cycle',
      url: 'https://www.khanacademy.org/science/biology/photosynthesis-in-plants/the-calvin-cycle-reactions/v/photosynthesis-calvin-cycle',
      source: 'Khan Academy',
      descZh: 'Sal Khan 逐步讲解卡尔文循环的碳固定、还原与 RuBP 再生三个阶段。',
      descEn: 'Sal Khan walks through carbon fixation, reduction and RuBP regeneration.',
    },
    {
      title: 'Photosynthesis (UPDATED)',
      url: 'https://www.youtube.com/watch?v=CMiPYHNNg28',
      source: 'Amoeba Sisters',
      descZh: '第 4:36 起讲解卡尔文循环（光 Independent 反应）如何利用 ATP 与 NADPH 合成糖。',
      descEn: 'From 4:36: how the Calvin cycle uses ATP and NADPH to build sugars.',
    },
  ],
  'Photosynthesis: Light Reactions': [
    {
      title: 'Photosynthesis (UPDATED)',
      url: 'https://www.youtube.com/watch?v=CMiPYHNNg28',
      source: 'Amoeba Sisters',
      descZh: '第 3:33 起讲解光反应：色素、光系统、水的光解与 ATP/NADPH 的生成。',
      descEn: 'From 3:33: pigments, photosystems, water splitting, making ATP and NADPH.',
    },
    {
      title: 'Photosynthesis — Crash Course Biology #8',
      url: 'https://www.youtube.com/watch?v=sQK3Yr4Sc_k',
      source: 'Crash Course',
      descZh: '讲解叶绿体中光反应捕获光能的完整过程。',
      descEn: 'How the light reactions capture light energy in the chloroplast.',
    },
  ],
  'The Krebs Cycle (Citric Acid Cycle)': [
    {
      title: 'Cellular Respiration (UPDATED)',
      url: 'https://www.youtube.com/watch?v=eJ9Zjc-jdys',
      source: 'Amoeba Sisters',
      descZh: '第 4:05 起讲解克雷布斯循环（柠檬酸循环）的产物与能量载体。',
      descEn: 'From 4:05: products and energy carriers of the Krebs (citric acid) cycle.',
    },
    {
      title: 'ATP & Respiration — Crash Course Biology #7',
      url: 'https://www.youtube.com/watch?v=00jbG_cfGuQ',
      source: 'Crash Course',
      descZh: '把克雷布斯循环放进细胞呼吸全景，讲清它产生的 NADH 与 FADH2 的去向。',
      descEn: 'The Krebs cycle in the big picture of respiration and its NADH/FADH2 output.',
    },
  ],

  // ---------- Unit 4 ----------
  'Apoptosis': [
    {
      title: 'The Cell Cycle (and cancer) [Updated]',
      url: 'https://www.youtube.com/watch?v=QVCjdNxJreE',
      source: 'Amoeba Sisters',
      descZh: '讲解细胞周期调控失控与癌症，并介绍细胞凋亡作为机体的自我保护机制。',
      descEn: 'Cell cycle control, cancer, and apoptosis as a protective mechanism.',
    },
  ],
  'Cell Cycle and Checkpoints': [
    {
      title: 'The Cell Cycle (and cancer) [Updated]',
      url: 'https://www.youtube.com/watch?v=QVCjdNxJreE',
      source: 'Amoeba Sisters',
      descZh: '讲解间期（G1/S/G2）、各检查点与周期蛋白/Cdk 的调控。',
      descEn: 'Interphase (G1/S/G2), checkpoints and cyclin/Cdk regulation.',
    },
    {
      title: 'Cell Cycle Control',
      url: 'https://www.youtube.com/watch?v=542CMooowNY',
      source: 'Khan Academy',
      descZh: '讲解细胞周期检查点的分子机制及其与癌症的关系。',
      descEn: 'Molecular control of cell cycle checkpoints and links to cancer.',
    },
  ],
  'Cell Signaling Overview': [
    {
      title: 'Intro to Cell Signaling',
      url: 'https://www.youtube.com/watch?v=-dbRterutHY',
      source: 'Amoeba Sisters',
      descZh: '讲解信号传导的三步：接收、转导与响应，并举例说明。',
      descEn: 'Reception, transduction and response — the three stages of cell signaling.',
    },
    {
      title: 'Overview of Cell Signaling',
      url: 'https://www.youtube.com/watch?v=FQFBygnIONU',
      source: 'Khan Academy',
      descZh: '总览细胞通讯的类型与配体-受体相互作用。',
      descEn: 'Types of cell communication and ligand-receptor interactions.',
    },
  ],
  'G-Protein Coupled Receptors': [
    {
      title: 'G Protein Coupled Receptor | GPCR',
      url: 'https://www.youtube.com/watch?v=gvS4INUrflw',
      source: 'Quick Biochemistry Basics',
      descZh: '讲解 GPCR 的七次跨膜结构、G 蛋白亚基与 GTP 激活过程。',
      descEn: 'GPCR seven-transmembrane structure, G-protein subunits and GTP activation.',
    },
    {
      title: 'Signal Transduction Pathways',
      url: 'https://www.youtube.com/watch?v=zFIzEvF_ETQ',
      source: 'Bozeman Science',
      descZh: '以 GPCR 等通路为例讲解信号转导级联反应。',
      descEn: 'Signal transduction cascades with GPCR pathways as examples.',
    },
  ],
  'Meiosis': [
    {
      title: 'Meiosis (Updated)',
      url: 'https://www.youtube.com/watch?v=VzDMG7ke69g',
      source: 'Amoeba Sisters',
      descZh: '逐步讲解减数分裂 I 与 II，以及交叉互换和独立分配如何产生遗传多样性。',
      descEn: 'Meiosis I & II step by step; crossing over and independent assortment.',
    },
    {
      title: 'Phases of Meiosis（视频页）',
      url: 'http://www.bozemanscience.com/phases-of-meiosis',
      source: 'Bozeman Science',
      descZh: '按 PMAT 顺序细讲减数分裂各时期及雌雄配子发生的差异。',
      descEn: 'PMAT phases of meiosis and differences between egg and sperm formation.',
    },
  ],
  'Mitosis': [
    {
      title: 'Mitosis',
      url: 'https://www.youtube.com/watch?v=f-ldPgEfAHI',
      source: 'Amoeba Sisters',
      descZh: '讲解有丝分裂各时期（前中后末）与胞质分裂，强调其在生长修复中的作用。',
      descEn: 'Stages of mitosis and cytokinesis, and roles in growth and repair.',
    },
    {
      title: 'Mitosis: Splitting Up is Complicated — Crash Course',
      url: 'https://www.youtube.com/watch?v=L0k-enzoeOM',
      source: 'Crash Course',
      descZh: '以生动方式讲解有丝分裂的机制与常见易错点。',
      descEn: 'An entertaining walkthrough of mitosis mechanics and common confusions.',
    },
  ],
  'Receptor Tyrosine Kinases': [
    {
      title: 'Signal Transduction Pathways',
      url: 'https://www.youtube.com/watch?v=zFIzEvF_ETQ',
      source: 'Bozeman Science',
      descZh: '讲解包括 RTK 在内的膜受体如何启动磷酸化级联。',
      descEn: 'How membrane receptors including RTKs launch phosphorylation cascades.',
    },
    {
      title: 'Intro to Cell Signaling',
      url: 'https://www.youtube.com/watch?v=-dbRterutHY',
      source: 'Amoeba Sisters',
      descZh: '信号传导入门，帮助把 RTK 放进“接收—转导—响应”的框架。',
      descEn: 'Framing RTKs within reception-transduction-response.',
    },
  ],

  // ---------- Unit 5 ----------
  'Chromosomal Mutations': [
    {
      title: 'Mutations (Updated)',
      url: 'https://www.youtube.com/watch?v=vl6Vlf2thvI',
      source: 'Amoeba Sisters',
      descZh: '讲解基因突变与染色体变异（缺失、重复、倒位、易位）及其后果。',
      descEn: 'Gene mutations and chromosomal changes: deletion, duplication, inversion, translocation.',
    },
    {
      title: 'Meiosis (Updated)',
      url: 'https://www.youtube.com/watch?v=VzDMG7ke69g',
      source: 'Amoeba Sisters',
      descZh: '从减数分裂不分离的角度理解染色体数目异常的来源。',
      descEn: 'Nondisjunction in meiosis as the origin of chromosome number abnormalities.',
    },
  ],
  'Linked Genes and Crossing Over': [
    {
      title: 'Linked Genes',
      url: 'https://www.youtube.com/watch?v=YoEgUqHOcbc',
      source: 'Bozeman Science',
      descZh: '讲解连锁基因为何不遵循自由组合定律，以及交叉互换如何产生重组。',
      descEn: 'Why linked genes defy independent assortment; recombination by crossing over.',
    },
    {
      title: 'Meiosis (Updated)',
      url: 'https://www.youtube.com/watch?v=VzDMG7ke69g',
      source: 'Amoeba Sisters',
      descZh: '交叉互换发生在减数分裂 I 前期，是连锁与重组的细胞学基础。',
      descEn: 'Crossing over in prophase I as the cytological basis of linkage and recombination.',
    },
  ],
  'Mendelian Genetics': [
    {
      title: 'DNA, Chromosomes, Genes, and Traits: An Intro to Heredity',
      url: 'https://www.youtube.com/watch?v=8m6hHRIKwxY',
      source: 'Amoeba Sisters',
      descZh: '从 DNA、染色体、基因到性状，建立遗传学的基本概念框架。',
      descEn: 'From DNA and chromosomes to genes and traits: the foundation of heredity.',
    },
    {
      title: 'Introduction to Heredity',
      url: 'https://www.khanacademy.org/science/ap-biology/heredity/mendelian-genetics-ap/v/introduction-to-heredity',
      source: 'Khan Academy',
      descZh: 'Sal Khan 以眼睛颜色为例讲显性、隐性与等位基因的传递。',
      descEn: 'Sal Khan introduces dominance, recessiveness and allele transmission.',
    },
  ],
  'Monohybrid and Dihybrid Crosses': [
    {
      title: 'Monohybrids and the Punnett Square Guinea Pigs',
      url: 'https://www.youtube.com/watch?v=i-0rSv6oxSY',
      source: 'Amoeba Sisters',
      descZh: '用豚鼠毛色演示单因子杂交与 Punnett 方阵的完整解题流程。',
      descEn: 'Monohybrid crosses and Punnett squares with guinea pig coat color.',
    },
    {
      title: 'Dihybrid and Two-Trait Crosses',
      url: 'https://www.youtube.com/watch?v=qIGXTJLrLf8',
      source: 'Amoeba Sisters',
      descZh: '讲解双因子杂交 9:3:3:1 比例的来历与计算方法。',
      descEn: 'Where the 9:3:3:1 dihybrid ratio comes from and how to compute it.',
    },
  ],
  'Non-Mendelian Inheritance': [
    {
      title: 'Incomplete Dominance, Codominance, Polygenic Traits, and Epistasis!',
      url: 'https://www.youtube.com/watch?v=YJHGfbW55l0',
      source: 'Amoeba Sisters',
      descZh: '讲解不完全显性、共显性、多基因遗传与上位效应四种非孟德尔遗传。',
      descEn: 'Incomplete dominance, codominance, polygenic traits and epistasis.',
    },
    {
      title: 'Multiple Alleles (ABO Blood Types) and Punnett Squares',
      url: 'https://www.youtube.com/watch?v=9O5JQqlngFY',
      source: 'Amoeba Sisters',
      descZh: '以 ABO 血型为例讲解复等位基因遗传。',
      descEn: 'Multiple alleles explained through ABO blood types.',
    },
  ],
  'Pedigree Analysis': [
    {
      title: 'Pedigrees',
      url: 'https://www.youtube.com/watch?v=Gd09V2AkZv4',
      source: 'Amoeba Sisters',
      descZh: '讲解系谱图的符号、世代标注，以及如何判断显性/隐性与伴性遗传。',
      descEn: 'Pedigree symbols, generations, and inferring dominant/recessive/sex-linked patterns.',
    },
  ],
  'Sex Chromosomes and Sex Linkage': [
    {
      title: 'Punnett Squares and Sex-Linked Traits (Updated)',
      url: 'https://www.youtube.com/watch?v=dN9SZHO6Wjg',
      source: 'Amoeba Sisters',
      descZh: '以红绿色盲与血友病为例讲解 X 连锁遗传的 Punnett 方阵解法。',
      descEn: 'X-linked inheritance (color blindness, hemophilia) with Punnett squares.',
    },
    {
      title: 'Secrets of the X Chromosome — Robin Ball',
      url: 'https://www.youtube.com/watch?v=veB31XmUQm8',
      source: 'TED-Ed',
      descZh: 'TED-Ed 动画讲解 X 染色体的特殊之处与 X 失活现象。',
      descEn: 'TED-Ed animation on what makes the X chromosome special, incl. X-inactivation.',
    },
  ],

  // ---------- Unit 6 ----------
  'DNA Replication': [
    {
      title: 'DNA Replication (Updated)',
      url: 'https://www.youtube.com/watch?v=Qqe4thU-os8',
      source: 'Amoeba Sisters',
      descZh: '讲解半保留复制、复制叉、前导/后随链与关键酶（解旋酶、引物酶、聚合酶、连接酶）。',
      descEn: 'Semiconservative replication, the fork, leading/lagging strands and key enzymes.',
    },
    {
      title: 'DNA Replication and RNA Transcription and Translation',
      url: 'https://www.youtube.com/watch?v=6gUY5NoX1Lk',
      source: 'Khan Academy',
      descZh: 'Khan 讲解 DNA 复制与转录翻译的整体流程。',
      descEn: 'Khan Academy on replication plus transcription and translation.',
    },
  ],
  'Gene Regulation in Eukaryotes': [
    {
      title: 'Genetics — Environmental Influences (Epigenetics)',
      url: 'https://www.youtube.com/watch?v=i9a-ru2ES6Y',
      source: 'Bozeman Science',
      descZh: '讲解表观遗传（DNA 甲基化、组蛋白修饰）如何调控真核基因表达。',
      descEn: 'How epigenetics (methylation, histone modification) regulates eukaryotic genes.',
    },
    {
      title: 'AP Biology Unit 6: Gene Expression and Regulation（单元页）',
      url: 'https://www.khanacademy.org/science/ap-biology/gene-expression-and-regulation',
      source: 'Khan Academy',
      descZh: 'Khan 第六单元完整页面，含真核调控各层级的视频与练习。',
      descEn: 'Khan\u2019s full Unit 6 page with videos and practice on eukaryotic regulation.',
    },
  ],
  'Gene Regulation in Prokaryotes': [
    {
      title: 'Breaking Down Lac Operon Structure',
      url: 'https://www.youtube.com/watch?v=_DmOJ3CJJgQ',
      source: 'The Biology Bully (AP Bio 专题)',
      descZh: '专为 AP 生物讲解 lac 操纵子的结构：启动子、操纵序列与结构基因。',
      descEn: 'AP-focused breakdown of the lac operon: promoter, operator and structural genes.',
    },
  ],
  'RNA Processing': [
    {
      title: 'RNA Splicing（90 秒入门动画）',
      url: 'https://www.youtube.com/watch?v=aVgwr0QpYNE',
      source: 'WEHI / 科学动画',
      descZh: '简短动画介绍内含子剪切与外显子拼接的基本过程。',
      descEn: 'A 90-second animation of intron removal and exon splicing.',
    },
    {
      title: 'DNA Replication and RNA Transcription and Translation',
      url: 'https://www.youtube.com/watch?v=6gUY5NoX1Lk',
      source: 'Khan Academy',
      descZh: '讲解转录产物如何经加工成为成熟 mRNA 并进入翻译环节。',
      descEn: 'How transcripts are processed into mature mRNA before translation.',
    },
  ],
  'Transcription': [
    {
      title: 'DNA vs. RNA (Updated)',
      url: 'https://www.youtube.com/watch?v=JQByjprj_mA',
      source: 'Amoeba Sisters',
      descZh: '讲解 mRNA 如何从 DNA 转录而来，以及三类 RNA 的分工。',
      descEn: 'How mRNA is transcribed from DNA; roles of the three RNA types.',
    },
    {
      title: 'DNA Replication and RNA Transcription and Translation',
      url: 'https://www.youtube.com/watch?v=6gUY5NoX1Lk',
      source: 'Khan Academy',
      descZh: 'Khan 讲解 RNA 聚合酶与转录的起始、延伸、终止。',
      descEn: 'Khan Academy on RNA polymerase and transcription stages.',
    },
  ],
  'Translation': [
    {
      title: 'Protein Synthesis (Updated)',
      url: 'https://www.youtube.com/watch?v=oefAI2x2CQM',
      source: 'Amoeba Sisters',
      descZh: '讲解核糖体上 mRNA 密码子与 tRNA 反密码子配对合成蛋白质的过程。',
      descEn: 'Codon-anticodon pairing at the ribosome to build a protein.',
    },
    {
      title: 'How to Read a Codon Chart',
      url: 'https://www.youtube.com/watch?v=LsEYgwuP6ko',
      source: 'Amoeba Sisters',
      descZh: '教你读懂密码子表，配合翻译过程解题必备。',
      descEn: 'Reading a codon chart — an essential skill for translation problems.',
    },
  ],

  // ---------- Unit 7 ----------
  'Darwin and Natural Selection': [
    {
      title: 'Natural Selection',
      url: 'https://www.youtube.com/watch?v=7VM9YxmULuo',
      source: 'Amoeba Sisters',
      descZh: '讲解自然选择的核心要素：变异、遗传、过度繁殖与适者生存。',
      descEn: 'Core elements of natural selection: variation, inheritance, overproduction, fitness.',
    },
    {
      title: 'What is Natural Selection?',
      url: 'https://www.youtube.com/watch?v=0SCjhl86grU',
      source: 'Stated Clearly',
      descZh: '用清晰动画还原达尔文提出自然选择的逻辑链。',
      descEn: 'Stated Clearly animates Darwin\u2019s logic of natural selection.',
    },
  ],
  'Evidence for Evolution': [
    {
      title: 'What is the Evidence for Evolution?',
      url: 'https://www.youtube.com/watch?v=lIEoO5KdPvg',
      source: 'Stated Clearly',
      descZh: '讲解化石记录、比较解剖学（同源结构）与生物地理等进化证据。',
      descEn: 'Fossils, comparative anatomy (homologous structures) and biogeography.',
    },
  ],
  'Hardy-Weinberg Equilibrium': [
    {
      title: 'Hardy-Weinberg Equation',
      url: 'https://www.khanacademy.org/science/ap-biology/natural-selection/hardy-weinberg-equilibrium/v/hardy-weinberg',
      source: 'Khan Academy',
      descZh: 'Sal Khan 讲解 p²+2pq+q² 公式、适用条件与计算方法。',
      descEn: 'Sal Khan on p²+2pq+q², its assumptions and how to apply it.',
    },
  ],
  'Mechanisms of Microevolution': [
    {
      title: 'Genetic Drift',
      url: 'https://www.youtube.com/watch?v=W0TM4LQmoZY',
      source: 'Amoeba Sisters',
      descZh: '讲解遗传漂变、瓶颈效应与奠基者效应——自然选择之外的进化机制。',
      descEn: 'Genetic drift, bottleneck and founder effects — evolution beyond selection.',
    },
    {
      title: 'Evolution Continues（微进化）',
      url: 'https://www.youtube.com/watch?v=aTftyFboC_M',
      source: 'Bozeman Science',
      descZh: '讲解种群中等位基因频率变化的五种微进化机制。',
      descEn: 'Five mechanisms that change allele frequencies in populations.',
    },
  ],
  'Phylogenetic Trees': [
    {
      title: 'Classification（含分支图）',
      url: 'https://www.youtube.com/watch?v=DVouQRAKxYo',
      source: 'Amoeba Sisters',
      descZh: '讲解生物分类与系统发育树的构建和解读方法。',
      descEn: 'Classification and how to build and read phylogenetic trees.',
    },
  ],
  'Speciation': [
    {
      title: 'Speciation',
      url: 'https://www.youtube.com/watch?v=udZUaNKXbJA',
      source: 'Amoeba Sisters',
      descZh: '讲解生殖隔离（合子前/合子后）与异域、同域物种形成。',
      descEn: 'Reproductive isolation (pre-/post-zygotic) and allopatric vs. sympatric speciation.',
    },
    {
      title: 'Allopatric and Sympatric Speciation',
      url: 'https://www.khanacademy.org/science/ap-biology/natural-selection/speciation/v/allopatric-and-sympatric-speciation',
      source: 'Khan Academy',
      descZh: 'Sal Khan 对比异域与同域物种形成的机制。',
      descEn: 'Sal Khan compares allopatric and sympatric speciation mechanisms.',
    },
  ],

  // ---------- Unit 8 ----------
  'Biogeochemical Cycles': [
    {
      title: 'Carbon and Nitrogen Cycles',
      url: 'https://www.youtube.com/watch?v=NHqEthRCqQ4',
      source: 'Amoeba Sisters',
      descZh: '讲解碳库、碳循环与氮循环（固氮、硝化、反硝化）的全过程。',
      descEn: 'Carbon reservoirs, the carbon cycle, and nitrogen fixation/nitrification/denitrification.',
    },
    {
      title: 'The Hydrologic and Carbon Cycles — Crash Course Ecology #8',
      url: 'https://www.youtube.com/watch?v=2D7hZpIYlCA',
      source: 'Crash Course',
      descZh: '从生态系统尺度讲解水循环与碳循环。',
      descEn: 'The water and carbon cycles at ecosystem scale.',
    },
  ],
  'Biomes and Climate': [
    {
      title: 'Introduction to Biomes',
      url: 'https://www.youtube.com/watch?v=hIy0ZlyPPDg',
      source: 'MooMooMath and Science',
      descZh: '介绍主要陆地生物群系及其与气候（温度、降水）的关系。',
      descEn: 'Major terrestrial biomes and their links to climate (temperature, precipitation).',
    },
    {
      title: 'Ecology: Rules for Living on Earth — Crash Course Biology #40',
      url: 'https://www.youtube.com/watch?v=izRvPaAWgyw',
      source: 'Crash Course',
      descZh: '生态学入门，讲解生物圈、栖息地与环境因子如何塑造生物分布。',
      descEn: 'Intro to ecology: the biosphere, habitats and abiotic factors shaping life.',
    },
  ],
  'Community Ecology': [
    {
      title: 'Ecological Relationships',
      url: 'https://www.youtube.com/watch?v=rNjPI84sApQ',
      source: 'Amoeba Sisters',
      descZh: '讲解捕食、竞争与共生（寄生、互利、偏利）等种间关系。',
      descEn: 'Predation, competition and symbiosis (parasitism, mutualism, commensalism).',
    },
    {
      title: 'Community Ecology: Feel the Love — Crash Course Ecology #4',
      url: 'https://www.youtube.com/watch?v=GxE1SSqbSn4',
      source: 'Crash Course',
      descZh: '讲解群落中物种间相互作用如何塑造生态位与共存。',
      descEn: 'How interspecies interactions shape niches and coexistence.',
    },
  ],
  'Conservation Biology': [
    {
      title: 'Conservation and Restoration Ecology — Crash Course Ecology #12',
      url: 'https://www.youtube.com/watch?v=Kaeyr5-O2eU',
      source: 'Crash Course',
      descZh: '讲解保护生物学的目标、生物多样性价值与生态修复案例。',
      descEn: 'Goals of conservation biology, biodiversity value and restoration cases.',
    },
  ],
  'Ecosystem Ecology': [
    {
      title: 'Ecosystem Ecology: Links in the Chain — Crash Course Ecology #7',
      url: 'https://www.youtube.com/watch?v=v6ubvEJ3KGM',
      source: 'Crash Course',
      descZh: '讲解食物链/食物网、营养级与能量沿生态系统的传递效率。',
      descEn: 'Food chains/webs, trophic levels and energy transfer efficiency.',
    },
  ],
  'Population Ecology': [
    {
      title: 'Per Capita Population Growth and Exponential Growth',
      url: 'https://www.khanacademy.org/science/ap-biology/ecology-ap/population-ecology-ap/v/per-capitapopulation-growth-and-exponential-growth',
      source: 'Khan Academy',
      descZh: '讲解人均增长率、指数增长模型及其在种群生态学中的应用。',
      descEn: 'Per capita growth rate and the exponential growth model.',
    },
    {
      title: 'Human Population Growth — Crash Course Ecology #3',
      url: 'https://www.youtube.com/watch?v=E8dkWQVFAoA',
      source: 'Crash Course',
      descZh: '以人类人口为例讲解逻辑斯谛增长与承载力。',
      descEn: 'Logistic growth and carrying capacity via the human population example.',
    },
  ],
};
