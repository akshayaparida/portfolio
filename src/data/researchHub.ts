export interface ResearchStage {
  stage: number;
  title: string;
  subtitle: string;
  icon: string;
  summary: string;
  keyPrinciples: string[];
  actionSteps: {
    title: string;
    description: string;
    proTip?: string;
  }[];
}

export interface ResearchTopicStarter {
  id: string;
  topic: string;
  tagline: string;
  prerequisites: string[];
  coreIntuition: string;
  mustReadPapers: {
    title: string;
    year: string;
    authors: string;
    arxivUrl: string;
    significance: string;
  }[];
  standardBenchmarks: string[];
  openResearchDirections: string[];
}

export interface ResearchTool {
  id: string;
  name: string;
  category: "discovery" | "compute" | "writing" | "experimentation";
  categoryLabel: string;
  description: string;
  url: string;
  freeTierDetails: string;
  badge: string;
}

export interface ConferenceVenue {
  id: string;
  name: string;
  abbreviation: string;
  tier: "A*" | "A" | "Journal";
  domain: string;
  submissionCycles: string;
  reviewStyle: string;
  officialUrl: string;
  description: string;
}

export const researchMethodologyStages: ResearchStage[] = [
  {
    stage: 1,
    title: "How to Read & Deconstruct Research Papers",
    subtitle: "The Three-Pass Method & Critical Skepticism",
    icon: "fa-solid fa-book-open-reader",
    summary:
      "Scientific papers are not mystery novels; they are compressed technical arguments. Trying to read a paper sequentially from Page 1 to Page 10 is the fastest route to cognitive burnout. Adopt the structured Three-Pass Method (developed by Prof. S. Keshav, University of Waterloo).",
    keyPrinciples: [
      "Never read a paper sequentially; survey breadth first before diving into mathematical derivations.",
      "Identify the 5 Core Questions: What problem is solved? What are the key assumptions? What is the main novelty? What are the baselines? Where does the method break?",
      "Set up a dedicated citation and annotation workflow using Zotero + BibTeX from Day 1.",
    ],
    actionSteps: [
      {
        title: "Pass 1: The Bird's-Eye Scan (5 - 10 Minutes)",
        description:
          "Read the Title, Abstract, and Introduction carefully. Glance through the Section and Subsection headings. Read the Conclusion and look at the main architectural diagrams and experiment tables. Decide immediately: is this paper relevant to your current inquiry?",
        proTip:
          "If you cannot summarize the paper's thesis in 2 sentences after Pass 1, re-read the Abstract and Introduction.",
      },
      {
        title: "Pass 2: Grasp the Content (1 Hour)",
        description:
          "Read through the paper with care, grasping the core argument, but ignore detailed proofs or esoteric mathematical lemmas. Inspect the figures and graph axes critically: are the error bars shown? Are the baselines competitive or artificially weakened? Jot down unfamiliar terms.",
        proTip:
          "Pay special attention to Table 1 or 2 (Main Results). Did the authors compare against state-of-the-art baselines under identical compute budgets?",
      },
      {
        title: "Pass 3: Virtual Re-Implementation (3 - 5 Hours)",
        description:
          "The ultimate test of understanding: mentally reconstruct the paper as if you were the author. Identify hidden assumptions, unmentioned hyperparameters, and potential failure modes. Contrast your mental design against the author's actual code if an open-source repository exists.",
        proTip:
          "Clone their GitHub repository and run a single validation batch on Google Colab or your local machine to verify reproducible figures.",
      },
    ],
  },
  {
    stage: 2,
    title: "Formulating Novel Research Questions",
    subtitle: "Finding Gaps, Hypotheses & the Feasibility-Impact Matrix",
    icon: "fa-solid fa-lightbulb",
    summary:
      "Great research rarely comes from a sudden flash of genius; it emerges from identifying failure modes, unstated assumptions, or computational inefficiencies in existing papers. Your goal is to formulate a testable, falsifiable hypothesis.",
    keyPrinciples: [
      "A research problem must be specific, falsifiable, and measurable against standard public benchmarks.",
      "The 3 Types of AI/ML Contributions: (1) Algorithmic (new loss function, architecture, or regularizer); (2) Empirical (first rigorous benchmark or uncovering unexpected behavior); (3) Theoretical (formal convergence rate or representation capacity proof).",
      "Evaluate problems using the Feasibility-to-Compute ratio: pursue ideas that require clever insight rather than 10,000 H100 GPU hours.",
    ],
    actionSteps: [
      {
        title: "Mapping the Frontier with Citation Graphs",
        description:
          "Take 3 seminal recent papers in your area of interest. Use Connected Papers, Litmaps, and Semantic Scholar to explore both prior work (foundations) and derivative work (who cited them). Identify what questions were left as 'Future Work' in the conclusions.",
      },
      {
        title: "Crafting a Formal Hypothesis Statement",
        description:
          "Express your idea as: 'By introducing mechanism [X], we can reduce [Metric Y, e.g., memory complexity from O(N^2) to O(N)] while preserving or improving [Performance Metric Z, e.g., perplexity or top-1 accuracy] on benchmark [D].'",
        proTip:
          "Ensure the hypothesis can be verified within your available compute budget (e.g., using TinyImageNet, CIFAR, or Llama-3-8B with LoRA instead of pre-training 70B models).",
      },
      {
        title: "The 'Sanity Check' Baseline",
        description:
          "Before spending weeks developing complex architectures, implement the simplest conceivable baseline (e.g., a simple MLP, logistic regression, or un-tuned nearest-neighbor). You will be astonished at how frequently a well-tuned simple baseline rivals complex architectures.",
      },
    ],
  },
  {
    stage: 3,
    title: "Rigorous Experimentation & Ablation Studies",
    subtitle: "Causality, Reproducibility & Statistical Integrity",
    icon: "fa-solid fa-flask-vial",
    summary:
      "Reviewers reject papers not because the idea is uninteresting, but because the experiments fail to prove causality. You must prove that your proposed component is the sole cause of improvement, rather than random seed luck or hyperparameter tuning discrepancies.",
    keyPrinciples: [
      "No ablation study = no proof. If you propose an architecture with 3 modifications (A, B, C), you must test all combinations: Base, Base+A, Base+B, Base+C, and Base+A+B+C.",
      "Always report mean and standard deviation across at least 3 to 5 distinct random seeds.",
      "Keep identical training schedules, optimizers (e.g., AdamW with same beta values and warmup), and compute budgets across both your method and all competing baselines.",
    ],
    actionSteps: [
      {
        title: "Automated Experiment Logging with Weights & Biases (W&B)",
        description:
          "Never rely on terminal print statements or uncommitted Jupyter notebooks. Log loss curves, validation metrics, gradient norms, and GPU memory usage automatically with wandb.ai or MLflow.",
      },
      {
        title: "Ablation Study Matrix Design",
        description:
          "Design a table where each row toggles exactly one hyperparameter, regularizer, or architectural layer. This isolates the causal contribution of every line of novel code you write.",
        proTip:
          "Reviewers love seeing negative results in ablation tables — it demonstrates scientific honesty and proves that simpler alternatives fail.",
      },
      {
        title: "Statistical Significance Testing",
        description:
          "Run a paired Student's t-test or non-parametric Wilcoxon signed-rank test. If p > 0.05, your 'improvement' is statistically indistinguishable from random noise.",
      },
    ],
  },
  {
    stage: 4,
    title: "Writing in LaTeX & The Peer-Review Battle",
    subtitle: "Overleaf, Narrative Architecture & OpenReview Rebuttals",
    icon: "fa-solid fa-file-pen",
    summary:
      "A brilliant idea poorly communicated is functionally indistinguishable from no idea at all. Academic writing requires a crystal-clear narrative arc, publication-quality vector diagrams, and bulletproof LaTeX formatting matching conference style templates.",
    keyPrinciples: [
      "Follow the 5-Sentence Abstract Formula: (1) Broad context; (2) The specific bottleneck; (3) Our proposed solution; (4) Key technical insight; (5) Quantitative proof on standard benchmarks.",
      "Introduction Section rule: Dedicate the final paragraph to an explicit, bulleted list: 'Our core contributions are threefold: 1... 2... 3...'",
      "Figures must be vector graphics (PDF/SVG) with legible font sizes matching the body text font size when printed.",
    ],
    actionSteps: [
      {
        title: "Setting Up Overleaf with Official Conference Templates",
        description:
          "Clone the official LaTeX template from GitHub for your target venue (NeurIPS, ICML, ICLR, CVPR, or ACL). Maintain a clean references.bib file with verified BibTeX entries copied directly from DBLP or Google Scholar.",
        proTip:
          "Never cite unverified blogs or generic Wikipedia pages; always trace references back to the primary peer-reviewed publication or authoritative arXiv preprint.",
      },
      {
        title: "Drafting the Experiments Section",
        description:
          "Structure the empirical section into: (1) Experimental Setup (Datasets, Evaluation Metrics, Baselines); (2) Main Benchmark Comparison (Tables with bold top results and underlined second-best); (3) Ablation Studies; (4) Qualitative Analysis (Visualizations, Attention Heatmaps, Error Analysis).",
      },
      {
        title: "Mastering the OpenReview Rebuttal Phase",
        description:
          "When reviewer comments arrive, remain objective and polite. Never argue emotionally. Thank the reviewers for their constructive feedback, answer each question with concrete new data or tables, and acknowledge reasonable limitations.",
      },
    ],
  },
];

export const topicStarters: ResearchTopicStarter[] = [
  {
    id: "llms-nlp",
    topic: "Large Language Models, Transformers & Reasoning",
    tagline:
      "Attention mechanisms, Post-Training (RLHF/DPO), Mechanistic Interpretability & Speculative Decoding",
    prerequisites: [
      "Linear Algebra (Matrix Multiplications, SVD)",
      "PyTorch & Hugging Face",
      "Autoregressive generation basics",
    ],
    coreIntuition:
      "Language modeling is the task of predicting the conditional probability distribution P(x_t | x_<t). Transformers achieve this via multi-head self-attention, allowing every token to dynamically attend to every previous token in parallel with O(N^2) computational complexity.",
    mustReadPapers: [
      {
        title: "Attention Is All You Need",
        year: "2017",
        authors: "Vaswani et al. (Google Brain & Google Research)",
        arxivUrl: "https://arxiv.org/abs/1706.03762",
        significance:
          "Introduced the Transformer architecture, replacing recurrent models with multi-head self-attention.",
      },
      {
        title:
          "Direct Preference Optimization: Your Language Model is Secretly a Reward Model",
        year: "2023",
        authors: "Rafailov et al. (Stanford University)",
        arxivUrl: "https://arxiv.org/abs/2305.18290",
        significance:
          "Eliminated the need for a separate reward model in RLHF by deriving a closed-form implicit loss directly on preference pairs.",
      },
      {
        title: "LoRA: Low-Rank Adaptation of Large Language Models",
        year: "2021",
        authors: "Hu et al. (Microsoft Research)",
        arxivUrl: "https://arxiv.org/abs/2106.09685",
        significance:
          "Decomposes weight update matrices into low-rank representations (W = W_0 + B*A), enabling fine-tuning with 10,000x fewer parameters.",
      },
    ],
    standardBenchmarks: [
      "MMLU (Massive Multitask Language Understanding)",
      "GSM8K (Grade School Math)",
      "HumanEval (Python Code Generation)",
      "AlpacaEval / MT-Bench",
    ],
    openResearchDirections: [
      "Linear and sub-quadratic attention mechanisms (State Space Models like Mamba, RingAttention) for infinite context lengths.",
      "Mechanistic interpretability: reverse-engineering circuit representations and sparse autoencoders (SAEs) in residual streams.",
      "Test-time compute scaling: balancing inference-time search (MCTS, beam search, chain-of-thought verification) against parameter count.",
    ],
  },
  {
    id: "computer-vision",
    topic: "Computer Vision, Diffusion & Multimodal Learning",
    tagline:
      "Vision Transformers (ViT), Contrastive Multimodal Alignment (CLIP), and Latent Diffusion Models",
    prerequisites: [
      "Convolutions & Fourier Transforms",
      "PyTorch Torchvision",
      "Generative Modeling basics",
    ],
    coreIntuition:
      "Modern vision has converged with NLP. Instead of hand-crafted convolutional kernels, images are tokenized into 16x16 pixel patches and processed by standard Transformer encoders. In generative vision, diffusion models invert progressive Gaussian noise via score matching.",
    mustReadPapers: [
      {
        title:
          "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale",
        year: "2020",
        authors: "Dosovitskiy et al. (Google Research, Brain Team)",
        arxivUrl: "https://arxiv.org/abs/2010.11929",
        significance:
          "Demonstrated that pure Transformer architectures (ViT) outperform ResNets on computer vision tasks when trained on sufficient data.",
      },
      {
        title:
          "Learning Transferable Visual Models From Natural Language Supervision (CLIP)",
        year: "2021",
        authors: "Radford et al. (OpenAI)",
        arxivUrl: "https://arxiv.org/abs/2103.00020",
        significance:
          "Unified vision and natural language via contrastive loss, enabling zero-shot image classification and powering modern generative AI.",
      },
      {
        title: "High-Resolution Image Synthesis with Latent Diffusion Models",
        year: "2022",
        authors: "Rombach et al. (LMU Munich, Runway)",
        arxivUrl: "https://arxiv.org/abs/2112.10752",
        significance:
          "Moved the diffusion process from pixel space to a compressed latent space (Stable Diffusion), reducing compute costs by orders of magnitude.",
      },
    ],
    standardBenchmarks: [
      "ImageNet-1K (Classification)",
      "COCO (Common Objects in Context - Detection/Segmentation)",
      "GenEval (Text-to-Image alignment)",
      "MME / MMMU (Multimodal Benchmarks)",
    ],
    openResearchDirections: [
      "Flow Matching and Rectified Flows for single-step or few-step generative modeling with minimal inference latency.",
      "Multimodal tokenization: unified architectures that natively tokenize audio, video, text, and 3D point clouds into a single continuous representation.",
      "Video world models: learning physics priors and predictive state dynamics for robotics manipulation.",
    ],
  },
  {
    id: "graph-neural-networks",
    topic: "Graph Neural Networks & Relational Machine Learning",
    tagline:
      "Message Passing, Graph Transformers, Equivariant Architectures for Molecules and Networks",
    prerequisites: [
      "Graph Theory (Adjacency Matrix, Laplacian)",
      "Spectral Graph Theory basics",
      "PyTorch Geometric (PyG) / DGL",
    ],
    coreIntuition:
      "Most non-Euclidean data (molecules, social networks, knowledge graphs, citation networks) lacks a grid structure. GNNs operate via iterative Message Passing: each node aggregates feature representations from its local neighbors, transforming features equivariantly with respect to graph permutations.",
    mustReadPapers: [
      {
        title:
          "Semi-Supervised Classification with Graph Convolutional Networks",
        year: "2016",
        authors: "Kipf & Welling (University of Amsterdam)",
        arxivUrl: "https://arxiv.org/abs/1609.02907",
        significance:
          "Introduced first-order localized spectral Graph Convolutional Networks (GCN), making deep learning on graphs mathematically scalable.",
      },
      {
        title: "Graph Attention Networks (GAT)",
        year: "2017",
        authors: "Veličković et al. (University of Cambridge)",
        arxivUrl: "https://arxiv.org/abs/1710.10903",
        significance:
          "Introduced masked self-attention over node neighborhoods, enabling nodes to assign dynamic importance weights to different neighbors.",
      },
    ],
    standardBenchmarks: [
      "OGB (Open Graph Benchmark - Node, Link, and Graph Property Prediction)",
      "ZINC (Molecular property regression)",
      "Cora / Citeseer (Citation Networks)",
    ],
    openResearchDirections: [
      "Over-smoothing and over-squashing: overcoming information bottlenecks when scaling GNNs beyond 4-6 layers.",
      "Geometric deep learning & SE(3) equivariance for drug discovery, protein folding (AlphaFold 3 architecture), and crystal material synthesis.",
    ],
  },
  {
    id: "efficient-ml",
    topic: "Efficient Deep Learning & Systems for AI",
    tagline:
      "Quantization (FP8, INT4, AWQ), FlashAttention, Kernel Optimization, and Speculative Decoding",
    prerequisites: [
      "Computer Architecture (Memory hierarchy, SRAM vs HBM)",
      "C++ / CUDA basics or Triton",
      "Matrix Multiplication BLAS",
    ],
    coreIntuition:
      "Modern AI progress is constrained by GPU memory bandwidth (Memory Wall) rather than raw floating-point operations. Efficient ML bridges algorithmic mathematics and hardware primitives: keeping data in fast SRAM cache to maximize tensor core utilization.",
    mustReadPapers: [
      {
        title:
          "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness",
        year: "2022",
        authors: "Dao et al. (Stanford University)",
        arxivUrl: "https://arxiv.org/abs/2205.14135",
        significance:
          "Reorganized the attention algorithm with tiling and recomputation to avoid reading/writing the N x N attention matrix to slow GPU HBM.",
      },
      {
        title:
          "AWQ: Activation-aware Weight Quantization for LLM Compression and Acceleration",
        year: "2023",
        authors: "Lin et al. (MIT)",
        arxivUrl: "https://arxiv.org/abs/2306.00978",
        significance:
          "Showed that protecting the top 1% salient activation channels allows quantizing weights to 4-bit integers with zero perplexity degradation.",
      },
    ],
    standardBenchmarks: [
      "Tokens/second throughput",
      "Peak GPU memory utilization (VRAM in GB)",
      "Perplexity degradation on WikiText-2 / C4",
    ],
    openResearchDirections: [
      "1-bit and ternary neural networks (e.g. BitNet b1.58) eliminating floating-point matrix multiplications completely.",
      "Custom kernel synthesis using OpenAI Triton to generate hardware-optimal GPU code without writing raw CUDA C++.",
    ],
  },
];

export const freeResearchTools: ResearchTool[] = [
  // --- Discovery ---
  {
    id: "arxiv",
    name: "arXiv.org (cs.LG, cs.AI, cs.CV, cs.CL)",
    category: "discovery",
    categoryLabel: "Preprint Server",
    description:
      "The global open-access preprint archive where 95%+ of cutting-edge AI research is published months before conference proceedings.",
    url: "https://arxiv.org/corr/cs/home",
    freeTierDetails: "100% Free and open to all researchers globally.",
    badge: "Essential",
  },
  {
    id: "huggingface-papers",
    name: "Hugging Face Daily Papers",
    category: "discovery",
    categoryLabel: "Curated Feed",
    description:
      "Community-curated daily feed of top trending AI/ML papers with linked open-source code models, interactive demos, and author discussions.",
    url: "https://huggingface.co/papers",
    freeTierDetails: "100% Free community access.",
    badge: "Trending Daily",
  },
  {
    id: "paperswithcode",
    name: "Papers With Code",
    category: "discovery",
    categoryLabel: "Benchmarks & Code",
    description:
      "The premier resource connecting scientific papers to their official open-source GitHub codebases and public benchmark leaderboards.",
    url: "https://paperswithcode.com/",
    freeTierDetails: "100% Free with GitHub integration.",
    badge: "SOTA Leaderboards",
  },
  {
    id: "connected-papers",
    name: "Connected Papers",
    category: "discovery",
    categoryLabel: "Visual Graph",
    description:
      "Visual exploration tool that generates graph networks of research papers based on co-citation and bibliographic coupling.",
    url: "https://www.connectedpapers.com/",
    freeTierDetails:
      "Free tier offers up to 5 visual graph searches per month.",
    badge: "Literature Review",
  },
  {
    id: "semantic-scholar",
    name: "Semantic Scholar",
    category: "discovery",
    categoryLabel: "AI Paper Search",
    description:
      "Free AI-powered scientific search engine built by the Allen Institute for AI (AI2), highlighting highly influential citations and TLDR summaries.",
    url: "https://www.semanticscholar.org/",
    freeTierDetails: "100% Free academic tool.",
    badge: "Citation Analytics",
  },

  // --- Compute ---
  {
    id: "google-colab",
    name: "Google Colab",
    category: "compute",
    categoryLabel: "Cloud Notebook",
    description:
      "Cloud-hosted Jupyter notebook service providing free access to Nvidia T4 GPUs and high-memory CPU instances.",
    url: "https://colab.research.google.com/",
    freeTierDetails: "Free T4 GPU runtime (12-hour session timeout).",
    badge: "Free GPU",
  },
  {
    id: "kaggle-notebooks",
    name: "Kaggle GPU Notebooks",
    category: "compute",
    categoryLabel: "Dual GPU Cloud",
    description:
      "Provides 30 hours per week of free GPU compute (Dual Nvidia T4 or P100 GPUs) with pre-installed PyTorch, Hugging Face, and datasets.",
    url: "https://www.kaggle.com/code",
    freeTierDetails: "30 hours/week of Nvidia T4 x2 GPUs completely free.",
    badge: "30h / Week Free",
  },
  {
    id: "lightning-ai",
    name: "Lightning AI Studios",
    category: "compute",
    categoryLabel: "Cloud Environment",
    description:
      "Modern cloud development environment from the creators of PyTorch Lightning, providing persistent VS Code studios with free monthly compute credits.",
    url: "https://lightning.ai/",
    freeTierDetails:
      "Free tier includes monthly compute credits for GPU instances.",
    badge: "VS Code Cloud",
  },

  // --- Writing ---
  {
    id: "overleaf",
    name: "Overleaf (LaTeX)",
    category: "writing",
    categoryLabel: "Collaborative LaTeX",
    description:
      "The gold standard collaborative cloud LaTeX editor with thousands of pre-configured conference paper templates.",
    url: "https://www.overleaf.com/",
    freeTierDetails:
      "Free tier includes unlimited private projects and PDF compilation.",
    badge: "Industry Standard",
  },
  {
    id: "zotero",
    name: "Zotero Reference Manager",
    category: "writing",
    categoryLabel: "Citation Manager",
    description:
      "Open-source citation management software with automatic 1-click browser DOI capture, PDF annotation, and automatic BibTeX export.",
    url: "https://www.zotero.org/",
    freeTierDetails:
      "100% Free and open-source software with 300MB cloud sync.",
    badge: "Open Source",
  },

  // --- Experimentation ---
  {
    id: "wandb",
    name: "Weights & Biases (W&B)",
    category: "experimentation",
    categoryLabel: "Experiment Tracker",
    description:
      "The leading developer platform for machine learning experiment tracking, hyperparameter sweep optimization, and dataset versioning.",
    url: "https://wandb.ai/",
    freeTierDetails:
      "Free personal tier with unlimited projects and 100GB artifact storage.",
    badge: "Experiment Tracking",
  },
];

export const topConferences: ConferenceVenue[] = [
  {
    id: "neurips",
    name: "Conference on Neural Information Processing Systems",
    abbreviation: "NeurIPS",
    tier: "A*",
    domain: "Machine Learning, Deep Learning, Theory & Applications",
    submissionCycles: "May (Annual) | Conference in December",
    reviewStyle:
      "Double-Blind Peer Review on OpenReview (Public Reviews & Author Rebuttal)",
    officialUrl: "https://neurips.cc/",
    description:
      "The largest and most prestigious academic machine learning conference in the world, founded in 1987.",
  },
  {
    id: "icml",
    name: "International Conference on Machine Learning",
    abbreviation: "ICML",
    tier: "A*",
    domain: "Foundational ML, Optimization, Theory, Reinforcement Learning",
    submissionCycles: "January - February (Annual) | Conference in July",
    reviewStyle:
      "Double-Blind Review on OpenReview with Author Rebuttal period",
    officialUrl: "https://icml.cc/",
    description:
      "The premier gathering for foundational, theoretical, and algorithmic machine learning advances.",
  },
  {
    id: "iclr",
    name: "International Conference on Learning Representations",
    abbreviation: "ICLR",
    tier: "A*",
    domain: "Representation Learning, Deep Learning Architectures, LLMs",
    submissionCycles: "September - October (Annual) | Conference in April/May",
    reviewStyle:
      "100% Transparent OpenReview from day of submission to decision",
    officialUrl: "https://iclr.cc/",
    description:
      "Pioneered by Yoshua Bengio and Yann LeCun, widely regarded as the top venue for modern deep learning architectures and representation theory.",
  },
  {
    id: "cvpr",
    name: "IEEE / CVF Computer Vision and Pattern Recognition",
    abbreviation: "CVPR",
    tier: "A*",
    domain: "Computer Vision, Multimodal Vision-Language, Generative Vision",
    submissionCycles: "November (Annual) | Conference in June",
    reviewStyle:
      "Double-Blind Review with strict anonymous formatting guidelines",
    officialUrl: "https://cvpr.thecvf.com/",
    description:
      "The highest-impact computer science venue across all engineering fields according to Google Scholar metrics.",
  },
  {
    id: "acl",
    name: "Association for Computational Linguistics",
    abbreviation: "ACL",
    tier: "A*",
    domain: "Natural Language Processing, Computational Linguistics, LLMs",
    submissionCycles: "Rolling submissions via ACL Rolling Review (ARR)",
    reviewStyle:
      "Centralized rolling review with commitment deadlines to specific conferences (ACL, EMNLP, NAACL)",
    officialUrl: "https://aclrollingreview.org/",
    description:
      "The flagship conference in natural language processing and computational linguistics.",
  },
  {
    id: "tmlr",
    name: "Transactions on Machine Learning Research",
    abbreviation: "TMLR",
    tier: "Journal",
    domain: "General Machine Learning (Fast Open Access)",
    submissionCycles: "Year-Round Rolling Submissions (Decisions in ~2 months)",
    reviewStyle:
      "Double-Blind OpenReview, evaluated for scientific correctness rather than subjective 'novelty'",
    officialUrl: "https://jmlr.org/tmlr/",
    description:
      "Modern sister journal of JMLR designed for fast, rigorous rolling peer review with zero publication fees.",
  },
];
