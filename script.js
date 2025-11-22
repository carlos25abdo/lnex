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
  
  // Courses
  const courses = [
    {
      id:"flutter1",
      title:"كورس Flutter المستوى الأول",
      desc:"من البداية إلى مشروعك الأول. أساسيات Flutter + Widgets + Layout + Navigation + State + APIs + Firebase مع مشروع نهائي.",
      level:"مبتدئ",
      duration:"10 أيام",
      days:"حسب الجدول",
      price:400,
      seats:"حسب العدد",
      note:"الموعد بعد اكتمال العدد"
    },
    {
      id:"tot",
      title:"برنامج إعداد المدرب الناجح وتدريب المدربين TOT",
      desc:"برنامج مكثف لتأهيل المدربين: مفاهيم التدريب، تصميم الحقائب، أنماط المتدربين، مهارات التواصل، أدوات وأساليب التدريب، وتسويق الذات كمدرب.",
      level:"عام",
      duration:"25 ساعة تدريبية",
      days:"5 أيام (5 ساعات يوميًا)",
      price:null,
      seats:"غير محدد",
      note:"مع المدربة: أ. اسعاد إبراهيم الفساطوي"
    },
    {
      id:"webdesign",
      title:"كورس تصميم صفحات الويب",
      desc:"HTML + CSS + JavaScript + Bootstrap مع مشروع عملي نهائي (موقع متكامل متعدد الصفحات ومتجاوب).",
      level:"مبتدئ",
      duration:"4 أسابيع",
      days:"حسب الجدول",
      price:480,
      seats:"حسب العدد",
      note:"الموعد بعد اكتمال العدد"
    },
    {
      id:"data_ai_beginner",
      title:"ورشة تحليل البيانات والذكاء الاصطناعي للمبتدئين",
      desc:"أساسيات تحليل البيانات + مقدمة تعلم الآلة Python + مشروع تطبيقي.",
      level:"مبتدئ",
      duration:"3 أيام (9 ساعات)",
      days:"3 ساعات يوميًا",
      price:190,
      seats:"غير محدد",
      note:""
    },
    {
      id:"ai_meetings",
      title:"ورشة إدارة محاضر الاجتماعات بالذكاء الاصطناعي",
      desc:"تحويل الصوت إلى نص، تلخيص النقاشات، استخراج القرارات والمهام، وتطبيق عملي.",
      level:"عام",
      duration:"يومان",
      days:"3 ساعات يوميًا",
      price:130,
      seats:"غير محدد",
      note:""
    },
    {
      id:"ai_teachers",
      title:"ورشة أدوات الذكاء الاصطناعي للمعلمين",
      desc:"استخدام AI في التحضير والتقييم وإنشاء الأنشطة والاختبارات.",
      level:"عام",
      duration:"يوم واحد",
      days:"4 ساعات",
      price:65,
      seats:"غير محدد",
      note:""
    },
    {
      id:"faceless_youtube",
      title:"ورشة ذكاء الفيديو الصامت – أنشئ قناتك بدون تصوير",
      desc:"Faceless YouTube Automation باستخدام أدوات AI + CapCut مع تطبيق كامل.",
      level:"مبتدئ إلى متوسط",
      duration:"5 أيام (15 ساعة)",
      days:"3 ساعات يوميًا",
      price:250,
      seats:"غير محدد",
      note:"يشمل ملفات وموارد جاهزة + دعم ما بعد الدورة"
    }
  ];
  
  // Init DOM
  window.addEventListener("DOMContentLoaded", () => {
    const courseSelect = document.getElementById("courseSelect");
    const courseDetails = document.getElementById("courseDetails");
    const ageSelect = document.getElementById("ageSelect");
  
    // Ages
    ageSelect.innerHTML = `<option value="" disabled selected>اختر العمر...</option>`;
    for(let i=10;i<=70;i++){
      ageSelect.innerHTML += `<option value="${i}">${i}</option>`;
    }
  
    // Courses list
    courseSelect.innerHTML =
      `<option value="" disabled selected>اختر الكورس...</option>` +
      courses.map(c=> `<option value="${c.id}">${c.title}</option>`).join("");
  
    // Show details
    courseSelect.addEventListener("change", () => {
      const c = courses.find(x=>x.id===courseSelect.value);
      if(!c){
        courseDetails.classList.remove("show");
        courseDetails.innerHTML="";
        return;
      }
      const priceTxt = c.price==null ? "تُحدَّد لاحقًا" : `${c.price} د.ل`;
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
    const draft = JSON.parse(localStorage.getItem("lnex_draft")||"{}");
    fullName.value = draft.fullName || "";
    ageSelect.value = draft.age || "";
    phone.value = draft.phone || "";
    address.value = draft.address || "";
    courseSelect.value = draft.courseId || "";
  
    // Auto-save
    [fullName, ageSelect, phone, address, courseSelect].forEach(inp=>{
      inp.addEventListener("input", ()=>{
        localStorage.setItem("lnex_draft", JSON.stringify({
          fullName: fullName.value,
          age: ageSelect.value,
          phone: phone.value,
          address: address.value,
          courseId: courseSelect.value
        }));
        savedHint.textContent = "💾 تم حفظ البيانات مؤقتًا";
      });
    });
  
    // Submit
    form.addEventListener("submit",(e)=>{
      e.preventDefault();
  
      const c = courses.find(x=>x.id===courseSelect.value);
      if(!c) return alert("رجاءً اختر كورس");
      if(fullName.value.trim().length < 3) return alert("رجاءً أدخل اسم صحيح");
      if(!ageSelect.value) return alert("رجاءً اختر العمر");
      if(!phone.value.match(/^09\d{8}$/)) return alert("رقم الهاتف لازم يكون 09xxxxxxxx");
      if(address.value.trim().length < 3) return alert("رجاءً أدخل مكان السكن");
  
      const regs = JSON.parse(localStorage.getItem("lnex_regs")||"[]");
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
  let ro=null;
  function observeReveals(){
    const els=document.querySelectorAll(".reveal");
    ro?.disconnect();
    ro=new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(en.isIntersecting){
          en.target.classList.add("show");
          ro.unobserve(en.target);
        }
      })
    },{threshold:.12});
    els.forEach(e=>ro.observe(e));
  }
  
  // Ripple
  document.addEventListener("click",(e)=>{
    const btn=e.target.closest(".ripple");
    if(!btn) return;
    const r=btn.getBoundingClientRect();
    btn.style.setProperty("--rx",(e.clientX-r.left)+"px");
    btn.style.setProperty("--ry",(e.clientY-r.top)+"px");
  });
  