var checkbox = document.getElementById("toggleSkillsButton");
checkbox.addEventListener("change", function () {
    toggleSectionVisibility(this.checked ? true : false);
});
function toggleSectionVisibility(isVisible) {
    var section = document.getElementById("skillsSection");
    if (section) {
        if (isVisible == true) {
            section.style.display = "block";
        }
        else {
            section.style.display = "none";
        }
    }
}
function GenerateResume() {
    var _a;
    var nameInput = document.getElementById("txtName");
    var emailInput = document.getElementById("txtEmail");
    var phoneInput = document.getElementById("txtPhone");
    var About = document.getElementById("txtabout");
    var profilePictureInput = document.getElementById("txtProfile");
    var collegeNameInput = document.getElementById("txtclg");
    var eduStartDateInput = document.getElementById("txteduStartDate");
    var eduEndDateInput = document.getElementById("txteduEndDate");
    var educationDescriptionInput = document.getElementById("txtEducationDescription");
    var skillInput = document.getElementById("txtSkill");
    var companyNameInput = document.getElementById("txtCompanyName");
    var position = document.getElementById("txtPosition");
    var expStartDateInput = document.getElementById("txtexStartDate");
    var expEndDateInput = document.getElementById("txtexEndDate");
    var experienceDescriptionInput = document.getElementById("txtExperienceDescription");
    var name = nameInput.value.trim();
    var email = emailInput.value.trim();
    var phone = phoneInput.value.trim();
    var profilePicture = (_a = profilePictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
    var collegeName = collegeNameInput.value.trim();
    var eduStartDate = eduStartDateInput.value.trim();
    var eduEndDate = eduEndDateInput.value.trim();
    var educationDescription = educationDescriptionInput.value.trim();
    var skill = skillInput.value.trim();
    var companyName = companyNameInput === null || companyNameInput === void 0 ? void 0 : companyNameInput.value.trim();
    var positiontxt = position.value.trim();
    var expStartDate = expStartDateInput.value.trim();
    var expEndDate = expEndDateInput.value.trim();
    var experienceDescription = experienceDescriptionInput.value.trim();
    var aboutText = About.value.trim();
    var formatDateRange = function (startDate, endDate) {
        var startYear = new Date(startDate).getFullYear();
        var endYear = new Date(endDate).getFullYear();
        return "".concat(startYear, " - ").concat(endYear);
    };
    if (name !== "" &&
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
        aboutText !== "") {
        var formattedEduDates = formatDateRange(eduStartDate, eduEndDate);
        var formattedExpDates = formatDateRange(expStartDate, expEndDate);
        var resumeHTML = "\n    <main class=\"main-content\">\n        <section class=\"left-section\">\n            <div class=\"left-content\">\n                <div class=\"profile\">\n                    <div class=\"image\">\n                        <img src=\"".concat(profilePicture
            ? URL.createObjectURL(profilePicture)
            : "https://art-template.ru/vcard1/assets/img/avatar-1.jpg", "\" alt=\"\">\n                    </div>\n                    <h2 class=\"name\" contenteditable=\"true\">").concat(name, "</h2>\n                    <p class=\"career\">Web Developer</p>\n                </div>\n                <div class=\"contact-info\">\n                    <h3 class=\"main-title\">Contact Info</h3>\n                    <ul>\n                        <li><i class=\"fa fa-phone\"></i><span contenteditable=\"true\">").concat(phone, "</span></li>\n                        <li><i class=\"fa-solid fa-envelope\"></i><span contenteditable=\"true\">").concat(email, "</span></li>\n                    </ul>\n                </div>\n                <div class=\"skills-section\">\n                    <h3 class=\"main-title\">Skills</h3>\n                    <ul>\n                        <li>\n                            <p class=\"skill-title\" contenteditable=\"true\">").concat(skill, "</p>\n                            <div class=\"progress-bar\">\n                                <div class=\"progress\"></div>\n                            </div>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n        </section>\n        <section class=\"right-section\">\n            <div class=\"right-main-content\">\n                <section class=\"about sect\">\n                    <h2 class=\"right-title\">About Me</h2>\n                    <p class=\"para\" contenteditable=\"true\">").concat(aboutText, "</p>\n                </section>\n                <section class=\"experience sect\">\n                    <h2 class=\"right-title\">Experience</h2>\n                    <div class=\"timeline\">\n                        <div class=\"left-tl-content\">\n                            <h5 class=\"tl-title\" contenteditable=\"true\">").concat(companyName, "</h5>\n                            <p class=\"para\" contenteditable=\"true\">").concat(formattedExpDates, "</p>\n                        </div>\n                        <div class=\"right-tl-content\">\n                            <div class=\"tl-content\">\n                                <h5 class=\"tl-title-2\" contenteditable=\"true\">").concat(positiontxt, "</h5>\n                                <p class=\"para\" contenteditable=\"true\">").concat(experienceDescription, "</p>\n                            </div>\n                        </div>\n                    </div>\n                </section>\n                <section class=\"education sect\">\n                    <h2 class=\"right-title\">Education</h2>\n                    <div class=\"timeline\">\n                        <div class=\"left-tl-content\">\n                            <h5 class=\"tl-title\" contenteditable=\"true\">").concat(collegeName, "</h5>\n                            <p class=\"para\" contenteditable=\"true\">").concat(formattedEduDates, "</p>\n                        </div>\n                        <div class=\"right-tl-content\">\n                            <div class=\"tl-content\">\n                                <h5 class=\"tl-title-2\" contenteditable=\"true\">").concat(collegeName, "</h5>\n                                <p class=\"para\" contenteditable=\"true\">").concat(educationDescription, "</p>\n                            </div>\n                        </div>\n                    </div>\n                </section>\n            </div>\n        </section>\n    </main>\n    \n    ");
        var resumeOutput = document.getElementById("resume-output");
        if (resumeOutput) {
            resumeOutput.innerHTML = resumeHTML;
            handleEdits();
            generateShareableLink(name);
            setupPrintDownload();
        }
        else {
            showError("The resume output is missing");
        }
    }
    else {
        showError("The resume data is missing or incomplete");
    }
}
function handleEdits() {
    var editableElements = document.querySelectorAll('[contenteditable="true"]');
    editableElements.forEach(function (element) {
        element.addEventListener("input", function (event) {
            var target = event.target;
            localStorage.setItem(target.id, target.innerHTML);
        });
    });
}
function loadSavedContent() {
    var editableElements = document.querySelectorAll('[contenteditable="true"]');
    editableElements.forEach(function (element) {
        var savedContent = localStorage.getItem(element.id);
        if (savedContent) {
            element.innerHTML = savedContent;
        }
    });
}
function showError(message) {
    var errorMessage = document.createElement("h1");
    errorMessage.className = "error";
    errorMessage.textContent = message;
    errorMessage.style.color = "red";
    errorMessage.style.textAlign = "center";
    errorMessage.style.padding = "10px";
    document.body.appendChild(errorMessage);
    setTimeout(function () {
        if (document.body.contains(errorMessage)) {
            document.body.removeChild(errorMessage);
        }
    }, 5000);
}
function generateShareableLink(username) {
    debugger;
    var baseURL = "https://milestone5-ivory.vercel.app/resume"; // Replace with your deployment URL
    var shareableLink = "".concat(baseURL, "/").concat(username);
    var linkElement = document.createElement("p");
    linkElement.textContent = "Share your resume using this link: ".concat(shareableLink);
    document.body.appendChild(linkElement);
    // Optionally, add a copy-to-clipboard button
    var copyButton = document.createElement("button");
    copyButton.className = "btn btn-primary new-button";
    copyButton.textContent = "Copy Link";
    copyButton.addEventListener("click", function () {
        navigator.clipboard.writeText(shareableLink).then(function () {
            alert("Link copied to clipboard!");
        });
    });
    document.body.appendChild(copyButton);
}
function setupPrintDownload() {
    var printButton = document.createElement("button");
    printButton.className = "btn btn-primary new-button";
    printButton.textContent = "Download Resume as PDF";
    printButton.addEventListener("click", function () {
        var resumeOutput = document.getElementById("resume-output");
        if (resumeOutput) {
            var printWindow = window.open("", "", "width=800,height=600");
            if (printWindow) {
                printWindow.document.open();
                printWindow.document.write("\n          <html>\n            <head>\n              <title>Print Resume</title>\n            \n\n              <style>\n              .main-content {\n  min-height: 100vh;\n  width: 80%;\n  margin: 2rem auto;\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;\n}\n\n.left-section {\n  grid-column: span 2;\n  height: 100%;\n  background-color: #397be6;\n}\n.right-section {\n  grid-column: span 5;\n  background-color: white;\n  height: 100%;\n}\n\n.left-content {\n  padding: 2rem 3rem;\n}\n.profile {\n  width: 100%;\n  border-bottom: 1px solid #002333;\n}\n\n.image {\n  width: 100%;\n  text-align: center;\n}\n.profile img {\n  width: 100%;\n  border-radius: 50%;\n  border: 8px solid #002333;\n  height: 150px;\n}\n\n.name {\n  font-size: 2rem;\n  color: white;\n  text-align: center;\n  text-transform: uppercase;\n  margin-bottom: 0px !important;\n}\n\n.career {\n  font-size: 1.2rem;\n  color: #94d9ea;\n  text-align: center;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  padding-bottom: 1rem;\n}\n\n.main-title {\n  font-size: 1.8rem;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  color: #f7f7f7ec;\n  padding-top: 3rem;\n}\n\n.contact-info ul {\n  padding-top: 2rem;\n}\n\n.contact-info ul li {\n  padding: 0.4rem 0;\n  display: flex;\n  align-items: center;\n  color: #fff;\n}\n.contact-info ul li i {\n  padding-right: 1rem;\n  font-size: 1.2rem;\n  color: white;\n}\n\n.skills-section ul {\n  padding-top: 2rem;\n}\n.skills-section ul li {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  padding: 0.4rem 0;\n}\n\n.progress-bar {\n  width: 100%;\n  height: 0.4rem;\n  background-color: #2f81ed5b;\n  position: relative;\n  border-radius: 12px;\n}\n.progress {\n  height: 100%;\n  position: absolute;\n  left: 0;\n  background-color: #2d9cdb;\n  border-radius: 12px;\n}\n.js-progress {\n  width: 70%;\n}\n.ps-progress {\n  width: 90%;\n}\n.j-progress {\n  width: 85%;\n}\n.c-progress {\n  width: 40%;\n}\n.n-progress {\n  width: 63%;\n}\n.w-progress {\n  width: 78%;\n}\n\n.skill-title {\n  text-transform: uppercase;\n  color: #f7f7f7;\n  font-size: 1rem;\n}\n\n.sub-title {\n  padding-top: 2rem;\n  font-size: 1.2rem;\n  text-transform: uppercase;\n  color: #f7f7f7;\n}\n\n.sub-para {\n  color: #ccc;\n  padding: 0.4rem 0;\n}\n\n.references-section li {\n  color: #ccc;\n  padding: 0.2rem 0;\n}\n.references-section li i {\n  padding-right: 0.5rem;\n  font-size: 1.2rem;\n  color: #2d9cdb;\n}\n\n.right-main-content {\n  padding: 2rem 3rem;\n}\n\n.right-title {\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: #2f80ed;\n  margin-bottom: 1.2rem;\n  position: relative;\n  text-align: left;\n}\n\n.right-title::after {\n  content: \"\";\n  position: absolute;\n  width: 60%;\n  height: 0.2rem;\n  background-color: #ccc;\n  border-radius: 12px;\n  right: 0;\n  top: 50%;\n  transform: translateY(-50%);\n}\n\n.para {\n  line-height: 1.6rem;\n  color: #718096;\n  font-size: 1.1rem;\n}\n\n.sect {\n  padding-bottom: 2rem;\n}\n\n.timeline {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n}\n\n.tl-title {\n  letter-spacing: 1px;\n  font-size: 1.3rem;\n  color: #002333;\n  text-transform: uppercase;\n}\n.tl-title-2 {\n  letter-spacing: 1px;\n  font-size: 1.3rem;\n  color: #2d9cdb;\n  text-transform: uppercase;\n}\n\n.tl-content {\n  border-left: 1px solid #ccc;\n  padding-left: 2rem;\n  position: relative;\n  padding-bottom: 2rem;\n}\n\n.tl-title-2::before {\n  content: \"\";\n  position: absolute;\n  width: 0.7rem;\n  height: 0.7rem;\n  background-color: #2d9cdb;\n  border-radius: 50%;\n  transform: translateX(-50%);\n  left: 0;\n}\n\n/*Media Querries*/\n@media screen and (max-width: 823px) {\n  .right-title::after {\n    width: 40%;\n  }\n}\n@media screen and (max-width: 681px) {\n  .right-title::after {\n    width: 30%;\n  }\n}\n@media screen and (max-width: 780px) {\n  .timeline {\n    grid-template-columns: repeat(1, 1fr);\n  }\n}\n@media screen and (max-width: 780px) {\n  .left-section {\n    grid-column: span 3;\n  }\n  .right-section {\n    grid-column: span 4;\n  }\n}\n@media screen and (max-width: 1200px) {\n  .main-content {\n    grid-template-columns: repeat(1, 1fr);\n  }\n  .profile img {\n    width: 40%;\n  }\n}\n@media screen and (max-width: 700px) {\n  .profile img {\n    width: 60%;\n  }\n}\n@media screen and (max-width: 390px) {\n  .name {\n    font-size: 1.5rem;\n  }\n}\n              </style>\n            </head>\n            <body onload=\"window.print(); window.close();\">\n              ".concat(resumeOutput.innerHTML, "\n            </body>\n          </html>\n        "));
                printWindow.document.close();
            }
        }
        else {
            alert("The resume output is missing.");
        }
    });
    document.body.appendChild(printButton);
}
document.addEventListener("DOMContentLoaded", loadSavedContent);
