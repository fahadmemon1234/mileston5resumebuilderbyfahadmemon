const checkbox = document.getElementById(
  "toggleSkillsButton"
) as HTMLInputElement;

checkbox.addEventListener("change", function () {
  toggleSectionVisibility(this.checked ? true : false);
});

function toggleSectionVisibility(isVisible: boolean): void {
  const section = document.getElementById("skillsSection");

  if (section) {
    if (isVisible == true) {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  }
}

function GenerateResume(): void {
  const nameInput = document.getElementById("txtName") as HTMLInputElement;
  const emailInput = document.getElementById("txtEmail") as HTMLInputElement;
  const phoneInput = document.getElementById("txtPhone") as HTMLInputElement;
  const About = document.getElementById("txtabout") as HTMLInputElement;
  const profilePictureInput = document.getElementById(
    "txtProfile"
  ) as HTMLInputElement;
  const collegeNameInput = document.getElementById(
    "txtclg"
  ) as HTMLInputElement;
  const eduStartDateInput = document.getElementById(
    "txteduStartDate"
  ) as HTMLInputElement;
  const eduEndDateInput = document.getElementById(
    "txteduEndDate"
  ) as HTMLInputElement;
  const educationDescriptionInput = document.getElementById(
    "txtEducationDescription"
  ) as HTMLTextAreaElement;
  const skillInput = document.getElementById("txtSkill") as HTMLInputElement;
  const companyNameInput = document.getElementById(
    "txtCompanyName"
  ) as HTMLInputElement;
  const position = document.getElementById("txtPosition") as HTMLInputElement;
  const expStartDateInput = document.getElementById(
    "txtexStartDate"
  ) as HTMLInputElement;
  const expEndDateInput = document.getElementById(
    "txtexEndDate"
  ) as HTMLInputElement;
  const experienceDescriptionInput = document.getElementById(
    "txtExperienceDescription"
  ) as HTMLTextAreaElement;

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const profilePicture = profilePictureInput.files?.[0];
  const collegeName = collegeNameInput.value.trim();
  const eduStartDate = eduStartDateInput.value.trim();
  const eduEndDate = eduEndDateInput.value.trim();
  const educationDescription = educationDescriptionInput.value.trim();
  const skill = skillInput.value.trim();
  const companyName = companyNameInput?.value.trim();
  const positiontxt = position.value.trim();
  const expStartDate = expStartDateInput.value.trim();
  const expEndDate = expEndDateInput.value.trim();
  const experienceDescription = experienceDescriptionInput.value.trim();
  const aboutText = About.value.trim();

  const formatDateRange = (startDate: string, endDate: string): string => {
    const startYear = new Date(startDate).getFullYear();
    const endYear = new Date(endDate).getFullYear();
    return `${startYear} - ${endYear}`;
  };

  if (
    name !== "" &&
    email !== "" &&
    phone !== "" &&
    collegeName !== "" &&
    eduStartDate !== "" &&
    eduEndDate !== "" &&
    educationDescription !== "" &&
    skill !== "" &&
    companyName !== "" &&
    positiontxt !== "" &&
    expStartDate !== "" &&
    expEndDate !== "" &&
    experienceDescription !== "" &&
    aboutText !== ""
  ) {
    const formattedEduDates = formatDateRange(eduStartDate, eduEndDate);
    const formattedExpDates = formatDateRange(expStartDate, expEndDate);

    const resumeHTML = `
    <main class="main-content">
        <section class="left-section">
            <div class="left-content">
                <div class="profile">
                    <div class="image">
                        <img src="${
                          profilePicture
                            ? URL.createObjectURL(profilePicture)
                            : "https://art-template.ru/vcard1/assets/img/avatar-1.jpg"
                        }" alt="">
                    </div>
                    <h2 class="name" contenteditable="true">${name}</h2>
                    <p class="career">Web Developer</p>
                </div>
                <div class="contact-info">
                    <h3 class="main-title">Contact Info</h3>
                    <ul>
                        <li><i class="fa fa-phone"></i><span contenteditable="true">${phone}</span></li>
                        <li><i class="fa-solid fa-envelope"></i><span contenteditable="true">${email}</span></li>
                    </ul>
                </div>
                <div class="skills-section">
                    <h3 class="main-title">Skills</h3>
                    <ul>
                        <li>
                            <p class="skill-title" contenteditable="true">${skill}</p>
                            <div class="progress-bar">
                                <div class="progress"></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <section class="right-section">
            <div class="right-main-content">
                <section class="about sect">
                    <h2 class="right-title">About Me</h2>
                    <p class="para" contenteditable="true">${aboutText}</p>
                </section>
                <section class="experience sect">
                    <h2 class="right-title">Experience</h2>
                    <div class="timeline">
                        <div class="left-tl-content">
                            <h5 class="tl-title" contenteditable="true">${companyName}</h5>
                            <p class="para" contenteditable="true">${formattedExpDates}</p>
                        </div>
                        <div class="right-tl-content">
                            <div class="tl-content">
                                <h5 class="tl-title-2" contenteditable="true">${positiontxt}</h5>
                                <p class="para" contenteditable="true">${experienceDescription}</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="education sect">
                    <h2 class="right-title">Education</h2>
                    <div class="timeline">
                        <div class="left-tl-content">
                            <h5 class="tl-title" contenteditable="true">${collegeName}</h5>
                            <p class="para" contenteditable="true">${formattedEduDates}</p>
                        </div>
                        <div class="right-tl-content">
                            <div class="tl-content">
                                <h5 class="tl-title-2" contenteditable="true">${collegeName}</h5>
                                <p class="para" contenteditable="true">${educationDescription}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    </main>
    
    `;

    const resumeOutput = document.getElementById("resume-output");

    if (resumeOutput) {
      resumeOutput.innerHTML = resumeHTML;
      handleEdits();
      generateShareableLink(name);
      setupPrintDownload();
    } else {
      showError("The resume output is missing");
    }
  } else {
    showError("The resume data is missing or incomplete");
  }
}

function handleEdits() {
  const editableElements = document.querySelectorAll(
    '[contenteditable="true"]'
  );

  editableElements.forEach((element) => {
    element.addEventListener("input", (event) => {
      const target = event.target as HTMLElement;

      localStorage.setItem(target.id, target.innerHTML);
    });
  });
}

function loadSavedContent() {
  const editableElements = document.querySelectorAll(
    '[contenteditable="true"]'
  );
  editableElements.forEach((element) => {
    const savedContent = localStorage.getItem(element.id);
    if (savedContent) {
      (element as HTMLElement).innerHTML = savedContent;
    }
  });
}

function showError(message: string) {
  const errorMessage = document.createElement("h1");
  errorMessage.className = "error";
  errorMessage.textContent = message;
  errorMessage.style.color = "red";
  errorMessage.style.textAlign = "center";
  errorMessage.style.padding = "10px";

  document.body.appendChild(errorMessage);

  setTimeout(() => {
    if (document.body.contains(errorMessage)) {
      document.body.removeChild(errorMessage);
    }
  }, 5000);
}

function generateShareableLink(username: string) {
  debugger;
  const baseURL =
    "https://milestone5-ivory.vercel.app/resume"; // Replace with your deployment URL
  const shareableLink = `${baseURL}/${username}`;

  const linkElement = document.createElement("p");
  linkElement.textContent = `Share your resume using this link: ${shareableLink}`;
  document.body.appendChild(linkElement);

  // Optionally, add a copy-to-clipboard button
  const copyButton = document.createElement("button");
  copyButton.className = "btn btn-primary new-button";
  copyButton.textContent = "Copy Link";
  copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(shareableLink).then(() => {
      alert("Link copied to clipboard!");
    });
  });
  document.body.appendChild(copyButton);
}

function setupPrintDownload() {
  const printButton = document.createElement("button");
  printButton.className = "btn btn-primary new-button";
  printButton.textContent = "Download Resume as PDF";
  printButton.addEventListener("click", () => {
    const resumeOutput = document.getElementById("resume-output");

    if (resumeOutput) {
      const printWindow = window.open("", "", "width=800,height=600");
      if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(`
          <html>
            <head>
              <title>Print Resume</title>
            

              <style>
              .main-content {
  min-height: 100vh;
  width: 80%;
  margin: 2rem auto;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.left-section {
  grid-column: span 2;
  height: 100%;
  background-color: #397be6;
}
.right-section {
  grid-column: span 5;
  background-color: white;
  height: 100%;
}

.left-content {
  padding: 2rem 3rem;
}
.profile {
  width: 100%;
  border-bottom: 1px solid #002333;
}

.image {
  width: 100%;
  text-align: center;
}
.profile img {
  width: 100%;
  border-radius: 50%;
  border: 8px solid #002333;
  height: 150px;
}

.name {
  font-size: 2rem;
  color: white;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 0px !important;
}

.career {
  font-size: 1.2rem;
  color: #94d9ea;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding-bottom: 1rem;
}

.main-title {
  font-size: 1.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #f7f7f7ec;
  padding-top: 3rem;
}

.contact-info ul {
  padding-top: 2rem;
}

.contact-info ul li {
  padding: 0.4rem 0;
  display: flex;
  align-items: center;
  color: #fff;
}
.contact-info ul li i {
  padding-right: 1rem;
  font-size: 1.2rem;
  color: white;
}

.skills-section ul {
  padding-top: 2rem;
}
.skills-section ul li {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 0.4rem 0;
}

.progress-bar {
  width: 100%;
  height: 0.4rem;
  background-color: #2f81ed5b;
  position: relative;
  border-radius: 12px;
}
.progress {
  height: 100%;
  position: absolute;
  left: 0;
  background-color: #2d9cdb;
  border-radius: 12px;
}
.js-progress {
  width: 70%;
}
.ps-progress {
  width: 90%;
}
.j-progress {
  width: 85%;
}
.c-progress {
  width: 40%;
}
.n-progress {
  width: 63%;
}
.w-progress {
  width: 78%;
}

.skill-title {
  text-transform: uppercase;
  color: #f7f7f7;
  font-size: 1rem;
}

.sub-title {
  padding-top: 2rem;
  font-size: 1.2rem;
  text-transform: uppercase;
  color: #f7f7f7;
}

.sub-para {
  color: #ccc;
  padding: 0.4rem 0;
}

.references-section li {
  color: #ccc;
  padding: 0.2rem 0;
}
.references-section li i {
  padding-right: 0.5rem;
  font-size: 1.2rem;
  color: #2d9cdb;
}

.right-main-content {
  padding: 2rem 3rem;
}

.right-title {
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #2f80ed;
  margin-bottom: 1.2rem;
  position: relative;
  text-align: left;
}

.right-title::after {
  content: "";
  position: absolute;
  width: 60%;
  height: 0.2rem;
  background-color: #ccc;
  border-radius: 12px;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.para {
  line-height: 1.6rem;
  color: #718096;
  font-size: 1.1rem;
}

.sect {
  padding-bottom: 2rem;
}

.timeline {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.tl-title {
  letter-spacing: 1px;
  font-size: 1.3rem;
  color: #002333;
  text-transform: uppercase;
}
.tl-title-2 {
  letter-spacing: 1px;
  font-size: 1.3rem;
  color: #2d9cdb;
  text-transform: uppercase;
}

.tl-content {
  border-left: 1px solid #ccc;
  padding-left: 2rem;
  position: relative;
  padding-bottom: 2rem;
}

.tl-title-2::before {
  content: "";
  position: absolute;
  width: 0.7rem;
  height: 0.7rem;
  background-color: #2d9cdb;
  border-radius: 50%;
  transform: translateX(-50%);
  left: 0;
}

/*Media Querries*/
@media screen and (max-width: 823px) {
  .right-title::after {
    width: 40%;
  }
}
@media screen and (max-width: 681px) {
  .right-title::after {
    width: 30%;
  }
}
@media screen and (max-width: 780px) {
  .timeline {
    grid-template-columns: repeat(1, 1fr);
  }
}
@media screen and (max-width: 780px) {
  .left-section {
    grid-column: span 3;
  }
  .right-section {
    grid-column: span 4;
  }
}
@media screen and (max-width: 1200px) {
  .main-content {
    grid-template-columns: repeat(1, 1fr);
  }
  .profile img {
    width: 40%;
  }
}
@media screen and (max-width: 700px) {
  .profile img {
    width: 60%;
  }
}
@media screen and (max-width: 390px) {
  .name {
    font-size: 1.5rem;
  }
}
              </style>
            </head>
            <body onload="window.print(); window.close();">
              ${resumeOutput.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    } else {
      alert("The resume output is missing.");
    }
  });
  document.body.appendChild(printButton);
}

document.addEventListener("DOMContentLoaded", loadSavedContent);
