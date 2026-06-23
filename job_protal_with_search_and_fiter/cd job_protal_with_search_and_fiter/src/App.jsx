import React, { useMemo, useState } from "react";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova",
    role: "Developer",
    location: "Chennai",
    salary: "Rs. 6 LPA",
    jobType: "Full-Time",
    lastDate: "2026-07-20",
    requiredSkills: ["React", "JavaScript", "CSS"],
    companyDescription:
      "TechNova builds modern web platforms for retail and education clients.",
    desc: "Build responsive React applications and reusable UI components.",
  },
  {
    id: 2,
    title: "Java Developer",
    company: "CodeWorld",
    role: "Developer",
    location: "Bangalore",
    salary: "Rs. 8 LPA",
    jobType: "Full-Time",
    lastDate: "2026-07-25",
    requiredSkills: ["Java", "Spring Boot", "MySQL"],
    companyDescription:
      "CodeWorld delivers backend systems, APIs, and enterprise software.",
    desc: "Develop backend applications using Java and Spring Boot.",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Creative Labs",
    role: "Designer",
    location: "Mumbai",
    salary: "Rs. 5 LPA",
    jobType: "Internship",
    lastDate: "2026-07-12",
    requiredSkills: ["Figma", "Wireframes", "User Research"],
    companyDescription:
      "Creative Labs designs product experiences for startups and SaaS teams.",
    desc: "Design clean user journeys, screens, prototypes, and design systems.",
  },
  {
    id: 4,
    title: "Data Analyst",
    company: "DataPro",
    role: "Analyst",
    location: "Delhi",
    salary: "Rs. 7 LPA",
    jobType: "Full-Time",
    lastDate: "2026-08-01",
    requiredSkills: ["Excel", "SQL", "Power BI"],
    companyDescription:
      "DataPro helps companies turn operational data into useful reports.",
    desc: "Analyze datasets, create dashboards, and prepare business reports.",
  },
  {
    id: 5,
    title: "Backend Engineer Intern",
    company: "CloudNest",
    role: "Developer",
    location: "Hyderabad",
    salary: "Rs. 25K/month",
    jobType: "Internship",
    lastDate: "2026-07-18",
    requiredSkills: ["Node.js", "REST API", "MongoDB"],
    companyDescription:
      "CloudNest builds cloud-ready services for fast-growing digital products.",
    desc: "Build API endpoints and support cloud service integrations.",
  },
];

const initialApplications = [
  {
    id: 101,
    jobId: 1,
    jobTitle: "Frontend Developer",
    company: "TechNova",
    status: "Pending",
    name: "RUBIN",
    email: "rubin@example.com",
  },
  {
    id: 102,
    jobId: 3,
    jobTitle: "UI/UX Designer",
    company: "Creative Labs",
    status: "Selected",
    name: "RUBIN",
    email: "rubin@example.com",
  },
  {
    id: 103,
    jobId: 4,
    jobTitle: "Data Analyst",
    company: "DataPro",
    status: "Rejected",
    name: "RUBIN",
    email: "rubin@example.com",
  },
];

const initialProfileData = {
  name: "RUBIN",
  email: "rubin@example.com",
  phone: "+91 98765 43210",
  role: "Frontend Developer",
  location: "Chennai",
  photoName: "",
  resumeName: "",
  skills: "React, JavaScript, HTML, CSS",
  education: "B.Tech Computer Science, Anna University",
  bio: "React developer focused on clean UI and responsive web apps.",
};

export default function App() {
  const [authMode, setAuthMode] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authNotice, setAuthNotice] = useState("");
  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");
  const [location, setLocation] = useState("All");
  const [activeSection, setActiveSection] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("Light");
  const [profileSlideView, setProfileSlideView] = useState("form");
  const [selectedJob, setSelectedJob] = useState(null);
  const [saved, setSaved] = useState([2, 5]);
  const [applications, setApplications] = useState(initialApplications);
  const [applicationFilter, setApplicationFilter] = useState("Applied");
  const [applicationNotice, setApplicationNotice] = useState("");
  const [applyForm, setApplyForm] = useState({
    name: "RUBIN",
    email: "rubin@example.com",
    coverLetter: "",
  });
  const [profileData, setProfileData] = useState(initialProfileData);
  const [confirmedProfileData, setConfirmedProfileData] = useState(initialProfileData);
  const [profileNotice, setProfileNotice] = useState("");

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesSearch = [
        job.title,
        job.company,
        job.role,
        job.location,
        job.desc,
        job.jobType,
        job.requiredSkills.join(" "),
      ].some((field) => field.toLowerCase().includes(query));

      return (
        matchesSearch &&
        (role === "All" || job.role === role) &&
        (location === "All" || job.location === location)
      );
    });
  }, [search, role, location]);

  const savedJobs = jobs.filter((job) => saved.includes(job.id));
  const isDarkTheme = theme === "Dark";
  const applicationOptions = [
    ["Applied", "Applied Jobs", applications.length],
    [
      "Pending",
      "Pending Jobs",
      applications.filter((application) => application.status === "Pending").length,
    ],
    [
      "Selected",
      "Selected Jobs",
      applications.filter((application) => application.status === "Selected").length,
    ],
    [
      "Rejected",
      "Rejected Jobs",
      applications.filter((application) => application.status === "Rejected").length,
    ],
  ];
  const filteredApplications =
    applicationFilter === "Applied"
      ? applications
      : applications.filter((application) => application.status === applicationFilter);
  const navItems = [
    ["dashboard", "Dashboard"],
    ["apply", "Apply Dashboard"],
    ["saved", "Saved Jobs"],
    ["profile", "Profile"],
  ];

  const updateAuthForm = (field, value) => {
    setAuthForm((current) => ({ ...current, [field]: value }));
  };

  const handleAuthSubmit = (event) => {
    event.preventDefault();

    if (authMode === "forgot") {
      setAuthNotice("Password reset link sent to your email.");
      return;
    }

    if (authMode === "signup" && authForm.password !== authForm.confirmPassword) {
      setAuthNotice("Password and confirm password must match.");
      return;
    }

    setIsLoggedIn(true);
    setAuthNotice("");
    const nextProfile = {
      ...profileData,
      name: authForm.name || profileData.name,
      email: authForm.email || profileData.email,
    };

    setProfileData(nextProfile);
    setConfirmedProfileData(nextProfile);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAuthMode("login");
    setAuthNotice("Logged out successfully.");
  };

  const selectSection = (section) => {
    setActiveSection(section);
    setMenuOpen(false);
  };

  const bookmark = (id) => {
    setSaved((current) =>
      current.includes(id) ? current.filter((jobId) => jobId !== id) : [...current, id]
    );
  };

  const openApplyForm = (job) => {
    setSelectedJob(job);
    setActiveSection("apply");
    setApplicationNotice("");
  };

  const submitApplication = (event) => {
    event.preventDefault();

    if (!selectedJob) {
      return;
    }

    setApplications((currentApplications) => [
      {
        id: Date.now(),
        jobId: selectedJob.id,
        jobTitle: selectedJob.title,
        company: selectedJob.company,
        status: "Pending",
        name: applyForm.name,
        email: applyForm.email,
      },
      ...currentApplications,
    ]);

    setApplicationNotice(
      `Application submitted for ${selectedJob.title} at ${selectedJob.company}.`
    );
    setApplyForm((current) => ({ ...current, coverLetter: "" }));
  };

  const cancelApplication = () => {
    if (!selectedJob) {
      return;
    }

    setSelectedJob(null);
    setApplicationNotice("Application cancelled.");
    setApplyForm((current) => ({ ...current, coverLetter: "" }));
  };

  const updateProfile = (field, value) => {
    setProfileData((currentProfile) => ({
      ...currentProfile,
      [field]: value,
    }));
    setProfileNotice("");
  };

  const confirmProfile = () => {
    setConfirmedProfileData(profileData);
    setProfileNotice("Profile confirmed successfully.");
    setProfileSlideView("data");
  };

  const cancelProfileChanges = () => {
    setProfileData(confirmedProfileData);
    setProfileNotice("Profile changes cancelled.");
  };

  const handleProfileFile = (field, event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    updateProfile(field, file.name);
  };

  const renderJobCard = (job) => (
    <article key={job.id} style={{ ...styles.card, ...(isDarkTheme ? styles.cardDark : {}) }}>
      <div style={styles.cardTopline}>
        <span style={styles.badge}>{job.jobType}</span>
        <span style={styles.deadline}>Apply by {job.lastDate}</span>
      </div>
      <h2 style={{ ...styles.cardTitle, ...(isDarkTheme ? styles.textLight : {}) }}>{job.title}</h2>
      <h4 style={styles.cardCompany}>{job.company}</h4>
      <p style={{ ...styles.cardText, ...(isDarkTheme ? styles.textMutedDark : {}) }}>Location: {job.location}</p>
      <p style={{ ...styles.cardText, ...(isDarkTheme ? styles.textMutedDark : {}) }}>Role: {job.role}</p>
      <p style={{ ...styles.cardText, ...(isDarkTheme ? styles.textMutedDark : {}) }}>Salary: {job.salary}</p>
      <p style={{ ...styles.cardText, ...(isDarkTheme ? styles.textMutedDark : {}) }}>Skills: {job.requiredSkills.join(", ")}</p>

      <div style={styles.cardActions}>
        <button type="button" style={styles.button} onClick={() => setSelectedJob(job)}>
          View Details
        </button>
        <button type="button" style={styles.applyButton} onClick={() => openApplyForm(job)}>
          Apply
        </button>
        <button type="button" style={styles.saveButton} onClick={() => bookmark(job.id)}>
          {saved.includes(job.id) ? "Saved" : "Save"}
        </button>
      </div>
    </article>
  );

  if (!isLoggedIn) {
    return (
      <main style={styles.authPage}>
        <section style={styles.authCard}>
          <div>
            <p style={styles.kicker}>Student Job Portal</p>
            <h1 style={styles.authTitle}>
              {authMode === "login" && "Login to continue"}
              {authMode === "signup" && "Create student account"}
              {authMode === "forgot" && "Reset your password"}
            </h1>
            <p style={styles.authSub}>
              Access jobs, saved openings, application status, and your student profile.
            </p>
          </div>

          {authNotice && <div style={styles.notice}>{authNotice}</div>}

          <form style={styles.authForm} onSubmit={handleAuthSubmit}>
            {authMode === "signup" && (
              <label style={styles.formGroup}>
                <span style={styles.label}>Student Name</span>
                <input
                  style={styles.formInput}
                  value={authForm.name}
                  onChange={(event) => updateAuthForm("name", event.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </label>
            )}

            <label style={styles.formGroup}>
              <span style={styles.label}>Email</span>
              <input
                type="email"
                style={styles.formInput}
                value={authForm.email}
                onChange={(event) => updateAuthForm("email", event.target.value)}
                placeholder="student@example.com"
                required
              />
            </label>

            {authMode !== "forgot" && (
              <label style={styles.formGroup}>
                <span style={styles.label}>Password</span>
                <input
                  type="password"
                  style={styles.formInput}
                  value={authForm.password}
                  onChange={(event) => updateAuthForm("password", event.target.value)}
                  placeholder="Enter password"
                  required
                />
              </label>
            )}

            {authMode === "signup" && (
              <label style={styles.formGroup}>
                <span style={styles.label}>Confirm Password</span>
                <input
                  type="password"
                  style={styles.formInput}
                  value={authForm.confirmPassword}
                  onChange={(event) => updateAuthForm("confirmPassword", event.target.value)}
                  placeholder="Confirm password"
                  required
                />
              </label>
            )}

            <button type="submit" style={styles.primaryFullButton}>
              {authMode === "login" && "Login"}
              {authMode === "signup" && "Sign Up"}
              {authMode === "forgot" && "Send Reset Link"}
            </button>
          </form>

          <div style={styles.authSwitches}>
            <button type="button" style={styles.textButton} onClick={() => setAuthMode("login")}>
              Login
            </button>
            <button type="button" style={styles.textButton} onClick={() => setAuthMode("signup")}>
              Student Registration
            </button>
            <button type="button" style={styles.textButton} onClick={() => setAuthMode("forgot")}>
              Forgot Password
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <div style={{ ...styles.page, ...(isDarkTheme ? styles.pageDark : {}) }}>
      <div style={styles.menuWrapper}>
        <button
          type="button"
          style={styles.menuButton}
          onClick={() => setMenuOpen((current) => !current)}
        >
          Menu
        </button>

        {menuOpen && (
          <div style={styles.menuPanel}>
            {navItems.map(([section, label]) => (
              <button
                key={section}
                type="button"
                style={activeSection === section ? styles.menuItemActive : styles.menuItem}
                onClick={() => selectSection(section)}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      <nav style={styles.navbar}>
        <div>
          <div style={styles.brand}>Job Portal</div>
          <p style={styles.navUser}>{profileData.name}</p>
        </div>

        <div style={styles.topActions}>
          <label style={styles.themeControl}>
            <span style={styles.themeLabel}>Theme</span>
            <select
              value={theme}
              onChange={(event) => setTheme(event.target.value)}
              style={styles.themeSelect}
            >
              <option>Light</option>
              <option>Dark</option>
            </select>
          </label>

          <button type="button" style={styles.logoutButton} onClick={logout}>
            Logout
          </button>
        </div>
      </nav>

      <main style={styles.content}>
        {activeSection === "dashboard" && (
          <>
            <section style={{ ...styles.hero, ...(isDarkTheme ? styles.surfaceDark : {}) }}>
              <h1 style={{ ...styles.heading, ...(isDarkTheme ? styles.textLight : {}) }}>Student Job Portal</h1>
              <p style={{ ...styles.sub, ...(isDarkTheme ? styles.textMutedDark : {}) }}>Search, save, apply, and track your opportunities.</p>
            </section>

            <section style={{ ...styles.searchBox, ...(isDarkTheme ? styles.surfaceDark : {}) }}>
              <input
                placeholder="Search jobs, company, or skills"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                style={styles.input}
              />

              <select value={role} onChange={(event) => setRole(event.target.value)} style={styles.input}>
                <option>All</option>
                <option>Developer</option>
                <option>Designer</option>
                <option>Analyst</option>
              </select>

              <select
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                style={styles.input}
              >
                <option>All</option>
                <option>Chennai</option>
                <option>Bangalore</option>
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Hyderabad</option>
              </select>
            </section>

            <section style={styles.container}>{filteredJobs.map(renderJobCard)}</section>
          </>
        )}

        {activeSection === "apply" && (
          <section style={{ ...styles.sectionCard, ...(isDarkTheme ? styles.surfaceDark : {}) }}>
            <h2 style={{ ...styles.sectionTitle, ...(isDarkTheme ? styles.textLight : {}) }}>
              Apply Dashboard
            </h2>

            <div style={styles.applicationFilterBar}>
              {applicationOptions.map(([filter, label, count]) => (
                <button
                  key={filter}
                  type="button"
                  style={
                    applicationFilter === filter
                      ? styles.applicationFilterActive
                      : styles.applicationFilter
                  }
                  onClick={() => setApplicationFilter(filter)}
                >
                  {label}: {count}
                </button>
              ))}
            </div>

            {applicationNotice && <div style={styles.notice}>{applicationNotice}</div>}

            {selectedJob ? (
              <div style={styles.applyGrid}>
                <div style={styles.applySummary}>
                  <h3 style={styles.previewTitle}>{selectedJob.title}</h3>
                  <p style={styles.previewText}>Company: {selectedJob.company}</p>
                  <p style={styles.previewText}>Job Type: {selectedJob.jobType}</p>
                  <p style={styles.previewText}>Last Date: {selectedJob.lastDate}</p>
                  <p style={styles.previewText}>Skills: {selectedJob.requiredSkills.join(", ")}</p>
                  <p style={styles.previewText}>{selectedJob.desc}</p>
                </div>

                <form style={styles.applyForm} onSubmit={submitApplication}>
                  <label style={styles.formGroup}>
                    <span style={styles.label}>Full Name</span>
                    <input
                      style={styles.formInput}
                      value={applyForm.name}
                      onChange={(event) =>
                        setApplyForm((current) => ({ ...current, name: event.target.value }))
                      }
                      required
                    />
                  </label>

                  <label style={styles.formGroup}>
                    <span style={styles.label}>Email</span>
                    <input
                      type="email"
                      style={styles.formInput}
                      value={applyForm.email}
                      onChange={(event) =>
                        setApplyForm((current) => ({ ...current, email: event.target.value }))
                      }
                      required
                    />
                  </label>

                  <label style={styles.formGroup}>
                    <span style={styles.label}>Cover Letter</span>
                    <textarea
                      style={styles.formTextarea}
                      rows="5"
                      value={applyForm.coverLetter}
                      onChange={(event) =>
                        setApplyForm((current) => ({
                          ...current,
                          coverLetter: event.target.value,
                        }))
                      }
                      placeholder="Write a short cover letter"
                    />
                  </label>

                  <button type="submit" style={styles.applyButton}>
                    Submit Application
                  </button>

                  <button type="button" style={styles.cancelButton} onClick={cancelApplication}>
                    Cancel Application
                  </button>
                </form>
              </div>
            ) : (
              <p style={styles.sectionText}>Select a job from the dashboard to apply.</p>
            )}

            <div style={styles.applicationList}>
              <h3 style={{ ...styles.previewTitle, ...(isDarkTheme ? styles.textLight : {}) }}>
                {applicationOptions.find(([filter]) => filter === applicationFilter)?.[1]}
              </h3>
              {filteredApplications.length === 0 ? (
                <div style={styles.emptyState}>No applications found.</div>
              ) : filteredApplications.map((application) => (
                <div key={application.id} style={styles.applicationItem}>
                  <div>
                    <strong>{application.jobTitle}</strong>
                    <p style={styles.previewText}>{application.company}</p>
                  </div>
                  <span style={styles.statusBadge(application.status)}>{application.status}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === "saved" && (
          <section style={{ ...styles.sectionCard, ...(isDarkTheme ? styles.surfaceDark : {}) }}>
            <h2 style={styles.sectionTitle}>Saved Jobs</h2>
            <p style={styles.sectionText}>Only bookmarked jobs are shown here.</p>
            {savedJobs.length === 0 ? (
              <div style={styles.emptyState}>No saved jobs yet.</div>
            ) : (
              <div style={styles.container}>{savedJobs.map(renderJobCard)}</div>
            )}
          </section>
        )}

        {activeSection === "profile" && (
          <div style={styles.profileSlideOverlay}>
            <button
              type="button"
              aria-label="Close profile slide"
              style={styles.profileSlideBackdrop}
              onClick={() => setActiveSection("dashboard")}
            />

            <section style={{ ...styles.profileSlide, ...(isDarkTheme ? styles.surfaceDark : {}) }}>
              <div style={styles.profileSlideHeader}>
                <div>
                  <p style={styles.kicker}>Profile Slide</p>
                  <h2 style={{ ...styles.sectionTitle, ...(isDarkTheme ? styles.textLight : {}) }}>
                    Profile Management
                  </h2>
                </div>
                <button
                  type="button"
                  style={styles.closeSlideButton}
                  onClick={() => setActiveSection("dashboard")}
                >
                  Close
                </button>
              </div>

              <div style={styles.slideTabs}>
                <button
                  type="button"
                  style={
                    profileSlideView === "form" ? styles.slideTabActive : styles.slideTab
                  }
                  onClick={() => setProfileSlideView("form")}
                >
                  Profile Slide
                </button>
                <button
                  type="button"
                  style={
                    profileSlideView === "data" ? styles.slideTabActive : styles.slideTab
                  }
                  onClick={() => setProfileSlideView("data")}
                >
                  Data Slide
                </button>
              </div>

              {profileNotice && <div style={styles.notice}>{profileNotice}</div>}

              {profileSlideView === "form" && (
                <form style={styles.profileForm} onSubmit={(event) => event.preventDefault()}>
                  <label style={{ ...styles.formGroup, ...styles.wideField }}>
                    <span style={styles.label}>Profile Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      style={styles.formInput}
                      onChange={(event) => handleProfileFile("photoName", event)}
                    />
                  </label>

                  <label style={{ ...styles.formGroup, ...styles.wideField }}>
                    <span style={styles.label}>Resume Upload (PDF)</span>
                    <input
                      type="file"
                      accept="application/pdf"
                      style={styles.formInput}
                      onChange={(event) => handleProfileFile("resumeName", event)}
                    />
                  </label>
                  
                  {[
                    ["name", "Full Name"],
                    ["email", "Email"],
                    ["phone", "Phone"],
                    ["role", "Current Role"],
                    ["location", "Location"],
                    ["skills", "Skills Section"],
                    ["education", "Education Details"],
                  ].map(([field, label]) => (
                    <label key={field} style={styles.formGroup}>
                      <span style={styles.label}>{label}</span>
                      <input
                        style={styles.formInput}
                        value={profileData[field]}
                        onChange={(event) => updateProfile(field, event.target.value)}
                      />
                    </label>
                  ))}

                  <label style={{ ...styles.formGroup, ...styles.wideField }}>
                    <span style={styles.label}>Bio</span>
                    <textarea
                      style={styles.formTextarea}
                      rows="4"
                      value={profileData.bio}
                      onChange={(event) => updateProfile("bio", event.target.value)}
                    />
                  </label>

                  <div style={styles.profileActionBar}>
                    <button type="button" style={styles.applyButton} onClick={confirmProfile}>
                      Confirm
                    </button>
                    <button
                      type="button"
                      style={styles.cancelButton}
                      onClick={cancelProfileChanges}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {profileSlideView === "data" && (
                <aside style={styles.profilePreview}>
                  <div style={styles.avatar}>
                    {confirmedProfileData.photoName ? "Photo" : confirmedProfileData.name.charAt(0)}
                  </div>
                  <h3 style={styles.previewTitle}>{confirmedProfileData.name}</h3>
                  <p style={styles.previewText}>Email: {confirmedProfileData.email}</p>
                  <p style={styles.previewText}>Phone: {confirmedProfileData.phone}</p>
                  <p style={styles.previewText}>Role: {confirmedProfileData.role}</p>
                  <p style={styles.previewText}>Skills: {confirmedProfileData.skills}</p>
                  <p style={styles.previewText}>Education: {confirmedProfileData.education}</p>
                  <p style={styles.previewText}>
                    Resume: {confirmedProfileData.resumeName || "No PDF uploaded"}
                  </p>
                  <p style={styles.previewText}>
                    Photo: {confirmedProfileData.photoName || "No photo uploaded"}
                  </p>
                </aside>
              )}
            </section>
          </div>
        )}

        {selectedJob && (
          <div style={styles.modal}>
            <section style={styles.popup}>
              <div style={styles.cardTopline}>
                <span style={styles.badge}>{selectedJob.jobType}</span>
                <span style={styles.deadline}>Apply by {selectedJob.lastDate}</span>
              </div>
              <h2 style={styles.sectionTitle}>{selectedJob.title}</h2>
              <h3 style={styles.cardCompany}>{selectedJob.company}</h3>
              <p style={styles.previewText}>{selectedJob.companyDescription}</p>
              <p style={styles.previewText}>Required Skills: {selectedJob.requiredSkills.join(", ")}</p>
              <p style={styles.previewText}>Job Type: {selectedJob.jobType}</p>
              <p style={styles.previewText}>Last Date to Apply: {selectedJob.lastDate}</p>
              <p style={styles.previewText}>{selectedJob.desc}</p>
              <div style={styles.cardActions}>
                <button type="button" style={styles.button} onClick={() => setSelectedJob(null)}>
                  Close
                </button>
                <button type="button" style={styles.applyButton} onClick={() => openApplyForm(selectedJob)}>
                  Apply Now
                </button>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "light blue",
    color: "#172033",
    gap: "22px",
    padding: "22px 22px 40px",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  pageDark: {
    background: "#0f172a",
    color: "#e2e8f0",
  },
  menuWrapper: {
    position: "fixed",
    top: "16px",
    left: "16px",
    zIndex: 20,
  },
  menuButton: {
    padding: "11px 15px",
    border: "1px solid #14b8a6",
    borderRadius: "8px",
    background: "#0f766e",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "700",
    boxShadow: "0 10px 24px #0b182633",
  },
  menuPanel: {
    marginTop: "8px",
    width: "210px",
    display: "grid",
    gap: "8px",
    padding: "10px",
    background: "#ffffff",
    border: "1px solid #dce6ee",
    borderRadius: "8px",
    boxShadow: "0 16px 36px #0b182633",
  },
  menuItem: {
    padding: "11px 12px",
    border: "1px solid #dce6ee",
    borderRadius: "8px",
    background: "#f8fafc",
    color: "#172033",
    cursor: "pointer",
    fontWeight: "700",
    textAlign: "left",
  },
  menuItemActive: {
    padding: "11px 12px",
    border: "1px solid #14b8a6",
    borderRadius: "8px",
    background: "#ccfbf1",
    color: "#0f766e",
    cursor: "pointer",
    fontWeight: "700",
    textAlign: "left",
  },
  authPage: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: "24px",
    background: "#e9f2f6",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  authCard: {
    width: "min(460px, 100%)",
    background: "#ffffff",
    border: "1px solid #dce6ee",
    borderRadius: "8px",
    padding: "28px",
    boxShadow: "0 16px 36px #0b18261f",
    display: "grid",
    gap: "18px",
  },
  kicker: {
    margin: "0 0 8px",
    color: "#0f766e",
    fontWeight: "700",
    textTransform: "uppercase",
    fontSize: "12px",
  },
  authTitle: {
    margin: 0,
    color: "#172033",
    fontSize: "30px",
  },
  authSub: {
    margin: "10px 0 0",
    color: "#526172",
    lineHeight: "1.55",
  },
  authForm: {
    display: "grid",
    gap: "14px",
  },
  authSwitches: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  textButton: {
    border: "1px solid #cdd9e4",
    background: "#f8fafc",
    color: "#334155",
    borderRadius: "8px",
    padding: "9px 12px",
    cursor: "pointer",
    fontWeight: "700",
  },
  navbar: {
    width: "min(1180px, 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "18px",
    padding: "16px 18px 16px 92px",
    background: "#122033",
    borderRadius: "8px",
    boxShadow: "0 12px 30px #0b182633",
  },
  topActions: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  themeControl: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#e2e8f0",
    fontWeight: "700",
  },
  themeLabel: {
    fontSize: "14px",
  },
  themeSelect: {
    padding: "10px 12px",
    border: "1px solid #14b8a6",
    borderRadius: "8px",
    background: "#ffffff",
    color: "#172033",
    cursor: "pointer",
    fontWeight: "700",
  },
  brand: {
    color: "#ffffff",
    fontSize: "22px",
    fontWeight: "700",
  },
  navUser: {
    color: "#b9c7d6",
    margin: "8px 0 0",
  },
  navLinks: {
    display: "grid",
    gap: "10px",
  },
  navLink: {
    padding: "12px 14px",
    border: "1px solid #263a55",
    borderRadius: "8px",
    background: "#1a2b44",
    color: "#e2e8f0",
    cursor: "pointer",
    fontWeight: "700",
    textAlign: "left",
  },
  navLinkActive: {
    padding: "12px 14px",
    border: "1px solid #14b8a6",
    borderRadius: "8px",
    background: "#14b8a6",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "700",
    textAlign: "left",
  },
  logoutButton: {
    padding: "12px 14px",
    border: "1px solid #ef4444",
    borderRadius: "8px",
    background: "transparent",
    color: "#fecaca",
    cursor: "pointer",
    fontWeight: "700",
  },
  content: {
    width: "min(1180px, 100%)",
    minWidth: 0,
    display: "grid",
    gap: "20px",
  },
  hero: {
    background: "#ffffff",
    border: "1px solid #dce6ee",
    borderRadius: "8px",
    padding: "26px",
  },
  surfaceDark: {
    background: "#1e293b",
    borderColor: "#334155",
    color: "#e2e8f0",
  },
  heading: {
    margin: 0,
    color: "#172033",
    fontSize: "36px",
  },
  sub: {
    margin: "10px 0 0",
    color: "#526172",
    fontSize: "17px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "14px",
  },
  statsGridCompact: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
    gap: "10px",
    marginBottom: "18px",
  },
  statCard: {
    background: "#ffffff",
    border: "1px solid #dce6ee",
    borderRadius: "8px",
    padding: "18px",
  },
  statLabel: {
    display: "block",
    color: "#526172",
    fontSize: "14px",
  },
  statValue: {
    display: "block",
    marginTop: "8px",
    color: "#0f766e",
    fontSize: "32px",
  },
  miniStat: {
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    borderRadius: "8px",
    padding: "10px 12px",
    color: "#1e3a8a",
    fontWeight: "700",
  },
  searchBox: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    background: "#ffffff",
    border: "1px solid #dce6ee",
    borderRadius: "8px",
    padding: "16px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #cdd9e4",
    minWidth: "220px",
    flex: "1 1 220px",
    fontSize: "15px",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
    gap: "18px",
  },
  card: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #dce6ee",
    boxShadow: "0 10px 24px #0b18260f",
  },
  cardDark: {
    background: "#1e293b",
    borderColor: "#334155",
    boxShadow: "0 10px 24px #00000040",
  },
  cardTopline: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    marginBottom: "14px",
  },
  badge: {
    background: "#ccfbf1",
    color: "#0f766e",
    borderRadius: "999px",
    padding: "5px 10px",
    fontSize: "12px",
    fontWeight: "700",
  },
  deadline: {
    color: "#64748b",
    fontSize: "12px",
    fontWeight: "700",
  },
  cardTitle: {
    margin: 0,
    color: "#172033",
    fontSize: "22px",
  },
  cardCompany: {
    margin: "8px 0 12px",
    color: "#0f766e",
  },
  cardText: {
    margin: "8px 0",
    color: "#526172",
    lineHeight: "1.45",
  },
  cardActions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "16px",
  },
  button: {
    padding: "10px 14px",
    background: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
  },
  applyButton: {
    padding: "10px 14px",
    background: "#16a34a",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
  },
  cancelButton: {
    padding: "10px 14px",
    background: "#dc2626",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
  },
  saveButton: {
    padding: "10px 14px",
    background: "#f59e0b",
    color: "#172033",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
  },
  primaryFullButton: {
    width: "100%",
    padding: "12px 14px",
    background: "#0f766e",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "16px",
  },
  modal: {
    position: "fixed",
    inset: 0,
    background: "#0f172acc",
    display: "grid",
    placeItems: "center",
    padding: "20px",
    zIndex: 10,
  },
  popup: {
    background: "#ffffff",
    padding: "28px",
    borderRadius: "8px",
    width: "min(560px, 100%)",
    border: "1px solid #dce6ee",
    boxShadow: "0 18px 40px #00000040",
  },
  sectionCard: {
    background: "#ffffff",
    borderRadius: "8px",
    padding: "24px",
    border: "1px solid #dce6ee",
    boxShadow: "0 10px 24px #0b18260f",
  },
  profileSlideOverlay: {
    position: "fixed",
    inset: 0,
    zIndex: 30,
    display: "flex",
    justifyContent: "flex-end",
  },
  profileSlideBackdrop: {
    position: "absolute",
    inset: 0,
    border: "none",
    background: "#0f172acc",
    cursor: "pointer",
  },
  profileSlide: {
    position: "relative",
    zIndex: 1,
    width: "max(560px, 99vw)",
    height: "100vh",
    background: "#ffffff",
    borderRadius: "8px 0 0 8px",
    padding: "18px",
    borderLeft: "1px solid #dce6ee",
    boxShadow: "0 16px 34px #0b18261f",
    animation: "profileSlideIn 0.25s ease-out",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  },
  profileSlideHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "16px",
    marginBottom: "14px",
    paddingBottom: "12px",
    borderBottom: "1px solid #dce6ee",
  },
  closeSlideButton: {
    padding: "10px 14px",
    border: "1px solid #cdd9e4",
    borderRadius: "8px",
    background: "#f8fafc",
    color: "#172033",
    cursor: "pointer",
    fontWeight: "700",
  },
  slideTabs: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginBottom: "14px",
  },
  slideTab: {
    padding: "12px 14px",
    border: "1px solid #cdd9e4",
    borderRadius: "8px",
    background: "#f8fafc",
    color: "#172033",
    cursor: "pointer",
    fontWeight: "700",
  },
  slideTabActive: {
    padding: "12px 14px",
    border: "1px solid #14b8a6",
    borderRadius: "8px",
    background: "#0f766e",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "700",
  },
  sectionTitle: {
    marginTop: 0,
    color: "#172033",
  },
  sectionText: {
    color: "#526172",
    lineHeight: "1.6",
  },
  applyGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(280px, 1fr)",
    gap: "18px",
    marginBottom: "22px",
  },
  applySummary: {
    background: "#f8fafc",
    borderRadius: "8px",
    padding: "18px",
    border: "1px solid #dce6ee",
  },
  applyForm: {
    display: "grid",
    gap: "14px",
    alignContent: "start",
  },
  applicationFilterBar: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "10px",
    marginBottom: "18px",
  },
  applicationFilter: {
    padding: "12px 14px",
    border: "1px solid #cdd9e4",
    borderRadius: "8px",
    background: "#f8fafc",
    color: "#172033",
    cursor: "pointer",
    fontWeight: "700",
    textAlign: "left",
  },
  applicationFilterActive: {
    padding: "12px 14px",
    border: "1px solid #14b8a6",
    borderRadius: "8px",  
    background: "#0f766e",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "700",
    textAlign: "left",
  },
  applicationList: {
    marginTop: "18px",
    display: "grid",
    gap: "12px",
  },
  applicationItem: {
    background: "#f8fafc",
    border: "1px solid #dce6ee",
    borderRadius: "8px",
    padding: "14px 16px",
    display:  "flex",
    justifyContent: "space-between",
    gap: "12px",
    alignItems: "center",
  },
  statusBadge: (status) => ({
    background:
      status === "Selected" ? "#dcfce7" : status === "Rejected" ? "#fee2e2" : "#fef3c7",
    color:
      status === "Selected" ? "#166534" : status === "Rejected" ? "#991b1b" : "#92400e",
    borderRadius: "999px",
    padding: "6px 10px",
    fontSize: "12px",
    fontWeight: "700",
    whiteSpace: "nowrap",
  }),
  notice: {
    background: "#e8fff1",
    color: "#166534",
    border: "1px solid #86efac",
    borderRadius: "8px",
    padding: "12px 14px",
    fontWeight: "700",
  },
  emptyState: {
    background: "#f8fafc",
    border: "1px dashed #94a3b8",
    borderRadius: "8px",
    padding: "24px",
    color: "#526172",
    textAlign: "center",
  },
  profileLayout: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(280px, 360px)",
    gap: "20px",
    alignItems: "start",
  },
  profileForm: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    alignItems: "start",
  },
  profileActionBar: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    gap: "10px",
    paddingTop: "8px",
    gridColumn: "1 / -1",
  },
  formGroup: {
    display: "grid",
    gap: "6px",
  },
  label: {
    fontWeight: "700",
    color: "#334155",
  },
  formInput: {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #cdd9e4",
    fontSize: "15px",
    outline: "none",
    width: "100%",
  },
  formTextarea: {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #cdd9e4",
    fontSize: "15px",
    outline: "none",
    width: "100%",
    resize: "vertical",
    fontFamily: "inherit",
  },
  wideField: {
    gridColumn: "1 / -1",
  },
  profilePreview: {
    background: "#f8fafc",
    borderRadius: "8px",
    padding: "18px",
    border: "1px solid #dce6ee",
    minHeight: "360px",
    animation: "profileSlideIn 0.2s ease-out",
  },
  avatar: {
    width: "82px",
    height: "82px",
    borderRadius: "50%",
    background: "#0f766e",
    color: "#ffffff",
    display: "grid",
    placeItems: "center",
    fontWeight: "700",
    marginBottom: "16px",
  },
  previewTitle: {
    marginTop: 0,
    color: "#172033",
  },
  previewText: {
    margin: "9px 0",
    color: "#526172",
    lineHeight: "1.5",
  },
  textLight: {
    color: "#e2e8f0",
  },
  textMutedDark: {
    color: "#cbd5e1",
  },
};
