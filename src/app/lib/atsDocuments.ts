import { PDFDocument, PDFString, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";

const A4_WIDTH = 595.28;
const A4_HEIGHT = 841.89;
const MARGIN = 48;
const PAGE_WIDTH = A4_WIDTH - MARGIN * 2;
const LINE_HEIGHT = 14;
const PORTFOLIO_URL = "https://syyeda-arrabah.vercel.app/";
const LINKEDIN_URL = "https://www.linkedin.com/in/dr-syyeda-arrabah-6a317939b/";

export type ResumeDraft = {
  name: string;
  title: string;
  phone: string;
  email: string;
  location: string;
  portfolioUrl: string;
  linkedinUrl: string;
  summary: string;
  skills: string[];
  skillGroups: Array<{
    title: string;
    items: string[];
  }>;
  experience: Array<{
    role: string;
    org: string;
    duration: string;
    bullets: string[];
  }>;
  education: Array<{
    degree: string;
    org: string;
    note: string;
  }>;
  researchFocus: string[];
  certifications: string[];
  trainings: string[];
  languagesLine: string;
};

export type CoverLetterDraft = {
  name: string;
  title: string;
  phone: string;
  email: string;
  location: string;
  portfolioUrl: string;
  linkedinUrl: string;
  date: string;
  recipient: string;
  subject: string;
  paragraphs: string[];
};

export const defaultResumeDraft: ResumeDraft = {
  name: "Syyeda Arrabah",
  title: "Neurolinguist | Researcher",
  phone: "+92 310 7683064",
  email: "arrabahnaqvi514@gmail.com",
  location: "Jalalpur Bhattian, Hafizabad, Pakistan",
  portfolioUrl: PORTFOLIO_URL,
  linkedinUrl: LINKEDIN_URL,
  summary:
    "Neurolinguist and researcher with a disciplined approach to clinical reasoning, evidence review, scientific writing, and professional documentation. Brings a structured administrative background, strong communication skills, and a clear focus on precision, patient safety, and research-informed practice.",
  skills: [
    "Neurolinguistics",
    "Language analysis",
    "Speech and language patterns",
    "Cognitive observation",
    "Communication assessment",
    "Discourse analysis",
    "Evidence-based practice",
    "Research methodology",
    "Scientific writing",
    "Literature review",
    "Academic documentation",
    "Academic presentation",
    "Office administration",
    "Scheduling",
    "Record management",
    "Communication",
  ],
  skillGroups: [
    {
      title: "Primary Linguistic and Research Competencies",
      items: [
        "Neurolinguistics",
        "Language analysis",
        "Speech and language patterns",
        "Cognitive observation",
        "Communication assessment",
        "Discourse analysis",
      ],
    },
    {
      title: "Research and Academic Strengths",
      items: [
        "Evidence-based practice",
        "Research methodology",
        "Scientific writing",
        "Literature review",
        "Academic documentation",
        "Academic presentation",
      ],
    },
    {
      title: "Secondary Professional Skills",
      items: [
        "Office administration",
        "Scheduling",
        "Record management",
        "Communication",
        "Workflow coordination",
        "Professional correspondence",
      ],
    },
  ],
  experience: [
    {
      role: "Office Administration and Management",
      org: "Sumsols Technologies",
      duration: "14 April 2026 - 18 July 2026",
      bullets: [
        "Coordinated schedules, records, and daily office communication to support smooth workflow execution.",
        "Prepared and maintained organized documentation while supporting professional correspondence and follow-up tasks.",
      ],
    },
  ],
  education: [
    {
      degree: "BS English",
      org: "Allama Iqbal Open University",
      note: "Language studies, literature, academic writing, and communication.",
    },
    {
      degree: "Associate Degree in Arts",
      org: "University of Sargodha",
      note: "Humanities, social sciences, critical thinking, and analytical development.",
    },
  ],
  researchFocus: [
    "Neurolinguistics and brain-function relationships",
    "Clinical reasoning, language awareness, and communication support",
    "Evidence synthesis, documentation, and research reporting",
  ],
  certifications: [
    "Human Psychology - Mind Luster",
    "Human Resource Management - Saylor Academy",
    "Agile Project Management - HP LIFE",
    "Diabetes and Obesity Course - EACCME",
    "Pharmacy Technician - Alison",
    "Business-Proficient English - Saylor Academy",
    "DigiSkills Training - DigiSkills.pk",
  ],
  trainings: [
    "Network Marketing",
    "Agile Project Management",
    "Freelancing & Digital Entrepreneurship",
    "Human Resource Management",
    "Data Management & Record Keeping",
  ],
  languagesLine: "English - Professional | Urdu - Native | Punjabi - Native",
};

export const defaultCoverLetterDraft: CoverLetterDraft = {
  name: defaultResumeDraft.name,
  title: defaultResumeDraft.title,
  phone: defaultResumeDraft.phone,
  email: defaultResumeDraft.email,
  location: defaultResumeDraft.location,
  portfolioUrl: defaultResumeDraft.portfolioUrl,
  linkedinUrl: defaultResumeDraft.linkedinUrl,
  date: new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date()),
  recipient: "Hiring Manager",
  subject: "Application for Neurolinguistics Research and Professional Support Opportunity",
  paragraphs: [
    "Dear Hiring Manager,",
    "I am writing to express my interest in a Neurolinguistics Research and Professional Support opportunity. My professional profile combines language-focused analysis, research discipline, and structured administrative capability, with a consistent focus on accuracy, communication, and evidence-informed decision making.",
    "My background includes Office Administration and Management experience with Sumsols Technologies from 14 April 2026 to 18 July 2026, where I supported scheduling, record keeping, workflow coordination, and professional communication. Alongside this, my academic and certification background strengthens my ability to contribute to research, documentation, and organized support tasks.",
    "I would welcome the opportunity to contribute to a professional environment that values precision, responsibility, and continuous improvement. Thank you for your time and consideration.",
    "Sincerely,",
    defaultResumeDraft.name,
  ],
};

function wrapText(font: PDFFont, text: string, size: number, maxWidth: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(test, size) <= maxWidth) {
      line = test;
    } else {
      if (line) lines.push(line);
      line = word;
    }
  }

  if (line) lines.push(line);
  return lines;
}

function appendUriAnnotation(
  pdfDoc: PDFDocument,
  page: PDFPage,
  uri: string,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const annotation = pdfDoc.context.register(
    pdfDoc.context.obj({
      Type: "Annot",
      Subtype: "Link",
      Rect: [x, y, x + width, y + height],
      Border: [0, 0, 0],
      A: {
        Type: "Action",
        S: "URI",
        URI: PDFString.of(uri),
      },
    }),
  );
  page.node.addAnnot(annotation);
}

function drawLinkedText(
  pdfDoc: PDFDocument,
  page: PDFPage,
  font: PDFFont,
  text: string,
  x: number,
  y: number,
  size: number,
  uri: string,
  color = rgb(0.28, 0.28, 0.34),
) {
  page.drawText(text, {
    x,
    y,
    size,
    font,
    color,
  });
  appendUriAnnotation(pdfDoc, page, uri, x, y - 1.5, font.widthOfTextAtSize(text, size), size + 3);
}

function drawContactLine(
  pdfDoc: PDFDocument,
  page: PDFPage,
  font: PDFFont,
  segments: Array<{ text: string; uri?: string }>,
  y: number,
  size = 8.4,
) {
  const separator = "  |  ";
  const separatorWidth = font.widthOfTextAtSize(separator, size);
  const totalWidth = segments.reduce(
    (total, segment, index) => total + font.widthOfTextAtSize(segment.text, size) + (index < segments.length - 1 ? separatorWidth : 0),
    0,
  );
  let x = MARGIN + (PAGE_WIDTH - totalWidth) / 2;

  segments.forEach((segment, index) => {
    const width = font.widthOfTextAtSize(segment.text, size);
    if (segment.uri) {
      drawLinkedText(pdfDoc, page, font, segment.text, x, y, size, segment.uri);
    } else {
      page.drawText(segment.text, {
        x,
        y,
        size,
        font,
        color: rgb(0.28, 0.28, 0.34),
      });
    }
    x += width;
    if (index < segments.length - 1) {
      page.drawText(separator, {
        x,
        y,
        size,
        font,
        color: rgb(0.28, 0.28, 0.34),
      });
      x += separatorWidth;
    }
  });
}

function ensureSpace(page: PDFPage, y: number, needed: number, addPage: () => PDFPage) {
  if (y - needed < 48) {
    const newPage = addPage();
    return { page: newPage, y: A4_HEIGHT - MARGIN };
  }
  return { page, y };
}

function drawCenteredHeader(
  pdfDoc: PDFDocument,
  page: PDFPage,
  font: PDFFont,
  bold: PDFFont,
  draft: ResumeDraft,
  y: number,
) {
  const titleSize = 20;
  const subtitleSize = 10.5;
  const contactSize = 8.4;
  const titleWidth = bold.widthOfTextAtSize(draft.name, titleSize);
  const subtitleWidth = font.widthOfTextAtSize(draft.title, subtitleSize);

  page.drawText(draft.name, {
    x: MARGIN + (PAGE_WIDTH - titleWidth) / 2,
    y,
    size: titleSize,
    font: bold,
    color: rgb(0.06, 0.06, 0.08),
  });
  page.drawText(draft.title, {
    x: MARGIN + (PAGE_WIDTH - subtitleWidth) / 2,
    y: y - 18,
    size: subtitleSize,
    font,
    color: rgb(0.25, 0.25, 0.32),
  });
  drawContactLine(
    pdfDoc,
    page,
    font,
    [
      { text: draft.phone, uri: `tel:${draft.phone.replace(/\s+/g, "")}` },
      { text: draft.email, uri: `mailto:${draft.email}` },
      { text: "Portfolio Website", uri: draft.portfolioUrl },
      { text: "LinkedIn Profile", uri: draft.linkedinUrl },
    ],
    y - 32,
    contactSize,
  );
  page.drawLine({
    start: { x: MARGIN, y: y - 42 },
    end: { x: MARGIN + PAGE_WIDTH, y: y - 42 },
    thickness: 1,
    color: rgb(0.1, 0.1, 0.12),
  });
}

function drawSectionTitle(page: PDFPage, font: PDFFont, title: string, y: number) {
  page.drawText(title.toUpperCase(), {
    x: MARGIN,
    y,
    size: 9.5,
    font,
    color: rgb(0.08, 0.08, 0.1),
  });
  page.drawLine({
    start: { x: MARGIN, y: y - 4 },
    end: { x: MARGIN + PAGE_WIDTH, y: y - 4 },
    thickness: 0.8,
    color: rgb(0.78, 0.78, 0.8),
  });
}

function drawCard(
  page: PDFPage,
  font: PDFFont,
  bold: PDFFont,
  title: string,
  x: number,
  y: number,
  width: number,
  lines: string[],
) {
  const cardTop = y;
  const cardPadding = 12;
  const titleSize = 9.2;
  const lineSize = 8.8;
  const renderedLines = lines.flatMap((line) => wrapText(font, line, lineSize, width - cardPadding * 2));
  const height = 34 + renderedLines.length * 11;

  page.drawRectangle({
    x,
    y: cardTop - height,
    width,
    height,
    borderWidth: 0.9,
    borderColor: rgb(0.82, 0.82, 0.84),
    color: rgb(1, 1, 1),
  });
  page.drawText(title.toUpperCase(), {
    x: x + cardPadding,
    y: cardTop - 16,
    size: titleSize,
    font: bold,
    color: rgb(0.08, 0.08, 0.1),
  });

  let cursor = cardTop - 30;
  for (const line of lines) {
    const wrapped = wrapText(font, line, lineSize, width - cardPadding * 2);
    for (const wrappedLine of wrapped) {
      page.drawText(wrappedLine, {
        x: x + cardPadding,
        y: cursor,
        size: lineSize,
        font,
        color: rgb(0.16, 0.16, 0.2),
      });
      cursor -= 11;
    }
    cursor -= 2;
  }
  return height;
}

function measureCardHeight(font: PDFFont, width: number, lines: string[]) {
  const cardPadding = 12;
  const renderedLines = lines.flatMap((line) => wrapText(font, line, 8.8, width - cardPadding * 2));
  return 34 + renderedLines.length * 11;
}

function measureBulletCardHeight(font: PDFFont, width: number, items: string[]) {
  const cardPadding = 12;
  return (
    34 +
    items.reduce((total, item) => {
      const lines = wrapText(font, item, 8.8, width - cardPadding * 2 - 12);
      return total + lines.length * 11 + 5;
    }, 0)
  );
}

function drawBulletCard(
  page: PDFPage,
  font: PDFFont,
  bold: PDFFont,
  title: string,
  x: number,
  y: number,
  width: number,
  items: string[],
) {
  const cardPadding = 12;
  const titleSize = 9.2;
  const lineSize = 8.8;
  const bulletHeight = items.reduce((total, item) => total + wrapText(font, item, lineSize, width - cardPadding * 2 - 12).length * 11 + 3, 0);
  const height = 34 + bulletHeight;

  page.drawRectangle({
    x,
    y: y - height,
    width,
    height,
    borderWidth: 0.9,
    borderColor: rgb(0.82, 0.82, 0.84),
    color: rgb(1, 1, 1),
  });
  page.drawText(title.toUpperCase(), {
    x: x + cardPadding,
    y: y - 16,
    size: titleSize,
    font: bold,
    color: rgb(0.08, 0.08, 0.1),
  });

  let cursor = y - 30;
  for (const item of items) {
    const wrapped = wrapText(font, item, lineSize, width - cardPadding * 2 - 12);
    page.drawText("•", {
      x: x + cardPadding,
      y: cursor,
      size: lineSize,
      font,
      color: rgb(0.18, 0.16, 0.43),
    });
    wrapped.forEach((wrappedLine, index) => {
      page.drawText(wrappedLine, {
        x: x + cardPadding + 10,
        y: cursor - index * 11,
        size: lineSize,
        font,
        color: rgb(0.16, 0.16, 0.2),
      });
    });
    cursor -= wrapped.length * 11 + 5;
  }

  return height;
}

function drawTwoCardRow(
  page: PDFPage,
  font: PDFFont,
  bold: PDFFont,
  left: { title: string; lines: string[]; mode?: "text" | "bullets" },
  right: { title: string; lines: string[]; mode?: "text" | "bullets" },
  x: number,
  y: number,
  addPage: () => PDFPage,
) {
  const gap = 12;
  const cardWidth = (PAGE_WIDTH - gap) / 2;
  const leftHeight = left.mode === "bullets" ? measureBulletCardHeight(font, cardWidth, left.lines) : measureCardHeight(font, cardWidth, left.lines);
  const rightHeight = right.mode === "bullets" ? measureBulletCardHeight(font, cardWidth, right.lines) : measureCardHeight(font, cardWidth, right.lines);
  const rowHeight = Math.max(leftHeight, rightHeight);
  const next = ensureSpace(page, y, rowHeight + 8, addPage);
  page = next.page;
  const rowTop = next.y;

  if (left.mode === "bullets") {
    drawBulletCard(page, font, bold, left.title, x, rowTop, cardWidth, left.lines);
  } else {
    drawCard(page, font, bold, left.title, x, rowTop, cardWidth, left.lines);
  }
  if (right.mode === "bullets") {
    drawBulletCard(page, font, bold, right.title, x + cardWidth + gap, rowTop, cardWidth, right.lines);
  } else {
    drawCard(page, font, bold, right.title, x + cardWidth + gap, rowTop, cardWidth, right.lines);
  }

  return { page, y: rowTop - rowHeight - 12 };
}

function drawParagraph(page: PDFPage, font: PDFFont, text: string, x: number, y: number, size = 10.2, maxWidth = PAGE_WIDTH) {
  const lines = wrapText(font, text, size, maxWidth);
  let cursor = y;
  for (const line of lines) {
    page.drawText(line, { x, y: cursor, size, font, color: rgb(0.12, 0.12, 0.18) });
    cursor -= LINE_HEIGHT;
  }
  return cursor;
}

function drawBullets(page: PDFPage, font: PDFFont, items: string[], x: number, y: number, size = 10, maxWidth = PAGE_WIDTH) {
  let cursor = y;
  for (const item of items) {
    const lines = wrapText(font, item, size, maxWidth - 14);
    page.drawText("-", { x, y: cursor, size, font, color: rgb(0.18, 0.16, 0.43) });
    lines.forEach((line, index) => {
      page.drawText(line, {
        x: x + 14,
        y: cursor - index * LINE_HEIGHT,
        size,
        font,
        color: rgb(0.12, 0.12, 0.18),
      });
    });
    cursor -= Math.max(lines.length, 1) * LINE_HEIGHT + 4;
  }
  return cursor;
}

function drawSkillGroups(
  page: PDFPage,
  font: PDFFont,
  bold: PDFFont,
  groups: ResumeDraft["skillGroups"],
  x: number,
  y: number,
  addPage: () => PDFPage,
) {
  let cursor = y;
  for (const group of groups) {
    const estimatedHeight = 28 + group.items.length * 18;
    const next = ensureSpace(page, cursor, estimatedHeight, addPage);
    page = next.page;
    cursor = next.y;

    page.drawText(group.title, {
      x,
      y: cursor,
      size: 10.4,
      font: bold,
      color: rgb(0.1, 0.1, 0.15),
    });
    cursor -= 12;
    cursor = drawBullets(page, font, group.items, x + 4, cursor, 9.8);
    cursor -= 4;
  }
  return { page, y: cursor };
}

async function saveBlob(bytes: Uint8Array, filename: string) {
  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function downloadResumePdf(draft: ResumeDraft = defaultResumeDraft) {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let cursor = A4_HEIGHT - MARGIN;

  drawCenteredHeader(
    pdfDoc,
    page,
    font,
    bold,
    draft,
    cursor,
  );
  cursor -= 58;

  drawSectionTitle(page, font, "Professional Summary", cursor);
  cursor -= 18;
  cursor = drawParagraph(page, font, draft.summary, MARGIN, cursor, 10.2);
  cursor -= 8;

  drawSectionTitle(page, font, "Core Competencies", cursor);
  cursor -= 18;
  const groupedSkills = drawSkillGroups(page, font, bold, draft.skillGroups, MARGIN, cursor, () => pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]));
  page = groupedSkills.page;
  cursor = groupedSkills.y;
  cursor -= 6;

  drawSectionTitle(page, font, "Professional Highlights", cursor);
  cursor -= 18;
  const experienceLines = [
    `${draft.experience[0].role}`,
    `${draft.experience[0].org} | ${draft.experience[0].duration}`,
    draft.experience[0].bullets[0],
  ];
  const researchLines = [
    draft.researchFocus[0],
    draft.researchFocus[1],
  ];
  const experienceRow = drawTwoCardRow(
    page,
    font,
    bold,
    { title: "Professional Experience", lines: experienceLines },
    { title: "Research Focus", lines: researchLines },
    MARGIN,
    cursor,
    () => pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]),
  );
  page = experienceRow.page;
  cursor = experienceRow.y;

  page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);
  cursor = A4_HEIGHT - MARGIN;

  drawSectionTitle(page, font, "Education", cursor);
  cursor -= 18;
  for (const item of draft.education) {
    const next = ensureSpace(page, cursor, 56, () => pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]));
    page = next.page;
    cursor = next.y;
    page.drawText(item.degree, { x: MARGIN, y: cursor, size: 10.4, font: bold, color: rgb(0.08, 0.08, 0.1) });
    cursor -= 10;
    page.drawText(item.org, { x: MARGIN, y: cursor, size: 9.0, font, color: rgb(0.23, 0.23, 0.28) });
    cursor -= 10;
    cursor = drawBullets(page, font, [item.note], MARGIN + 4, cursor, 9.2);
    cursor -= 6;
  }

  drawSectionTitle(page, font, "Credentials & Training", cursor);
  cursor -= 18;
  const credentialsRow = drawTwoCardRow(
    page,
    font,
    bold,
    { title: "Certifications", lines: draft.certifications, mode: "bullets" },
    { title: "Trainings", lines: draft.trainings, mode: "bullets" },
    MARGIN,
    cursor,
    () => pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]),
  );
  page = credentialsRow.page;
  cursor = credentialsRow.y;

  drawSectionTitle(page, font, "Languages", cursor);
  cursor -= 18;
  cursor = drawParagraph(page, font, draft.languagesLine, MARGIN, cursor, 9.8);

  const bytes = await pdfDoc.save();
  await saveBlob(bytes, `${draft.name.replace(/\s+/g, "-")}-Resume.pdf`);
}

export async function downloadCoverLetterPdf(draft: CoverLetterDraft = defaultCoverLetterDraft) {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let cursor = A4_HEIGHT - MARGIN;

  page.drawText(draft.name, { x: MARGIN, y: cursor, size: 18, font: bold, color: rgb(0.1, 0.1, 0.15) });
  cursor -= 18;
  page.drawText(draft.title, { x: MARGIN, y: cursor, size: 10.5, font, color: rgb(0.18, 0.16, 0.43) });
  cursor -= 16;
  drawContactLine(
    pdfDoc,
    page,
    font,
    [
      { text: draft.phone, uri: `tel:${draft.phone.replace(/\s+/g, "")}` },
      { text: draft.email, uri: `mailto:${draft.email}` },
      { text: "Portfolio Website", uri: draft.portfolioUrl },
      { text: "LinkedIn Profile", uri: draft.linkedinUrl },
    ],
    cursor,
    8.8,
  );
  cursor -= 24;

  page.drawText(`Date: ${draft.date}`, { x: MARGIN, y: cursor, size: 10, font, color: rgb(0.12, 0.12, 0.18) });
  cursor -= 20;
  page.drawText(draft.recipient, { x: MARGIN, y: cursor, size: 10.2, font: bold, color: rgb(0.12, 0.12, 0.18) });
  cursor -= 14;
  page.drawText(`Subject: ${draft.subject}`, {
    x: MARGIN,
    y: cursor,
    size: 10.2,
    font: bold,
    color: rgb(0.12, 0.12, 0.18),
  });
  cursor -= 22;

  for (const paragraph of draft.paragraphs) {
    const lines = wrapText(font, paragraph, 10.2, PAGE_WIDTH);
    const needed = lines.length * LINE_HEIGHT + 4;
    const next = ensureSpace(page, cursor, needed, () => pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]));
    page = next.page;
    cursor = next.y;
    if (paragraph === "Dear Hiring Manager," || paragraph === "Sincerely," || paragraph === draft.name) {
      page.drawText(paragraph, { x: MARGIN, y: cursor, size: 10.2, font: bold, color: rgb(0.12, 0.12, 0.18) });
      cursor -= 16;
      continue;
    }
    cursor = drawParagraph(page, font, paragraph, MARGIN, cursor, 10.2);
    cursor -= 6;
  }

  const bytes = await pdfDoc.save();
  await saveBlob(bytes, `${draft.name.replace(/\s+/g, "-")}-Cover-Letter.pdf`);
}
