// 知识点关联链：每个知识点的「前置知识 → 本知识点 → 延伸知识」逻辑链
// key = KnowledgeTopic.titleEn（数据库中的英文标题，作为自然键）
// nodes 中的字符串也必须是某个知识点的 titleEn，前端据此渲染可点击跳转
// scope: 'intra' = 单元内逻辑链, 'cross' = 跨单元逻辑链

export interface TopicChain {
  scope: 'intra' | 'cross';
  nodes: string[];
}

export const TOPIC_CHAINS: Record<string, TopicChain[]> = {
  // ---------- Unit 1 生命的化学 ----------
  'Atomic Structure and Chemical Bonds': [
    { scope: 'intra', nodes: ['Atomic Structure and Chemical Bonds', 'Properties of Water', 'Proteins'] },
    { scope: 'cross', nodes: ['Atomic Structure and Chemical Bonds', 'Nucleic Acids', 'DNA Replication'] },
  ],
  'Carbohydrates': [
    { scope: 'intra', nodes: ['Carbon: The Backbone of Life', 'Carbohydrates', 'Lipids'] },
    { scope: 'cross', nodes: ['Carbohydrates', 'Glycolysis', 'The Krebs Cycle (Citric Acid Cycle)'] },
  ],
  'Carbon: The Backbone of Life': [
    { scope: 'intra', nodes: ['Atomic Structure and Chemical Bonds', 'Carbon: The Backbone of Life', 'Carbohydrates'] },
    { scope: 'cross', nodes: ['Carbon: The Backbone of Life', 'Photosynthesis: Calvin Cycle', 'Biogeochemical Cycles'] },
  ],
  'Lipids': [
    { scope: 'intra', nodes: ['Carbon: The Backbone of Life', 'Lipids', 'Proteins'] },
    { scope: 'cross', nodes: ['Lipids', 'Cell Membrane Structure', 'Transport Across Membranes'] },
  ],
  'Nucleic Acids': [
    { scope: 'intra', nodes: ['Atomic Structure and Chemical Bonds', 'Nucleic Acids', 'Proteins'] },
    { scope: 'cross', nodes: ['Nucleic Acids', 'DNA Replication', 'Transcription'] },
  ],
  'Properties of Water': [
    { scope: 'intra', nodes: ['Atomic Structure and Chemical Bonds', 'Properties of Water', 'Carbohydrates'] },
    { scope: 'cross', nodes: ['Properties of Water', 'Transport Across Membranes', 'Photosynthesis: Light Reactions'] },
  ],
  'Proteins': [
    { scope: 'intra', nodes: ['Carbon: The Backbone of Life', 'Proteins', 'Nucleic Acids'] },
    { scope: 'cross', nodes: ['Proteins', 'Enzyme Catalysis', 'Cell Signaling Overview'] },
  ],

  // ---------- Unit 2 细胞结构 ----------
  'Cell Membrane Structure': [
    { scope: 'intra', nodes: ['Cell Membrane Structure', 'Transport Across Membranes', 'The Endomembrane System'] },
    { scope: 'cross', nodes: ['Lipids', 'Cell Membrane Structure', 'Cell Signaling Overview'] },
  ],
  'Mitochondria and Chloroplasts': [
    { scope: 'intra', nodes: ['Prokaryotic vs. Eukaryotic Cells', 'Mitochondria and Chloroplasts', 'The Endomembrane System'] },
    { scope: 'cross', nodes: ['Mitochondria and Chloroplasts', 'Photosynthesis: Light Reactions', 'Electron Transport Chain and Oxidative Phosphorylation'] },
  ],
  'Prokaryotic vs. Eukaryotic Cells': [
    { scope: 'intra', nodes: ['Prokaryotic vs. Eukaryotic Cells', 'The Nucleus and Ribosomes', 'Mitochondria and Chloroplasts'] },
    { scope: 'cross', nodes: ['Prokaryotic vs. Eukaryotic Cells', 'Evidence for Evolution', 'Phylogenetic Trees'] },
  ],
  'The Cytoskeleton': [
    { scope: 'intra', nodes: ['Prokaryotic vs. Eukaryotic Cells', 'The Cytoskeleton', 'The Endomembrane System'] },
    { scope: 'cross', nodes: ['Proteins', 'The Cytoskeleton', 'Mitosis'] },
  ],
  'The Endomembrane System': [
    { scope: 'intra', nodes: ['The Nucleus and Ribosomes', 'The Endomembrane System', 'Cell Membrane Structure'] },
    { scope: 'cross', nodes: ['Translation', 'The Endomembrane System', 'G-Protein Coupled Receptors'] },
  ],
  'The Nucleus and Ribosomes': [
    { scope: 'intra', nodes: ['Prokaryotic vs. Eukaryotic Cells', 'The Nucleus and Ribosomes', 'The Endomembrane System'] },
    { scope: 'cross', nodes: ['Nucleic Acids', 'The Nucleus and Ribosomes', 'Transcription'] },
  ],
  'Transport Across Membranes': [
    { scope: 'intra', nodes: ['Cell Membrane Structure', 'Transport Across Membranes', 'The Endomembrane System'] },
    { scope: 'cross', nodes: ['Properties of Water', 'Transport Across Membranes', 'ATP: Energy Currency'] },
  ],

  // ---------- Unit 3 细胞能量学 ----------
  'ATP: Energy Currency': [
    { scope: 'intra', nodes: ['ATP: Energy Currency', 'Enzyme Catalysis', 'Glycolysis'] },
    { scope: 'cross', nodes: ['ATP: Energy Currency', 'Transport Across Membranes', 'Cell Signaling Overview'] },
  ],
  'Electron Transport Chain and Oxidative Phosphorylation': [
    { scope: 'intra', nodes: ['Glycolysis', 'The Krebs Cycle (Citric Acid Cycle)', 'Electron Transport Chain and Oxidative Phosphorylation'] },
    { scope: 'cross', nodes: ['Mitochondria and Chloroplasts', 'Electron Transport Chain and Oxidative Phosphorylation', 'Apoptosis'] },
  ],
  'Enzyme Catalysis': [
    { scope: 'intra', nodes: ['Enzyme Catalysis', 'Glycolysis', 'The Krebs Cycle (Citric Acid Cycle)'] },
    { scope: 'cross', nodes: ['Proteins', 'Enzyme Catalysis', 'DNA Replication'] },
  ],
  'Glycolysis': [
    { scope: 'intra', nodes: ['Glycolysis', 'The Krebs Cycle (Citric Acid Cycle)', 'Electron Transport Chain and Oxidative Phosphorylation'] },
    { scope: 'cross', nodes: ['Carbohydrates', 'Glycolysis', 'Mitochondria and Chloroplasts'] },
  ],
  'Photosynthesis: Calvin Cycle': [
    { scope: 'intra', nodes: ['Photosynthesis: Light Reactions', 'Photosynthesis: Calvin Cycle', 'Glycolysis'] },
    { scope: 'cross', nodes: ['Photosynthesis: Calvin Cycle', 'Biogeochemical Cycles', 'Ecosystem Ecology'] },
  ],
  'Photosynthesis: Light Reactions': [
    { scope: 'intra', nodes: ['Photosynthesis: Light Reactions', 'Photosynthesis: Calvin Cycle', 'ATP: Energy Currency'] },
    { scope: 'cross', nodes: ['Properties of Water', 'Photosynthesis: Light Reactions', 'Ecosystem Ecology'] },
  ],
  'The Krebs Cycle (Citric Acid Cycle)': [
    { scope: 'intra', nodes: ['Glycolysis', 'The Krebs Cycle (Citric Acid Cycle)', 'Electron Transport Chain and Oxidative Phosphorylation'] },
    { scope: 'cross', nodes: ['Lipids', 'The Krebs Cycle (Citric Acid Cycle)', 'ATP: Energy Currency'] },
  ],

  // ---------- Unit 4 细胞通讯 ----------
  'Apoptosis': [
    { scope: 'intra', nodes: ['Cell Signaling Overview', 'Apoptosis', 'Cell Cycle and Checkpoints'] },
    { scope: 'cross', nodes: ['DNA Replication', 'Chromosomal Mutations', 'Apoptosis'] },
  ],
  'Cell Cycle and Checkpoints': [
    { scope: 'intra', nodes: ['Cell Signaling Overview', 'Cell Cycle and Checkpoints', 'Mitosis'] },
    { scope: 'cross', nodes: ['DNA Replication', 'Cell Cycle and Checkpoints', 'Chromosomal Mutations'] },
  ],
  'Cell Signaling Overview': [
    { scope: 'intra', nodes: ['Cell Signaling Overview', 'G-Protein Coupled Receptors', 'Receptor Tyrosine Kinases'] },
    { scope: 'cross', nodes: ['Cell Membrane Structure', 'Cell Signaling Overview', 'Cell Cycle and Checkpoints'] },
  ],
  'G-Protein Coupled Receptors': [
    { scope: 'intra', nodes: ['Cell Signaling Overview', 'G-Protein Coupled Receptors', 'Cell Cycle and Checkpoints'] },
    { scope: 'cross', nodes: ['Proteins', 'G-Protein Coupled Receptors', 'Transport Across Membranes'] },
  ],
  'Meiosis': [
    { scope: 'intra', nodes: ['Cell Cycle and Checkpoints', 'Meiosis', 'Mitosis'] },
    { scope: 'cross', nodes: ['Meiosis', 'Linked Genes and Crossing Over', 'Mendelian Genetics'] },
  ],
  'Mitosis': [
    { scope: 'intra', nodes: ['Cell Cycle and Checkpoints', 'Mitosis', 'Meiosis'] },
    { scope: 'cross', nodes: ['The Cytoskeleton', 'Mitosis', 'Mendelian Genetics'] },
  ],
  'Receptor Tyrosine Kinases': [
    { scope: 'intra', nodes: ['Cell Signaling Overview', 'Receptor Tyrosine Kinases', 'Apoptosis'] },
    { scope: 'cross', nodes: ['Proteins', 'Receptor Tyrosine Kinases', 'Gene Regulation in Eukaryotes'] },
  ],

  // ---------- Unit 5 遗传学 ----------
  'Chromosomal Mutations': [
    { scope: 'intra', nodes: ['Mendelian Genetics', 'Chromosomal Mutations', 'Pedigree Analysis'] },
    { scope: 'cross', nodes: ['Meiosis', 'Chromosomal Mutations', 'Speciation'] },
  ],
  'Linked Genes and Crossing Over': [
    { scope: 'intra', nodes: ['Mendelian Genetics', 'Linked Genes and Crossing Over', 'Sex Chromosomes and Sex Linkage'] },
    { scope: 'cross', nodes: ['Meiosis', 'Linked Genes and Crossing Over', 'Mechanisms of Microevolution'] },
  ],
  'Mendelian Genetics': [
    { scope: 'intra', nodes: ['Mendelian Genetics', 'Monohybrid and Dihybrid Crosses', 'Non-Mendelian Inheritance'] },
    { scope: 'cross', nodes: ['Meiosis', 'Mendelian Genetics', 'Hardy-Weinberg Equilibrium'] },
  ],
  'Monohybrid and Dihybrid Crosses': [
    { scope: 'intra', nodes: ['Mendelian Genetics', 'Monohybrid and Dihybrid Crosses', 'Pedigree Analysis'] },
    { scope: 'cross', nodes: ['Monohybrid and Dihybrid Crosses', 'Hardy-Weinberg Equilibrium', 'Mechanisms of Microevolution'] },
  ],
  'Non-Mendelian Inheritance': [
    { scope: 'intra', nodes: ['Mendelian Genetics', 'Non-Mendelian Inheritance', 'Pedigree Analysis'] },
    { scope: 'cross', nodes: ['Non-Mendelian Inheritance', 'Gene Regulation in Eukaryotes', 'Chromosomal Mutations'] },
  ],
  'Pedigree Analysis': [
    { scope: 'intra', nodes: ['Mendelian Genetics', 'Pedigree Analysis', 'Chromosomal Mutations'] },
    { scope: 'cross', nodes: ['Meiosis', 'Chromosomal Mutations', 'Pedigree Analysis'] },
  ],
  'Sex Chromosomes and Sex Linkage': [
    { scope: 'intra', nodes: ['Mendelian Genetics', 'Sex Chromosomes and Sex Linkage', 'Non-Mendelian Inheritance'] },
    { scope: 'cross', nodes: ['Meiosis', 'Sex Chromosomes and Sex Linkage', 'Chromosomal Mutations'] },
  ],

  // ---------- Unit 6 基因表达 ----------
  'DNA Replication': [
    { scope: 'intra', nodes: ['DNA Replication', 'Transcription', 'Translation'] },
    { scope: 'cross', nodes: ['Nucleic Acids', 'DNA Replication', 'Cell Cycle and Checkpoints'] },
  ],
  'Gene Regulation in Eukaryotes': [
    { scope: 'intra', nodes: ['Transcription', 'Gene Regulation in Eukaryotes', 'Gene Regulation in Prokaryotes'] },
    { scope: 'cross', nodes: ['Receptor Tyrosine Kinases', 'Gene Regulation in Eukaryotes', 'Non-Mendelian Inheritance'] },
  ],
  'Gene Regulation in Prokaryotes': [
    { scope: 'intra', nodes: ['Transcription', 'Gene Regulation in Prokaryotes', 'Gene Regulation in Eukaryotes'] },
    { scope: 'cross', nodes: ['Prokaryotic vs. Eukaryotic Cells', 'Gene Regulation in Prokaryotes', 'Enzyme Catalysis'] },
  ],
  'RNA Processing': [
    { scope: 'intra', nodes: ['Transcription', 'RNA Processing', 'Translation'] },
    { scope: 'cross', nodes: ['The Nucleus and Ribosomes', 'RNA Processing', 'The Endomembrane System'] },
  ],
  'Transcription': [
    { scope: 'intra', nodes: ['DNA Replication', 'Transcription', 'RNA Processing'] },
    { scope: 'cross', nodes: ['Nucleic Acids', 'Transcription', 'Gene Regulation in Prokaryotes'] },
  ],
  'Translation': [
    { scope: 'intra', nodes: ['Transcription', 'RNA Processing', 'Translation'] },
    { scope: 'cross', nodes: ['The Nucleus and Ribosomes', 'Translation', 'Proteins'] },
  ],

  // ---------- Unit 7 自然选择 ----------
  'Darwin and Natural Selection': [
    { scope: 'intra', nodes: ['Darwin and Natural Selection', 'Evidence for Evolution', 'Mechanisms of Microevolution'] },
    { scope: 'cross', nodes: ['Mendelian Genetics', 'Darwin and Natural Selection', 'Population Ecology'] },
  ],
  'Evidence for Evolution': [
    { scope: 'intra', nodes: ['Darwin and Natural Selection', 'Evidence for Evolution', 'Phylogenetic Trees'] },
    { scope: 'cross', nodes: ['Prokaryotic vs. Eukaryotic Cells', 'Evidence for Evolution', 'Speciation'] },
  ],
  'Hardy-Weinberg Equilibrium': [
    { scope: 'intra', nodes: ['Darwin and Natural Selection', 'Hardy-Weinberg Equilibrium', 'Mechanisms of Microevolution'] },
    { scope: 'cross', nodes: ['Monohybrid and Dihybrid Crosses', 'Hardy-Weinberg Equilibrium', 'Population Ecology'] },
  ],
  'Mechanisms of Microevolution': [
    { scope: 'intra', nodes: ['Hardy-Weinberg Equilibrium', 'Mechanisms of Microevolution', 'Speciation'] },
    { scope: 'cross', nodes: ['Chromosomal Mutations', 'Mechanisms of Microevolution', 'Conservation Biology'] },
  ],
  'Phylogenetic Trees': [
    { scope: 'intra', nodes: ['Evidence for Evolution', 'Phylogenetic Trees', 'Speciation'] },
    { scope: 'cross', nodes: ['Nucleic Acids', 'Phylogenetic Trees', 'Conservation Biology'] },
  ],
  'Speciation': [
    { scope: 'intra', nodes: ['Mechanisms of Microevolution', 'Speciation', 'Phylogenetic Trees'] },
    { scope: 'cross', nodes: ['Chromosomal Mutations', 'Speciation', 'Biomes and Climate'] },
  ],

  // ---------- Unit 8 生态学 ----------
  'Biogeochemical Cycles': [
    { scope: 'intra', nodes: ['Ecosystem Ecology', 'Biogeochemical Cycles', 'Conservation Biology'] },
    { scope: 'cross', nodes: ['Carbon: The Backbone of Life', 'Biogeochemical Cycles', 'Ecosystem Ecology'] },
  ],
  'Biomes and Climate': [
    { scope: 'intra', nodes: ['Biomes and Climate', 'Population Ecology', 'Community Ecology'] },
    { scope: 'cross', nodes: ['Properties of Water', 'Biomes and Climate', 'Conservation Biology'] },
  ],
  'Community Ecology': [
    { scope: 'intra', nodes: ['Population Ecology', 'Community Ecology', 'Ecosystem Ecology'] },
    { scope: 'cross', nodes: ['Darwin and Natural Selection', 'Community Ecology', 'Conservation Biology'] },
  ],
  'Conservation Biology': [
    { scope: 'intra', nodes: ['Community Ecology', 'Ecosystem Ecology', 'Conservation Biology'] },
    { scope: 'cross', nodes: ['Phylogenetic Trees', 'Conservation Biology', 'Biogeochemical Cycles'] },
  ],
  'Ecosystem Ecology': [
    { scope: 'intra', nodes: ['Community Ecology', 'Ecosystem Ecology', 'Biogeochemical Cycles'] },
    { scope: 'cross', nodes: ['Photosynthesis: Light Reactions', 'Ecosystem Ecology', 'Conservation Biology'] },
  ],
  'Population Ecology': [
    { scope: 'intra', nodes: ['Population Ecology', 'Community Ecology', 'Ecosystem Ecology'] },
    { scope: 'cross', nodes: ['Darwin and Natural Selection', 'Population Ecology', 'Conservation Biology'] },
  ],
};
