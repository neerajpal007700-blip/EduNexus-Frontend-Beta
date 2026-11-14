
/* =====================================
   EduNexus by Neeraj Pal
   Main JavaScript
===================================== */

document.addEventListener("DOMContentLoaded", () => {

  // 1. Mobile Navigation
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", isOpen);
      menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  // 2. Automatic Copyright Year
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // 3. Active Navigation Link
  const sections = document.querySelectorAll("main section[id]");
  const navItems = document.querySelectorAll(".nav-links > a");

  function updateActiveLink() {
    let current = "home";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 130;

      if (window.scrollY >= sectionTop) {
        current = section.id;
      }
    });

    navItems.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + current
      );
    });
  }

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink();

  // 4. Course Card Hover Animation
  const courseCards = document.querySelectorAll(".course-card");

  courseCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transition = "transform .3s ease";
    });
  });

  // 5. Toast Notification
  const toast = document.getElementById("toast");
  let toastTimer;

  function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2500);
  }

  // 6. Demo Login Notification
  document.querySelectorAll('[href="#login"]').forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();
      showToast("Student Login interface will be connected next.");
    });
  });

  // 7. Demo Signup Notification
  document.querySelectorAll('[href="#signup"]').forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();
      showToast("Student Registration interface will be connected next.");
    });
  });

  // 8. Resource Demo Notifications
  const resourceLinks = [
    "#notes",
    "#videos",
    "#pyq",
    "#mindmaps",
    "#live",
    "#quizzes"
  ];

  document.querySelectorAll("a").forEach(link => {
    if (resourceLinks.includes(link.getAttribute("href"))) {
      link.addEventListener("click", event => {
        event.preventDefault();
        showToast("This learning section will be activated soon.");
      });
    }
  });

  // 9. Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // 10. Welcome Message
  console.log(
    "%c EduNexus by Neeraj Pal ",
    "background:#667bff;color:white;font-size:18px;padding:10px;"
  );

  console.log("Website frontend loaded successfully!");

});



/* EDU NEXUS: SUBJECT → BOARD → CLASS → CHAPTER → RESOURCE */
document.addEventListener("DOMContentLoaded", () => {
  const subjectGrid = document.getElementById("subjectGrid");
  const learningView = document.getElementById("learningView");
  if (!subjectGrid || !learningView) return;

  const classGrid = document.getElementById("classGrid");
  const chapterGrid = document.getElementById("chapterGrid");
  const resourceArea = document.getElementById("resourceArea");
  const learningTitle = document.getElementById("learningTitle");
  const learningDescription = document.getElementById("learningDescription");
  const resourceTitle = document.getElementById("resourceTitle");
  const resourceMessage = document.getElementById("resourceMessage");
  const backToSubjects = document.getElementById("backToSubjects");
  const backToClasses = document.getElementById("backToClasses");

  let selectedSubject = "", selectedBoard = "", selectedClass = "", selectedChapter = "";

  // Insert a real board selector before the class selector.
  let boardGrid = document.getElementById("boardGrid");
  if (!boardGrid) {
    boardGrid = document.createElement("div");
    boardGrid.id = "boardGrid";
    boardGrid.className = "class-grid";
    boardGrid.hidden = true;
    classGrid.parentNode.insertBefore(boardGrid, classGrid);
  }
  boardGrid.innerHTML = ["UP Board","CBSE","ICSE","Other Board"].map(b =>
    `<button type="button" class="class-card" data-board="${b}">${b}<span>→</span></button>`
  ).join("");

  function hideSteps() {
    boardGrid.hidden = classGrid.hidden = chapterGrid.hidden = resourceArea.hidden = true;
  }
  function showSubjects() {
    hideSteps(); learningView.hidden = true; subjectGrid.hidden = false;
  }
  function showBoards(subject) {
    selectedSubject = subject; selectedBoard = selectedClass = selectedChapter = "";
    subjectGrid.hidden = false; learningView.hidden = false; subjectGrid.hidden = true;
    learningTitle.textContent = subject + " — Select Board";
    learningDescription.textContent = "पहले अपना Board चुनें, फिर Class और Chapter चुनें।";
    hideSteps(); boardGrid.hidden = false; backToClasses.hidden = true;
  }
  function showClasses(board) {
    selectedBoard = board; selectedClass = selectedChapter = "";
    learningTitle.textContent = selectedSubject + " • " + board + " — Select Class";
    learningDescription.textContent = "अब अपनी कक्षा चुनें।";
    hideSteps(); classGrid.hidden = false; backToClasses.hidden = true;
  }
  function showChapters(classNumber) {
    selectedClass = String(classNumber); selectedChapter = "";
    learningTitle.textContent = `${selectedSubject} • ${selectedBoard} • Class ${selectedClass}`;
    learningDescription.textContent = "अपना Chapter चुनें।";
    hideSteps(); chapterGrid.hidden = false; backToClasses.hidden = false;
    chapterGrid.innerHTML = "";
    for (let i=1;i<=14;i++) {
      const b=document.createElement("button");
      b.type="button"; b.className="chapter-card";
      b.innerHTML=`<strong>Chapter ${i}</strong><small>Open study resources →</small>`;
      b.addEventListener("click",()=>showResources(i));
      chapterGrid.appendChild(b);
    }
  }
  function showResources(n) {
    selectedChapter = "Chapter " + n;
    boardGrid.hidden = classGrid.hidden = chapterGrid.hidden = true;
    resourceArea.hidden = false;
    resourceTitle.textContent = `${selectedSubject} • ${selectedBoard} • Class ${selectedClass} • ${selectedChapter}`;
    resourceMessage.textContent = "अब Mind Maps सहित अपना resource चुनें।";
  }

  subjectGrid.addEventListener("click", e => {
    const card=e.target.closest("[data-subject]");
    if(card) showBoards(card.dataset.subject);
  });
  boardGrid.addEventListener("click", e => {
    const card=e.target.closest("[data-board]");
    if(card) showClasses(card.dataset.board);
  });
  classGrid.addEventListener("click", e => {
    const card=e.target.closest("[data-class]");
    if(card) showChapters(card.dataset.class);
  });
  backToSubjects?.addEventListener("click",showSubjects);
  backToClasses?.addEventListener("click",()=>{
    resourceArea.hidden=true; chapterGrid.hidden=true;
    classGrid.hidden=false; boardGrid.hidden=true;
  });

  document.querySelectorAll("[data-resource]").forEach(button => {
    button.addEventListener("click", () => {
      const resource=(button.dataset.resource||"").trim().toLowerCase();
      if(resource==="mind maps" || resource==="mind map") {
        const params=new URLSearchParams({
          subject:selectedSubject, board:selectedBoard,
          class:selectedClass, chapter:selectedChapter.replace("Chapter ","")
        });
        window.location.href="mind-maps.html?"+params.toString();
        return;
      }
      if(resource==="mcq quizzes" && selectedSubject.toLowerCase()==="mathematics" && selectedClass==="9") {
        const quizFiles={
          "Chapter 1":"class9-maths-ch1-quiz.html",
          "Chapter 2":"class9-maths-ch2-polynomials-quiz.html",
          "Chapter 3":"class9-maths-ch3-coordinate-geometry-quiz.html",
          "Chapter 4":"class9-maths-ch4-linear-equations-100-hots-quiz.html"
        };
        if(quizFiles[selectedChapter]) { window.location.href=quizFiles[selectedChapter]; return; }
      }
      resourceMessage.textContent=`${button.dataset.resource} for ${selectedSubject}, ${selectedBoard}, Class ${selectedClass}, ${selectedChapter} will appear here when content is uploaded.`;
    });
  });
});
