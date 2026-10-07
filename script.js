/* Edit both languages together. Bracketed content is a template, not a claim. */
const translations = {
  zh: {
    personalFootnote: "个人随记",
    modeWork: "学术与工作", modeLife: "生活与爱好", lifeEntryTitle: "论文之外，也有风景。", lifeEntryText: "一些摄影，一些鸡尾酒，还有日常的片刻。", lifeEntryLink: "去生活里逛逛",
    pageTitle: "韩咏烜 · 个人学术主页",
    description: "韩咏烜，上海交通大学计算机专业在读博士生，研究方向为无人机相关三维重建。",
    skip: "跳转到正文", navLabel: "主导航", navResearch: "研究", navPublications: "论文", navProjects: "项目", navContact: "联系",
    affiliation: "上海交通大学 · 计算机专业", name: "韩咏烜", alternateName: "Yongxuan Han", role: "在读博士生",
    intro: "上海交通大学计算机专业在读博士生，研究方向为无人机相关三维重建。",
    emailLabel: "邮箱", locationLabel: "所在地",
    emailMe: "邮件联系", location: "中国 · 上海", sceneTitle: "无人机观测与三维场景重建示意图", visualCaption: "从空中观测，到三维场景。", illustration: "研究方向示意",
    researchTitle: "研究方向", researchIntro: "无人机相关三维重建。", tagUav: "无人机", tag3d: "三维重建", tagVision: "计算机视觉",
    researchPlaceholder: "[具体研究课题与技术方向]",
    publicationsTitle: "论文与成果", templateLabel: "待填写", paperTitle: "[论文标题]", paperAuthors: "[作者列表 · 可标注本人及共同一作]", paperVenue: "[会议 / 期刊 · 年份 · 真实发表状态]", paperLinks: "[论文链接 / 代码链接]",
    projectsTitle: "研究与项目经历", projectDate: "[起止时间]", projectTitle: "[研究项目名称]", projectDescription: "[研究问题、技术路线与个人贡献]", projectResult: "[实验结果与项目成果]",
    educationTitle: "教育背景", university: "上海交通大学", present: "在读", degree: "计算机专业 · 博士研究生", educationDetails: "[入学年份] — 至今 · [院系 / 实验室] · [导师姓名]", previousUniversity: "[本科 / 硕士毕业院校]", previousDegree: "[学位与专业] · [起止年份]",
    contactEyebrow: "学术交流 · 研究合作", contactTitle: "欢迎交流。", contactIntro: "如果你也对无人机与三维重建感兴趣，欢迎通过邮件联系我。", backTop: "返回顶部 ↑"
  },
  en: {
    personalFootnote: "Personal notes",
    modeWork: "Research & Work", modeLife: "Life & Hobbies", lifeEntryTitle: "A little life beyond the papers.", lifeEntryText: "Photographs, cocktails, and the moments in between.", lifeEntryLink: "Explore the other side",
    pageTitle: "Yongxuan Han · Academic Homepage",
    description: "Yongxuan Han is a PhD student in computer science at Shanghai Jiao Tong University, working on UAV-related 3D reconstruction.",
    skip: "Skip to content", navLabel: "Main navigation", navResearch: "Research", navPublications: "Publications", navProjects: "Projects", navContact: "Contact",
    affiliation: "Shanghai Jiao Tong University · Computer Science", name: "Yongxuan Han", alternateName: "韩咏烜", role: "PhD Student",
    intro: "PhD student in computer science at Shanghai Jiao Tong University, researching UAV-related 3D reconstruction.",
    emailLabel: "Email", locationLabel: "Location",
    emailMe: "Get in touch", location: "Shanghai, China", sceneTitle: "An illustration of UAV observation and 3D scene reconstruction", visualCaption: "From aerial views to 3D scenes.", illustration: "Concept illustration",
    researchTitle: "Research Interests", researchIntro: "UAV-related 3D reconstruction.", tagUav: "Unmanned Aerial Vehicles", tag3d: "3D Reconstruction", tagVision: "Computer Vision",
    researchPlaceholder: "[Specific research topics and methods]",
    publicationsTitle: "Publications", templateLabel: "To be added", paperTitle: "[Paper title]", paperAuthors: "[Authors · Indicate your name and equal contributions, if applicable]", paperVenue: "[Venue · Year · Actual publication status]", paperLinks: "[Paper / Code]",
    projectsTitle: "Research Experience", projectDate: "[Dates]", projectTitle: "[Research project title]", projectDescription: "[Research problem, approach, and individual contributions]", projectResult: "[Experimental results and project outcomes]",
    educationTitle: "Education", university: "Shanghai Jiao Tong University", present: "Ongoing", degree: "PhD Student · Computer Science", educationDetails: "[Start year] — Present · [Department / Lab] · [Advisor]", previousUniversity: "[Previous university]", previousDegree: "[Degree and major] · [Dates]",
    contactEyebrow: "Academic exchange · Research collaboration", contactTitle: "Let’s connect.", contactIntro: "If you are interested in UAVs and 3D reconstruction, feel free to reach out by email.", backTop: "Back to top ↑"
  }
};

// Page-specific copy extends the same language system.
for (const language of ["zh", "en"]) {
  Object.assign(translations[language], window.pageTranslations?.[language] ?? {});
}

const languageKey = "yh-homepage-language";
function getInitialLanguage() {
  const requested = new URL(window.location.href).searchParams.get("lang");
  if (Object.hasOwn(translations, requested)) return requested;
  try {
    const saved = localStorage.getItem(languageKey);
    if (Object.hasOwn(translations, saved)) return saved;
  } catch { /* The page also works when browser storage is disabled. */ }
  return navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
}

function setLanguage(language, remember = false) {
  if (!Object.hasOwn(translations, language)) return;
  const copy = translations[language];
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.title = copy.pageTitle;
  document.querySelector('meta[name="description"]').content = copy.description;
  document.querySelectorAll("[data-i18n]").forEach(element => {
    element.textContent = copy[element.dataset.i18n];
  });
  document.querySelectorAll("[data-i18n-aria]").forEach(element => {
    element.setAttribute("aria-label", copy[element.dataset.i18nAria]);
  });
  document.querySelectorAll("[data-lang]").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.lang === language));
  });
  document.querySelectorAll("[data-i18n-alt]").forEach(image => {
    image.alt = copy[image.dataset.i18nAlt];
  });
  document.querySelectorAll("[data-page-link]").forEach(link => {
    const destination = new URL(link.getAttribute("href"), window.location.href);
    destination.searchParams.set("lang", language);
    link.href = destination.href;
  });
  if (remember) {
    try { localStorage.setItem(languageKey, language); } catch { /* Optional persistence. */ }
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", language);
      history.replaceState(null, "", url);
    } catch { /* Some browsers restrict history changes for local files. */ }
  }
}

document.querySelectorAll("[data-lang]").forEach(button => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang, true));
});
document.getElementById("year").textContent = String(new Date().getFullYear());
setLanguage(getInitialLanguage());
