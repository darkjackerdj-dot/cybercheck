import { useState } from "react";
import { jsPDF } from "jspdf";
import {
  ShieldCheck,
  LockKeyhole,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./index.css";

const questions = [
  {
    category: "Account Security",
    question: "Do you use two-factor authentication on your primary email?",
    options: [
      ["yes", "Yes, I use 2FA", 0],
      ["partial", "I have it, but I'm not sure", 3],
      ["no", "No, I don't use 2FA", 8],
      ["unknown", "I'm not sure", 5],
    ],
  },
  {
    category: "Password Security",
    question: "Do you reuse the same password across multiple accounts?",
    options: [
      ["no", "No, my passwords are unique", 0],
      ["some", "For some accounts", 4],
      ["yes", "Yes, quite often", 8],
      ["unknown", "I'm not sure", 5],
    ],
  },
  {
    category: "Password Security",
    question: "Do you use a password manager?",
    options: [
      ["yes", "Yes", 0],
      ["no", "No", 3],
      ["considering", "I'm considering one", 2],
      ["unknown", "I'm not sure what that is", 4],
    ],
  },
  {
    category: "Account Security",
    question: "Have you reviewed your account recovery email and phone number?",
    options: [
      ["yes", "Yes, recently", 0],
      ["old", "They may be outdated", 5],
      ["no", "No", 6],
      ["unknown", "I'm not sure", 4],
    ],
  },
  {
    category: "2FA Security",
    question: "Do you use 2FA on important social media accounts?",
    options: [
      ["yes", "Yes, on most of them", 0],
      ["some", "Only some", 3],
      ["no", "No", 7],
      ["unknown", "I'm not sure", 4],
    ],
  },
  {
    category: "Device Security",
    question: "Are your phone and computer operating systems regularly updated?",
    options: [
      ["yes", "Yes, updates are automatic", 0],
      ["usually", "Usually", 2],
      ["rarely", "I often postpone updates", 5],
      ["no", "I rarely update them", 7],
    ],
  },
  {
    category: "Device Security",
    question: "Do you have a screen lock on your main devices?",
    options: [
      ["yes", "Yes", 0],
      ["some", "On some devices", 3],
      ["no", "No", 7],
      ["unknown", "I'm not sure", 4],
    ],
  },
  {
    category: "Privacy",
    question: "Have you reviewed app permissions on your phone recently?",
    options: [
      ["yes", "Yes, recently", 0],
      ["sometimes", "Sometimes", 2],
      ["no", "No", 5],
      ["unknown", "I've never checked", 6],
    ],
  },
  {
    category: "Privacy",
    question: "Do you know which apps have access to your location?",
    options: [
      ["yes", "Yes", 0],
      ["some", "I know some of them", 2],
      ["no", "No", 5],
      ["unknown", "I'm not sure", 4],
    ],
  },
  {
    category: "Recovery",
    question: "Do you have backup copies of important personal files?",
    options: [
      ["yes", "Yes, with regular backups", 0],
      ["some", "Some important files", 2],
      ["no", "No", 6],
      ["unknown", "I'm not sure", 4],
    ],
  },
  {
    category: "Recovery",
    question: "Have you safely stored your account recovery codes?",
    options: [
      ["yes", "Yes", 0],
      ["some", "For some accounts", 2],
      ["no", "No", 5],
      ["unknown", "I don't know what recovery codes are", 5],
    ],
  },
  {
    category: "Account Security",
    question: "Do you still have old online accounts that you no longer use?",
    options: [
      ["no", "No / very few", 0],
      ["some", "A few", 2],
      ["many", "Yes, many", 5],
      ["unknown", "I haven't checked", 4],
    ],
  },
  {
    category: "Privacy",
    question: "Is your phone number publicly visible on social media?",
    options: [
      ["no", "No", 0],
      ["some", "On some profiles", 3],
      ["yes", "Yes", 6],
      ["unknown", "I'm not sure", 4],
    ],
  },
  {
    category: "Online Safety",
    question: "Do you check links before opening unexpected messages or emails?",
    options: [
      ["yes", "Always", 0],
      ["usually", "Usually", 2],
      ["sometimes", "Sometimes", 4],
      ["no", "Not really", 7],
    ],
  },
  {
    category: "Online Safety",
    question: "Do you know what to do if one of your important accounts is compromised?",
    options: [
      ["yes", "Yes, I have a recovery plan", 0],
      ["some", "I know some steps", 2],
      ["no", "No", 5],
      ["unknown", "I'm not sure", 4],
    ],
  },
];

function App() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(false);
  const [activeDay, setActiveDay] = useState(null);
  const [completedDays, setCompletedDays] = useState([]);

  const question = questions[current];

  function chooseAnswer(id, risk) {
    setAnswers((prev) => ({
      ...prev,
      [current]: { id, risk },
    }));
  }

  function next() {
    if (!answers[current]) return;

    if (current === questions.length - 1) {
      setResult(true);
    } else {
      setCurrent((prev) => prev + 1);
    }
  }

  function back() {
    if (current === 0) {
      setStarted(false);
    } else {
      setCurrent((prev) => prev - 1);
    }
  }

const sevenDayPlan = [
      {
        day: "Day 1",
        title: "Secure your primary email",
        why: "Your primary email can be the recovery point for many other accounts.",
        checks: [
          "Check whether 2FA is enabled",
          "Review your recovery email",
          "Review your recovery phone",
          "Remove unknown recovery methods",
          "Review active sessions",
        ],
      },
      {
        day: "Day 2",
        title: "Review password reuse",
        why: "Reused passwords can put multiple accounts at risk if one password is exposed.",
        checks: [
          "Identify accounts using the same password",
          "Change passwords on important accounts",
          "Use unique passwords for important accounts",
          "Consider using a password manager",
        ],
      },
      {
        day: "Day 3",
        title: "Enable 2FA on important accounts",
        why: "2FA adds another layer of protection beyond your password.",
        checks: [
          "Secure your primary email with 2FA",
          "Enable 2FA on important social accounts",
          "Check your messaging accounts",
          "Store recovery codes safely",
        ],
      },
      {
        day: "Day 4",
        title: "Review recovery options",
        why: "Accurate recovery information can help you regain access to an account.",
        checks: [
          "Check recovery email addresses",
          "Check recovery phone numbers",
          "Remove outdated recovery methods",
          "Review saved recovery codes",
        ],
      },
      {
        day: "Day 5",
        title: "Check device updates and screen locks",
        why: "Keeping devices updated and locked reduces common security risks.",
        checks: [
          "Install pending system updates",
          "Enable automatic updates where appropriate",
          "Use a strong screen lock",
          "Review devices signed into important accounts",
        ],
      },
      {
        day: "Day 6",
        title: "Review app permissions and privacy",
        why: "Apps may have access to information they do not actually need.",
        checks: [
          "Review location permissions",
          "Review camera and microphone access",
          "Remove permissions an app does not need",
          "Uninstall apps you no longer use",
        ],
      },
      {
        day: "Day 7",
        title: "Run another security checkup",
        why: "A follow-up check helps you see whether your security habits have improved.",
        checks: [
          "Review the actions completed this week",
          "Check important accounts again",
          "Review 2FA status",
          "Review password and recovery practices",
          "Run the CYBERCHECK assessment again",
        ],
      },
    ];

  function downloadReport() {
    try {
      const totalRisk = Object.values(answers).reduce(
        (sum, value) => sum + (value?.risk ?? 0),
        0
      );

      const maxRisk = questions.reduce(
        (sum, q) => sum + Math.max(...q.options.map((o) => o[2])),
        0
      );

      const score = Math.max(
        0,
        Math.round(100 - (totalRisk / maxRisk) * 100)
      );

      const level =
        score >= 80
          ? "Strong"
          : score >= 60
          ? "Needs attention"
          : "High risk";

      const categoryScores = {};

      questions.forEach((q, index) => {
        if (!categoryScores[q.category]) {
          categoryScores[q.category] = { risk: 0, max: 0 };
        }

        const maxQuestionRisk = Math.max(
          ...q.options.map((o) => o[2])
        );

        categoryScores[q.category].risk += answers[index]?.risk ?? 0;
        categoryScores[q.category].max += maxQuestionRisk;
      });

      const categoryResults = Object.entries(categoryScores).map(
        ([category, data]) => ({
          category,
          score: Math.max(
            0,
            Math.round(100 - (data.risk / data.max) * 100)
          ),
        })
      );

      const priorities = [...categoryResults]
        .filter((item) => item.score < 80)
        .sort((a, b) => a.score - b.score)
        .slice(0, 4);

      const strengths = [...categoryResults]
        .filter((item) => item.score >= 80)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

      const actions = {
        "Password Security":
          "Use unique passwords for important accounts and review reused passwords.",
        "2FA Security":
          "Enable two-factor authentication on important accounts.",
        "Account Security":
          "Review important accounts, active sessions and unused accounts.",
        "Device Security":
          "Install pending updates and use a strong screen lock.",
        "Privacy":
          "Review app permissions and remove unnecessary access.",
        "Recovery":
          "Review recovery email, phone numbers and safely stored recovery codes.",
        "Online Safety":
          "Be cautious with unexpected links, attachments and messages."
      };

      const doc = new jsPDF();

      const W = 210;
      const H = 297;

      const navy = [9, 13, 24];
      const blue = [79, 105, 255];
      const blueSoft = [224, 230, 255];
      const text = [25, 31, 43];
      const muted = [105, 115, 132];
      const white = [255, 255, 255];
      const light = [246, 248, 252];
      const border = [225, 229, 237];
      const orange = [230, 145, 35];
      const green = [35, 155, 105];

      function pageNumber(n) {
        doc.setDrawColor(...border);
        doc.line(20, 279, 190, 279);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.setTextColor(...muted);
        doc.text(
          "CYBERCHECK  •  PERSONAL DIGITAL SECURITY",
          20,
          287
        );
        doc.text(`${n} / 3`, 180, 287);
      }

      function lightPage() {
        doc.setFillColor(...white);
        doc.rect(0, 0, W, H, "F");
      }

      function darkPage() {
        doc.setFillColor(...navy);
        doc.rect(0, 0, W, H, "F");
      }

      function heading(title, subtitle) {
        doc.setTextColor(...text);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.text(title, 20, 29);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(...muted);
        doc.text(subtitle, 20, 38);
      }

      function bar(x, y, width, value) {
        doc.setFillColor(...border);
        doc.roundedRect(x, y, width, 4, 2, 2, "F");

        doc.setFillColor(...blue);
        doc.roundedRect(
          x,
          y,
          Math.max(2, width * value / 100),
          4,
          2,
          2,
          "F"
        );
      }

      // ==========================
      // PAGE 1 — COVER
      // ==========================

      darkPage();

      doc.setFillColor(...blue);
      doc.roundedRect(20, 24, 12, 12, 3, 3, "F");

      doc.setTextColor(...white);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("C", 24, 32);

      doc.setFontSize(21);
      doc.text("CYBERCHECK", 38, 33);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(160, 170, 190);
      doc.text(
        "PERSONAL DIGITAL SECURITY ASSESSMENT",
        38,
        40
      );

      doc.setDrawColor(45, 52, 68);
      doc.line(20, 53, 190, 53);

      doc.setFontSize(8);
      doc.setTextColor(140, 150, 170);
      doc.text("SECURITY SCORE", 20, 77);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(66);
      doc.setTextColor(...white);
      doc.text(String(score), 20, 130);

      doc.setFontSize(17);
      doc.setTextColor(145, 155, 175);
      doc.text("/ 100", 77, 128);

      doc.setFillColor(...blue);
      doc.roundedRect(20, 145, 67, 14, 7, 7, "F");

      doc.setTextColor(...white);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text(level.toUpperCase(), 30, 154);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(180, 188, 202);
      doc.text(
        "A snapshot of your current digital security habits.",
        20,
        181
      );

      doc.setFillColor(17, 23, 37);
      doc.roundedRect(20, 202, 170, 45, 6, 6, "F");

      doc.setTextColor(...white);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("REPORT OVERVIEW", 30, 218);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(150, 160, 180);
      doc.text("Security profile", 30, 229);
      doc.text("Priority areas", 30, 238);
      doc.text("7-day action plan", 115, 229);
      doc.text("Practical next steps", 115, 238);

      doc.setFontSize(7);
      doc.setTextColor(120, 130, 150);
      doc.text(
        "Self-assessment only • No passwords, OTPs or private credentials are collected.",
        20,
        263
      );

      pageNumber(1);

      // ==========================
      // PAGE 2 — SECURITY PROFILE
      // ==========================

      doc.addPage();
      lightPage();

      heading(
        "Security Profile",
        "Your answers grouped across seven security areas"
      );

      doc.setFillColor(...light);
      doc.roundedRect(20, 53, 170, 42, 6, 6, "F");

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...muted);
      doc.text("OVERALL SELF-ASSESSMENT", 29, 67);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(27);
      doc.setTextColor(...text);
      doc.text(`${score}`, 29, 87);

      doc.setFontSize(9);
      doc.setTextColor(...muted);
      doc.text("/ 100", 56, 86);

      doc.setFont("helvetica", "bold");
      doc.setTextColor(...blue);
      doc.text(level, 148, 67);

      let y = 112;

      categoryResults.forEach((item) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(...text);
        doc.text(item.category, 20, y);

        doc.setFontSize(8);
        doc.setTextColor(...blue);
        doc.text(`${item.score}/100`, 172, y);

        bar(20, y + 6, 170, item.score);

        y += 24;
      });

      pageNumber(2);

      // ==========================
      // PAGE 3 — PRIORITIES + 7-DAY PLAN
      doc.addPage();
      lightPage();

      heading(
        "Your Security Action Plan",
        "Priority areas, strengths and a focused seven-day improvement plan"
      );

      // LEFT COLUMN — PRIORITIES
      const leftX = 20;
      const leftW = 80;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(...text);
      doc.text("Top Priorities", leftX, 57);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(...muted);
      doc.text(
        "Areas that deserve the most attention",
        leftX,
        65
      );

      let leftY = 74;

      priorities.slice(0, 3).forEach((item, index) => {
        doc.setFillColor(...light);
        doc.roundedRect(leftX, leftY, leftW, 31, 5, 5, "F");

        doc.setFillColor(...blueSoft);
        doc.roundedRect(
          leftX + 7,
          leftY + 6,
          18,
          18,
          5,
          5,
          "F"
        );

        doc.setFont("helvetica", "bold");
        doc.setFontSize(7);
        doc.setTextColor(...blue);
        doc.text(
          `0${index + 1}`,
          leftX + 16,
          leftY + 17,
          { align: "center" }
        );

        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.5);
        doc.setTextColor(...text);

        const titleLines = doc.splitTextToSize(
          item.category,
          42
        );

        doc.text(
          titleLines,
          leftX + 31,
          leftY + 12
        );

        doc.setFont("helvetica", "bold");
        doc.setFontSize(7);
        doc.setTextColor(...orange);
        doc.text(
          `${item.score}/100`,
          leftX + leftW - 7,
          leftY + 12,
          { align: "right" }
        );

        doc.setFont("helvetica", "normal");
        doc.setFontSize(5.6);
        doc.setTextColor(...muted);

        const actionLines = doc.splitTextToSize(
          actions[item.category] || "Review this security area.",
          48
        );

        doc.text(
          actionLines.slice(0, 2),
          leftX + 31,
          leftY + 22
        );

        leftY += 37;
      });

      if (priorities.length === 0) {
        doc.setFillColor(238, 249, 244);
        doc.roundedRect(leftX, leftY, leftW, 31, 5, 5, "F");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.5);
        doc.setTextColor(...green);
        doc.text(
          "No priority areas below 80/100",
          leftX + 8,
          leftY + 17
        );

        leftY += 37;
      }

      // WHAT'S GOING WELL
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(...text);
      doc.text("What's Going Well", leftX, leftY + 3);

      leftY += 13;

      strengths.slice(0, 3).forEach((item) => {
        doc.setFillColor(238, 249, 244);
        doc.roundedRect(
          leftX,
          leftY,
          leftW,
          16,
          4,
          4,
          "F"
        );

        doc.setFillColor(...green);
        doc.circle(leftX + 8, leftY + 8, 2, "F");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(6.8);
        doc.setTextColor(...text);
        doc.text(
          item.category,
          leftX + 15,
          leftY + 10
        );

        doc.setFont("helvetica", "bold");
        doc.setFontSize(6.8);
        doc.setTextColor(...green);
        doc.text(
          `${item.score}/100`,
          leftX + leftW - 7,
          leftY + 10,
          { align: "right" }
        );

        leftY += 21;
      });

      // RIGHT COLUMN — 7 DAY PLAN
      const rightX = 108;
      const rightW = 82;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(...text);
      doc.text("7-Day Security Plan", rightX, 57);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(...muted);
      doc.text(
        "One focused action each day",
        rightX,
        65
      );

      let planY = 74;

      sevenDayPlan.forEach((item, index) => {
        doc.setFillColor(...light);
        doc.roundedRect(
          rightX,
          planY,
          rightW,
          22,
          5,
          5,
          "F"
        );

        doc.setFillColor(...blue);
        doc.roundedRect(
          rightX + 7,
          planY + 5,
          14,
          12,
          4,
          4,
          "F"
        );

        doc.setFont("helvetica", "bold");
        doc.setFontSize(5.5);
        doc.setTextColor(...white);
        doc.text(
          String(index + 1).padStart(2, "0"),
          rightX + 14,
          planY + 12.5,
          { align: "center" }
        );

        doc.setFont("helvetica", "bold");
        doc.setFontSize(7);
        doc.setTextColor(...text);

        const planLines = doc.splitTextToSize(
          item.title,
          53
        );

        doc.text(
          planLines.slice(0, 2),
          rightX + 27,
          planY + 10
        );

        planY += 25;
      });

      // SMALL PROFESSIONAL NOTE
      doc.setFillColor(...navy);
      doc.roundedRect(
        20,
        252,
        170,
        22,
        5,
        5,
        "F"
      );

      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.5);
      doc.setTextColor(...white);
      doc.text(
        "PRIVACY & ACCURACY",
        28,
        261
      );

      doc.setFont("helvetica", "normal");
      doc.setFontSize(5.7);
      doc.setTextColor(170, 180, 195);
      doc.text(
        "Self-assessment only. CYBERCHECK does not scan devices, inspect accounts or verify breaches.",
        28,
        268
      );

      pageNumber(3);

      doc.save("cybercheck-security-report.pdf");

    } catch (error) {
      console.error("CYBERCHECK PDF ERROR:", error);
      alert(`PDF generation failed: ${error.message}`);
    }
  }

  function restart() {
    setCurrent(0);
    setAnswers({});
    setResult(false);
    setActiveDay(null);
    setCompletedDays([]);
  }

  if (result) {
    const totalRisk = Object.values(answers).reduce(
      (sum, answer) => sum + answer.risk,
      0
    );

    const maxRisk = questions.reduce(
      (sum, q) => sum + Math.max(...q.options.map((o) => o[2])),
      0
    );

    const score = Math.max(
      0,
      Math.round(100 - (totalRisk / maxRisk) * 100)
    );

    const level =
      score >= 80 ? "Strong" : score >= 60 ? "Needs attention" : "High risk";

    const statusIcon =
      score >= 80 ? "🟢" : score >= 60 ? "🟠" : "🔴";

    const categoryScores = {};

    questions.forEach((q, index) => {
      if (!categoryScores[q.category]) {
        categoryScores[q.category] = {
          risk: 0,
          max: 0,
        };
      }

      const maxQuestionRisk = Math.max(...q.options.map((o) => o[2]));

      categoryScores[q.category].risk += answers[index]?.risk ?? 0;
      categoryScores[q.category].max += maxQuestionRisk;
    });

    const categoryResults = Object.entries(categoryScores).map(
      ([category, data]) => ({
        category,
        score: Math.max(
          0,
          Math.round(100 - (data.risk / data.max) * 100)
        ),
      })
    );

    const findings = questions
      .map((q, index) => ({
        category: q.category,
        question: q.question,
        risk: answers[index]?.risk ?? 0,
      }))
      .sort((a, b) => b.risk - a.risk)
      .slice(0, 4);

    const fixActions = {
      "Password Security":
        "Review reused passwords and move important accounts to unique passwords.",
      "Recovery":
        "Review your recovery email, phone number and safely store recovery codes.",
      "2FA Security":
        "Enable two-factor authentication on your most important accounts.",
      "Account Security":
        "Review important accounts and remove old or unused accounts.",
      "Device Security":
        "Install pending system updates and make sure your devices use a screen lock.",
      "Privacy":
        "Review app permissions and limit unnecessary access to location and personal data.",
      "Online Safety":
        "Slow down before opening unexpected links, attachments or messages.",
    };



    return (
      <main className="app">
        <nav className="navbar">
          <div className="brand">
            <div className="brand-icon">
              <ShieldCheck size={21} />
            </div>
            <span>CYBERCHECK</span>
          </div>

          <div className="nav-status">
            <span className="status-dot"></span>
            Privacy-first
          </div>
        </nav>

        <section className="result-page">
          <div className="eyebrow">
            <ShieldCheck size={15} />
            SECURITY CHECKUP COMPLETE
          </div>

          <h1>Your security score</h1>

          <p className="result-subtitle">
            Your score is based on the answers you provided.
            It is a self-assessment, not a technical security scan.
          </p>

          <div className="result-grid">
            <div className="score-card">
              <div className="big-score">{score}</div>
              <div className="score-label">/ 100</div>

              <div className="score-level">
                {statusIcon} {level}
              </div>
            </div>

            <div className="findings-card">
              <div className="card-heading">
                <span>TOP PRIORITIES</span>
                <b>What to fix first</b>
              </div>

              {findings.map((item, index) => (
                <div className="finding" key={index}>
                  <span className="finding-number">{index + 1}</span>

                  <div className="finding-content">
                    <b>{item.category}</b>
                    <p>{fixActions[item.category]}</p>

                    <small>
                      Based on: {item.question}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="breakdown-card">
            <div className="breakdown-heading">
              <div>
                <span>SECURITY BREAKDOWN</span>
                <h2>Where you stand</h2>
                <p>
                  Your answers grouped by security area.
                </p>
              </div>

              <ShieldCheck size={30} />
            </div>

            <div className="category-list">
              {categoryResults.map((item) => {
                const categoryStatus =
                  item.score >= 80
                    ? "Strong"
                    : item.score >= 60
                    ? "Attention"
                    : "Priority";

                return (
                  <div className="category-row" key={item.category}>
                    <div className="category-info">
                      <b>{item.category}</b>
                      <span>{categoryStatus}</span>
                    </div>

                    <div className="category-bar">
                      <i style={{ width: `${item.score}%` }}></i>
                    </div>

                    <strong>{item.score}</strong>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="insight-grid">
            <div className="insight-card">
              <span className="insight-label">SECURITY STRENGTHS</span>
              <h2>What's going well</h2>

              {categoryResults.filter((item) => item.score >= 80).length === 0 ? (
                <p className="empty-insight">
                  Keep working through the action plan. Strong areas will
                  appear here as your score improves.
                </p>
              ) : (
                categoryResults
                  .filter((item) => item.score >= 80)
                  .sort((a, b) => b.score - a.score)
                  .map((item) => (
                    <div className="insight-item" key={item.category}>
                      <CheckCircle2 size={17} />
                      <div>
                        <b>{item.category}</b>
                        <span>{item.score}/100</span>
                      </div>
                    </div>
                  ))
              )}
            </div>

            <div className="insight-card">
              <span className="insight-label">NEEDS ATTENTION</span>
              <h2>What to improve</h2>

              {categoryResults
                .filter((item) => item.score < 80)
                .sort((a, b) => a.score - b.score)
                .slice(0, 4)
                .map((item) => (
                  <div className="insight-item attention-item" key={item.category}>
                    <span className="attention-dot"></span>
                    <div>
                      <b>{item.category}</b>
                      <span>{item.score}/100</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="fix-plan">
            <div className="fix-plan-heading">
              <div>
                <span>YOUR ACTION PLAN</span>
                <h2>7-Day Security Plan</h2>
                <p>
                  Small actions that can improve your everyday digital
                  security.
                </p>
              </div>

              <ShieldCheck size={30} />
            </div>

            <div className="plan-progress-mini">
              <span>WEEKLY PROGRESS</span>
              <b>{completedDays.length} / 7 completed</b>
            </div>

            <div className="seven-day-list">
              {sevenDayPlan.map((item, index) => {
                const done = completedDays.includes(index);
                const locked =
                  index > 0 && !completedDays.includes(index - 1);

                return (
                  <button
                    type="button"
                    className={`day-item ${done ? "day-done" : ""} ${
                      locked ? "day-locked" : ""
                    }`}
                    key={item.day}
                    disabled={locked}
                    onClick={() => setActiveDay(index)}
                  >
                    <div className="day-number">
                      {done
                        ? "✓"
                        : String(index + 1).padStart(2, "0")}
                    </div>

                    <div>
                      <span>{item.day}</span>
                      <b>{item.title}</b>
                    </div>

                    {done ? (
                      <CheckCircle2 size={19} />
                    ) : (
                      <ChevronRight size={19} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {activeDay !== null && sevenDayPlan[activeDay] && (
            <div className="day-overlay">
              <div className="day-modal">
                <button
                  type="button"
                  className="modal-close"
                  onClick={() => setActiveDay(null)}
                >
                  ×
                </button>

                <span className="modal-day">
                  {sevenDayPlan[activeDay].day}
                </span>

                <h2>{sevenDayPlan[activeDay].title}</h2>

                <p className="modal-why">
                  {sevenDayPlan[activeDay].why}
                </p>

                <div className="modal-checks">
                  {sevenDayPlan[activeDay].checks.map((check, i) => (
                    <div key={i}>
                      <CheckCircle2 size={17} />
                      <span>{check}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="primary-btn modal-complete"
                  onClick={() => {
                    setCompletedDays((prev) =>
                      prev.includes(activeDay)
                        ? prev
                        : [...prev, activeDay]
                    );
                    setActiveDay(null);
                  }}
                >
                  <CheckCircle2 size={18} />
                  I've completed this
                </button>
              </div>
            </div>
          )}

          <div className="result-actions report-actions">
            <button className="primary-btn" onClick={downloadReport}>
              Download Security Report
              <ArrowRight size={18} />
            </button>

            <button className="secondary-btn" onClick={restart}>
              Run Checkup Again
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (started) {
    const selected = answers[current];

    return (
      <main className="app">
        <nav className="navbar">
          <div className="brand">
            <div className="brand-icon">
              <ShieldCheck size={21} />
            </div>
            <span>CYBERCHECK</span>
          </div>

          <div className="nav-status">
            <span className="status-dot"></span>
            Privacy-first
          </div>
        </nav>

        <section className="checkup-page">
          <button className="back-link" onClick={back}>
            <ChevronLeft size={17} />
            Back
          </button>

          <div className="progress-header">
            <div>
              <span>SECURITY CHECKUP</span>
              <b>
                Question {current + 1} of {questions.length}
              </b>
            </div>

            <strong>
              {Math.round(((current + 1) / questions.length) * 100)}%
            </strong>
          </div>

          <div className="progress-track">
            <i
              style={{
                width: `${((current + 1) / questions.length) * 100}%`,
              }}
            ></i>
          </div>

          <div className="question-card">
            <div className="question-category">
              {question.category}
            </div>

            <h1>{question.question}</h1>

            <div className="question-options">
              {question.options.map(([id, label, risk]) => (
                <button
                  key={id}
                  className={`question-option ${
                    selected?.id === id ? "selected" : ""
                  }`}
                  onClick={() => chooseAnswer(id, risk)}
                >
                  <span>{label}</span>
                  {selected?.id === id && (
                    <CheckCircle2 size={19} />
                  )}
                </button>
              ))}
            </div>

            <div className="question-footer">
              <span>
                <LockKeyhole size={14} />
                We never ask for passwords or OTPs.
              </span>

              <button
                className="primary-btn"
                disabled={!selected}
                onClick={next}
              >
                {current === questions.length - 1
                  ? "See My Results"
                  : "Continue"}
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="app">
      <nav className="navbar">
        <div className="brand">
          <div className="brand-icon">
            <ShieldCheck size={21} />
          </div>
          <span>CYBERCHECK</span>
        </div>

        <div className="nav-status">
          <span className="status-dot"></span>
          Privacy-first
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <div className="eyebrow">
            <ShieldCheck size={15} />
            PERSONAL DIGITAL SECURITY CHECKUP
          </div>

          <h1>
            Know your risk.
            <br />
            <span>Fix your exposure.</span>
          </h1>

          <p className="hero-text">
            A simple security checkup that helps you discover weak points
            in your digital life and gives you clear actions to fix them.
          </p>

          <div className="hero-actions">
            <button
              className="primary-btn"
              onClick={() => setStarted(true)}
            >
              Start Free Checkup
              <ArrowRight size={18} />
            </button>

            <div className="time-note">
              <LockKeyhole size={15} />
              Takes about 3 minutes
            </div>
          </div>

          <div className="trust-row">
            <div>
              <CheckCircle2 size={17} />
              No passwords required
            </div>
            <div>
              <CheckCircle2 size={17} />
              No OTPs required
            </div>
            <div>
              <CheckCircle2 size={17} />
              Privacy-first
            </div>
          </div>
        </div>

        <div className="security-card">
          <div className="card-top">
            <div>
              <span>YOUR SECURITY</span>
              <strong>Ready to check</strong>
            </div>

            <div className="shield-circle">
              <ShieldCheck size={25} />
            </div>
          </div>

          <div className="score-preview">
            <div className="score-ring">
              <span>?</span>
            </div>

            <div>
              <b>Security Score</b>
              <p>Complete the checkup to discover your score.</p>
            </div>
          </div>

          <div className="check-list">
            <div><span>01</span> Account Security</div>
            <div><span>02</span> Password Security</div>
            <div><span>03</span> Two-Factor Authentication</div>
            <div><span>04</span> Device & Privacy</div>
          </div>
        </div>
      </section>

      <section className="bottom-section">
        <p>
          CYBERCHECK helps you understand your personal security posture.
        </p>
      </section>
    </main>
  );
}

export default App;
