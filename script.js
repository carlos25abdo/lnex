// =========================
//  HELPERS
// =========================
function safeId() {
    // fallback لو randomUUID مش مدعوم
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return Date.now().toString() + Math.floor(Math.random() * 9999);
  }
  
  // =========================
  //  LOADING INTRO
  // =========================
  window.addEventListener("load", () => {
    const loadingScreen = document.getElementById("loading-screen");
    const letters = document.querySelectorAll(".loading-word span");
  
    if (!loadingScreen || !letters.length) return;
  
    letters.forEach(letter => {
      letter.style.setProperty("--x", Math.random());
      letter.style.setProperty("--y", Math.random());
    });
  
    setTimeout(() => {
      const word = document.querySelector(".loading-word");
      if (word) word.classList.add("unassemble");
    }, 1500);
  
    setTimeout(() => {
      loadingScreen.classList.add("fade-out");
    }, 2500);
  
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 3300);
  });
  
  
  // =========================
  //  COURSES DATA + RENDER
  // =========================
  const courses = [
    { id:"c1", title:"أساسيات البرمجة بلغة Python", desc:"ابدأ من الصفر حتى كتابة مشاريع عملية.", level:"beginner", duration:"6 أسابيع", days:"3 أيام بالأسبوع", price:450, seats:18 },
    { id:"c2", title:"تصميم جرافيك (Photoshop + Illustrator)", desc:"تعلم التصميم من خلال تطبيقات عملية.", level:"beginner", duration:"5 أسابيع", days:"يومان بالأسبوع", price:380, seats:15 },
    { id:"c3", title:"شبكات CCNA (مستوى 1)", desc:"أساسيات الشبكات مع لابات حقيقية.", level:"intermediate", duration:"8 أسابيع", days:"3 أيام بالأسبوع", price:900, seats:12 },
    { id:"c4", title:"أمن سيبراني (Fundamentals)", desc:"مقدمة قوية لأهم مفاهيم الأمن السيبراني.", level:"intermediate", duration:"6 أسابيع", days:"يومان بالأسبوع", price:650, seats:14 },
    { id:"c5", title:"تطوير مواقع Web Full-Stack", desc:"HTML/CSS/JS + Backend + مشاريع متكاملة.", level:"advanced", duration:"10 أسابيع", days:"3 أيام بالأسبوع", price:1200, seats:10 },
    { id:"c6", title:"ذكاء اصطناعي وتعلم آلة", desc:"مفاهيم AI/ML وتطبيقات عملية.", level:"advanced", duration:"9 أسابيع", days:"يومان بالأسبوع", price:1500, seats:8 }
  ];
  
  const grid = document.getElementById("coursesGrid");
  const searchInput = document.getElementById("searchInput");
  const levelFilter = document.getElementById("levelFilter");
  
  function levelLabel(level){
    if(level==="beginner") return "مبتدئ";
    if(level==="intermediate") return "متوسط";
    return "متقدم";
  }
  
  function renderCourses(list){
    if (!grid) return;
  
    grid.innerHTML = "";
    if(!list.length){
      grid.innerHTML = `<div class="course-card"><h3>لا يوجد نتائج</h3><p>جرّب بحث آخر.</p></div>`;
      return;
    }
  
    list.forEach(c=>{
      const card = document.createElement("div");
      card.className = "course-card reveal";
      card.innerHTML = `
        <div class="course-meta">
          <span class="tag">${levelLabel(c.level)}</span>
          <span class="tag">${c.duration}</span>
          <span class="tag">${c.days}</span>
          <span class="tag">المقاعد: ${c.seats}</span>
        </div>
        <h3>${c.title}</h3>
        <p>${c.desc}</p>
        <div class="course-foot">
          <div class="price">${c.price} د.ل</div>
          <button class="btn primary ripple" data-id="${c.id}">تسجيل</button>
        </div>
      `;
      grid.appendChild(card);
    });
  
    document.querySelectorAll(".course-card .btn.primary").forEach(btn=>{
      btn.addEventListener("click", ()=> openModal(btn.dataset.id));
    });
  
    observeReveals(); // reattach for new cards
  }
  
  function applyFilters(){
    if (!searchInput || !levelFilter) return;
  
    const q = searchInput.value.trim().toLowerCase();
    const level = levelFilter.value;
  
    const filtered = courses.filter(c=>{
      const matchesQ = c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q);
      const matchesLevel = level==="all" ? true : c.level===level;
      return matchesQ && matchesLevel;
    });
  
    renderCourses(filtered);
  }
  
  // اربط الفلاتر لو موجودة
  if (searchInput) searchInput.addEventListener("input", applyFilters);
  if (levelFilter) levelFilter.addEventListener("change", applyFilters);
  
  // نرندر البداية بعد ما DOM يجهز
  window.addEventListener("DOMContentLoaded", () => {
    renderCourses(courses);
  });
  
  
  // =========================
  //  MODAL REGISTRATION
  // =========================
  const modal = document.getElementById("regModal");
  const modalClose = document.getElementById("modalClose");
  const modalTitle = document.getElementById("modalCourseTitle");
  const selectedCourseId = document.getElementById("selectedCourseId");
  
  const regForm = document.getElementById("regForm");
  const fullName = document.getElementById("fullName");
  const phone = document.getElementById("phone");
  const email = document.getElementById("email");
  const city = document.getElementById("city");
  const notes = document.getElementById("notes");
  const savedHint = document.getElementById("savedHint");
  
  function openModal(courseId){
    if (!modal || !modalTitle || !selectedCourseId) return;
  
    const course = courses.find(x=>x.id===courseId);
    if (!course) return;
  
    modalTitle.textContent = `التسجيل في: ${course.title}`;
    selectedCourseId.value = course.id;
  
    const draftKey = `lnex_draft_${course.id}`;
    const draft = JSON.parse(localStorage.getItem(draftKey) || "{}");
  
    if (fullName) fullName.value = draft.fullName || "";
    if (phone) phone.value = draft.phone || "";
    if (email) email.value = draft.email || "";
    if (city) city.value = draft.city || "";
    if (notes) notes.value = draft.notes || "";
  
    if (savedHint) {
      savedHint.textContent = draft.fullName ? "✅ تم استرجاع بياناتك السابقة لهذا الكورس" : "";
    }
  
    modal.classList.add("show");
  }
  
  // إغلاق المودال
  if (modalClose) modalClose.addEventListener("click", ()=> modal.classList.remove("show"));
  if (modal) {
    modal.addEventListener("click", (e)=>{
      if(e.target === modal) modal.classList.remove("show");
    });
  }
  
  // حفظ مؤقت
  [fullName, phone, email, city, notes].forEach(inp=>{
    if(!inp) return;
    inp.addEventListener("input", ()=>{
      const id = selectedCourseId?.value;
      if(!id) return;
  
      const draftKey = `lnex_draft_${id}`;
      localStorage.setItem(draftKey, JSON.stringify({
        fullName: fullName?.value || "",
        phone: phone?.value || "",
        email: email?.value || "",
        city: city?.value || "",
        notes: notes?.value || ""
      }));
  
      if (savedHint) savedHint.textContent = "💾 تم حفظ البيانات مؤقتًا";
    });
  });
  
  // Submit
  if (regForm) {
    regForm.addEventListener("submit",(e)=>{
      e.preventDefault();
  
      const id = selectedCourseId?.value;
      const course = courses.find(x=>x.id===id);
      if(!course) return;
  
      if(fullName && fullName.value.trim().length < 3) return alert("رجاءً أدخل اسم صحيح");
      if(phone && !phone.value.match(/^09\d{8}$/)) return alert("رقم الهاتف لازم يكون بصيغة 09xxxxxxxx");
  
      const regs = JSON.parse(localStorage.getItem("lnex_regs")||"[]");
      regs.push({
        id: safeId(),
        courseId: id,
        courseTitle: course.title,
        fullName: fullName?.value.trim() || "",
        phone: phone?.value.trim() || "",
        email: email?.value.trim() || "",
        city: city?.value.trim() || "",
        notes: notes?.value.trim() || "",
        createdAt: new Date().toISOString()
      });
  
      localStorage.setItem("lnex_regs", JSON.stringify(regs));
      localStorage.removeItem(`lnex_draft_${id}`);
  
      alert("✅ تم تسجيلك بنجاح! سيتم التواصل معك قريبًا.");
      regForm.reset();
      modal.classList.remove("show");
    });
  }
  
  
  // =========================
  //  THEME TOGGLE
  // =========================
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("lnex_theme");
  if(savedTheme==="light") document.body.classList.add("light");
  
  function updateThemeIcon(){
    if(!themeToggle) return;
    themeToggle.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
  }
  updateThemeIcon();
  
  if (themeToggle){
    themeToggle.addEventListener("click", ()=>{
      document.body.classList.toggle("light");
      localStorage.setItem("lnex_theme", document.body.classList.contains("light") ? "light" : "dark");
      updateThemeIcon();
    });
  }
  
  
  // =========================
  //  MOBILE MENU
  // =========================
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  
  if (hamburger && navLinks){
    hamburger.addEventListener("click", ()=> navLinks.classList.toggle("show"));
    navLinks.querySelectorAll("a").forEach(a=> 
      a.addEventListener("click", ()=> navLinks.classList.remove("show"))
    );
    window.addEventListener("scroll", ()=> navLinks.classList.remove("show"));
  }
  
  
  // =========================
  //  SMOOTH SCROLL
  // =========================
  function scrollToSection(id){
    const el = document.getElementById(id);
    if(!el) return;
    el.scrollIntoView({behavior:"smooth"});
    navLinks?.classList.remove("show");
  }
  window.scrollToSection = scrollToSection;
  
  
  // =========================
  //  SCROLL REVEAL (FIXED ✅)
  // =========================
  let revealObserver = null;
  
  function observeReveals(){
    const reveals = document.querySelectorAll(".reveal");
    if(!reveals.length) return;
  
    if(revealObserver !== null){
      revealObserver.disconnect();
    }
  
    revealObserver = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add("show");
          revealObserver.unobserve(entry.target);
        }
      });
    },{threshold:0.12});
  
    reveals.forEach(r=>revealObserver.observe(r));
  }
  
  // تشغيلها بعد جاهزية DOM
  window.addEventListener("DOMContentLoaded", observeReveals);
  
  
  // =========================
  //  RIPPLE POSITION
  // =========================
  document.addEventListener("click",(e)=>{
    const btn = e.target.closest(".ripple");
    if(!btn) return;
    const rect = btn.getBoundingClientRect();
    btn.style.setProperty("--rx", (e.clientX - rect.left) + "px");
    btn.style.setProperty("--ry", (e.clientY - rect.top)  + "px");
  });
  