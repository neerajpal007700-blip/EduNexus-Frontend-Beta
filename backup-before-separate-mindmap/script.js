
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



/* EDU NEXUS: SUBJECT → CLASS → CHAPTER → RESOURCES → QUIZ */

document.addEventListener("DOMContentLoaded", () => {

  const subjectGrid = document.getElementById("subjectGrid");
  const learningView = document.getElementById("learningView");

  if (!subjectGrid || !learningView) return;

  const classGrid = document.getElementById("classGrid");
  const boardGrid = document.getElementById("boardGrid");
  const chapterGrid = document.getElementById("chapterGrid");
  const resourceArea = document.getElementById("resourceArea");

  const learningTitle = document.getElementById("learningTitle");
  const learningDescription = document.getElementById("learningDescription");
  const resourceTitle = document.getElementById("resourceTitle");
  const resourceMessage = document.getElementById("resourceMessage");

  const backToSubjects = document.getElementById("backToSubjects");
  const backToClasses = document.getElementById("backToClasses");

  let selectedSubject = "";
  let selectedBoard = "";
  let selectedClass = "";
  let selectedChapter = "";

  // SHOW SUBJECTS
  function showSubjects() {
    learningView.hidden = true;
    subjectGrid.hidden = false;
    classGrid.hidden = true;
    if (boardGrid) boardGrid.hidden = true;
    chapterGrid.hidden = true;
    resourceArea.hidden = true;
  }

  // SHOW CLASSES
  function showClasses(subject) {
    selectedSubject = subject;
    selectedBoard = "";
    selectedClass = "";
    selectedChapter = "";

    subjectGrid.hidden = true;
    learningView.hidden = false;

    if (selectedSubject.trim().toLowerCase() === "science") {
      learningTitle.textContent = "Science - Select Your Board";
      learningDescription.textContent = "पहले अपना बोर्ड चुनें, फिर कक्षा और अध्याय चुनें.";
      if (boardGrid) boardGrid.hidden = false;
      classGrid.hidden = true;
    } else {
      learningTitle.textContent = subject + " - Select Your Class";
      learningDescription.textContent = "Choose Class 9th, 10th, 11th or 12th.";
      if (boardGrid) boardGrid.hidden = true;
      classGrid.hidden = false;
    }
    chapterGrid.hidden = true;
    resourceArea.hidden = true;
    backToClasses.hidden = true;
  }

  // SHOW CHAPTERS
  function showChapters(classNumber) {
    selectedClass = String(classNumber);
    selectedChapter = "";

    learningTitle.textContent =
      selectedSubject + (selectedBoard ? " • " + selectedBoard : "") + " - Class " + selectedClass;

    learningDescription.textContent =
      "Select a chapter to access its complete study material.";

    classGrid.hidden = true;
    if (boardGrid) boardGrid.hidden = true;
    chapterGrid.hidden = false;
    resourceArea.hidden = true;
    backToClasses.hidden = false;

    chapterGrid.innerHTML = "";

    // TEMPORARY CHAPTER LIST
    for (let i = 1; i <= 12; i++) {

      const button = document.createElement("button");

      button.className = "chapter-card";
      button.type = "button";

      button.innerHTML = `
        <strong>Chapter ${i}</strong>
        <small>Open study resources →</small>
      `;

      button.addEventListener("click", () => {
        showResources(i);
      });

      chapterGrid.appendChild(button);
    }
  }

  // SHOW RESOURCES
  function showResources(chapterNumber) {
    selectedChapter = "Chapter " + chapterNumber;

    chapterGrid.hidden = true;
    resourceArea.hidden = false;

    resourceTitle.textContent =
      selectedSubject + " • Class " +
      selectedClass + " • " + selectedChapter;

    resourceMessage.textContent =
      "Choose Notes, Videos, MCQ, PYQ, Mock Tests or Mind Maps.";
  }

  // SUBJECT CLICK
  subjectGrid.addEventListener("click", event => {

    const card = event.target.closest("[data-subject]");

    if (!card) return;

    showClasses(card.dataset.subject);
  });

  // BOARD CLICK — shown for Science
  if (boardGrid) {
    boardGrid.addEventListener("click", event => {
      const card = event.target.closest("[data-board]");
      if (!card) return;
      selectedBoard = card.dataset.board;
      boardGrid.hidden = true;
      classGrid.hidden = false;
      learningTitle.textContent = "Science • " + selectedBoard + " • Select Your Class";
      learningDescription.textContent = "अब अपनी कक्षा चुनें.";
    });
  }

  // CLASS CLICK
  classGrid.addEventListener("click", event => {

    const card = event.target.closest("[data-class]");

    if (!card) return;

    showChapters(card.dataset.class);
  });

  // BACK TO SUBJECTS
  backToSubjects.addEventListener("click", showSubjects);

  // BACK TO CLASSES
  backToClasses.addEventListener("click", () => {
    chapterGrid.hidden = true;
    resourceArea.hidden = true;
    if (selectedSubject.trim().toLowerCase() === "science" && boardGrid) {
      classGrid.hidden = true;
      boardGrid.hidden = false;
      learningTitle.textContent = "Science - Select Your Board";
      learningDescription.textContent = "अपना बोर्ड चुनें.";
    } else {
      classGrid.hidden = false;
    }
  });

  // RESOURCE BUTTONS + QUIZ REDIRECTION
  document.querySelectorAll("[data-resource]").forEach(button => {

    button.addEventListener("click", () => {

      const resource = button.dataset.resource;

      // CLASS 9 SCIENCE UP BOARD CHAPTER 1 ADVANCED MIND MAP
      if (
        resource.trim().toLowerCase() === "mind maps" &&
        selectedSubject.trim().toLowerCase() === "science" &&
        selectedBoard === "UP Board" &&
        selectedClass === "9" &&
        selectedChapter === "Chapter 1"
      ) {
        window.location.href = "class9-science-upboard-ch1-mindmap.html";
        return;
      }

      // CLASS 9 MATHEMATICS CHAPTER 1 QUIZ
        // CLASS 9 MATHEMATICS QUIZ REDIRECTION
if (
  resource.trim().toLowerCase() === "mcq quizzes" &&
  selectedSubject.trim().toLowerCase() === "mathematics" &&
  selectedClass === "9"
) {

  // CHAPTER 1
  if (selectedChapter === "Chapter 1") {
    window.location.href = "class9-maths-ch1-quiz.html";
    return;
  }

  // CHAPTER 2
  if (selectedChapter === "Chapter 2") {
    window.location.href = "class9-maths-ch2-polynomials-quiz.html";
    return;
  }

  if (selectedChapter === "Chapter 3") {
  window.location.href = "class9-maths-ch3-coordinate-geometry-quiz.html";
  return;
  }

  // CHAPTER 4
  if (selectedChapter === "Chapter 4") {
    window.location.href = "class9-maths-ch4-linear-equations-100-hots-quiz.html";
    return;
  }
}

      // OTHER RESOURCES
      resourceMessage.textContent =
        resource + " for " +
        selectedSubject + ", Class " +
        selectedClass + ", " +
        selectedChapter +
        " will appear here when content is uploaded.";

    });

  });

});


/* GLOBAL STUDY MATERIAL: BOARD -> CLASS */
document.addEventListener("DOMContentLoaded", () => {
  const selector = document.getElementById("studyMaterialSelector");
  if (!selector) return;
  const boardGrid = document.getElementById("studyBoardGrid");
  const classGrid = document.getElementById("studyClassGrid");
  const title = document.getElementById("studySelectorTitle");
  const text = document.getElementById("studySelectorText");
  const result = document.getElementById("studySelectionResult");
  let resourceName = "";
  let boardName = "";
  document.querySelectorAll(".resources-section .resource-grid a").forEach(card => {
    card.addEventListener("click", event => {
      event.preventDefault();
      resourceName = card.querySelector("h3")?.textContent.trim() || "Study Material";
      boardName = "";
      selector.hidden = false;
      boardGrid.hidden = false;
      classGrid.hidden = true;
      title.textContent = resourceName + " • Select Board";
      text.textContent = "पहले अपना बोर्ड चुनें, फिर कक्षा चुनें।";
      result.textContent = "";
      selector.scrollIntoView({behavior:"smooth",block:"center"});
    });
  });
  boardGrid.addEventListener("click", event => {
    const btn = event.target.closest("[data-study-board]");
    if (!btn) return;
    boardName = btn.dataset.studyBoard;
    boardGrid.hidden = true;
    classGrid.hidden = false;
    title.textContent = resourceName + " • " + boardName + " • Select Class";
    text.textContent = "अब अपनी कक्षा चुनें।";
  });
  classGrid.addEventListener("click", event => {
    const btn = event.target.closest("[data-study-class]");
    if (!btn) return;
    const cls = btn.dataset.studyClass;
    result.textContent = resourceName + " • " + boardName + " • Class " + cls + " — matching content यहाँ उपलब्ध होने पर दिखाई देगा।";
  });
});
