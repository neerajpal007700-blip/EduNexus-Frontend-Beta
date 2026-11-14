
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

  const studyMaterialSelector = document.getElementById("studyMaterialSelector");
  const studyMaterialTitle = document.getElementById("studyMaterialTitle");
  const studyMaterialDescription = document.getElementById("studyMaterialDescription");
  const studyBoardStep = document.getElementById("studyBoardStep");
  const studyClassStep = document.getElementById("studyClassStep");
  const studyMaterialResult = document.getElementById("studyMaterialResult");
  const studyChangeBoard = document.getElementById("studyChangeBoard");

  let selectedStudyResource = "";
  let selectedStudyBoard = "";

  const studyResourceNames = {
    "#notes": "Study Notes",
    "#videos": "Video Lectures",
    "#pyq": "Previous Year Questions",
    "#mindmaps": "Mind Maps",
    "#live": "Live Classes",
    "#quizzes": "Online Quizzes"
  };

  document.querySelectorAll("a").forEach(link => {
    const href = link.getAttribute("href");
    if (resourceLinks.includes(href)) {
      link.addEventListener("click", event => {
        event.preventDefault();
        selectedStudyResource = studyResourceNames[href] || "Study Material";

        if (studyMaterialSelector) {
          studyMaterialSelector.hidden = false;
          studyBoardStep.hidden = false;
          studyClassStep.hidden = true;
          studyMaterialTitle.textContent = "Select Your Board";
          studyMaterialDescription.textContent =
            "Choose a board to find " + selectedStudyResource + ".";
          studyMaterialResult.textContent = "";
          studyMaterialSelector.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          showToast("Study material selector is not available on this page.");
        }
      });
    }
  });

  if (studyMaterialSelector) {
    studyMaterialSelector.addEventListener("click", event => {
      const boardButton = event.target.closest("[data-study-board]");
      const classButton = event.target.closest("[data-study-class]");

      if (boardButton) {
        selectedStudyBoard = boardButton.dataset.studyBoard;
        studyBoardStep.hidden = true;
        studyClassStep.hidden = false;
        studyMaterialTitle.textContent = "Select Your Class";
        studyMaterialDescription.textContent =
          "Selected Board: " + selectedStudyBoard +
          " • Choose your class for " + selectedStudyResource + ".";
        studyMaterialResult.textContent = "";
      }

      if (classButton) {
        const selectedClass = classButton.dataset.studyClass;
        studyMaterialResult.textContent =
          selectedStudyResource + " • " + selectedStudyBoard +
          " • Class " + selectedClass +
          " selected. Matching content will appear here when it is uploaded.";
        studyMaterialTitle.textContent = "Your Study Material";
        studyMaterialDescription.textContent =
          selectedStudyResource + " for " + selectedStudyBoard + ", Class " + selectedClass;
      }
    });

    if (studyChangeBoard) {
      studyChangeBoard.addEventListener("click", () => {
        studyClassStep.hidden = true;
        studyBoardStep.hidden = false;
        studyMaterialTitle.textContent = "Select Your Board";
        studyMaterialDescription.textContent =
          "Choose a board to find " + selectedStudyResource + ".";
        studyMaterialResult.textContent = "";
      });
    }
  }

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
  const chapterGrid = document.getElementById("chapterGrid");
  const resourceArea = document.getElementById("resourceArea");

  const learningTitle = document.getElementById("learningTitle");
  const learningDescription = document.getElementById("learningDescription");
  const resourceTitle = document.getElementById("resourceTitle");
  const resourceMessage = document.getElementById("resourceMessage");

  const backToSubjects = document.getElementById("backToSubjects");
  const backToClasses = document.getElementById("backToClasses");

  let selectedSubject = "";
  let selectedClass = "";
  let selectedChapter = "";

  // SHOW SUBJECTS
  function showSubjects() {
    learningView.hidden = true;
    subjectGrid.hidden = false;
    classGrid.hidden = true;
    chapterGrid.hidden = true;
    resourceArea.hidden = true;
  }

  // SHOW CLASSES
  function showClasses(subject) {
    selectedSubject = subject;
    selectedClass = "";
    selectedChapter = "";

    subjectGrid.hidden = true;
    learningView.hidden = false;

    learningTitle.textContent = subject + " - Select Your Class";

    learningDescription.textContent =
      "Choose Class 9th, 10th, 11th or 12th.";

    classGrid.hidden = false;
    chapterGrid.hidden = true;
    resourceArea.hidden = true;
    backToClasses.hidden = true;
  }

  // SHOW CHAPTERS
  function showChapters(classNumber) {
    selectedClass = String(classNumber);
    selectedChapter = "";

    learningTitle.textContent =
      selectedSubject + " - Class " + selectedClass;

    learningDescription.textContent =
      "Select a chapter to access its complete study material.";

    classGrid.hidden = true;
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

    classGrid.hidden = false;
    chapterGrid.hidden = true;
    resourceArea.hidden = true;

  });

  // RESOURCE BUTTONS + QUIZ REDIRECTION
  document.querySelectorAll("[data-resource]").forEach(button => {

    button.addEventListener("click", () => {

      const resource = button.dataset.resource;

      const mindMapSelector = document.getElementById("mindMapSelector");
      const mindMapBoardStep = document.getElementById("mindMapBoardStep");
      const mindMapClassStep = document.getElementById("mindMapClassStep");
      const mindMapBoardSelected = document.getElementById("mindMapBoardSelected");
      const mindMapSelectionMessage = document.getElementById("mindMapSelectionMessage");

      if (mindMapSelector) {
        mindMapSelector.hidden = resource.trim().toLowerCase() !== "mind maps";
        if (resource.trim().toLowerCase() === "mind maps") {
          mindMapBoardStep.hidden = false;
          mindMapClassStep.hidden = true;
          mindMapSelectionMessage.textContent = "";
          resourceMessage.textContent = "First select your board, then choose your class.";
        }
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



  // MIND MAPS: BOARD → CLASS selection
  const mindMapSelector = document.getElementById("mindMapSelector");
  const mindMapBoardStep = document.getElementById("mindMapBoardStep");
  const mindMapClassStep = document.getElementById("mindMapClassStep");
  const mindMapBoardSelected = document.getElementById("mindMapBoardSelected");
  const mindMapSelectionMessage = document.getElementById("mindMapSelectionMessage");
  const mindMapChangeBoard = document.getElementById("mindMapChangeBoard");
  let selectedMindMapBoard = "";

  if (mindMapSelector) {
    mindMapSelector.addEventListener("click", event => {
      const boardButton = event.target.closest("[data-board]");
      const classButton = event.target.closest("[data-mindmap-class]");

      if (boardButton) {
        selectedMindMapBoard = boardButton.dataset.board;
        mindMapBoardSelected.textContent = "Selected Board: " + selectedMindMapBoard;
        mindMapBoardStep.hidden = true;
        mindMapClassStep.hidden = false;
        mindMapSelectionMessage.textContent = "";
      }

      if (classButton) {
        const selectedMindMapClass = classButton.dataset.mindmapClass;
        mindMapSelectionMessage.textContent =
          selectedMindMapBoard + " • Class " + selectedMindMapClass +
          " selected. Mind Maps for this selection will appear here when uploaded.";
      }
    });

    if (mindMapChangeBoard) {
      mindMapChangeBoard.addEventListener("click", () => {
        mindMapClassStep.hidden = true;
        mindMapBoardStep.hidden = false;
        mindMapSelectionMessage.textContent = "";
      });
    }
  }

  });

});
