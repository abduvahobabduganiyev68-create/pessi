/* =========================================================
   KECHMAS — MAIN APP
========================================================= */


/* =========================================================
   DEFAULT DATA
========================================================= */

const defaultData = {

  loggedIn: false,

  parent: {
    name: "Ota-ona",
    email: ""
  },

  children: [

    {
      id: 1,

      name: "Ali Abduganiyev",

      age: 15,

      avatar: "A",

      overall: 78,

      interest: 64,

      activity: 71,

      attendance: 92,

      goal: 73,

      subjects: [

        {
          id: 1,
          name: "Matematika",
          score: 84,
          interest: 69,
          trend: 8,
          status: "up"
        },

        {
          id: 2,
          name: "Ingliz tili",
          score: 61,
          interest: 54,
          trend: -11,
          status: "down"
        },

        {
          id: 3,
          name: "Fizika",
          score: 76,
          interest: 72,
          trend: 4,
          status: "up"
        },

        {
          id: 4,
          name: "Informatika",
          score: 91,
          interest: 88,
          trend: 13,
          status: "up"
        }

      ],

      activities: [

        {
          icon: "📚",
          title: "Ingliz tili natijasi",
          text: "61% natija qayd qilindi.",
          time: "Bugun"
        },

        {
          icon: "📈",
          title: "Informatika",
          text: "Natija 13% ga oshdi.",
          time: "Kecha"
        },

        {
          icon: "⚠️",
          title: "Qiziqish signali",
          text: "Ingliz tilida pasayish kuzatildi.",
          time: "2 kun oldin"
        }

      ]

    }

  ]

};


let appData = loadData();

let currentChildId = 1;

let authMode = "register";


/* =========================================================
   LOCAL STORAGE
========================================================= */

function loadData() {

  try {

    const saved =
      localStorage.getItem("kechmasData");

    if (saved) {

      return JSON.parse(saved);

    }

  } catch (error) {

    console.error(error);

  }

  return structuredClone(defaultData);
}


function saveData() {

  localStorage.setItem(
    "kechmasData",
    JSON.stringify(appData)
  );

}


/* =========================================================
   INIT
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    initializeApp();

  }
);


function initializeApp() {

  setupRevealAnimation();

  calculateCost();

  renderSubjects();

  renderActivities();

  updateDashboard();

  if (appData.loggedIn) {

    showDashboard();

  } else {

    showLanding();

  }

}


/* =========================================================
   PAGE NAVIGATION
========================================================= */

function showLanding() {

  document
    .getElementById("landingPage")
    .classList.remove("hidden");

  document
    .getElementById("dashboardPage")
    .classList.add("hidden");

}


function showDashboard() {

  document
    .getElementById("landingPage")
    .classList.add("hidden");

  document
    .getElementById("dashboardPage")
    .classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  updateDashboard();

}


function goHome() {

  if (appData.loggedIn) {

    showDashboard();

  } else {

    showLanding();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }

}


/* =========================================================
   SCROLL
========================================================= */

function scrollToId(id) {

  const element =
    document.getElementById(id);

  if (!element) return;

  element.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


/* =========================================================
   MOBILE MENU
========================================================= */

function toggleMobileMenu() {

  const menu =
    document.getElementById("mobileMenu");

  menu.classList.toggle("hidden");

}


/* =========================================================
   AUTH
========================================================= */

function openAuth(mode = "register") {

  authMode = mode;

  updateAuthModal();

  document
    .getElementById("authModal")
    .classList.remove("hidden");

}


function closeModal(id) {

  document
    .getElementById(id)
    .classList.add("hidden");

}


function updateAuthModal() {

  const title =
    document.getElementById("authTitle");

  const subtitle =
    document.getElementById("authSubtitle");

  const nameField =
    document.getElementById("nameField");

  const submit =
    document.getElementById("authSubmit");

  const switchButton =
    document.getElementById("authSwitch");


  if (authMode === "register") {

    title.textContent =
      "Akkaunt yaratish";

    subtitle.textContent =
      "Farzandingiz rivojlanishini kuzatishni boshlang.";

    nameField.classList.remove("hidden");

    submit.textContent =
      "Akkaunt yaratish";

    switchButton.textContent =
      "Akkauntingiz bormi? Kirish";

  } else {

    title.textContent =
      "Xush kelibsiz";

    subtitle.textContent =
      "Kechmas akkauntingizga kiring.";

    nameField.classList.add("hidden");

    submit.textContent =
      "Kirish";

    switchButton.textContent =
      "Akkauntingiz yo‘qmi? Ro‘yxatdan o‘tish";

  }

}


function switchAuthMode() {

  authMode =
    authMode === "register"
      ? "login"
      : "register";

  updateAuthModal();

}


function handleAuth(event) {

  event.preventDefault();


  const name =
    document
      .getElementById("authName")
      .value
      .trim();

  const email =
    document
      .getElementById("authEmail")
      .value
      .trim();

  const password =
    document
      .getElementById("authPassword")
      .value;


  if (password.length < 4) {

    showToast(
      "Parol kamida 4 ta belgidan iborat bo‘lishi kerak."
    );

    return;

  }


  if (authMode === "register") {

    appData.parent.name =
      name || "Ota-ona";

    appData.parent.email =
      email;

    appData.loggedIn =
      true;

    saveData();

    closeModal("authModal");

    showToast(
      "🎉 Akkaunt muvaffaqiyatli yaratildi!"
    );

    showDashboard();

  } else {

    appData.loggedIn =
      true;

    if (!appData.parent.name) {

      appData.parent.name =
        "Ota-ona";

    }

    saveData();

    closeModal("authModal");

    showToast(
      "👋 Xush kelibsiz!"
    );

    showDashboard();

  }

}


function socialLogin(provider) {

  appData.loggedIn = true;

  appData.parent.name =
    provider === "Google"
      ? "Google foydalanuvchisi"
      : "Facebook foydalanuvchisi";

  saveData();

  closeModal("authModal");

  showToast(
    `${provider} orqali kirish demo rejimida ishga tushdi.`
  );

  showDashboard();

}


/* =========================================================
   LOGOUT
========================================================= */

function logout() {

  appData.loggedIn = false;

  saveData();

  showLanding();

  showToast(
    "Akkauntdan chiqdingiz."
  );

}


/* =========================================================
   DASHBOARD
========================================================= */

function getCurrentChild() {

  let child =
    appData.children.find(
      child => child.id === currentChildId
    );

  if (!child) {

    child =
      appData.children[0];

  }

  return child;

}


function updateDashboard() {

  const child =
    getCurrentChild();

  if (!child) return;


  document
    .getElementById("parentName")
    .textContent =
      appData.parent.name || "Ota-ona";


  document
    .getElementById("childName")
    .textContent =
      child.name;


  document
    .getElementById("childAge")
    .textContent =
      `${child.age} yosh`;


  document
    .getElementById("childAvatar")
    .textContent =
      child.avatar;


  renderSubjects();

  renderActivities();

}


/* =========================================================
   SUBJECTS
========================================================= */

function renderSubjects() {

  const container =
    document.getElementById(
      "subjectsContainer"
    );

  if (!container) return;


  const child =
    getCurrentChild();

  if (!child) return;


  container.innerHTML = "";


  child.subjects.forEach(
    subject => {

      const color =
        subject.score >= 75
          ? "cyan"
          : subject.score >= 60
            ? "amber"
            : "rose";


      const trend =
        subject.trend >= 0
          ? `↑ ${subject.trend}%`
          : `↓ ${Math.abs(subject.trend)}%`;


      const trendClass =
        subject.trend >= 0
          ? "text-emerald-400"
          : "text-rose-400";


      const item =
        document.createElement("div");


      item.className =
        "rounded-2xl border border-white/5 bg-white/[0.025] p-4";


      item.innerHTML = `

        <div class="flex items-center justify-between gap-4">

          <div class="min-w-0">

            <div class="flex items-center gap-2">

              <strong class="truncate">
                ${escapeHTML(subject.name)}
              </strong>

              ${
                subject.trend < 0
                  ? `
                    <span class="rounded-md bg-rose-400/10 px-2 py-1 text-[10px] text-rose-300">
                      DIQQAT
                    </span>
                  `
                  : ""
              }

            </div>

            <p class="mt-1 text-xs text-slate-500">
              Qiziqish: ${subject.interest}%
            </p>

          </div>


          <div class="text-right">

            <strong class="text-xl">
              ${subject.score}%
            </strong>

            <p class="${trendClass} text-xs">
              ${trend}
            </p>

          </div>

        </div>


        <div class="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">

          <div
            class="h-full rounded-full transition-all duration-700 ${
              color === "cyan"
                ? "bg-cyan-400"
                : color === "amber"
                  ? "bg-amber-400"
                  : "bg-rose-400"
            }"
            style="width:${subject.score}%"
          ></div>

        </div>

      `;


      container.appendChild(item);

    }
  );

}


/* =========================================================
   ACTIVITIES
========================================================= */

function renderActivities() {

  const container =
    document.getElementById(
      "activityList"
    );

  if (!container) return;


  const child =
    getCurrentChild();

  if (!child) return;


  container.innerHTML = "";


  child.activities
    .slice(0, 8)
    .forEach(activity => {

      const item =
        document.createElement("div");


      item.className =
        "flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4";


      item.innerHTML = `

        <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-xl">
          ${activity.icon}
        </div>

        <div class="min-w-0 flex-1">

          <strong class="block text-sm">
            ${escapeHTML(activity.title)}
          </strong>

          <p class="mt-1 text-xs text-slate-500">
            ${escapeHTML(activity.text)}
          </p>

        </div>

        <span class="text-[10px] text-slate-600">
          ${escapeHTML(activity.time)}
        </span>

      `;


      container.appendChild(item);

    });

}


/* =========================================================
   CHILD
========================================================= */

function openChildModal() {

  document
    .getElementById("childModal")
    .classList.remove("hidden");

}


function saveChild(event) {

  event.preventDefault();


  const name =
    document
      .getElementById("newChildName")
      .value
      .trim();


  const age =
    Number(
      document
        .getElementById("newChildAge")
        .value
    );


  if (!name || !age) {

    showToast(
      "Ma’lumotlarni to‘liq kiriting."
    );

    return;

  }


  const newChild = {

    id: Date.now(),

    name,

    age,

    avatar:
      name
        .charAt(0)
        .toUpperCase(),

    overall: 70,

    interest: 70,

    activity: 70,

    attendance: 90,

    goal: 65,

    subjects: [

      {
        id: Date.now() + 1,
        name: "Matematika",
        score: 70,
        interest: 70,
        trend: 0,
        status: "same"
      },

      {
        id: Date.now() + 2,
        name: "Ingliz tili",
        score: 70,
        interest: 70,
        trend: 0,
        status: "same"
      }

    ],

    activities: [

      {
        icon: "👤",
        title: "Profil yaratildi",
        text: `${name} profili yaratildi.`,
        time: "Hozir"
      }

    ]

  };


  appData.children.push(
    newChild
  );


  currentChildId =
    newChild.id;


  saveData();

  closeModal("childModal");

  document
    .getElementById("newChildName")
    .value = "";

  document
    .getElementById("newChildAge")
    .value = "";


  updateDashboard();

  showToast(
    `🎉 ${name} farzand sifatida qo‘shildi.`
  );

}


/* =========================================================
   SUBJECT
========================================================= */

function openSubjectModal() {

  document
    .getElementById("subjectModal")
    .classList.remove("hidden");

}


function saveSubject(event) {

  event.preventDefault();


  const name =
    document
      .getElementById("newSubjectName")
      .value
      .trim();


  const score =
    Number(
      document
        .getElementById("newSubjectScore")
        .value
    );


  if (
    !name ||
    Number.isNaN(score) ||
    score < 0 ||
    score > 100
  ) {

    showToast(
      "Fan nomi va 0–100 oralig‘idagi natijani kiriting."
    );

    return;

  }


  const child =
    getCurrentChild();


  child.subjects.push({

    id: Date.now(),

    name,

    score,

    interest: score,

    trend: 0,

    status: "same"

  });


  child.activities.unshift({

    icon: "📚",

    title: `${name} qo‘shildi`,

    text: `${score}% natija bilan yangi fan qo‘shildi.`,

    time: "Hozir"

  });


  saveData();

  renderSubjects();

  renderActivities();

  closeModal("subjectModal");

  document
    .getElementById("newSubjectName")
    .value = "";

  document
    .getElementById("newSubjectScore")
    .value = "";


  showToast(
    `📚 ${name} muvaffaqiyatli qo‘shildi.`
  );

}


/* =========================================================
   ACTIVITY
========================================================= */

function addActivity() {

  const child =
    getCurrentChild();


  const subject =
    child.subjects[
      Math.floor(
        Math.random() *
        child.subjects.length
      )
    ];


  if (!subject) return;


  const oldScore =
    subject.score;


  const change =
    Math.floor(
      Math.random() * 11
    ) - 5;


  subject.score =
    Math.max(
      0,
      Math.min(
        100,
        subject.score + change
      )
    );


  subject.trend =
    change;


  if (change < 0) {

    subject.status =
      "down";

  } else if (change > 0) {

    subject.status =
      "up";

  } else {

    subject.status =
      "same";

  }


  child.activities.unshift({

    icon:
      change < 0
        ? "⚠️"
        : "📈",

    title:
      `${subject.name} yangilandi`,

    text:
      `${oldScore}% → ${subject.score}%`,

    time:
      "Hozir"

  });


  saveData();

  renderSubjects();

  renderActivities();

  showToast(
    "📊 Yangi natija qo‘shildi."
  );

}


/* =========================================================
   AI ANALYSIS
========================================================= */

function showAIAnalysis() {

  const child =
    getCurrentChild();


  const downSubjects =
    child.subjects.filter(
      subject =>
        subject.trend < 0
    );


  const bestSubject =
    [...child.subjects]
      .sort(
        (a, b) =>
          b.score - a.score
      )[0];


  const weakSubject =
    [...child.subjects]
      .sort(
        (a, b) =>
          a.score - b.score
      )[0];


  const container =
    document.getElementById(
      "aiAnalysisContent"
    );


  container.innerHTML = `

    <div class="rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-5">

      <p class="text-xs font-bold uppercase tracking-widest text-cyan-300">
        Umumiy kuzatuv
      </p>

      <p class="mt-3 text-sm leading-7 text-slate-300">

        ${escapeHTML(child.name)}ning umumiy rivojlanishi
        hozircha barqaror ko‘rinmoqda. Eng yuqori natija
        ${escapeHTML(bestSubject?.name || "fan")} fanida.

      </p>

    </div>


    <div class="rounded-2xl border border-amber-400/10 bg-amber-400/5 p-5">

      <p class="text-xs font-bold uppercase tracking-widest text-amber-300">
        E’tibor kerak
      </p>

      <p class="mt-3 text-sm leading-7 text-slate-300">

        ${
          downSubjects.length
            ? `
              ${downSubjects
                .map(
                  subject =>
                    `${escapeHTML(subject.name)}
                     bo‘yicha ${Math.abs(subject.trend)}% pasayish kuzatilgan`
                )
                .join(", ")}.
            `
            : `
              Hozircha keskin pasayish signali
              qayd etilmadi.
            `
        }

      </p>

    </div>


    <div class="rounded-2xl border border-violet-400/10 bg-violet-400/5 p-5">

      <p class="text-xs font-bold uppercase tracking-widest text-violet-300">
        Keyingi qadam
      </p>

      <p class="mt-3 text-sm leading-7 text-slate-300">

        ${
          weakSubject
            ? `
              ${escapeHTML(weakSubject.name)}
              bo‘yicha bolaning qiziqishi va qaysi mavzularda
              qiynalayotganini alohida kuzatish,
              kichik maqsadlar qo‘yish va keyingi natijani
              oldingi ko‘rsatkich bilan taqqoslash tavsiya etiladi.
            `
            : `
              Umumiy rivojlanishni muntazam kuzatishda davom eting.
            `
        }

      </p>

    </div>

  `;


  document
    .getElementById("aiModal")
    .classList.remove("hidden");

}


/* =========================================================
   30 DAY PLAN
========================================================= */

function generatePlan() {

  const child =
    getCurrentChild();


  const weakSubject =
    [...child.subjects]
      .sort(
        (a, b) =>
          a.score - b.score
      )[0];


  const plan =
    document.getElementById(
      "planContainer"
    );


  plan.innerHTML = `

    <div class="plan-card">

      <span>1-hafta</span>

      <strong>
        ${escapeHTML(weakSubject?.name || "Asosiy fan")}ni tushunish
      </strong>

      <p>
        Eng qiyin mavzularni aniqlash va
        kichik, bajariladigan maqsadlar qo‘yish.
      </p>

    </div>


    <div class="plan-card">

      <span>2-hafta</span>

      <strong>
        Qiziqishni qayta uyg‘otish
      </strong>

      <p>
        Qiziqarli amaliy topshiriqlar,
        mini-mashqlar va kichik g‘alabalarni ko‘paytirish.
      </p>

    </div>


    <div class="plan-card">

      <span>3-hafta</span>

      <strong>
        Mustahkamlash
      </strong>

      <p>
        O‘zlashtirilmagan mavzularni
        bosqichma-bosqich mustahkamlash.
      </p>

    </div>


    <div class="plan-card">

      <span>4-hafta</span>

      <strong>
        Natijani solishtirish
      </strong>

      <p>
        Yangi natijani boshlang‘ich
        ko‘rsatkich bilan taqqoslash.
      </p>

    </div>

  `;


  showToast(
    "🎯 30 kunlik reja tayyorlandi."
  );

}


/* =========================================================
   COST CALCULATOR
========================================================= */

function calculateCost() {

  const monthly =
    Number(
      document
        .getElementById("monthlyCost")
        ?.value || 0
    );


  const years =
    Number(
      document
        .getElementById("yearsCost")
        ?.value || 1
    );


  const total =
    monthly *
    12 *
    years;


  const output =
    document.getElementById(
      "yearlyCost"
    );


  if (!output) return;


  output.textContent =
    formatMoney(total);

}


function formatMoney(number) {

  return new Intl.NumberFormat(
    "uz-UZ"
  ).format(number) + " so‘m";

}


/* =========================================================
   THEME
========================================================= */

function toggleTheme() {

  document.documentElement.classList.toggle(
    "light-mode"
  );


  const light =
    document.documentElement.classList.contains(
      "light-mode"
    );


  localStorage.setItem(
    "kechmasTheme",
    light
      ? "light"
      : "dark"
  );

}


function loadTheme() {

  const theme =
    localStorage.getItem(
      "kechmasTheme"
    );


  if (theme === "light") {

    document.documentElement.classList.add(
      "light-mode"
    );

  }

}


loadTheme();


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function showToast(message) {

  const toast =
    document.getElementById(
      "toast"
    );


  toast.textContent =
    message;


  toast.classList.remove(
    "hidden"
  );


  clearTimeout(
    toastTimer
  );


  toastTimer =
    setTimeout(
      () => {

        toast.classList.add(
          "hidden"
        );

      },
      3500
    );

}


/* =========================================================
   REVEAL ANIMATION
========================================================= */

function setupRevealAnimation() {

  const elements =
    document.querySelectorAll(
      ".reveal"
    );


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(
          entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "visible"
              );

            }

          }
        );

      },
      {
        threshold: 0.12
      }
    );


  elements.forEach(
    element =>
      observer.observe(
        element
      )
  );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

  return String(value)

    .replace(
      /&/g,
      "&amp;"
    )

    .replace(
      /</g,
      "&lt;"
    )

    .replace(
      />/g,
      "&gt;"
    )

    .replace(
      /"/g,
      "&quot;"
    )

    .replace(
      /'/g,
      "&#039;"
    );

}


/* =========================================================
   KEYBOARD
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      [
        "authModal",
        "childModal",
        "subjectModal",
        "aiModal"
      ].forEach(
        closeModal
      );

    }

  }
);