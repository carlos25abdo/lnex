// Helpers
function safeId(){
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return Date.now().toString() + Math.floor(Math.random()*9999);
}

// Loading intro
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  const letters = document.querySelectorAll(".loading-word span");
  if (!loadingScreen) return;

  letters.forEach(l=>{
    l.style.setProperty("--x", Math.random());
    l.style.setProperty("--y", Math.random());
  });

  setTimeout(()=> document.querySelector(".loading-word")?.classList.add("unassemble"), 1400);
  setTimeout(()=> loadingScreen.classList.add("fade-out"), 2300);
  setTimeout(()=> loadingScreen.remove(), 3100);
});

// ===============================
// Courses (ONLY Web Design Course)
// ===============================
const courses = [
  {
    id: "webdesign",
    title: "كورس تصميم صفحات الويب",
    desc: "HTML + CSS + JavaScript + Bootstrap مع مشروع عملي نهائي (موقع متكامل متعدد الصفحات ومتجاوب).",
    level: "مبتدئ",
    duration: "4 أسابيع",
    days: "حسب الجدول",
    price: 480,
    seats: "حسب العدد",
    note: "الموعد بعد اكتمال العدد"
  }
];

// Init DOM
window.addEventListener("DOMContentLoaded", () => {
  const courseSelect = document.getElementById("courseSelect");
  const courseDetails = document.getElementById("courseDetails");
  const ageSelect = document.getElementById("ageSelect");

  // Ages
  ageSelect.innerHTML = `<option value="" disabled selected>اختر العمر...</option>`;
  for(let i = 10; i <= 70; i++){
    ageSelect.innerHTML += `<option value="${i}">${i}</option>`;
  }

  // Courses list (only one course)
  courseSelect.innerHTML = `
    <option value="" disabled selected>اختر الكورس...</option>
    <option value="webdesign">كورس تصميم صفحات الويب</option>
  `;

  // Show details
  courseSelect.addEventListener("change", () => {
    const c = courses[0];
    if (!c) return;

    const priceTxt = `${c.price} د.ل`;
    const noteTxt = c.note ? `<p class="small">📌 ${c.note}</p>` : "";

    courseDetails.innerHTML = `
      <h4>${c.title}</h4>
      <p class="small">${c.desc}</p>
      <div class="meta">
        <span class="tag">المستوى: ${c.level}</span>
        <span class="tag">المدة: ${c.duration}</span>
        <span class="tag">الجدول: ${c.days}</span>
        <span class="tag">السعر: ${priceTxt}</span>
        <span class="tag">المقاعد: ${c.seats}</span>
      </div>
      ${noteTxt}
    `;
    courseDetails.classList.add("show");
  });

  observeReveals();
  setupForm();
});

// Form
function setupForm(){
  const form = document.getElementById("regForm");
  const fullName = document.getElementById("fullName");
  const ageSelect = document.getElementById("ageSelect");
  const phone = document.getElementById("phone");
  const address = document.getElementById("address");
  const courseSelect = document.getElementById("courseSelect");
  const savedHint = document.getElementById("savedHint");

  // Load draft
  const draft = JSON.parse(localStorage.getItem("lnex_draft") || "{}");
  fullName.value = draft.fullName || "";
  ageSelect.value = draft.age || "";
  phone.value = draft.phone || "";
  address.value = draft.address || "";
  courseSelect.value = "webdesign";

  // Auto-save
  [fullName, ageSelect, phone, address].forEach(inp=>{
    inp.addEventListener("input", ()=>{
      localStorage.setItem("lnex_draft", JSON.stringify({
        fullName: fullName.value,
        age: ageSelect.value,
        phone: phone.value,
        address: address.value,
        courseId: "webdesign"
      }));
      savedHint.textContent = "💾 تم حفظ البيانات مؤقتًا";
    });
  });

  // Submit
  form.addEventListener("submit", (e)=>{
    e.preventDefault();

    const c = courses[0];

    if (fullName.value.trim().length < 3) return alert("رجاءً أدخل اسم صحيح");
    if (!ageSelect.value) return alert("رجاءً اختر العمر");
    if (!phone.value.match(/^09\d{8}$/)) return alert("رقم الهاتف لازم يكون 09xxxxxxxx");
    if (address.value.trim().length < 3) return alert("رجاءً أدخل مكان السكن");

    const regs = JSON.parse(localStorage.getItem("lnex_regs") || "[]");
    regs.push({
      id: safeId(),
      fullName: fullName.value.trim(),
      age: ageSelect.value,
      phone: phone.value.trim(),
      address: address.value.trim(),
      courseId: c.id,
      courseTitle: c.title,
      createdAt: new Date().toISOString()
    });

    localStorage.setItem("lnex_regs", JSON.stringify(regs));
    localStorage.removeItem("lnex_draft");

    alert("✅ تم تسجيلك بنجاح! سيتم التواصل معك عبر واتساب.");
    form.reset();
    savedHint.textContent = "";
    document.getElementById("courseDetails").classList.remove("show");
    document.getElementById("courseDetails").innerHTML = "";
  });
}

// Reveal
let ro = null;
function observeReveals(){
  const els = document.querySelectorAll(".reveal");
  ro?.disconnect();
  ro = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        en.target.classList.add("show");
        ro.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(e=>ro.observe(e));
}

// Ripple
document.addEventListener("click", (e)=>{
  const btn = e.target.closest(".ripple");
  if (!btn) return;
  const r = btn.getBoundingClientRect();
  btn.style.setProperty("--rx", (e.clientX - r.left) + "px");
  btn.style.setProperty("--ry", (e.clientY - r.top) + "px");
});
