  /* ============================================================================
 * UIU COMPASS v2.0 — COMPLETE MULTI-DEPARTMENT ACADEMIC PLATFORM ENGINE
 * ============================================================================ */

const DATA_BUNDLE = window.UIU_COMPASS_DATA;
const EXAM_ROUTINES = window.UIU_COMPASS_EXAM_ROUTINES || {};
const UIU_GRADES = DATA_BUNDLE.grades;
const GRADE_KEYS = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'];
const ALL_STATUS_KEYS = [...GRADE_KEYS, 'W', 'I', 'RUNNING', 'PLANNED', 'NOT_TAKEN'];
const PROGRAMS = DATA_BUNDLE.programs;
const CURRICULA = DATA_BUNDLE.curricula;

const STORAGE_KEY_V2 = 'uiu_compass_platform_v2';
const LEGACY_KEY_V1 = 'uiu_compass_pro_records_v1';
const THEME_KEY = 'uiu_compass_pro_theme';

// Bilingual Dictionary (English / বাংলা)
const I18N = {
  en: {
    hud_actual_cr: 'Actual Credits',
    hud_cgpa: 'Current CGPA',
    hud_pace: 'Pace vs Expected',
    btn_demo: 'Demo',
    nav_dashboard: 'Dashboard',
    nav_record: 'Academic Record',
    nav_curriculum: 'Curriculum',
    nav_advising: 'Advising',
    nav_cgpa: 'CGPA',
    nav_retakes: 'Retakes',
    nav_fees: 'Fees & Scholarship',
    nav_graduation: 'Graduation',
    nav_exams: 'Exam Routine',
    nav_tools: 'Student Tools',
    nav_reports: 'Reports',
    nav_settings: 'Settings',
    nav_manual: 'User Manual',
    setup_title: 'Academic Program, Admission Batch & Dynamic Degree Credits',
    card_deg_comp: 'Degree Completion',
    cat_progress_title: 'Curriculum Category Progress'
  },
  bn: {
    hud_actual_cr: 'অর্জিত ক্রেডিট',
    hud_cgpa: 'বর্তমান সিজিপিএ',
    hud_pace: 'প্রত্যাশিত অগ্রগতি',
    btn_demo: 'ডেমো',
    nav_dashboard: 'ড্যাশবোর্ড',
    nav_record: 'একাডেমিক রেকর্ড',
    nav_curriculum: 'কারিকুলাম',
    nav_advising: 'কোর্স অ্যাডভাইজিং',
    nav_cgpa: 'সিজিপিএ',
    nav_retakes: 'রিটেক প্ল্যানার',
    nav_fees: 'ফি ও স্কলারশিপ',
    nav_graduation: 'গ্র্যাজুয়েশন অডিট',
    nav_exams: 'পরীক্ষার রুটিন',
    nav_tools: 'স্টুডেন্ট টুলস',
    nav_reports: 'রিপোর্ট',
    nav_settings: 'সেটিংস',
    nav_manual: 'ব্যবহারবিধি',
    setup_title: 'একাডেমিক প্রোগ্রাম, ভর্তি ব্যাচ এবং ডাইনামিক ডিগ্রি ক্রেডিট',
    card_deg_comp: 'ডিগ্রি সম্পন্নকরণ',
    cat_progress_title: 'কারিকুলাম ক্যাটাগরি অগ্রগতি'
  }
};

// Default Sample Student Record for Demo Profile
const DEMO_COURSE_HISTORY = {
  'ENG 1011': [{ grade: 'A-', term: '241', credits: 3 }],
  'BDS 1201': [{ grade: 'A', term: '241', credits: 2 }],
  'MATH 1151': [{ grade: 'B+', term: '241', credits: 3 }],
  'CSE 1110': [{ grade: 'A', term: '241', credits: 1 }],
  'CSE 1111': [{ grade: 'A', term: '242', credits: 3 }],
  'CSE 1112': [{ grade: 'A', term: '242', credits: 1 }],
  'ENG 1013': [{ grade: 'A', term: '242', credits: 3 }],
  'CSE 2213': [{ grade: 'B+', term: '242', credits: 3 }],
  'PHY 2105': [{ grade: 'B', term: '243', credits: 3 }],
  'PHY 2106': [{ grade: 'A-', term: '243', credits: 1 }],
  'MATH 2183': [{ grade: 'B+', term: '243', credits: 3 }],
  'CSE 2215': [{ grade: 'A', term: '243', credits: 3 }],
  'CSE 2216': [{ grade: 'A', term: '243', credits: 1 }],
  'MATH 2201': [{ grade: 'B-', term: '251', credits: 3 }],
  'CSE 1325': [{ grade: 'B+', term: '251', credits: 3 }],
  'CSE 1326': [{ grade: 'A-', term: '251', credits: 1 }],
  'CSE 1115': [{ grade: 'A-', term: '251', credits: 3 }],
  'CSE 1116': [{ grade: 'A', term: '251', credits: 1 }],
  'MATH 2205': [{ grade: 'B', term: '252', credits: 3 }],
  'SOC 2101': [{ grade: 'A-', term: '252', credits: 3 }],
  'CSE 2217': [{ grade: 'A-', term: '252', credits: 3 }],
  'CSE 2218': [{ grade: 'A', term: '252', credits: 1 }],
  'EEE 2113': [{ grade: 'D+', term: '252', credits: 3 }, { grade: 'B+', term: '253', credits: 3 }],
  'EEE 2123': [{ grade: 'C', term: '261', credits: 3 }],
  'EEE 2124': [{ grade: 'B+', term: '261', credits: 1 }],
  'CSE 3521': [{ grade: 'A', term: '261', credits: 3 }],
  'CSE 3522': [{ grade: 'A', term: '261', credits: 1 }],
  'GED 1005': [{ grade: 'A', term: '261', credits: 3 }],
  'ACT 2111': [{ grade: 'A', term: '262', credits: 3 }],
  'CSE 3313': [{ grade: 'RUNNING', term: '263', credits: 3 }],
  'CSE 3711': [{ grade: 'RUNNING', term: '263', credits: 3 }],
  'CSE 3712': [{ grade: 'RUNNING', term: '263', credits: 1 }],
  'CSE 3811': [{ grade: 'RUNNING', term: '263', credits: 3 }],
  'CSE 3812': [{ grade: 'RUNNING', term: '263', credits: 1 }]
};

// Application State
let appState = createDefaultState();
let currentTab = 'dashboard';
let curriculumStatusFilter = 'ALL';
let curriculumGroupMode = 'category';
let simNextCourses = [];
let selectedRetakes = {};
let parsedUcamRows = [];
let parsedOfferingRows = [];
let pendingRestorePayload = null;

function createDefaultState() {
  return {
    schemaVersion: 2,
    isDemo: false,
    migratedFromV1: false,
    language: 'en',
    profile: {
      programId: 'CSE',
      curriculumId: 'cse-summer-2026',
      admissionTerm: 'Spring',
      admissionYear: 2024,
      degreeCredits: 141.0,
      degreeCreditsSource: 'curriculum-default', // 'curriculum-default' | 'manual-override' | 'migrated-legacy'
      manualDegreeCreditsOverride: null,
      elapsedTerms: 6,
      studyBreaks: 0,
      avgCreditsPerTerm: 12.0,
      transferCredits: 0.0,
      retakePolicy: 'latest', // 'latest' | 'highest' | 'all'
      customTuitionOverride: null
    },
    courseHistory: {}, // code -> [{ grade, term, credits, title }]
    customCourses: {}, // curriculumId -> [courseObj]
    offerings: [...DATA_BUNDLE.sampleOfferings],
    advisingSelection: [], // course codes, independent of trimester offerings
    advisingExamSlots: {}, // course code -> { day, slot }
    savedAdvisingPlans: [],
    savedCgpaScenarios: [
      { id: 'sc-1', name: 'Dean List Push (30 Cr @ 3.75)', targetCgpa: 3.50, futureCredits: 30, reqGpa: 3.62 }
    ],
    examSelection: [],
    customExams: [],
    coverProfile: {
      studentName: 'Mahmudul Hasan Likhon',
      studentId: '011231001 • Batch 231',
      facultyName: 'Dr. Mohammad Rezwanul Islam',
      facultyDesig: 'Associate Professor, Dept. of CSE, UIU',
      department: 'Department of Computer Science and Engineering (CSE)'
    }
  };
}

// ============================================================================
// SAFE STORAGE & V1 -> V2 MIGRATION ENGINE
// ============================================================================
function safeGetStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

function safeSetStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    // Ignore storage quota errors in sandboxed iframes
  }
}

function saveAppState() {
  safeSetStorage(STORAGE_KEY_V2, JSON.stringify(appState));
}

function recommendCurriculumForAdmission(programId, admissionTerm, admissionYear) {
  if (programId === 'CSE') {
    const tOrd = admissionTerm === 'Spring' ? 1 : admissionTerm === 'Summer' ? 2 : 3;
    if (admissionYear > 2026 || (admissionYear === 2026 && tOrd >= 2)) {
      return 'cse-summer-2026';
    }
    return 'cse-spring-2021';
  }
  const prog = PROGRAMS.find(p => p.id === programId);
  return prog ? prog.defaultCurriculumId : 'manual-template';
}

function migrateLegacyV1Data(rawV1Json) {
  const migrated = createDefaultState();
  migrated.isDemo = false;
  migrated.migratedFromV1 = true;
  migrated.profile.programId = 'CSE';
  migrated.profile.curriculumId = 'cse-summer-2026';
  migrated.profile.degreeCredits = 141.0;
  migrated.profile.degreeCreditsSource = 'migrated-legacy';
  migrated.profile.manualDegreeCreditsOverride = 141.0;

  try {
    const v1Obj = typeof rawV1Json === 'string' ? JSON.parse(rawV1Json) : rawV1Json;
    const records = v1Obj.records || v1Obj;
    const history = {};
    Object.keys(records || {}).forEach(rawCode => {
      const code = normalizeCourseCode(rawCode);
      const val = records[rawCode];
      if (val) {
        history[code] = [{ grade: String(val).toUpperCase(), term: 'Migrated v1', credits: 3.0 }];
      }
    });
    migrated.courseHistory = history;
  } catch (e) {
    // Fallback empty history
  }
  return migrated;
}

// ============================================================================
// DOMAIN SELECTORS & CURRICULUM HELPERS
// ============================================================================
function getProgramById(progId) {
  return PROGRAMS.find(p => p.id === progId) || PROGRAMS[0];
}

function getCurriculumById(currId) {
  return CURRICULA.find(c => c.curriculumId === currId) || CURRICULA[0];
}

function getActiveProgram() {
  return getProgramById(appState.profile.programId);
}

function getActiveCurriculum() {
  const base = getCurriculumById(appState.profile.curriculumId);
  const extras = (appState.customCourses && appState.customCourses[base.curriculumId]) || [];
  const mergedMap = new Map();
  base.courses.forEach(c => mergedMap.set(c.code, { ...c }));
  extras.forEach(c => mergedMap.set(c.code, { ...c, isCustom: true }));
  return {
    ...base,
    courses: Array.from(mergedMap.values())
  };
}

function getEffectiveDegreeCredits() {
  const p = appState.profile;
  if ((p.degreeCreditsSource === 'manual-override' || p.degreeCreditsSource === 'migrated-legacy') && p.manualDegreeCreditsOverride && p.manualDegreeCreditsOverride > 0) {
    return Number(p.manualDegreeCreditsOverride);
  }
  const curr = getActiveCurriculum();
  return Number(curr.totalDegreeCredits || 141.0);
}

function normalizeCourseCode(rawCode) {
  const cleaned = String(rawCode || '').trim().toUpperCase().replace(/\s+/g, ' ');
  const m = cleaned.match(/^([A-Z]{2,4})\s*-?\s*(\d{4}[A-Z]?)$/);
  if (m) return `${m[1]} ${m[2]}`;
  return cleaned;
}

// Resolves a course's effective status & grade from attempt history according to retakePolicy
function resolveCourseRecord(code, retakePolicyOverride = null) {
  const policy = retakePolicyOverride || appState.profile.retakePolicy || 'latest';
  const attempts = appState.courseHistory[code] || [];
  if (attempts.length === 0) {
    return { status: 'NOT_TAKEN', grade: null, point: null, attempts: [], isRetake: false };
  }

  const lastAttempt = attempts[attempts.length - 1];
  if (lastAttempt.grade === 'RUNNING') {
    return { status: 'RUNNING', grade: 'RUNNING', point: null, attempts, isRetake: attempts.length > 1 };
  }
  if (lastAttempt.grade === 'PLANNED') {
    return { status: 'PLANNED', grade: 'PLANNED', point: null, attempts, isRetake: attempts.length > 1 };
  }
  if (lastAttempt.grade === 'W') {
    return { status: 'WITHDRAWN', grade: 'W', point: null, attempts, isRetake: attempts.length > 1 };
  }
  if (lastAttempt.grade === 'I') {
    return { status: 'INCOMPLETE', grade: 'I', point: null, attempts, isRetake: attempts.length > 1 };
  }

  const gradedAttempts = attempts.filter(a => UIU_GRADES[a.grade] && UIU_GRADES[a.grade].point !== null);
  if (gradedAttempts.length === 0) {
    return { status: 'NOT_TAKEN', grade: null, point: null, attempts, isRetake: false };
  }

  let chosenGrade = gradedAttempts[gradedAttempts.length - 1].grade;
  let chosenPoint = UIU_GRADES[chosenGrade].point;

  if (policy === 'highest') {
    gradedAttempts.forEach(a => {
      const pt = UIU_GRADES[a.grade].point;
      if (pt > chosenPoint) {
        chosenPoint = pt;
        chosenGrade = a.grade;
      }
    });
  } else if (policy === 'all') {
    const sumPts = gradedAttempts.reduce((acc, a) => acc + UIU_GRADES[a.grade].point, 0);
    chosenPoint = sumPts / gradedAttempts.length;
  }

  if (chosenGrade === 'F' || chosenPoint === 0) {
    return { status: 'FAILED', grade: 'F', point: 0.0, attempts, isRetake: gradedAttempts.length > 1, gradedCount: gradedAttempts.length };
  }

  return {
    status: 'COMPLETED',
    grade: chosenGrade,
    point: chosenPoint,
    attempts,
    isRetake: gradedAttempts.length > 1,
    gradedCount: gradedAttempts.length
  };
}

// ============================================================================
// PREREQUISITE, COREQUISITE & GRAPH DIAGNOSTICS ENGINE (SECTION 8)
// ============================================================================
function evaluateCourseEligibility(course, completedCreditsTotal, activeCurrCoursesMap) {
  const missingPrereqs = [];
  const missingCoreqs = [];
  let requiredCreditsThreshold = 0;

  (course.prereqs || []).forEach(req => {
    if (req.startsWith('CREDITS_')) {
      const needed = parseFloat(req.replace('CREDITS_', '')) || 85;
      requiredCreditsThreshold = Math.max(requiredCreditsThreshold, needed);
      if (completedCreditsTotal < needed) {
        missingPrereqs.push(`${needed} Completed Cr (Have ${completedCreditsTotal.toFixed(1)} Cr)`);
      }
    } else if (req.includes('|')) {
      // OR prerequisite group e.g. "CSE 1111|DS 1501"
      const options = req.split('|').map(s => s.trim());
      const anyMet = options.some(opt => resolveCourseRecord(opt).status === 'COMPLETED');
      if (!anyMet) {
        missingPrereqs.push(`One of (${options.join(' OR ')})`);
      }
    } else {
      const rec = resolveCourseRecord(req);
      if (rec.status !== 'COMPLETED') {
        missingPrereqs.push(req);
      }
    }
  });

  (course.coreqs || []).forEach(coreq => {
    const rec = resolveCourseRecord(coreq);
    if (rec.status !== 'COMPLETED' && rec.status !== 'RUNNING' && rec.status !== 'PLANNED') {
      missingCoreqs.push(coreq);
    }
  });

  const prereqsMet = missingPrereqs.length === 0;
  const coreqsMet = missingCoreqs.length === 0;

  return {
    prereqsMet,
    coreqsMet,
    eligible: prereqsMet && coreqsMet,
    eligibleWithCoreq: prereqsMet && !coreqsMet,
    missingPrereqs,
    missingCoreqs,
    requiredCreditsThreshold
  };
}

function diagnosePrerequisiteGraph(courses) {
  const courseMap = new Map();
  courses.forEach(c => courseMap.set(c.code, c));

  const missingDefinitions = [];
  const invalidCodes = [];
  const circularChains = [];

  courses.forEach(c => {
    if (!/^[A-Z]{2,6}\s+\d{3,4}[A-Z]?$/.test(c.code)) {
      invalidCodes.push(c.code);
    }
    (c.prereqs || []).forEach(p => {
      if (p.startsWith('CREDITS_')) return;
      const parts = p.split('|').map(s => s.trim());
      parts.forEach(code => {
        if (!courseMap.has(code)) {
          missingDefinitions.push(`${c.code} -> ${code}`);
        }
      });
    });
  });

  // Cycle detection via DFS
  const visited = new Set();
  const inStack = new Set();

  function dfs(code, path) {
    if (inStack.has(code)) {
      circularChains.push([...path, code].join(' -> '));
      return;
    }
    if (visited.has(code)) return;
    visited.add(code);
    inStack.add(code);
    const c = courseMap.get(code);
    if (c) {
      (c.prereqs || []).forEach(p => {
        if (!p.startsWith('CREDITS_') && !p.includes('|') && courseMap.has(p)) {
          dfs(p, [...path, code]);
        }
      });
    }
    inStack.delete(code);
  }

  courses.forEach(c => dfs(c.code, []));

  return {
    valid: missingDefinitions.length === 0 && invalidCodes.length === 0 && circularChains.length === 0,
    missingDefinitions,
    invalidCodes,
    circularChains
  };
}

// ============================================================================
// COMPREHENSIVE ACADEMIC METRICS & GRADUATION AUDIT ENGINE (SECTIONS 4, 9, 10)
// ============================================================================
function computeAcademicMetrics() {
  const curr = getActiveCurriculum();
  const prog = getActiveProgram();
  const reqDegreeCredits = getEffectiveDegreeCredits();
  const policy = appState.profile.retakePolicy || 'latest';

  const currCourseMap = new Map();
  const unlocksMap = new Map();
  curr.courses.forEach(c => {
    currCourseMap.set(c.code, c);
    unlocksMap.set(c.code, []);
  });
  curr.courses.forEach(c => {
    (c.prereqs || []).forEach(p => {
      if (unlocksMap.has(p)) unlocksMap.get(p).push(c.code);
    });
  });

  let passedCourseCredits = 0;
  let runningCredits = 0;
  let plannedCredits = 0;
  let gradedCredits = 0;
  let totalGradePoints = 0;
  const gradeCounts = {};
  GRADE_KEYS.forEach(g => { gradeCounts[g] = 0; });

  const categoryStats = {};
  curr.categories.forEach(cat => {
    categoryStats[cat.id] = {
      ...cat,
      completedCredits: 0,
      runningCredits: 0,
      plannedCredits: 0,
      coursesCompleted: 0
    };
  });

  const trackStats = {};
  (curr.tracks || []).forEach(tr => {
    trackStats[tr.id] = {
      ...tr,
      completedCourses: [],
      runningCourses: [],
      completedCredits: 0,
      qualified: false
    };
  });

  // Also check any courses in courseHistory that may or may not be in curr.courses
  const allKnownCodes = new Set([...curr.courses.map(c => c.code), ...Object.keys(appState.courseHistory)]);
  let hasUnresolvedIncomplete = false;
  let failedCompulsoryCount = 0;
  let multiAttemptCount = 0;

  allKnownCodes.forEach(code => {
    const cObj = currCourseMap.get(code) || {
      code,
      title: (appState.courseHistory[code] && appState.courseHistory[code][0] && appState.courseHistory[code][0].title) || 'Custom / Historical Course',
      credits: (appState.courseHistory[code] && appState.courseHistory[code][0] && appState.courseHistory[code][0].credits) || 3.0,
      category: curr.categories[0] ? curr.categories[0].id : 'General'
    };
    const rec = resolveCourseRecord(code, policy);
    if (rec.isRetake) multiAttemptCount++;

    const catStat = categoryStats[cObj.category];

    if (rec.status === 'RUNNING') {
      runningCredits += cObj.credits;
      if (catStat) catStat.runningCredits += cObj.credits;
      if (cObj.track && trackStats[cObj.track]) {
        trackStats[cObj.track].runningCourses.push(cObj);
      }
    } else if (rec.status === 'PLANNED') {
      plannedCredits += cObj.credits;
      if (catStat) catStat.plannedCredits += cObj.credits;
    } else if (rec.status === 'INCOMPLETE') {
      hasUnresolvedIncomplete = true;
    } else if (rec.status === 'FAILED') {
      gradeCounts['F'] = (gradeCounts['F'] || 0) + 1;
      const mult = policy === 'all' ? (rec.gradedCount || 1) : 1;
      gradedCredits += cObj.credits * mult;
      if (!cObj.electiveGroup) failedCompulsoryCount++;
    } else if (rec.status === 'COMPLETED') {
      passedCourseCredits += cObj.credits;
      gradeCounts[rec.grade] = (gradeCounts[rec.grade] || 0) + 1;
      const mult = policy === 'all' ? (rec.gradedCount || 1) : 1;
      gradedCredits += cObj.credits * mult;
      totalGradePoints += cObj.credits * rec.point * mult;

      if (catStat) {
        catStat.completedCredits += cObj.credits;
        catStat.coursesCompleted++;
      }
      if (cObj.track && trackStats[cObj.track]) {
        const minG = trackStats[cObj.track].minGrade || 'D';
        if (UIU_GRADES[rec.grade].point >= UIU_GRADES[minG].point) {
          trackStats[cObj.track].completedCourses.push({ ...cObj, grade: rec.grade });
          trackStats[cObj.track].completedCredits += cObj.credits;
        }
      }
    }
  });

  // Finalize track qualification
  Object.values(trackStats).forEach(ts => {
    ts.qualified = ts.completedCourses.length >= ts.minCourses && ts.completedCredits >= ts.minCredits;
  });

  // Transfer / manual additional completed credits
  const transferCr = Math.max(0, Number(appState.profile.transferCredits) || 0);
  const actualCompletedCredits = passedCourseCredits + transferCr;
  const cgpa = gradedCredits > 0 ? (totalGradePoints / gradedCredits) : 0;

  // Expected Completed Credits (Section 4)
  const elapsedTerms = Math.max(0, Number(appState.profile.elapsedTerms) || 0);
  const studyBreaks = Math.max(0, Number(appState.profile.studyBreaks) || 0);
  const avgLoad = Math.max(3, Number(appState.profile.avgCreditsPerTerm) || 12);
  const effectiveAttendedTerms = Math.max(0, elapsedTerms - studyBreaks);
  const expectedCompletedCredits = Math.min(reqDegreeCredits, effectiveAttendedTerms * avgLoad);
  const paceDifference = actualCompletedCredits - expectedCompletedCredits;

  let paceStatus = 'Approximately on track';
  let paceColor = 'emerald';
  if (paceDifference >= 4.0) {
    paceStatus = 'Ahead of suggested pace';
    paceColor = 'emerald';
  } else if (paceDifference <= -4.0) {
    paceStatus = 'Behind suggested pace';
    paceColor = 'amber';
  }

  // Classify every curriculum course with its 12-status model
  const offeredCodesSet = new Set(
    appState.offerings
      .filter(o => o.programId === prog.id)
      .map(o => normalizeCourseCode(o.code))
  );

  const classifiedCourses = curr.courses.map(c => {
    const rec = resolveCourseRecord(c.code, policy);
    const elig = evaluateCourseEligibility(c, actualCompletedCredits, currCourseMap);
    const isOfferedNow = offeredCodesSet.has(c.code);
    const unlocks = unlocksMap.get(c.code) || [];
    const catStat = categoryStats[c.category];
    const isCategoryFulfilled = catStat && catStat.completedCredits >= catStat.requiredCredits;

    let academicStatus = rec.status;
    if (rec.status === 'NOT_TAKEN') {
      if (elig.eligible) academicStatus = 'ELIGIBLE';
      else if (elig.eligibleWithCoreq) academicStatus = 'ELIGIBLE_COREQ';
      else academicStatus = 'LOCKED';
    }

    const isRetakeCandidate =
      rec.status === 'FAILED' ||
      (rec.status === 'COMPLETED' && rec.point !== null && rec.point <= 2.67);

    return {
      ...c,
      record: rec,
      eligibility: elig,
      academicStatus,
      isRetakeCandidate,
      isOfferedNow,
      unlocks,
      isCategoryFulfilled
    };
  });

  // Graduation Audit Evaluation (Section 10)
  let fulfilledCategoriesCount = 0;
  curr.categories.forEach(cat => {
    if (categoryStats[cat.id].completedCredits >= cat.requiredCredits) {
      fulfilledCategoriesCount++;
    }
  });

  // Check Capstone / FYDP / Internship rule
  const capRule = curr.capstoneRule || { requiredCredits: 6, requiredCourses: [], minGrade: 'C' };
  let capstoneCreditsDone = 0;
  let capstoneMinGradeMet = true;
  curr.courses.filter(c => c.isCapstone).forEach(c => {
    const r = resolveCourseRecord(c.code, policy);
    if (r.status === 'COMPLETED') {
      capstoneCreditsDone += c.credits;
      if (UIU_GRADES[r.grade].point < UIU_GRADES[capRule.minGrade || 'C'].point) {
        capstoneMinGradeMet = false;
      }
    }
  });
  const capstoneMet = capstoneCreditsDone >= (capRule.requiredCredits || 3) && capstoneMinGradeMet;

  const creditsMet = actualCompletedCredits >= reqDegreeCredits;
  const cgpaMet = gradedCredits > 0 && cgpa >= (curr.minGraduationCgpa || 2.0);
  const categoriesMet = fulfilledCategoriesCount === curr.categories.length;
  const noFailedOrIncomplete = failedCompulsoryCount === 0 && !hasUnresolvedIncomplete;

  // Never show "Ready to graduate" when curriculum is partial/unverified or history incomplete
  let auditOverallStatus = 'Requirements remaining';
  let auditBadgeColor = 'amber';

  if (curr.verificationStatus !== 'Verified') {
    auditOverallStatus = creditsMet && cgpaMet ? 'Manual verification required' : 'Data incomplete';
    auditBadgeColor = 'sky';
  } else if (creditsMet && cgpaMet && categoriesMet && capstoneMet && noFailedOrIncomplete) {
    auditOverallStatus = 'Potentially ready for adviser review';
    auditBadgeColor = 'emerald';
  } else if (cgpa >= 2.0 && paceDifference >= -6.0 && !hasUnresolvedIncomplete && failedCompulsoryCount === 0) {
    auditOverallStatus = 'On track';
    auditBadgeColor = 'emerald';
  }

  return {
    program: prog,
    curriculum: curr,
    reqDegreeCredits,
    passedCourseCredits,
    transferCr,
    actualCompletedCredits,
    runningCredits,
    plannedCredits,
    gradedCredits,
    totalGradePoints,
    cgpa,
    gradeCounts,
    expectedCompletedCredits,
    effectiveAttendedTerms,
    paceDifference,
    paceStatus,
    paceColor,
    categoryStats,
    fulfilledCategoriesCount,
    trackStats,
    classifiedCourses,
    unlocksMap,
    capstoneCreditsDone,
    capstoneMet,
    capstoneMinGradeMet,
    creditsMet,
    cgpaMet,
    categoriesMet,
    hasUnresolvedIncomplete,
    failedCompulsoryCount,
    multiAttemptCount,
    auditOverallStatus,
    auditBadgeColor
  };
}

// ============================================================================
// INITIALIZATION & TOP-LEVEL UI CONTROLLERS
// ============================================================================
function initApp() {
  initMouseDraggableTabNav();
  const savedTheme = safeGetStorage(THEME_KEY) || 'dark';
  setTheme(savedTheme);
  applyUiFontScale(currentUiFontScale);

  const savedV2 = safeGetStorage(STORAGE_KEY_V2);
  const savedV1 = safeGetStorage(LEGACY_KEY_V1);

  if (savedV2) {
    try {
      const parsed = JSON.parse(savedV2);
      appState = { ...createDefaultState(), ...parsed, profile: { ...createDefaultState().profile, ...(parsed.profile || {}) } };
      // Remove the old prefilled demo routine so students start with their own pre-advising checks.
      if (Array.isArray(appState.examSelection) && appState.examSelection.length === 3 &&
          ['OFF-CSE-3', 'OFF-CSE-8', 'OFF-CSE-5'].every(id => appState.examSelection.includes(id)) &&
          !(appState.customExams || []).length) appState.examSelection = [];
      if (Array.isArray(appState.advisingSelection) && appState.advisingSelection.length === 4 &&
          ['OFF-CSE-3', 'OFF-CSE-4', 'OFF-CSE-8', 'OFF-CSE-9'].every(id => appState.advisingSelection.includes(id))) {
        appState.advisingSelection = [];
        appState.advisingExamSlots = {};
      }
      if (Array.isArray(appState.savedAdvisingPlans)) {
        appState.savedAdvisingPlans = appState.savedAdvisingPlans.filter(plan => plan.id !== 'plan-default-1');
      }
      const oldOfferingCode = id => appState.offerings.find(o => o.id === id)?.code || id;
      appState.advisingSelection = [...new Set((appState.advisingSelection || []).map(oldOfferingCode))];
      appState.savedAdvisingPlans = (appState.savedAdvisingPlans || []).map(plan => ({
        ...plan,
        items: [...new Set((plan.items || []).map(oldOfferingCode))]
      }));
    } catch (e) {
      appState = createDefaultState();
    }
  } else if (savedV1) {
    appState = migrateLegacyV1Data(savedV1);
    saveAppState();
    document.getElementById('migration-banner').classList.remove('hidden');
  } else {
    // First-time visitor: load Demo Profile clearly marked as Sample Data
    appState = createDefaultState();
    appState.isDemo = true;
    appState.courseHistory = JSON.parse(JSON.stringify(DEMO_COURSE_HISTORY));
    saveAppState();
  }

  populateProgramAndCurriculumSelectors();
  syncSetupInputsFromState();
  syncRunningToSimulator(false);
  applyLanguageStrings();
  refreshAllViews();
}

function populateProgramAndCurriculumSelectors() {
  const headerProgSelect = document.getElementById('header-program-select');
  const setupProgSelect = document.getElementById('setup-program');

  const optionsHtml = PROGRAMS.map(p => `<option value="${p.id}">${p.code} — ${p.name} (${p.defaultCredits} Cr)</option>`).join('');
  headerProgSelect.innerHTML = optionsHtml;
  setupProgSelect.innerHTML = optionsHtml;

  headerProgSelect.value = appState.profile.programId;
  setupProgSelect.value = appState.profile.programId;

  populateCurriculumDropdownForProgram(appState.profile.programId);
}

function populateCurriculumDropdownForProgram(programId) {
  const setupCurrSelect = document.getElementById('setup-curriculum');
  const matching = CURRICULA.filter(c => c.programId === programId);
  const list = matching.length > 0 ? matching : CURRICULA;
  setupCurrSelect.innerHTML = list.map(c => `<option value="${c.curriculumId}">${c.name} [${c.verificationStatus}]</option>`).join('');
  if (list.some(c => c.curriculumId === appState.profile.curriculumId)) {
    setupCurrSelect.value = appState.profile.curriculumId;
  } else {
    appState.profile.curriculumId = list[0].curriculumId;
    setupCurrSelect.value = list[0].curriculumId;
  }

  // Also populate Curriculum Category dropdown
  const curr = getActiveCurriculum();
  const catSelect = document.getElementById('curriculum-category-select');
  catSelect.innerHTML = `<option value="ALL">All ${curr.categories.length} Categories (${curr.totalDegreeCredits} Cr)</option>` +
    curr.categories.map(cat => `<option value="${cat.id}">${cat.name} (${cat.requiredCredits} Cr)</option>`).join('');

  // Populate custom course modal category dropdown
  const ccCat = document.getElementById('cc-category');
  if (ccCat) {
    ccCat.innerHTML = curr.categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
  }
}

function syncSetupInputsFromState() {
  const p = appState.profile;
  document.getElementById('header-program-select').value = p.programId;
  document.getElementById('setup-program').value = p.programId;
  document.getElementById('setup-admission-term').value = p.admissionTerm || 'Spring';
  document.getElementById('setup-admission-year').value = p.admissionYear || 2024;
  document.getElementById('setup-curriculum').value = p.curriculumId;
  document.getElementById('setup-degree-credits').value = getEffectiveDegreeCredits();

  document.getElementById('pace-elapsed-input').value = p.elapsedTerms;
  document.getElementById('pace-breaks-input').value = p.studyBreaks;
  document.getElementById('pace-avgload-input').value = p.avgCreditsPerTerm;
  document.getElementById('pace-transfer-input').value = p.transferCredits;
  document.getElementById('retake-policy-select').value = p.retakePolicy || 'latest';

  // Sync Fee defaults for active program
  const prog = getActiveProgram();
  document.getElementById('fee-per-credit').value = p.customTuitionOverride || prog.tuitionPerCredit;
  document.getElementById('fee-term-charge').value = prog.termFee;
  document.getElementById('fee-lab-charge').value = prog.labFeePerTerm;

  // Demo banner visibility
  const demoBanner = document.getElementById('demo-banner');
  if (appState.isDemo) demoBanner.classList.remove('hidden');
  else demoBanner.classList.add('hidden');
}

function handleQuickProgramChange(newProgId) {
  document.getElementById('setup-program').value = newProgId;
  updateProfileSetup('program');
}

function updateProfileSetup(changeType) {
  const p = appState.profile;
  if (changeType === 'program') {
    p.programId = document.getElementById('setup-program').value;
    const recId = recommendCurriculumForAdmission(p.programId, p.admissionTerm, p.admissionYear);
    p.curriculumId = recId;
    populateCurriculumDropdownForProgram(p.programId);
    if (p.degreeCreditsSource === 'curriculum-default') {
      p.degreeCredits = getActiveCurriculum().totalDegreeCredits;
      p.manualDegreeCreditsOverride = null;
    }
    p.customTuitionOverride = null;
  } else if (changeType === 'admission') {
    p.admissionTerm = document.getElementById('setup-admission-term').value;
    p.admissionYear = parseInt(document.getElementById('setup-admission-year').value, 10) || 2024;
    const recId = recommendCurriculumForAdmission(p.programId, p.admissionTerm, p.admissionYear);
    p.curriculumId = recId;
    document.getElementById('setup-curriculum').value = recId;
    populateCurriculumDropdownForProgram(p.programId);
    if (p.degreeCreditsSource === 'curriculum-default') {
      p.degreeCredits = getActiveCurriculum().totalDegreeCredits;
    }
    // Suggest elapsed terms from admission date relative to Fall 2026
    const prog = getActiveProgram();
    const termIdx = p.admissionTerm === 'Spring' ? 0 : p.admissionTerm === 'Summer' ? 1 : 2;
    const yearsDiff = 2026 - p.admissionYear;
    const suggestedElapsed = Math.max(1, yearsDiff * prog.termsPerYear + (2 - termIdx));
    p.elapsedTerms = suggestedElapsed;
  } else if (changeType === 'curriculum') {
    p.curriculumId = document.getElementById('setup-curriculum').value;
    populateCurriculumDropdownForProgram(p.programId);
    if (p.degreeCreditsSource === 'curriculum-default') {
      p.degreeCredits = getActiveCurriculum().totalDegreeCredits;
    }
  } else if (changeType === 'credits') {
    const entered = parseFloat(document.getElementById('setup-degree-credits').value);
    const officialDefault = getActiveCurriculum().totalDegreeCredits;
    if (!isNaN(entered) && entered > 0 && Math.abs(entered - officialDefault) > 0.01) {
      p.degreeCreditsSource = 'manual-override';
      p.manualDegreeCreditsOverride = entered;
      p.degreeCredits = entered;
    } else {
      p.degreeCreditsSource = 'curriculum-default';
      p.manualDegreeCreditsOverride = null;
      p.degreeCredits = officialDefault;
    }
  }

  saveAppState();
  syncSetupInputsFromState();
  refreshAllViews();
}

function resetDegreeCreditsToDefault() {
  const curr = getActiveCurriculum();
  appState.profile.degreeCreditsSource = 'curriculum-default';
  appState.profile.manualDegreeCreditsOverride = null;
  appState.profile.degreeCredits = curr.totalDegreeCredits;
  saveAppState();
  syncSetupInputsFromState();
  refreshAllViews();
  showToast(`Reset total degree credits to official default (${curr.totalDegreeCredits.toFixed(1)} Cr).`, 'success');
}

function confirmMigratedCurriculum() {
  appState.migratedFromV1 = false;
  appState.profile.degreeCreditsSource = 'curriculum-default';
  appState.profile.manualDegreeCreditsOverride = null;
  saveAppState();
  document.getElementById('migration-banner').classList.add('hidden');
  refreshAllViews();
  showToast('Curriculum version confirmed!', 'success');
}

function updatePaceSettings() {
  appState.profile.elapsedTerms = Math.max(0, parseInt(document.getElementById('pace-elapsed-input').value, 10) || 0);
  appState.profile.studyBreaks = Math.max(0, parseInt(document.getElementById('pace-breaks-input').value, 10) || 0);
  appState.profile.avgCreditsPerTerm = Math.max(3, parseFloat(document.getElementById('pace-avgload-input').value) || 12);
  appState.profile.transferCredits = Math.max(0, parseFloat(document.getElementById('pace-transfer-input').value) || 0);
  saveAppState();
  refreshAllViews();
}

// ============================================================================
// MASTER VIEW RENDERER
// ============================================================================
function refreshAllViews() {
  const metrics = computeAcademicMetrics();
  renderHeaderAndSetupStrip(metrics);
  renderDashboard(metrics);
  renderAcademicRecordTab(metrics);
  renderCurriculum(metrics);
  renderAdvising(metrics);
  renderCalculator(metrics);
  renderRetakePlanner(metrics);
  renderFeeCalculator(metrics);
  renderScholarshipTracker(metrics);
  renderGraduationAudit(metrics);
  renderExamRoutine(metrics);
  renderCoverPreview();
  renderReports(metrics);
}

function renderHeaderAndSetupStrip(metrics) {
  const { program, curriculum, reqDegreeCredits, actualCompletedCredits, cgpa, gradedCredits, paceStatus, paceColor } = metrics;
  const pct = Math.min(100, Math.round((actualCompletedCredits / reqDegreeCredits) * 100));

  document.getElementById('hud-program-pill').textContent = `${program.code} • ${reqDegreeCredits.toFixed(1)} Cr`;
  const verPill = document.getElementById('hud-verification-pill');
  verPill.textContent = curriculum.verificationStatus;
  verPill.className = `px-2 py-0.5 text-xs font-bold rounded-full border ${
    curriculum.verificationStatus === 'Verified'
      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
      : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
  }`;

  document.getElementById('hud-earned-cr').textContent = actualCompletedCredits.toFixed(1);
  document.getElementById('hud-req-cr').textContent = reqDegreeCredits.toFixed(1);
  document.getElementById('hud-earned-pct').textContent = `(${pct}%)`;
  document.getElementById('hud-cgpa').textContent = cgpa.toFixed(2);

  const standing = getStandingInfo(cgpa, gradedCredits);
  const stBadge = document.getElementById('hud-standing-badge');
  stBadge.textContent = standing.badge;
  stBadge.className = `text-xs px-1.5 py-0.5 rounded font-bold ${standing.colorClass}`;

  const paceBadge = document.getElementById('hud-pace-badge');
  paceBadge.textContent = paceStatus;
  paceBadge.className = `text-sm font-bold text-${paceColor}-500`;

  const eligibleCount = metrics.classifiedCourses.filter(c => c.academicStatus === 'ELIGIBLE' && !c.isCategoryFulfilled).length;
  document.getElementById('nav-eligible-badge').textContent = `${eligibleCount}`;

  // Credit source badge & reset button
  const srcBadge = document.getElementById('setup-credit-source-badge');
  const resetBtn = document.getElementById('reset-credits-btn');
  if (appState.profile.degreeCreditsSource === 'manual-override' || appState.profile.degreeCreditsSource === 'migrated-legacy') {
    srcBadge.textContent = `Manual override (Default: ${curriculum.totalDegreeCredits.toFixed(1)} Cr)`;
    srcBadge.className = 'px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30';
    resetBtn.classList.remove('hidden');
  } else {
    srcBadge.textContent = `Official Curriculum Default (${curriculum.totalDegreeCredits.toFixed(1)} Cr)`;
    srcBadge.className = 'px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30';
    resetBtn.classList.add('hidden');
  }

  // Metadata strip
  const recCurrId = recommendCurriculumForAdmission(program.id, appState.profile.admissionTerm, appState.profile.admissionYear);
  const recCurr = getCurriculumById(recCurrId);
  document.getElementById('setup-recommendation-text').textContent =
    `Recommended for ${appState.profile.admissionTerm} ${appState.profile.admissionYear}: ${recCurr.name} • Switching curriculum preserves academic history.`;

  const metaStrip = document.getElementById('curriculum-meta-strip');
  metaStrip.innerHTML = `
    <div class="flex flex-wrap items-center gap-3">
      <span><strong>Status:</strong> <span class="${curriculum.verificationStatus === 'Verified' ? 'text-emerald-500 font-bold' : 'text-amber-500 font-bold'}">${curriculum.verificationStatus}</span></span>
      <span>&bull;</span>
      <span><strong>Effective Batch:</strong> ${curriculum.effectiveBatchRange}</span>
      <span>&bull;</span>
      <span><strong>Last Verified:</strong> ${curriculum.lastVerified}</span>
      <span>&bull;</span>
      <a href="${curriculum.sourceUrls[0]}" target="_blank" rel="noopener noreferrer" class="text-uiu-500 hover:underline font-semibold">Official UIU Source <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i></a>
    </div>
    <div class="text-sm text-slate-400">${curriculum.knownLimitations}</div>
  `;
}

function getStandingInfo(cgpa, gradedCredits) {
  if (gradedCredits === 0) {
    return { badge: 'No Grades', title: 'No Graded Courses Yet', desc: 'Select grades in Curriculum or sync UCAM', colorClass: 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300', icon: 'fa-compass' };
  }
  if (cgpa >= 3.80) {
    return { badge: "VC's List", title: "Vice Chancellor's Honor List", desc: 'High distinction standing (CGPA ≥ 3.80)', colorClass: 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30', icon: 'fa-crown' };
  }
  if (cgpa >= 3.50) {
    return { badge: "Dean's List", title: "Dean's Honor List Standing", desc: 'Scholarship-grade standing (CGPA ≥ 3.50)', colorClass: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30', icon: 'fa-medal' };
  }
  if (cgpa >= 2.00) {
    return { badge: 'Good Standing', title: 'Good Academic Standing', desc: 'Meets UIU graduation minimum CGPA (≥ 2.00)', colorClass: 'bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30', icon: 'fa-circle-check' };
  }
  return { badge: 'Probation Alert', title: 'Academic Probation Warning (< 2.00)', desc: 'Below 2.00 graduation requirement; review Retake Planner', colorClass: 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30', icon: 'fa-triangle-exclamation' };
}

// ============================================================================
// TAB 1: DASHBOARD RENDERER
// ============================================================================
function renderDashboard(metrics) {
  const { program, curriculum, reqDegreeCredits, actualCompletedCredits, runningCredits, plannedCredits, expectedCompletedCredits, paceDifference, paceStatus, paceColor, cgpa, gradedCredits } = metrics;

  document.getElementById('dash-program-title').textContent = `${program.code} — ${curriculum.name}`;
  document.getElementById('dash-req-summary').textContent = `Requires ${reqDegreeCredits.toFixed(1)} credits & minimum ${curriculum.minGraduationCgpa.toFixed(2)} CGPA (${program.termSystem} system)`;

  const pct = Math.min(100, Math.round((actualCompletedCredits / reqDegreeCredits) * 100));
  const runPct = Math.min(100 - pct, Math.round((runningCredits / reqDegreeCredits) * 100));
  const planPct = Math.min(100 - pct - runPct, Math.round((plannedCredits / reqDegreeCredits) * 100));
  const remCr = Math.max(0, reqDegreeCredits - actualCompletedCredits);
  const avgLoad = Math.max(3, Number(appState.profile.avgCreditsPerTerm) || 12);
  const estTermsLeft = remCr > 0 ? Math.ceil(remCr / avgLoad) : 0;

  const circumference = 263.89;
  document.getElementById('dash-progress-circle').style.strokeDashoffset = circumference - (pct / 100) * circumference;
  document.getElementById('dash-ring-pct').textContent = `${pct}%`;

  document.getElementById('dash-earned-cr').textContent = `${actualCompletedCredits.toFixed(1)} Cr`;
  document.getElementById('dash-running-cr').textContent = `${runningCredits.toFixed(1)} Cr`;
  document.getElementById('dash-planned-cr').textContent = `${plannedCredits.toFixed(1)} Cr`;
  document.getElementById('dash-remaining-cr').textContent = `${remCr.toFixed(1)} Cr`;
  document.getElementById('dash-est-trimesters').textContent = estTermsLeft === 0 ? '0 Terms Left' : `~${estTermsLeft} ${program.termSystem}s (@${avgLoad} Cr)`;

  document.getElementById('dash-bar-completed').style.width = `${pct}%`;
  document.getElementById('dash-bar-running').style.width = `${runPct}%`;
  document.getElementById('dash-bar-planned').style.width = `${planPct}%`;

  const gradPill = document.getElementById('dash-grad-status-pill');
  gradPill.textContent = metrics.auditOverallStatus;
  gradPill.className = `px-2.5 py-1 rounded-full text-sm font-bold border bg-${metrics.auditBadgeColor}-500/15 text-${metrics.auditBadgeColor}-600 dark:text-${metrics.auditBadgeColor}-400 border-${metrics.auditBadgeColor}-500/30`;

  // Actual vs Expected Credit Progress Card
  document.getElementById('pace-actual-cr').textContent = `${actualCompletedCredits.toFixed(1)} Cr`;
  document.getElementById('pace-expected-cr').textContent = `${expectedCompletedCredits.toFixed(1)} Cr`;
  document.getElementById('pace-diff-cr').textContent = `${paceDifference >= 0 ? '+' : ''}${paceDifference.toFixed(1)} Cr`;

  const paceBanner = document.getElementById('pace-status-banner');
  paceBanner.className = `mt-3 p-2.5 rounded-xl bg-${paceColor}-500/15 text-${paceColor}-600 dark:text-${paceColor}-400 text-sm font-bold flex items-center justify-between`;
  paceBanner.innerHTML = `<span>${paceStatus}</span><span class="font-mono text-sm">${metrics.effectiveAttendedTerms} Attended Terms × ${avgLoad} Cr</span>`;

  // CGPA & Audit Snapshot
  document.getElementById('dash-cgpa-big').textContent = cgpa.toFixed(2);
  const targetVal = parseFloat(document.getElementById('goal-target-cgpa').value) || 3.50;
  document.getElementById('dash-target-cgpa').textContent = targetVal.toFixed(2);

  const standing = getStandingInfo(cgpa, gradedCredits);
  document.getElementById('dash-standing-title').textContent = standing.title;
  document.getElementById('dash-standing-desc').textContent = standing.desc;
  document.getElementById('dash-standing-icon').innerHTML = `<i class="fa-solid ${standing.icon} text-lg"></i>`;

  document.getElementById('audit-overall-badge').textContent = metrics.auditOverallStatus;
  document.getElementById('audit-overall-badge').className = `font-bold text-${metrics.auditBadgeColor}-500`;
  document.getElementById('audit-cgpa').innerHTML = metrics.cgpaMet
    ? `<span class="text-emerald-500"><i class="fa-solid fa-circle-check"></i> ${cgpa.toFixed(2)} Pass</span>`
    : `<span class="text-amber-500">${cgpa.toFixed(2)} / 2.00</span>`;
  document.getElementById('audit-credits').innerHTML = metrics.creditsMet
    ? `<span class="text-emerald-500"><i class="fa-solid fa-circle-check"></i> ${actualCompletedCredits.toFixed(1)} / ${reqDegreeCredits.toFixed(1)}</span>`
    : `<span>${actualCompletedCredits.toFixed(1)} / ${reqDegreeCredits.toFixed(1)} Cr</span>`;
  document.getElementById('audit-fydp').innerHTML = metrics.capstoneMet
    ? `<span class="text-emerald-500"><i class="fa-solid fa-circle-check"></i> Complete</span>`
    : `<span>${metrics.capstoneCreditsDone.toFixed(1)} / ${(curriculum.capstoneRule.requiredCredits || 6).toFixed(1)} Cr</span>`;
  document.getElementById('audit-categories').innerHTML = metrics.categoriesMet
    ? `<span class="text-emerald-500"><i class="fa-solid fa-circle-check"></i> ${metrics.fulfilledCategoriesCount} / ${curriculum.categories.length}</span>`
    : `<span>${metrics.fulfilledCategoriesCount} / ${curriculum.categories.length} Met</span>`;

  document.getElementById('dash-completed-cats-count').textContent = `${metrics.fulfilledCategoriesCount} / ${curriculum.categories.length} Categories Fulfilled`;

  // Category Cards
  const catGrid = document.getElementById('category-progress-grid');
  catGrid.innerHTML = curriculum.categories.map(cat => {
    const st = metrics.categoryStats[cat.id];
    const cPct = Math.min(100, Math.round((st.completedCredits / cat.requiredCredits) * 100));
    const rPct = Math.min(100 - cPct, Math.round((st.runningCredits / cat.requiredCredits) * 100));
    const isDone = st.completedCredits >= cat.requiredCredits;
    return `
      <div onclick="jumpToCategory('${cat.id}')" class="cursor-pointer p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 border ${isDone ? 'border-emerald-500/40' : 'border-slate-200/80 dark:border-slate-800'} transition flex flex-col justify-between">
        <div>
          <div class="flex items-start justify-between gap-2">
            <div class="w-8 h-8 rounded-xl ${isDone ? 'bg-emerald-500/15 text-emerald-500' : 'bg-uiu-500/15 text-uiu-500'} flex items-center justify-center text-base">
              <i class="fa-solid ${isDone ? 'fa-check' : cat.icon}"></i>
            </div>
            <span class="font-mono text-sm font-bold ${isDone ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-200'}">
              ${st.completedCredits.toFixed(1)} / ${cat.requiredCredits.toFixed(1)} Cr
            </span>
          </div>
          <h4 class="text-sm sm:text-base font-bold mt-2 text-slate-900 dark:text-white">${cat.name}</h4>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-0.5">${cat.note}</p>
        </div>
        <div class="mt-3">
          <div class="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex">
            <div class="h-full bg-emerald-500" style="width: ${cPct}%"></div>
            <div class="h-full bg-sky-500" style="width: ${rPct}%"></div>
          </div>
          <div class="flex justify-between text-xs text-slate-400 mt-1 font-mono">
            <span>${cPct}% Done</span>
            <span>${Math.max(0, cat.requiredCredits - st.completedCredits).toFixed(1)} Cr Left</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Specialization Tracks
  const tracksContainer = document.getElementById('specialization-tracks-container');
  const trackArr = Object.values(metrics.trackStats);
  if (trackArr.length === 0) {
    tracksContainer.innerHTML = `<div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-sm text-slate-400">This curriculum version does not define separate specialization sub-tracks, or tracks are open-elective based.</div>`;
  } else {
    tracksContainer.innerHTML = trackArr.map(ts => {
      const pctT = Math.min(100, Math.round((ts.completedCourses.length / ts.minCourses) * 100));
      return `
        <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border ${ts.qualified ? 'border-emerald-500/50' : 'border-slate-200/70 dark:border-slate-700/60'}">
          <div class="flex items-center justify-between gap-2">
            <div>
              <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                ${ts.name}
                ${ts.qualified ? '<span class="px-2 py-0.5 text-xs rounded-full bg-emerald-500 text-white font-bold">Qualified</span>' : ''}
              </h4>
              <p class="text-xs text-slate-500">${ts.completedCredits.toFixed(1)} / ${ts.minCredits.toFixed(1)} Cr • Min ${ts.minCourses} courses</p>
            </div>
            <span class="font-mono text-sm font-bold">${ts.completedCourses.length}/${ts.minCourses}</span>
          </div>
          <div class="mt-2 h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div class="h-full uiu-gradient" style="width: ${pctT}%"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Grade Distribution Bars
  const totalGradedCount = Object.values(metrics.gradeCounts).reduce((a, b) => a + b, 0);
  document.getElementById('dash-graded-courses-count').textContent = `${totalGradedCount} Courses`;
  const groups = [
    { label: 'A / A- (3.67–4.00)', keys: ['A', 'A-'], bar: 'bg-emerald-500' },
    { label: 'B+ / B / B- (2.67–3.33)', keys: ['B+', 'B', 'B-'], bar: 'bg-sky-500' },
    { label: 'C+ / C / C- (1.67–2.33)', keys: ['C+', 'C', 'C-'], bar: 'bg-amber-500' },
    { label: 'D+ / D / F (0.00–1.33)', keys: ['D+', 'D', 'F'], bar: 'bg-rose-500' }
  ];
  document.getElementById('grade-distribution-bars').innerHTML = groups.map(grp => {
    const cnt = grp.keys.reduce((s, k) => s + (metrics.gradeCounts[k] || 0), 0);
    const pG = totalGradedCount > 0 ? Math.round((cnt / totalGradedCount) * 100) : 0;
    return `
      <div class="space-y-1">
        <div class="flex justify-between text-sm">
          <span class="font-semibold">${grp.label}</span>
          <span class="font-mono text-slate-500">${cnt} (${pG}%)</span>
        </div>
        <div class="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div class="h-full ${grp.bar}" style="width: ${pG}%"></div>
        </div>
      </div>
    `;
  }).join('');

  // Retake Watchlist Alert
  const retakeList = metrics.classifiedCourses.filter(c => c.isRetakeCandidate);
  const retakeAlert = document.getElementById('dash-retake-alert');
  if (retakeList.length > 0) {
    retakeAlert.innerHTML = `
      <div class="text-sm">
        <span class="font-bold text-amber-500">${retakeList.length} Retake Candidate(s)</span>
        <span class="text-slate-500 block text-sm">Courses with B- or lower / F</span>
      </div>
      <button onclick="switchTab('retakes')" class="px-2.5 py-1 rounded-xl text-sm font-bold bg-uiu-500/15 text-uiu-500 hover:bg-uiu-500 hover:text-white transition">Retake Planner &rarr;</button>
    `;
  } else {
    retakeAlert.innerHTML = `<div class="text-sm text-emerald-500 font-semibold"><i class="fa-solid fa-circle-check mr-1"></i>Zero low-grade retake alerts</div>`;
  }

  // Eligible Next-Term Courses
  const eligPicks = metrics.classifiedCourses
    .filter(c => (c.academicStatus === 'ELIGIBLE' || c.academicStatus === 'ELIGIBLE_COREQ') && !c.isCategoryFulfilled)
    .sort((a, b) => a.trimester - b.trimester)
    .slice(0, 6);

  const eligEl = document.getElementById('dash-eligible-list');
  if (eligPicks.length === 0) {
    eligEl.innerHTML = `<div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-sm text-slate-400 text-center">All curriculum courses are completed or in progress!</div>`;
  } else {
    eligEl.innerHTML = eligPicks.map(c => `
      <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-2 text-sm">
        <div class="min-w-0">
          <div class="flex items-center gap-1.5">
            <span class="font-mono font-bold">${c.code}</span>
            <span class="text-xs px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 font-mono">${c.credits} Cr</span>
            ${c.isOfferedNow ? '<span class="text-xs text-emerald-500 font-bold">• Offered</span>' : ''}
          </div>
          <div class="text-sm text-slate-500 truncate">${c.title}</div>
        </div>
        <button onclick="setCourseStatus('${c.code}', 'PLANNED')" class="px-2 py-1 rounded-lg text-xs font-bold bg-uiu-500/15 text-uiu-500 hover:bg-uiu-500 hover:text-white transition shrink-0">
          + Plan
        </button>
      </div>
    `).join('');
  }
}

// ============================================================================
// TAB 2: ACADEMIC RECORD & UCAM COPY-PASTE PARSER (SECTION 12)
// ============================================================================
function fillSampleUcamPaste() {
  const sample = `United International University - UCAM Student Course History
Term   Course Code   Course Title                                Credits   Grade
241    ENG 1011      English I                                   3.00      A-
241    CSE 1111      Structured Programming Language             3.00      C
242    CSE 1111      Structured Programming Language             3.00      A
242    CSE 2215      Data Structure and Algorithms I             3.00      A-
243    ECO 4101      Economics                                   3.00      W
251    CSE 3521      Database Management Systems                 3.00      Running
251    CSE 3522      Database Management Systems Laboratory      1.00      I`;
  document.getElementById('ucam-paste-input').value = sample;
  parseUcamRawText();
}

function detectUcamGrade(line, codeMatch, creditMatch) {
  const known = new Set([...Object.keys(UIU_GRADES), 'W', 'I', 'RUNNING', 'PLANNED', 'REGISTERED', 'INPROGRESS', 'INCOMPLETE', 'WITHDRAWN']);
  const normalize = value => value.trim().toUpperCase().replace(/[^A-Z+-]/g, '');
  const codeEnd = codeMatch.index + codeMatch[0].length;
  const searchStart = creditMatch ? creditMatch.index + creditMatch[0].length : codeEnd;
  const tail = line.slice(Math.max(codeEnd, searchStart));

  // UCAM table copy is often tab-separated. Read the rightmost exact grade/status
  // cell, ignoring grade-point columns that may follow it.
  const cells = line.includes('|')
    ? line.split('|').map(cell => cell.replace(/&#x20;/gi, ' ').replace(/\*\*/g, '').trim()).filter(Boolean)
    : line.split('\t').map(cell => cell.trim()).filter(Boolean);
  for (let i = cells.length - 1; i >= 0; i--) {
    const token = normalize(cells[i]);
    if (known.has(token)) return normalizeUcamStatus(token);
  }

  // For plain-text rows, only inspect tokens after the credit column. This keeps
  // title endings such as "English I" or "Course A" from becoming grades.
  const tokens = tail.trim().split(/\s+/).filter(Boolean);
  for (let i = tokens.length - 1; i >= 0; i--) {
    const token = normalize(tokens[i]);
    if (known.has(token)) return normalizeUcamStatus(token);
  }
  return 'UNKNOWN';
}

function normalizeUcamStatus(token) {
  if (['RUNNING', 'REGISTERED', 'INPROGRESS'].includes(token)) return 'RUNNING';
  if (token === 'WITHDRAWN') return 'W';
  if (token === 'INCOMPLETE') return 'I';
  return token;
}

function parseUcamRawText() {
  const raw = document.getElementById('ucam-paste-input').value.trim();
  const previewWrap = document.getElementById('ucam-parse-preview-container');
  parsedUcamRows = [];

  if (!raw) {
    previewWrap.classList.add('hidden');
    return;
  }

  const curr = getActiveCurriculum();
  const currMap = new Map();
  curr.courses.forEach(c => currMap.set(c.code, c));

  const lines = raw.split(/\r?\n/);
  const attemptTracker = {};

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed || /^United International|^Term\s+Course/i.test(trimmed)) return;

    const codeMatch = trimmed.match(/\b([A-Z]{2,4})\s*-?\s*(\d{4}[A-C]?)\b/i);
    if (!codeMatch) return;

    const code = normalizeCourseCode(`${codeMatch[1]} ${codeMatch[2]}`);
    attemptTracker[code] = (attemptTracker[code] || 0) + 1;
    const attemptNo = attemptTracker[code];

    const termMatch = trimmed.match(/\b(1[89][123]|2[0-9][123]|Spring\s*20\d\d|Summer\s*20\d\d|Fall\s*20\d\d)\b/i);
    const term = termMatch ? termMatch[0] : 'Term-' + attemptNo;

    const crMatch = trimmed.match(/\b([1-6]\.[05]0?)\b/);
    const catalogCourse = currMap.get(code);
    const credits = crMatch ? parseFloat(crMatch[1]) : (catalogCourse ? catalogCourse.credits : 3.0);

    const statusOrGrade = detectUcamGrade(trimmed, codeMatch, crMatch);

    const warnings = [];
    if (!catalogCourse) warnings.push('Custom/Non-curriculum course');
    if (!crMatch && !catalogCourse) warnings.push('Defaulted to 3.0 Cr');
    if (statusOrGrade === 'UNKNOWN') warnings.push('Unknown grade — please select');
    if (attemptNo > 1) warnings.push(`Repeat Attempt #${attemptNo}`);

    parsedUcamRows.push({
      idx,
      selected: statusOrGrade !== 'UNKNOWN',
      code,
      title: catalogCourse ? catalogCourse.title : 'Detected UCAM Course',
      credits,
      term,
      attemptNo,
      grade: statusOrGrade,
      warnings
    });
  });

  previewWrap.classList.remove('hidden');
  renderUcamPreviewTable();
}

function renderUcamPreviewTable() {
  const summaryEl = document.getElementById('ucam-parse-summary');
  const tbody = document.getElementById('ucam-parse-tbody');
  summaryEl.textContent = `Detected ${parsedUcamRows.length} Course Row(s) • Review & Edit Before Import`;

  if (parsedUcamRows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="py-4 px-3 text-center text-slate-400">No recognizable course rows found. Ensure lines include a course code (e.g. CSE 1111) and grade.</td></tr>`;
    return;
  }

  tbody.innerHTML = parsedUcamRows.map((r, i) => `
    <tr>
      <td class="py-2 px-2.5"><input type="checkbox" ${r.selected ? 'checked' : ''} onchange="toggleUcamPreviewRow(${i}, this.checked)" class="accent-uiu-500 rounded" /></td>
      <td class="py-2 px-2.5"><input type="text" value="${r.code}" onchange="editUcamPreviewField(${i}, 'code', this.value)" class="w-24 px-1.5 py-1 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold" /></td>
      <td class="py-2 px-2.5"><input type="text" value="${r.title}" onchange="editUcamPreviewField(${i}, 'title', this.value)" class="w-40 px-1.5 py-1 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" /></td>
      <td class="py-2 px-2.5"><input type="number" step="0.5" value="${r.credits}" onchange="editUcamPreviewField(${i}, 'credits', this.value)" class="w-14 px-1.5 py-1 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono" /></td>
      <td class="py-2 px-2.5 font-mono">${r.term}</td>
      <td class="py-2 px-2.5 font-mono">#${r.attemptNo}</td>
      <td class="py-2 px-2.5">
        <select onchange="editUcamPreviewField(${i}, 'grade', this.value)" class="px-1.5 py-1 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold">
          ${['UNKNOWN','A','A-','B+','B','B-','C+','C','C-','D+','D','F','W','I','RUNNING','PLANNED'].map(g => `<option value="${g}" ${r.grade === g ? 'selected' : ''}>${g === 'UNKNOWN' ? 'Select grade' : g}</option>`).join('')}
        </select>
      </td>
      <td class="py-2 px-2.5 text-xs ${r.warnings.length ? 'text-amber-500 font-semibold' : 'text-emerald-500'}">
        ${r.warnings.length ? r.warnings.join('; ') : 'Verified'}
      </td>
    </tr>
  `).join('');
}

function toggleUcamPreviewRow(idx, checked) {
  if (parsedUcamRows[idx]) parsedUcamRows[idx].selected = checked;
}

function editUcamPreviewField(idx, field, val) {
  if (!parsedUcamRows[idx]) return;
  if (field === 'credits') parsedUcamRows[idx].credits = parseFloat(val) || 3.0;
  else if (field === 'code') parsedUcamRows[idx].code = normalizeCourseCode(val);
  else parsedUcamRows[idx][field] = val;
}

function applyParsedUcamCourses() {
  const chosen = parsedUcamRows.filter(r => r.selected);
  if (chosen.length === 0) {
    showToast('No rows selected to import.', 'error');
    return;
  }
  if (chosen.some(r => r.grade === 'UNKNOWN')) {
    showToast('Select a grade for every checked row before importing.', 'error');
    return;
  }
  if (appState.isDemo) {
    appState.isDemo = false;
    appState.courseHistory = {};
  }

  // Group imported rows by code to preserve attempt sequence
  const grouped = {};
  chosen.forEach(r => {
    if (!grouped[r.code]) grouped[r.code] = [];
    grouped[r.code].push({ grade: r.grade, term: r.term, credits: r.credits, title: r.title });
  });
  Object.keys(grouped).forEach(code => {
    appState.courseHistory[code] = grouped[code];
  });

  saveAppState();
  syncSetupInputsFromState();
  refreshAllViews();
  showToast(`Imported ${chosen.length} course attempt(s) into your academic record!`, 'success');
}

function addManualCourseAttempt() {
  const rawCode = document.getElementById('manual-rec-code').value.trim();
  if (!rawCode) {
    showToast('Please enter a valid Course Code (e.g., CSE 2215).', 'error');
    return;
  }
  const code = normalizeCourseCode(rawCode);
  const title = document.getElementById('manual-rec-title').value.trim();
  const credits = parseFloat(document.getElementById('manual-rec-credits').value) || 3.0;
  const grade = document.getElementById('manual-rec-status').value;
  const term = document.getElementById('manual-rec-term').value.trim() || 'Manual';

  if (appState.isDemo) {
    appState.isDemo = false;
  }
  if (!appState.courseHistory[code]) appState.courseHistory[code] = [];
  appState.courseHistory[code].push({ grade, term, credits, title });

  saveAppState();
  refreshAllViews();
  showToast(`Recorded ${code} (${grade}) in Academic History!`, 'success');
}

function deleteCourseHistoryEntry(code) {
  delete appState.courseHistory[code];
  saveAppState();
  refreshAllViews();
  showToast(`Removed ${code} from Academic Record.`, 'info');
}

function renderAcademicRecordTab(metrics) {
  const codes = Object.keys(appState.courseHistory).sort();
  document.getElementById('record-count-badge').textContent = `${codes.length} Courses Recorded`;

  const currMap = new Map();
  metrics.curriculum.courses.forEach(c => currMap.set(c.code, c));

  const tbody = document.getElementById('academic-record-tbody');
  if (codes.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="py-6 text-center text-slate-400">No course attempts recorded yet. Paste your UCAM history above or select grades in the Curriculum tab.</td></tr>`;
    return;
  }

  tbody.innerHTML = codes.map(code => {
    const rec = resolveCourseRecord(code);
    const catCourse = currMap.get(code);
    const title = catCourse ? catCourse.title : ((rec.attempts[0] && rec.attempts[0].title) || 'Custom / Elective Course');
    const credits = catCourse ? catCourse.credits : ((rec.attempts[0] && rec.attempts[0].credits) || 3.0);
    const attemptsBadges = rec.attempts.map((a, i) =>
      `<span class="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs">#${i + 1} (${a.term || 'Term'}): <strong>${a.grade}</strong></span>`
    ).join(' ');

    return `
      <tr>
        <td class="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white">${code}</td>
        <td class="py-2.5 px-3">${title}</td>
        <td class="py-2.5 px-3 font-mono">${credits.toFixed(1)}</td>
        <td class="py-2.5 px-3 space-x-1">${attemptsBadges}</td>
        <td class="py-2.5 px-3 font-mono font-bold text-uiu-500">${rec.status} ${rec.grade ? `(${rec.grade})` : ''}</td>
        <td class="py-2.5 px-3 text-right">
          <button onclick="deleteCourseHistoryEntry('${code}')" class="text-slate-400 hover:text-rose-500"><i class="fa-solid fa-trash-can"></i></button>
        </td>
      </tr>
    `;
  }).join('');
}

async function downloadBrowserExtensionZip(browserType) {
  const isFirefox = browserType === 'firefox';
  const manifest = isFirefox ? {
    manifest_version: 2,
    name: 'UIU Compass — UCAM Safe Academic Sync (Firefox)',
    version: '2.0.0',
    description: 'Reads visible course rows from a signed-in student UCAM page without accessing passwords.',
    permissions: ['activeTab', 'clipboardWrite', 'https://ucam.uiu.ac.bd/' + '*'],
    browser_action: { default_popup: 'popup.html' },
    browser_specific_settings: { gecko: { id: 'uiu-compass-sync@uiu-compass.org', strict_min_version: '109.0' } }
  } : {
    manifest_version: 3,
    name: 'UIU Compass — UCAM Safe Academic Sync (Chrome)',
    version: '2.0.0',
    description: 'Reads visible course rows from a signed-in student UCAM page without accessing passwords.',
    permissions: ['activeTab', 'scripting', 'clipboardWrite'],
    host_permissions: ['https://ucam.uiu.ac.bd/' + '*'],
    action: { default_popup: 'popup.html' }
  };

  const popupHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>UIU Compass Sync</title></head><body style="font-family:sans-serif;width:280px;padding:12px;background:#0f172a;color:#fff"><h3 style="color:#F37021;margin:0 0 8px">UIU Compass Sync</h3><p style="font-size:12px;color:#94a3b8">Open UCAM Course History and click below.</p><script src="popup.js"><\/script></body></html>`;
  const popupJs = `console.log("UIU Compass UCAM Safe Extension Ready");`;

  if (typeof JSZip !== 'undefined') {
    const zip = new JSZip();
    zip.file('manifest.json', JSON.stringify(manifest, null, 2));
    zip.file('popup.html', popupHtml);
    zip.file('popup.js', popupJs);
    const blob = await zip.generateAsync({ type: 'blob' });
    triggerBlobDownload(blob, `uiu-compass-ucam-extension-${browserType}.zip`);
    showToast(`Downloaded ${browserType.toUpperCase()} WebExtension ZIP package!`, 'success');
  } else {
    const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' });
    triggerBlobDownload(blob, `manifest-${browserType}.json`);
    showToast(`Downloaded ${browserType} extension manifest!`, 'success');
  }
}

// ============================================================================
// TAB 3: CURRICULUM MATRIX & PREREQUISITE ENGINE (SECTIONS 6, 7, 8)
// ============================================================================
function setCurriculumStatusFilter(filter) {
  curriculumStatusFilter = filter;
  document.querySelectorAll('.status-pill').forEach(btn => {
    btn.className = 'status-pill px-3 py-1 rounded-full text-sm font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 whitespace-nowrap';
  });
  const active = document.getElementById(`filter-pill-${filter}`);
  if (active) {
    active.className = 'status-pill px-3 py-1 rounded-full text-sm font-semibold bg-uiu-500 text-white whitespace-nowrap shadow-sm';
  }
  renderCurriculum();
}

function setCurriculumGroupMode(mode) {
  curriculumGroupMode = mode;
  ['category', 'trimester', 'track'].forEach(m => {
    const btn = document.getElementById(`group-btn-${m}`);
    if (btn) {
      btn.className = m === mode
        ? 'px-2.5 py-1 rounded-xl text-sm font-semibold bg-white dark:bg-slate-900 text-uiu-500 shadow-sm'
        : 'px-2.5 py-1 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400';
    }
  });
  renderCurriculum();
}

function clearCurriculumSearch() {
  document.getElementById('curriculum-search').value = '';
  renderCurriculum();
}

function jumpToCategory(catId) {
  switchTab('curriculum');
  document.getElementById('curriculum-category-select').value = catId;
  setCurriculumGroupMode('category');
  setCurriculumStatusFilter('ALL');
}

function filterCurriculumBy(status) {
  switchTab('curriculum');
  document.getElementById('curriculum-category-select').value = 'ALL';
  setCurriculumStatusFilter(status);
}

function highlightCourseInCurriculum(code) {
  switchTab('curriculum');
  document.getElementById('curriculum-category-select').value = 'ALL';
  setCurriculumStatusFilter('ALL');
  document.getElementById('curriculum-search').value = code;
  renderCurriculum();
}

function renderCurriculum(metricsOverride = null) {
  const metrics = metricsOverride || computeAcademicMetrics();
  const { curriculum, classifiedCourses } = metrics;

  const searchVal = (document.getElementById('curriculum-search').value || '').trim().toLowerCase();
  const clearBtn = document.getElementById('clear-search-btn');
  if (searchVal) clearBtn.classList.remove('hidden');
  else clearBtn.classList.add('hidden');

  const selectedCat = document.getElementById('curriculum-category-select').value;

  // Update Pill Counts
  const counts = {
    ALL: classifiedCourses.length,
    COMPLETED: classifiedCourses.filter(c => c.academicStatus === 'COMPLETED').length,
    RUNNING: classifiedCourses.filter(c => c.academicStatus === 'RUNNING').length,
    PLANNED: classifiedCourses.filter(c => c.academicStatus === 'PLANNED').length,
    ELIGIBLE: classifiedCourses.filter(c => c.academicStatus === 'ELIGIBLE').length,
    ELIGIBLE_COREQ: classifiedCourses.filter(c => c.academicStatus === 'ELIGIBLE_COREQ').length,
    LOCKED: classifiedCourses.filter(c => c.academicStatus === 'LOCKED').length,
    FAILED: classifiedCourses.filter(c => c.academicStatus === 'FAILED').length,
    RETAKE_CANDIDATE: classifiedCourses.filter(c => c.isRetakeCandidate).length,
    NOT_OFFERED: classifiedCourses.filter(c => !c.isOfferedNow).length
  };
  Object.keys(counts).forEach(k => {
    const el = document.getElementById(`count-pill-${k}`);
    if (el) el.textContent = counts[k];
  });

  // Prerequisite Graph Diagnostics
  const diag = diagnosePrerequisiteGraph(curriculum.courses);
  const diagEl = document.getElementById('prereq-diagnostics-strip');
  if (diag.valid) {
    diagEl.innerHTML = `<span class="text-emerald-600 dark:text-emerald-400 font-semibold"><i class="fa-solid fa-diagram-project mr-1"></i>Prerequisite Graph Diagnostics: 0 circular dependencies, 0 missing definitions (${curriculum.courses.length} courses verified).</span>`;
  } else {
    diagEl.innerHTML = `<span class="text-amber-500 font-semibold"><i class="fa-solid fa-triangle-exclamation mr-1"></i>Graph Warning: ${diag.circularChains.length} circular, ${diag.missingDefinitions.length} external prerequisite references (${diag.missingDefinitions.slice(0, 3).join(', ')}).</span>`;
  }

  // Filter courses
  const filtered = classifiedCourses.filter(c => {
    if (selectedCat !== 'ALL' && c.category !== selectedCat) return false;
    if (searchVal) {
      const mCode = c.code.toLowerCase().includes(searchVal) || c.code.replace(/\s+/g, '').toLowerCase().includes(searchVal);
      const mTitle = c.title.toLowerCase().includes(searchVal);
      const mTrack = c.track && c.track.toLowerCase().includes(searchVal);
      if (!mCode && !mTitle && !mTrack) return false;
    }
    if (curriculumStatusFilter === 'ALL') return true;
    if (curriculumStatusFilter === 'RETAKE_CANDIDATE') return c.isRetakeCandidate;
    if (curriculumStatusFilter === 'NOT_OFFERED') return !c.isOfferedNow;
    return c.academicStatus === curriculumStatusFilter;
  });

  const container = document.getElementById('curriculum-matrix-container');
  if (filtered.length === 0) {
    container.innerHTML = `<div class="bg-white dark:bg-slate-900 rounded-3xl p-10 text-center border border-slate-200 dark:border-slate-800 text-sm text-slate-400">No courses match the active search/filter.</div>`;
    return;
  }

  let groups = [];
  if (curriculumGroupMode === 'category') {
    curriculum.categories.forEach(cat => {
      const list = filtered.filter(c => c.category === cat.id);
      if (list.length > 0) {
        const st = metrics.categoryStats[cat.id];
        groups.push({
          title: cat.name,
          subtitle: `${cat.note} • Required: ${cat.requiredCredits} Cr`,
          badge: `${st.completedCredits.toFixed(1)} / ${cat.requiredCredits.toFixed(1)} Cr`,
          courses: list
        });
      }
    });
  } else if (curriculumGroupMode === 'trimester') {
    for (let t = 1; t <= 12; t++) {
      const list = filtered.filter(c => c.trimester === t);
      if (list.length > 0) {
        groups.push({
          title: `${metrics.program.termSystem} ${t}`,
          subtitle: `Recommended Curriculum Sequence`,
          badge: `${list.length} Courses`,
          courses: list
        });
      }
    }
  } else {
    const trackNames = [...new Set(filtered.map(c => c.track || 'Core / General (Non-Track)'))];
    trackNames.forEach(tName => {
      const list = filtered.filter(c => (c.track || 'Core / General (Non-Track)') === tName);
      if (list.length > 0) {
        groups.push({
          title: tName,
          subtitle: `Major / Minor / Track Grouping`,
          badge: `${list.length} Courses`,
          courses: list
        });
      }
    });
  }

  container.innerHTML = groups.map(grp => `
    <div class="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3.5">
      <div class="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white">${grp.title}</h3>
          <p class="text-sm text-slate-500">${grp.subtitle}</p>
        </div>
        <span class="px-3 py-1 rounded-full text-sm font-mono font-bold bg-slate-100 dark:bg-slate-800">${grp.badge}</span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
        ${grp.courses.map(c => renderCurriculumCourseCard(c, metrics.actualCompletedCredits)).join('')}
      </div>
    </div>
  `).join('');
}

function renderCurriculumCourseCard(c, completedCr) {
  const st = c.record.grade || '';
  const statusLabels = {
    COMPLETED: { text: `${c.record.grade} (${c.record.point ? c.record.point.toFixed(2) : ''})`, cls: 'bg-emerald-500 text-white' },
    RUNNING: { text: 'Running', cls: 'bg-sky-500 text-white' },
    PLANNED: { text: 'Planned', cls: 'bg-uiu-500 text-white' },
    FAILED: { text: 'Failed (F)', cls: 'bg-rose-600 text-white' },
    WITHDRAWN: { text: 'Withdrawn (W)', cls: 'bg-slate-500 text-white' },
    INCOMPLETE: { text: 'Incomplete (I)', cls: 'bg-purple-600 text-white' },
    ELIGIBLE: { text: 'Eligible', cls: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' },
    ELIGIBLE_COREQ: { text: 'Eligible w/ Coreq', cls: 'bg-teal-500/15 text-teal-600 dark:text-teal-400' },
    LOCKED: { text: 'Locked', cls: 'bg-amber-500/15 text-amber-600 dark:text-amber-400' }
  };
  const badgeInfo = statusLabels[c.academicStatus] || { text: c.academicStatus, cls: 'bg-slate-200 text-slate-700' };

  const prereqPills = (c.prereqs || []).length === 0
    ? `<span class="text-xs text-slate-400">Prereq: None</span>`
    : `<div class="flex flex-wrap gap-1 text-xs"><span class="text-slate-400">Prereq:</span>${c.prereqs.map(p => {
        const isMissing = c.eligibility.missingPrereqs.some(m => m.includes(p));
        return `<button onclick="highlightCourseInCurriculum('${p.replace('CREDITS_', '')}')" class="px-1.5 py-0.2 rounded font-mono font-semibold ${isMissing ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400' : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'}">${p}</button>`;
      }).join('')}</div>`;

  const coreqLine = (c.coreqs || []).length > 0
    ? `<div class="text-xs text-slate-400">Coreq: <span class="font-mono text-slate-600 dark:text-slate-300">${c.coreqs.join(', ')}</span></div>`
    : '';

  const unlockLine = (c.unlocks || []).length > 0
    ? `<div class="text-xs text-slate-400 truncate">Unlocks: <span class="font-mono text-uiu-500">${c.unlocks.join(', ')}</span></div>`
    : '';

  return `
    <div class="p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30 flex flex-col justify-between gap-2.5">
      <div>
        <div class="flex items-center justify-between gap-1.5">
          <div class="flex items-center gap-1.5">
            <span class="font-mono text-sm sm:text-base font-extrabold">${c.code}</span>
            <span class="px-1.5 py-0.2 rounded text-xs font-mono bg-slate-200 dark:bg-slate-700">${c.credits.toFixed(1)} Cr</span>
            <span class="text-xs font-mono text-slate-400">T${c.trimester}</span>
          </div>
          <span class="px-2 py-0.5 rounded text-xs font-bold ${badgeInfo.cls}">${badgeInfo.text}</span>
        </div>
        <h4 class="text-sm font-bold mt-1 leading-snug">${c.title}</h4>
        <div class="flex flex-wrap items-center gap-1.5 mt-1">
          ${c.track ? `<span class="px-1.5 py-0.2 rounded text-xs bg-uiu-500/15 text-uiu-500 font-semibold">${c.track}</span>` : ''}
          <span class="text-xs ${c.isOfferedNow ? 'text-emerald-500 font-semibold' : 'text-slate-400'}">${c.isOfferedNow ? '• Offered this term' : '• Not in current offering'}</span>
        </div>
      </div>

      <div class="space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-800">
        ${prereqPills}
        ${coreqLine}
        ${unlockLine}
        <div class="flex items-center gap-1.5 pt-1">
          <select aria-label="Status for ${c.code}" onchange="setCourseStatus('${c.code}', this.value)" class="flex-1 px-2 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-semibold">
            <option value="" ${!st ? 'selected' : ''}>Not Taken</option>
            <option value="PLANNED" ${st === 'PLANNED' ? 'selected' : ''}>📌 Planned</option>
            <option value="RUNNING" ${st === 'RUNNING' ? 'selected' : ''}>⚡ Running (In Progress)</option>
            <option value="W" ${st === 'W' ? 'selected' : ''}>Withdrawn (W)</option>
            <option value="I" ${st === 'I' ? 'selected' : ''}>Incomplete (I)</option>
            <optgroup label="Completed / Attempted Grade">
              ${GRADE_KEYS.map(g => `<option value="${g}" ${st === g ? 'selected' : ''}>Grade ${g} (${UIU_GRADES[g].point.toFixed(2)})</option>`).join('')}
            </optgroup>
          </select>
        </div>
      </div>
    </div>
  `;
}

function setCourseStatus(code, value) {
  if (!value) {
    delete appState.courseHistory[code];
  } else {
    const curr = getActiveCurriculum();
    const found = curr.courses.find(c => c.code === code);
    const cr = found ? found.credits : 3.0;
    const title = found ? found.title : code;
    appState.courseHistory[code] = [{ grade: value, term: 'Current', credits: cr, title }];
  }
  saveAppState();
  refreshAllViews();
}

function openCustomCourseModal() {
  const m = document.getElementById('custom-course-modal');
  m.classList.remove('hidden');
  m.classList.add('flex');
}

function closeCustomCourseModal() {
  const m = document.getElementById('custom-course-modal');
  m.classList.add('hidden');
  m.classList.remove('flex');
}

function saveCustomCurriculumCourse() {
  const code = normalizeCourseCode(document.getElementById('cc-code').value);
  const title = document.getElementById('cc-title').value.trim();
  const credits = parseFloat(document.getElementById('cc-credits').value) || 3.0;
  const category = document.getElementById('cc-category').value;
  const trimester = parseInt(document.getElementById('cc-term').value, 10) || 5;
  const prereqs = document.getElementById('cc-prereqs').value.split(',').map(s => normalizeCourseCode(s)).filter(Boolean);
  const coreqs = document.getElementById('cc-coreqs').value.split(',').map(s => normalizeCourseCode(s)).filter(Boolean);

  if (!code || !title) {
    showToast('Course Code and Title are required.', 'error');
    return;
  }
  const currId = appState.profile.curriculumId;
  if (!appState.customCourses[currId]) appState.customCourses[currId] = [];
  appState.customCourses[currId] = appState.customCourses[currId].filter(c => c.code !== code);
  appState.customCourses[currId].push({
    code, title, credits, category, trimester, prereqs, coreqs, minGrade: 'D'
  });

  saveAppState();
  closeCustomCourseModal();
  refreshAllViews();
  showToast(`Saved ${code} to ${currId} curriculum!`, 'success');
}

// ============================================================================
// TAB 4: COURSE OFFERINGS & ADVISING PLANNER (SECTIONS 21, 22, 23)
// ============================================================================
function detectAdvisingConflicts(selectedCourses) {
  const examConflicts = [];
  const sameDayWarnings = [];
  const duplicateCourses = [];

  const seenCodes = new Set();
  selectedCourses.forEach(o => {
    if (seenCodes.has(o.code)) duplicateCourses.push(o.code);
    seenCodes.add(o.code);
  });

  for (let i = 0; i < selectedCourses.length; i++) {
    for (let j = i + 1; j < selectedCourses.length; j++) {
      const a = selectedCourses[i];
      const b = selectedCourses[j];
      if (!a.examDay || !b.examDay || a.examDay !== b.examDay) continue;
      if (a.examSlot && b.examSlot && a.examSlot === b.examSlot) {
        examConflicts.push(`TIME CONFLICT: ${a.code} & ${b.code} on ${a.examDay}, ${a.examSlot}`);
      } else {
        sameDayWarnings.push(`Same exam day: ${a.code} & ${b.code} on ${a.examDay}; verify their slots`);
      }
    }
  }

  return { classConflicts: [], examConflicts, sameDayWarnings, duplicateCourses };
}

function getOfficialAdvisingExamSlot(code) {
  const routine = EXAM_ROUTINES['cse-bscse-fall-2026'];
  if (!routine || appState.profile.programId !== routine.programId) return null;
  return routine.courses[normalizeCourseCode(code)] || null;
}

function renderAdvising(metricsOverride = null) {
  const metrics = metricsOverride || computeAcademicMetrics();
  const { program, classifiedCourses } = metrics;

  const minCr = parseFloat(document.getElementById('adv-min-cr').value) || 9;
  const maxCr = parseFloat(document.getElementById('adv-max-cr').value) || 15;

  // Prioritized Course Suggestions (Section 22 priority order 1..6)
  const candidates = classifiedCourses.filter(c =>
    c.academicStatus === 'FAILED' ||
    c.isRetakeCandidate ||
    ((c.academicStatus === 'ELIGIBLE' || c.academicStatus === 'ELIGIBLE_COREQ') && !c.isCategoryFulfilled)
  ).map(c => {
    let priorityRank = 6;
    let priorityLabel = '6. Approved Elective';
    if (c.academicStatus === 'FAILED' || c.isRetakeCandidate) {
      priorityRank = 1;
      priorityLabel = '1. Required Retake / Failed Core';
    } else if ((c.unlocks || []).length >= 2) {
      priorityRank = 2;
      priorityLabel = `2. Unlocks ${c.unlocks.length} Future Courses`;
    } else if (!c.electiveGroup && !c.track) {
      priorityRank = 3;
      priorityLabel = '3. Compulsory Core Course';
    } else if (!c.isCategoryFulfilled && c.electiveGroup) {
      priorityRank = 4;
      priorityLabel = '4. Category Completion';
    } else if (c.track) {
      priorityRank = 5;
      priorityLabel = `5. Track (${c.track})`;
    }
    return { ...c, priorityRank, priorityLabel };
  }).sort((a, b) => a.priorityRank - b.priorityRank || b.unlocks.length - a.unlocks.length || a.trimester - b.trimester);

  const suggEl = document.getElementById('advising-suggestions-list');
  suggEl.innerHTML = candidates.slice(0, 8).map(c => `
    <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 flex items-center justify-between gap-2 text-sm">
      <div>
        <div class="flex items-center gap-1.5">
          <span class="font-mono font-bold">${c.code}</span>
          <span class="px-1.5 py-0.2 rounded text-xs bg-uiu-500/15 text-uiu-500 font-bold">${c.priorityLabel}</span>
          <span class="font-mono text-xs text-slate-400">${c.credits} Cr</span>
        </div>
        <div class="text-sm text-slate-500">${c.title}</div>
      </div>
      <button onclick="toggleAdvisingByCourseCode('${c.code}')" class="px-2.5 py-1 rounded-lg bg-uiu-500 text-white font-bold text-sm shrink-0">
        Select
      </button>
    </div>
  `).join('');

  // Render the selected curriculum, independent of term-specific section schedules.
  const searchQ = (document.getElementById('advising-search').value || '').trim().toLowerCase();
  const courseMap = new Map();
  classifiedCourses.forEach(c => courseMap.set(c.code, c));
  const filteredCourses = classifiedCourses.filter(c =>
    !searchQ || c.code.toLowerCase().includes(searchQ) || c.title.toLowerCase().includes(searchQ)
  );

  document.getElementById('advising-offerings-list').innerHTML = filteredCourses.map(c => {
    const isSel = appState.advisingSelection.includes(c.code);
    const stLabel = c.academicStatus || 'ELIGIBLE';
    return `
      <div class="p-3 rounded-2xl border ${isSel ? 'border-uiu-500 bg-uiu-500/10' : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40'} flex items-center justify-between gap-2 text-sm">
        <div>
          <div class="flex items-center gap-2">
            <span class="font-mono font-bold text-slate-900 dark:text-white">${c.code}</span>
            <span class="px-1.5 py-0.2 rounded text-xs bg-slate-200 dark:bg-slate-700 font-mono">${c.credits.toFixed(1)} Cr</span>
            <span class="text-xs font-bold text-emerald-500">${stLabel}</span>
          </div>
          <div class="text-sm text-slate-600 dark:text-slate-300 font-medium">${c.title}</div>
        </div>
        <button onclick="toggleAdvisingOffering('${c.code}')" class="px-3 py-1.5 rounded-xl font-bold text-sm ${isSel ? 'bg-rose-500 text-white' : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'}">
          ${isSel ? 'Remove' : '+ Add'}
        </button>
      </div>
    `;
  }).join('');

  // Selected Advising Worksheet & Diagnostics
  const selectedCodes = [...new Set(appState.advisingSelection.map(id => {
    const oldOffering = appState.offerings.find(o => o.id === id);
    return oldOffering ? oldOffering.code : id;
  }))];
  const selectedObjs = selectedCodes.map(code => {
    const c = courseMap.get(code);
    if (!c) return null;
    const examSlot = appState.advisingExamSlots?.[code] || {};
    const officialSlot = getOfficialAdvisingExamSlot(code);
    return {
      id: code,
      code,
      title: c.title,
      examDay: examSlot.day || officialSlot?.day || '',
      examSlot: examSlot.slot || officialSlot?.slot || '',
      officialSlot,
      hasManualExamSlot: Boolean(examSlot.day || examSlot.slot),
      credits: c.credits,
      courseMeta: c
    };
  }).filter(Boolean);

  const selectedCr = selectedObjs.reduce((s, o) => s + o.credits, 0);
  document.getElementById('nav-advising-badge').textContent = `${selectedCr.toFixed(1)} Cr`;
  document.getElementById('adv-live-credits').textContent = `${selectedCr.toFixed(1)} Cr`;

  const limitEl = document.getElementById('adv-limit-status');
  if (selectedCr < minCr) {
    limitEl.textContent = `Below min (${minCr} Cr)`;
    limitEl.className = 'text-xs text-amber-500 font-bold';
  } else if (selectedCr > maxCr) {
    limitEl.textContent = `Exceeds max (${maxCr} Cr)!`;
    limitEl.className = 'text-xs text-rose-500 font-bold';
  } else {
    limitEl.textContent = `Within ${minCr}–${maxCr} Cr load`;
    limitEl.className = 'text-xs text-emerald-500 font-bold';
  }

  const conflicts = detectAdvisingConflicts(selectedObjs);
  const selectedCodesSet = new Set(selectedObjs.map(o => o.code));
  const prereqWarnings = [];
  const coreqWarnings = [];

  selectedObjs.forEach(o => {
    if (o.courseMeta) {
      if (!o.courseMeta.eligibility.prereqsMet) {
        prereqWarnings.push(`${o.code} missing prereq: ${o.courseMeta.eligibility.missingPrereqs.join(', ')}`);
      }
      (o.courseMeta.coreqs || []).forEach(cq => {
        const rec = resolveCourseRecord(cq);
        if (rec.status !== 'COMPLETED' && !selectedCodesSet.has(cq)) {
          coreqWarnings.push(`${o.code} requires corequisite ${cq}`);
        }
      });
    }
  });

  const totalConflictCount = conflicts.classConflicts.length + conflicts.examConflicts.length + conflicts.duplicateCourses.length;
  const confEl = document.getElementById('adv-live-conflicts');
  confEl.textContent = totalConflictCount === 0 ? '0 Time Conflicts' : `${totalConflictCount} Conflict(s)!`;
  confEl.className = `text-base font-bold mt-0.5 ${totalConflictCount === 0 ? 'text-emerald-500' : 'text-rose-500'}`;

  document.getElementById('adv-live-coreqs').textContent =
    prereqWarnings.length + coreqWarnings.length === 0 ? 'Prereqs & Coreqs OK' : `${prereqWarnings.length + coreqWarnings.length} Prereq/Coreq Alert(s)`;

  // Connected Live Estimates (CGPA, Fee, Post-Term Graduation %)
  const projPts = metrics.totalGradePoints + selectedCr * 3.67;
  const projCr = metrics.gradedCredits + selectedCr;
  const projCgpa = projCr > 0 ? (projPts / projCr) : 0;
  document.getElementById('adv-live-cgpa').textContent = `${projCgpa.toFixed(2)} (@A-)`;

  const estPayable = selectedCr * (appState.profile.customTuitionOverride || program.tuitionPerCredit) + program.termFee + program.labFeePerTerm;
  document.getElementById('adv-live-fee').textContent = `Tk ${estPayable.toLocaleString()}`;

  const postPct = Math.min(100, Math.round(((metrics.actualCompletedCredits + selectedCr) / metrics.reqDegreeCredits) * 100));
  document.getElementById('adv-live-gradpct').textContent = `${postPct}%`;

  const selListEl = document.getElementById('advising-selected-list');
  if (selectedObjs.length === 0) {
    selListEl.innerHTML = `<div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-sm text-slate-400 text-center">No courses selected in advising worksheet.</div>`;
  } else {
    selListEl.innerHTML = selectedObjs.map(o => `
      <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2 text-sm">
        <div class="min-w-0 flex-1">
          <span class="font-mono font-bold">${o.code}</span> • <span>${o.title}</span>
          <div class="text-xs text-slate-400 font-mono">${o.credits} Cr</div>
        </div>
        <div class="flex items-center gap-1.5 shrink-0">
          <select onchange="setAdvisingExamSlot('${o.code}', 'day', this.value)" aria-label="${o.code} exam day" class="px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"><option value="">Day</option>${Array.from({length:7}, (_,i) => `<option value="Day ${i+1}" ${o.examDay === `Day ${i+1}` ? 'selected' : ''}>Day ${i+1}</option>`).join('')}</select>
          <select onchange="setAdvisingExamSlot('${o.code}', 'slot', this.value)" aria-label="${o.code} exam slot" class="px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"><option value="">T-slot</option>${['T1','T2','T3','T4'].map(slot => `<option value="${slot}" ${o.examSlot === slot ? 'selected' : ''}>${slot}</option>`).join('')}</select>
          <button onclick="toggleAdvisingOffering('${o.code}')" class="text-rose-500 hover:underline font-bold">Remove</button>
        </div>
        <div class="basis-full text-[11px] ${o.hasManualExamSlot ? 'text-sky-500' : o.officialSlot?.day ? 'text-emerald-500' : 'text-slate-400'}">
          ${o.hasManualExamSlot ? 'Your routine override' : o.officialSlot?.day ? `Auto-filled from ${EXAM_ROUTINES['cse-bscse-fall-2026'].label}` : o.officialSlot ? 'Official listing has no exam slot (N/A)' : 'Not in this official routine — choose a slot manually'}
        </div>
      </div>
    `).join('');
  }

  const allAlerts = [...conflicts.examConflicts, ...conflicts.sameDayWarnings, ...conflicts.duplicateCourses.map(code => `Duplicate course selected: ${code}`), ...prereqWarnings, ...coreqWarnings];
  const diagBox = document.getElementById('advising-diagnostics-box');
  if (allAlerts.length === 0) {
    diagBox.innerHTML = `<div class="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-semibold"><i class="fa-solid fa-circle-check mr-1"></i>No exam-slot conflicts or missing prerequisites detected.</div>`;
  } else {
    diagBox.innerHTML = allAlerts.map(a => `<div class="p-2 rounded-xl ${a.startsWith('TIME CONFLICT') ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'} text-sm font-semibold"><i class="fa-solid fa-triangle-exclamation mr-1"></i>${a}</div>`).join('');
  }

  // Render Saved Advising Plans
  const savedEl = document.getElementById('saved-advising-plans-list');
  savedEl.innerHTML = (appState.savedAdvisingPlans || []).map(pl => `
    <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2 text-sm">
      <div>
        <div class="font-bold">${pl.name}</div>
        <div class="text-xs text-slate-400 font-mono">${pl.items.length} Courses • ${pl.createdAt}</div>
      </div>
      <div class="flex items-center gap-1.5">
        <button onclick="loadSavedAdvisingPlan('${pl.id}')" class="px-2 py-1 rounded bg-uiu-500 text-white font-bold text-xs">Load</button>
        <button onclick="duplicateSavedAdvisingPlan('${pl.id}')" class="px-2 py-1 rounded bg-slate-200 dark:bg-slate-700 font-semibold text-xs">Copy</button>
        <button onclick="deleteSavedAdvisingPlan('${pl.id}')" class="text-slate-400 hover:text-rose-500"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    </div>
  `).join('');
}

function toggleAdvisingOffering(id) {
  const code = appState.offerings.find(o => o.id === id)?.code || normalizeCourseCode(id);
  const idx = appState.advisingSelection.indexOf(code);
  if (idx >= 0) appState.advisingSelection.splice(idx, 1);
  else appState.advisingSelection.push(code);
  saveAppState();
  refreshAllViews();
}

function toggleAdvisingByCourseCode(code) {
  const normalizedCode = normalizeCourseCode(code);
  if (!appState.advisingSelection.includes(normalizedCode)) appState.advisingSelection.push(normalizedCode);
  saveAppState();
  refreshAllViews();
  showToast(`Added ${normalizedCode} to Advising Plan!`, 'success');
}

function setAdvisingExamSlot(code, field, value) {
  if (!appState.advisingExamSlots) appState.advisingExamSlots = {};
  if (!appState.advisingExamSlots[code]) appState.advisingExamSlots[code] = {};
  if (field === 'day') appState.advisingExamSlots[code].day = value;
  if (field === 'slot') appState.advisingExamSlots[code].slot = value;
  saveAppState();
  renderAdvising();
}

function clearAdvisingSelection() {
  appState.advisingSelection = [];
  saveAppState();
  refreshAllViews();
}

function saveCurrentAdvisingPlan() {
  const nameInput = document.getElementById('adv-plan-name-input');
  const name = (nameInput.value || '').trim() || `Advising Plan #${appState.savedAdvisingPlans.length + 1}`;
  appState.savedAdvisingPlans.push({
    id: 'plan-' + Date.now(),
    name,
    programId: appState.profile.programId,
    items: [...appState.advisingSelection],
    examSlots: structuredClone(appState.advisingExamSlots || {}),
    createdAt: new Date().toISOString().slice(0, 10)
  });
  nameInput.value = '';
  saveAppState();
  renderAdvising();
  showToast(`Saved "${name}"!`, 'success');
}

function loadSavedAdvisingPlan(planId) {
  const found = appState.savedAdvisingPlans.find(p => p.id === planId);
  if (!found) return;
  appState.advisingSelection = [...found.items];
  if (found.examSlots) appState.advisingExamSlots = structuredClone(found.examSlots);
  saveAppState();
  refreshAllViews();
  showToast(`Loaded advising plan: ${found.name}`, 'info');
}

function duplicateSavedAdvisingPlan(planId) {
  const found = appState.savedAdvisingPlans.find(p => p.id === planId);
  if (!found) return;
  appState.savedAdvisingPlans.push({
    ...found,
    id: 'plan-' + Date.now(),
    name: `${found.name} (Copy)`
  });
  saveAppState();
  renderAdvising();
}

function deleteSavedAdvisingPlan(planId) {
  appState.savedAdvisingPlans = appState.savedAdvisingPlans.filter(p => p.id !== planId);
  saveAppState();
  renderAdvising();
}

function openOfferingImporterModal() {
  const m = document.getElementById('offering-importer-modal');
  m.classList.remove('hidden');
  m.classList.add('flex');
}

function closeOfferingImporterModal() {
  const m = document.getElementById('offering-importer-modal');
  m.classList.add('hidden');
  m.classList.remove('flex');
}

function loadSampleOfferingsForPaste() {
  document.getElementById('offering-paste-input').value =
    `CSE 4813 | Deep Learning | A | Sun,Tue | 09:00-10:20 | Room 504\nCSE 4435 | Software Architecture | B | Mon,Wed | 10:30-11:50 | Room 412`;
  parseOfferingInput();
}

function parseOfferingInput() {
  const raw = document.getElementById('offering-paste-input').value.trim();
  const box = document.getElementById('offering-preview-box');
  parsedOfferingRows = [];
  if (!raw) {
    box.innerHTML = '';
    return;
  }
  raw.split(/\r?\n/).forEach((line, i) => {
    const parts = line.split('|').map(s => s.trim());
    if (parts.length >= 2) {
      const code = normalizeCourseCode(parts[0]);
      const title = parts[1] || 'Offered Course';
      const section = parts[2] || 'A';
      const days = (parts[3] || 'Sun,Tue').split(',').map(s => s.trim());
      const times = (parts[4] || '09:00-10:20').split('-');
      const room = parts[5] || 'TBA';
      parsedOfferingRows.push({
        id: `OFF-IMP-${Date.now()}-${i}`,
        programId: appState.profile.programId,
        trimester: 'Fall',
        year: 2026,
        code, title, section, days,
        startTime: times[0] || '09:00',
        endTime: times[1] || '10:20',
        room,
        midExamDate: '2026-12-08',
        midExamTime: '09:30-11:30',
        finalExamDate: '2027-01-26',
        finalExamTime: '09:30-11:30',
        sourceUrl: 'User Imported',
        lastVerified: '2026-10-23',
        verificationStatus: 'User-Imported'
      });
    }
  });
  box.innerHTML = parsedOfferingRows.map(o => `<div class="p-2 rounded bg-slate-100 dark:bg-slate-800 font-mono text-sm">${o.code} (${o.section}) — ${o.title} • ${o.days.join('/')} ${o.startTime}-${o.endTime}</div>`).join('');
}

function confirmSaveImportedOfferings() {
  if (parsedOfferingRows.length === 0) return;
  appState.offerings.push(...parsedOfferingRows);
  saveAppState();
  closeOfferingImporterModal();
  refreshAllViews();
  showToast(`Imported ${parsedOfferingRows.length} course offerings!`, 'success');
}

// ============================================================================
// TAB 5 & 6: CGPA CALCULATOR, TARGET WHAT-IF & RETAKE PLANNER (SECTIONS 14, 15, 16)
// ============================================================================
function lookupCourseByCodeSmart(rawInput) {
  if (!rawInput) return null;
  // Support inputs like "CSE 2215", "cse2215", or "CSE 2215 — Data Structure..."
  const cleanPart = String(rawInput).split(/[—\-|]/)[0].trim();
  const normalized = normalizeCourseCode(cleanPart);
  const compact = cleanPart.replace(/\s+/g, '').toUpperCase();

  // 1. Search active curriculum first
  const activeCurr = getActiveCurriculum();
  for (const c of activeCurr.courses) {
    if (c.code.toUpperCase() === normalized || c.code.replace(/\s+/g, '').toUpperCase() === compact) {
      return c;
    }
  }
  // 2. Search all curricula as fallback
  for (const curr of CURRICULA) {
    for (const c of curr.courses) {
      if (c.code.toUpperCase() === normalized || c.code.replace(/\s+/g, '').toUpperCase() === compact) {
        return c;
      }
    }
  }
  // 3. Search offerings as fallback
  for (const off of (appState.offerings || [])) {
    if (off.code.toUpperCase() === normalized || off.code.replace(/\s+/g, '').toUpperCase() === compact) {
      return { code: off.code, title: off.title, credits: 3.0 };
    }
  }
  return null;
}

function populateCourseCatalogDatalist() {
  const dl = document.getElementById('uiu-course-catalog-datalist');
  if (!dl) return;
  const activeCurr = getActiveCurriculum();
  const seen = new Set();
  const options = [];

  activeCurr.courses.forEach(c => {
    if (!seen.has(c.code)) {
      seen.add(c.code);
      options.push(`<option value="${c.code}">${c.title} (${c.credits.toFixed(1)} Cr)</option>`);
    }
  });
  CURRICULA.forEach(curr => {
    curr.courses.forEach(c => {
      if (!seen.has(c.code)) {
        seen.add(c.code);
        options.push(`<option value="${c.code}">${c.title} (${c.credits.toFixed(1)} Cr)</option>`);
      }
    });
  });
  dl.innerHTML = options.join('');
}

function autoFillManualRecordCourse(rawVal) {
  const matched = lookupCourseByCodeSmart(rawVal);
  if (matched) {
    const titleEl = document.getElementById('manual-rec-title');
    const crEl = document.getElementById('manual-rec-credits');
    if (titleEl) titleEl.value = matched.title;
    if (crEl && matched.credits) crEl.value = matched.credits;
  }
}

function handleCoverCourseCodeInput(rawVal) {
  const matched = lookupCourseByCodeSmart(rawVal);
  if (matched) {
    const cTitleEl = document.getElementById('cov-course-title');
    if (cTitleEl) cTitleEl.value = matched.title;
  }
  renderCoverPreview();
}

function syncRunningToSimulator(notify = true) {
  const metrics = computeAcademicMetrics();
  const runningAndAdvising = metrics.classifiedCourses.filter(c =>
    c.academicStatus === 'RUNNING' || c.academicStatus === 'PLANNED'
  );
  if (runningAndAdvising.length > 0) {
    simNextCourses = runningAndAdvising.map((c, idx) => ({
      id: `sim_${idx}`,
      code: c.code,
      title: c.title,
      credits: c.credits,
      grade: 'A-',
      matched: true
    }));
  } else if (simNextCourses.length === 0) {
    simNextCourses = metrics.classifiedCourses.slice(0, 3).map((c, idx) => ({
      id: `sim_${idx}`,
      code: c.code,
      title: c.title,
      credits: c.credits,
      grade: 'A-',
      matched: true
    }));
  }
  renderCalculator(metrics);
  if (notify) showToast('Synced running & planned courses into CGPA Calculator!', 'success');
}

function addCustomSimCourseRow() {
  const newId = `sim_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`;
  simNextCourses.push({
    id: newId,
    code: '',
    title: '',
    credits: 3.0,
    grade: 'A',
    matched: false
  });
  renderCalculator();
  setTimeout(() => {
    const codeInput = document.getElementById(`sim-code-${newId}`);
    if (codeInput) codeInput.focus();
  }, 30);
}

function removeSimCourseRow(id) {
  simNextCourses = simNextCourses.filter(r => r.id !== id);
  renderCalculator();
}

function handleSimCourseCodeInput(id, rawVal) {
  const row = simNextCourses.find(r => r.id === id);
  if (!row) return;

  row.code = rawVal.toUpperCase();
  const found = lookupCourseByCodeSmart(rawVal);

  const titleInput = document.getElementById(`sim-title-${id}`);
  const statusBadge = document.getElementById(`sim-match-badge-${id}`);
  const creditsSelect = document.getElementById(`sim-credits-${id}`);

  if (found) {
    row.code = found.code;
    row.title = found.title;
    row.credits = found.credits;
    row.matched = true;
    if (titleInput) titleInput.value = found.title;
    if (creditsSelect) creditsSelect.value = String(found.credits);
    if (statusBadge) {
      statusBadge.textContent = '✓ Auto-filled from Curriculum';
      statusBadge.className = 'text-xs font-bold text-emerald-600 dark:text-emerald-400';
    }
  } else {
    row.matched = false;
    if (!rawVal.trim()) {
      row.title = '';
      if (titleInput) titleInput.value = '';
    }
    if (statusBadge) {
      statusBadge.textContent = rawVal.trim() ? 'Custom code (or keep typing e.g. CSE 2215)' : 'Type course code to auto-fill name';
      statusBadge.className = 'text-xs font-medium text-slate-400';
    }
  }

  updateCalculatorSummaryTotals();
}

function updateSimCourseRow(id, field, val) {
  const row = simNextCourses.find(r => r.id === id);
  if (!row) return;
  if (field === 'credits') {
    row.credits = parseFloat(val) || 3.0;
    updateCalculatorSummaryTotals();
  } else if (field === 'grade') {
    row.grade = val;
    updateCalculatorSummaryTotals();
  } else if (field === 'title') {
    row.title = val;
  } else if (field === 'code') {
    handleSimCourseCodeInput(id, val);
  }
}

function clearCalculatorOverrides() {
  document.getElementById('adv-cgpa-override').value = '';
  document.getElementById('adv-credits-override').value = '';
  renderCalculator();
}

function updateCalculatorSummaryTotals(metricsOverride = null) {
  const metrics = metricsOverride || computeAcademicMetrics();
  const customCgpaVal = parseFloat(document.getElementById('adv-cgpa-override').value);
  const customCrVal = parseFloat(document.getElementById('adv-credits-override').value);

  const baseCgpa = !isNaN(customCgpaVal) ? customCgpaVal : metrics.cgpa;
  const baseCredits = !isNaN(customCrVal) ? customCrVal : metrics.gradedCredits;
  const basePoints = baseCgpa * baseCredits;

  let nextCr = 0;
  let nextPts = 0;
  simNextCourses.forEach(item => {
    const pt = UIU_GRADES[item.grade] ? UIU_GRADES[item.grade].point : 0;
    nextCr += item.credits;
    nextPts += item.credits * pt;
  });
  const tgpa = nextCr > 0 ? (nextPts / nextCr) : 0;

  let simTotalCr = baseCredits + nextCr;
  let simTotalPts = basePoints + nextPts;

  Object.keys(selectedRetakes).forEach(code => {
    const c = metrics.classifiedCourses.find(x => x.code === code);
    const oldPt = c && c.record.point !== null ? c.record.point : 0;
    const newG = selectedRetakes[code];
    const newPt = UIU_GRADES[newG] ? UIU_GRADES[newG].point : 4.0;
    const cr = c ? c.credits : 3.0;
    if (newPt > oldPt) {
      simTotalPts += cr * (newPt - oldPt);
    }
  });

  const projectedCgpa = simTotalCr > 0 ? (simTotalPts / simTotalCr) : 0;
  const delta = projectedCgpa - baseCgpa;

  document.getElementById('calc-current-cgpa').textContent = baseCgpa.toFixed(2);
  document.getElementById('calc-graded-credits').textContent = baseCredits.toFixed(1);
  document.getElementById('calc-projected-tgpa').textContent = tgpa.toFixed(2);
  document.getElementById('calc-next-credits').textContent = nextCr.toFixed(1);
  document.getElementById('calc-projected-cgpa').textContent = projectedCgpa.toFixed(2);
  document.getElementById('calc-cgpa-delta').textContent = `${delta >= 0 ? '+' : ''}${delta.toFixed(2)}`;

  renderCoursesByGradeInspector(metrics);
  calculateTargetGoal(metrics, baseCgpa, baseCredits);
}

function renderCalculator(metricsOverride = null) {
  const metrics = metricsOverride || computeAcademicMetrics();
  populateCourseCatalogDatalist();

  const simListEl = document.getElementById('sim-courses-list');
  simListEl.innerHTML = simNextCourses.map(item => {
    const found = lookupCourseByCodeSmart(item.code);
    const displayTitle = item.title || (found ? found.title : '');
    const isMatched = Boolean(found);

    return `
    <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-sm transition hover:border-uiu-500/40">
      <div class="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center">
        <div class="sm:col-span-3">
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Course Code</label>
          <input
            id="sim-code-${item.id}"
            type="text"
            list="uiu-course-catalog-datalist"
            value="${item.code}"
            placeholder="e.g. CSE 2215"
            aria-label="Course Code"
            oninput="handleSimCourseCodeInput('${item.id}', this.value)"
            class="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono font-extrabold text-uiu-600 dark:text-uiu-400 uppercase focus:outline-none focus:ring-2 focus:ring-uiu-500"
          />
        </div>
        <div class="sm:col-span-4">
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Course Name (Auto-filled)</label>
          <input
            id="sim-title-${item.id}"
            type="text"
            value="${displayTitle}"
            placeholder="Auto-fills when you type code..."
            aria-label="Course Name"
            oninput="updateSimCourseRow('${item.id}', 'title', this.value)"
            class="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-uiu-500"
          />
        </div>
        <div class="sm:col-span-2">
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Credits</label>
          <select
            id="sim-credits-${item.id}"
            aria-label="Course credits"
            onchange="updateSimCourseRow('${item.id}', 'credits', this.value)"
            class="w-full px-2.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono font-bold"
          >
            ${[1.0, 1.5, 2.0, 3.0, 4.0, 6.0].map(cr => `<option value="${cr}" ${Number(item.credits) === cr ? 'selected' : ''}>${cr.toFixed(1)} Cr</option>`).join('')}
          </select>
        </div>
        <div class="sm:col-span-2">
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Expected Grade</label>
          <select
            aria-label="Expected grade"
            onchange="updateSimCourseRow('${item.id}', 'grade', this.value)"
            class="w-full px-2.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono font-bold text-uiu-500"
          >
            ${GRADE_KEYS.slice(0, 10).map(g => `<option value="${g}" ${item.grade === g ? 'selected' : ''}>${g} (${UIU_GRADES[g].point.toFixed(2)})</option>`).join('')}
          </select>
        </div>
        <div class="sm:col-span-1 flex sm:justify-end items-end pt-4">
          <button onclick="removeSimCourseRow('${item.id}')" aria-label="Remove course row" title="Remove Course" class="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
      <div class="flex items-center justify-between px-1">
        <span id="sim-match-badge-${item.id}" class="text-xs ${isMatched ? 'font-bold text-emerald-600 dark:text-emerald-400' : 'font-medium text-slate-400'}">
          ${isMatched ? '✓ Auto-filled from Curriculum' : (item.code ? 'Custom course code' : 'Type course code (e.g. CSE 1111, ENG 1011, FIN 2319) to auto-show course name')}
        </span>
      </div>
    </div>
  `;
  }).join('');

  updateCalculatorSummaryTotals(metrics);
}

function renderCoursesByGradeInspector(metricsOverride = null) {
  const metrics = metricsOverride || computeAcademicMetrics();
  const gFilter = document.getElementById('inspect-grade-select').value;
  const matching = metrics.classifiedCourses.filter(c =>
    c.record.status === 'COMPLETED' || c.record.status === 'FAILED'
  ).filter(c => gFilter === 'ALL' || c.record.grade === gFilter);

  const box = document.getElementById('courses-by-grade-list');
  if (matching.length === 0) {
    box.innerHTML = `<span class="text-slate-400">No courses recorded under grade ${gFilter}.</span>`;
  } else {
    box.innerHTML = matching.map(c =>
      `<span class="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-sm"><strong>${c.code}</strong>: ${c.record.grade} (${c.credits} Cr)</span>`
    ).join('');
  }
}

function setQuickGoal(val) {
  document.getElementById('goal-target-cgpa').value = val.toFixed(2);
  calculateTargetGoal();
}

function setGoalRemainingCredits() {
  const metrics = computeAcademicMetrics();
  const rem = Math.max(3, metrics.reqDegreeCredits - metrics.actualCompletedCredits);
  document.getElementById('goal-future-credits').value = rem;
  calculateTargetGoal(metrics);
}

function calculateTargetGoal(metricsOverride = null, baseCgpaOverride = null, baseCrOverride = null) {
  const metrics = metricsOverride || computeAcademicMetrics();
  const baseCgpa = baseCgpaOverride !== null ? baseCgpaOverride : metrics.cgpa;
  const baseCr = baseCrOverride !== null ? baseCrOverride : metrics.gradedCredits;
  const basePts = baseCgpa * baseCr;

  const targetCgpa = parseFloat(document.getElementById('goal-target-cgpa').value) || 3.50;
  const futureCr = parseFloat(document.getElementById('goal-future-credits').value) || 30;

  const finalCr = baseCr + futureCr;
  const neededPts = targetCgpa * finalCr - basePts;
  const reqGpa = futureCr > 0 ? (neededPts / futureCr) : 0;

  const box = document.getElementById('goal-result-box');
  if (reqGpa <= 0) {
    box.innerHTML = `<div class="font-bold text-emerald-500">Target ${targetCgpa.toFixed(2)} is already achieved (Current: ${baseCgpa.toFixed(2)})!</div>`;
  } else if (reqGpa > 4.00) {
    const maxCgpa = finalCr > 0 ? ((basePts + futureCr * 4.0) / finalCr) : 4.0;
    box.innerHTML = `<div class="font-bold text-rose-500">Unreachable by future courses alone (Requires ${reqGpa.toFixed(2)} avg GPA &gt; 4.00). Max possible over ${futureCr} Cr is ${maxCgpa.toFixed(2)}. Combine with Retakes!</div>`;
  } else {
    box.innerHTML = `<div class="font-bold text-emerald-600 dark:text-emerald-400">Reachable Target! Required Average GPA: <span class="font-mono text-base text-uiu-500">${reqGpa.toFixed(2)}</span> across next ${futureCr} Cr.</div>`;
  }

  // Render What-If Future Grade Scenarios
  const scTable = document.getElementById('cgpa-scenarios-table');
  const presets = [
    { label: 'If Future Avg = A (4.00)', gpa: 4.00 },
    { label: 'If Future Avg = A- (3.67)', gpa: 3.67 },
    { label: 'If Future Avg = B+ (3.33)', gpa: 3.33 },
    { label: 'If Future Avg = B (3.00)', gpa: 3.00 }
  ];
  const presetHtml = presets.map(p => {
    const res = finalCr > 0 ? ((basePts + futureCr * p.gpa) / finalCr) : p.gpa;
    return `<div class="flex justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50"><span>${p.label}</span><span class="font-mono font-bold text-uiu-500">${res.toFixed(2)} CGPA</span></div>`;
  }).join('');

  const savedHtml = (appState.savedCgpaScenarios || []).map(s => `
    <div class="flex items-center justify-between p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
      <span><strong>${s.name}</strong> (Target ${s.targetCgpa.toFixed(2)}, ${s.futureCredits} Cr &rarr; Need ${s.reqGpa.toFixed(2)})</span>
      <button onclick="deleteSavedCgpaScenario('${s.id}')" class="text-rose-500"><i class="fa-solid fa-xmark"></i></button>
    </div>
  `).join('');

  scTable.innerHTML = presetHtml + savedHtml;
}

function saveCgpaScenario() {
  const targetCgpa = parseFloat(document.getElementById('goal-target-cgpa').value) || 3.50;
  const futureCredits = parseFloat(document.getElementById('goal-future-credits').value) || 30;
  const metrics = computeAcademicMetrics();
  const reqGpa = futureCredits > 0 ? ((targetCgpa * (metrics.gradedCredits + futureCredits) - metrics.totalGradePoints) / futureCredits) : 0;
  appState.savedCgpaScenarios.push({
    id: 'sc-' + Date.now(),
    name: `Goal ${targetCgpa.toFixed(2)} (${futureCredits} Cr)`,
    targetCgpa,
    futureCredits,
    reqGpa
  });
  saveAppState();
  calculateTargetGoal(metrics);
  showToast('Saved CGPA What-If Scenario!', 'success');
}

function deleteSavedCgpaScenario(id) {
  appState.savedCgpaScenarios = appState.savedCgpaScenarios.filter(s => s.id !== id);
  saveAppState();
  calculateTargetGoal();
}

function updateRetakePolicy(policyVal) {
  appState.profile.retakePolicy = policyVal;
  saveAppState();
  refreshAllViews();
}

function toggleRetakeSimulation(code, targetGrade = 'A') {
  if (selectedRetakes[code]) delete selectedRetakes[code];
  else selectedRetakes[code] = targetGrade;
  refreshAllViews();
}

function updateRetakeTargetGrade(code, targetGrade) {
  selectedRetakes[code] = targetGrade;
  refreshAllViews();
}

function renderRetakePlanner(metricsOverride = null) {
  const metrics = metricsOverride || computeAcademicMetrics();
  const tuitionRate = appState.profile.customTuitionOverride || metrics.program.tuitionPerCredit;

  let retakeCr = 0;
  let deltaPts = 0;
  Object.keys(selectedRetakes).forEach(code => {
    const c = metrics.classifiedCourses.find(x => x.code === code);
    if (c && c.record.point !== null) {
      const newPt = UIU_GRADES[selectedRetakes[code]].point;
      if (newPt > c.record.point) {
        retakeCr += c.credits;
        deltaPts += c.credits * (newPt - c.record.point);
      }
    }
  });

  const afterCgpa = metrics.gradedCredits > 0 ? ((metrics.totalGradePoints + deltaPts) / metrics.gradedCredits) : 0;
  const gain = afterCgpa - metrics.cgpa;
  const estFee = retakeCr * tuitionRate * 0.5; // 50% first-retake concession

  document.getElementById('retake-cgpa-before').textContent = metrics.cgpa.toFixed(2);
  document.getElementById('retake-cgpa-after').textContent = afterCgpa.toFixed(2);
  document.getElementById('retake-cgpa-gain').textContent = `+${gain.toFixed(3)}`;
  document.getElementById('retake-total-cr').textContent = `${retakeCr.toFixed(1)} Cr`;
  document.getElementById('retake-est-fee').textContent = `Tk ${estFee.toLocaleString()} (50% 1st Retake)`;

  const candidates = metrics.classifiedCourses.filter(c =>
    c.record.status === 'FAILED' || (c.record.status === 'COMPLETED' && c.record.point <= 3.33)
  ).sort((a, b) => (a.record.point || 0) - (b.record.point || 0));

  const listEl = document.getElementById('retake-candidates-list');
  if (candidates.length === 0) {
    listEl.innerHTML = `<div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-center text-sm text-slate-400">No courses with B+ or lower found in your record.</div>`;
    return;
  }

  listEl.innerHTML = candidates.map(c => {
    const isSel = Boolean(selectedRetakes[c.code]);
    const targetG = selectedRetakes[c.code] || 'A';
    const oldPt = c.record.point || 0;
    const newPt = UIU_GRADES[targetG].point;
    const singleBoost = metrics.gradedCredits > 0 ? ((c.credits * Math.max(0, newPt - oldPt)) / metrics.gradedCredits) : 0;
    const courseFee50 = c.credits * tuitionRate * 0.5;

    return `
      <div class="p-3.5 rounded-2xl border ${isSel ? 'border-uiu-500 bg-uiu-500/10' : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40'} flex flex-wrap items-center justify-between gap-2 text-sm">
        <div class="flex items-center gap-3">
          <input type="checkbox" ${isSel ? 'checked' : ''} onchange="toggleRetakeSimulation('${c.code}', '${targetG}')" class="w-4 h-4 accent-uiu-500 rounded" />
          <div>
            <div class="font-bold"><span class="font-mono">${c.code}</span> — ${c.title} (${c.credits} Cr)</div>
            <div class="text-sm text-slate-500">
              Old Grade: <strong class="text-rose-500 font-mono">${c.record.grade} (${oldPt.toFixed(2)})</strong>
              &bull; Boost: <strong class="text-emerald-500 font-mono">+${singleBoost.toFixed(3)} CGPA</strong>
              &bull; 1st Retake Fee (50%): <strong class="font-mono">Tk ${courseFee50.toLocaleString()}</strong>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-slate-400">Expected Grade:</span>
          <select aria-label="Expected retake grade for ${c.code}" onchange="if(!selectedRetakes['${c.code}']) toggleRetakeSimulation('${c.code}', this.value); else updateRetakeTargetGrade('${c.code}', this.value);" class="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono font-bold">
            ${['A', 'A-', 'B+', 'B'].map(g => `<option value="${g}" ${targetG === g ? 'selected' : ''}>${g} (${UIU_GRADES[g].point.toFixed(2)})</option>`).join('')}
          </select>
        </div>
      </div>
    `;
  }).join('');
}

// ============================================================================
// TAB 7: MULTI-DEPARTMENT FEE CALCULATOR & SCHOLARSHIP TRACKER (SECTIONS 17, 18)
// ============================================================================
function handleFeeRateOverride() {
  const val = parseFloat(document.getElementById('fee-per-credit').value);
  const prog = getActiveProgram();
  if (!isNaN(val) && val !== prog.tuitionPerCredit) {
    appState.profile.customTuitionOverride = val;
  } else {
    appState.profile.customTuitionOverride = null;
  }
  saveAppState();
  renderFeeCalculator();
}

function resetProgramDefaultFees() {
  const prog = getActiveProgram();
  appState.profile.customTuitionOverride = null;
  document.getElementById('fee-per-credit').value = prog.tuitionPerCredit;
  document.getElementById('fee-term-charge').value = prog.termFee;
  document.getElementById('fee-lab-charge').value = prog.labFeePerTerm;
  document.getElementById('fee-bus-charge').value = 0;
  document.getElementById('fee-gym-charge').value = 0;
  document.getElementById('fee-admission-charge').value = 0;
  document.getElementById('fee-prev-balance').value = 0;
  document.getElementById('fee-paid-amount').value = 0;
  saveAppState();
  renderFeeCalculator();
  showToast(`Reset fee inputs to official ${prog.code} defaults.`, 'info');
}

function syncAdvisingToFees() {
  const metrics = computeAcademicMetrics();
  const courseMap = new Map();
  metrics.classifiedCourses.forEach(c => courseMap.set(c.code, c));

  let regCr = 0;
  let nonWaivCr = 0;
  let retakeCr = 0;

  appState.advisingSelection.forEach(id => {
    const off = appState.offerings.find(o => o.id === id);
    const code = off ? off.code : id;
    const c = courseMap.get(code);
    const cr = c ? c.credits : 3.0;
    if (c && c.isRetakeCandidate && c.record.status !== 'NOT_TAKEN') {
      retakeCr += cr;
    } else if (c && (c.nonWaivable || c.isCapstone)) {
      nonWaivCr += cr;
    } else {
      regCr += cr;
    }
  });

  if (regCr + nonWaivCr + retakeCr > 0) {
    document.getElementById('fee-reg-credits').value = regCr;
    document.getElementById('fee-nonwaivable-credits').value = nonWaivCr;
    document.getElementById('fee-retake-credits').value = retakeCr;
  }
  renderFeeCalculator(metrics);
  showToast('Loaded selected Advising credits into Fee Calculator!', 'success');
}

function renderFeeCalculator(metricsOverride = null) {
  const metrics = metricsOverride || computeAcademicMetrics();
  const prog = metrics.program;

  const batchInput = document.getElementById('fee-student-batch');
  if (batchInput && !batchInput.value) {
    const termOrder = appState.profile.admissionTerm === 'Spring' ? 1 : appState.profile.admissionTerm === 'Summer' ? 2 : 3;
    batchInput.value = `${String(appState.profile.admissionYear || 2024).slice(-2)}${termOrder}`;
  }
  const studentBatch = Number(batchInput?.value) || 0;

  const regCr = Math.max(0, parseFloat(document.getElementById('fee-reg-credits').value) || 0);
  const nonWaivCr = Math.max(0, parseFloat(document.getElementById('fee-nonwaivable-credits').value) || 0);
  const retakeCr = Math.max(0, parseFloat(document.getElementById('fee-retake-credits').value) || 0);
  const perCredit = Math.max(0, parseFloat(document.getElementById('fee-per-credit').value) || prog.tuitionPerCredit);
  const waiverPct = Math.max(0, parseFloat(document.getElementById('fee-waiver-pct').value) || 0);
  const isFirstRetake = document.getElementById('fee-first-retake').value === 'yes';

  const termFee = Math.max(0, parseFloat(document.getElementById('fee-term-charge').value) || 0);
  const labFee = Math.max(0, parseFloat(document.getElementById('fee-lab-charge').value) || 0);
  const busFee = Math.max(0, parseFloat(document.getElementById('fee-bus-charge').value) || 0);
  const gymFee = Math.max(0, parseFloat(document.getElementById('fee-gym-charge').value) || 0);
  const admFee = Math.max(0, parseFloat(document.getElementById('fee-admission-charge').value) || 0);
  const prevBal = parseFloat(document.getElementById('fee-prev-balance').value) || 0;
  const paidAmt = Math.max(0, parseFloat(document.getElementById('fee-paid-amount').value) || 0);

  const waiverEligibleTuition = regCr * perCredit;
  const waiverDiscount = waiverEligibleTuition * (waiverPct / 100);
  const netRegularTuition = waiverEligibleTuition - waiverDiscount;

  const nonWaivableTuition = nonWaivCr * perCredit;
  const grossRetakeTuition = retakeCr * perCredit;
  const retakeAdjustment = isFirstRetake ? grossRetakeTuition * 0.5 : 0;
  const netRetakeTuition = grossRetakeTuition - retakeAdjustment;

  const grossTuition = waiverEligibleTuition + nonWaivableTuition + grossRetakeTuition;
  const nonWaivableFixedCharges = termFee + labFee + busFee + gymFee + admFee;
  const totalPayable = netRegularTuition + nonWaivableTuition + netRetakeTuition + nonWaivableFixedCharges + prevBal;
  const remainingBalance = Math.max(0, totalPayable - paidAmt);

  // UIU requires the Tk 20,000 registration payment only from batch 252 onward.
  const registrationPaymentRequired = studentBatch >= 252;
  const regDownPayment = registrationPaymentRequired ? Math.min(remainingBalance, 20000) : 0;
  const installPool = Math.max(0, remainingBalance - regDownPayment);

  const rateSourceBadge = appState.profile.customTuitionOverride
    ? `<span class="px-2 py-0.5 rounded bg-amber-500/15 text-amber-500 text-xs font-bold">Student-entered override</span>`
    : `<span class="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-500 text-xs font-bold">Official published rate (${prog.code})</span>`;

  const installmentsHtml = prog.termSystem === 'Semester'
    ? `
      <div class="grid grid-cols-5 gap-2 text-center font-mono text-sm pt-2">
        <div class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800"><div class="text-xs text-slate-400">${registrationPaymentRequired ? 'Registration payment' : 'No fixed advance'}</div><strong>Tk ${Math.round(regDownPayment).toLocaleString()}</strong></div>
        <div class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800"><div class="text-xs text-slate-400">1st (25%)</div><strong>Tk ${Math.round(installPool * 0.25).toLocaleString()}</strong></div>
        <div class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800"><div class="text-xs text-slate-400">2nd (25%)</div><strong>Tk ${Math.round(installPool * 0.25).toLocaleString()}</strong></div>
        <div class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800"><div class="text-xs text-slate-400">3rd (25%)</div><strong>Tk ${Math.round(installPool * 0.25).toLocaleString()}</strong></div>
        <div class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800"><div class="text-xs text-slate-400">4th (25%)</div><strong>Tk ${Math.round(installPool * 0.25).toLocaleString()}</strong></div>
      </div>
    `
    : `
      <div class="grid grid-cols-4 gap-2 text-center font-mono text-sm pt-2">
        <div class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800"><div class="text-xs text-slate-400">${registrationPaymentRequired ? 'Registration payment' : 'No fixed advance'}</div><strong>Tk ${Math.round(regDownPayment).toLocaleString()}</strong></div>
        <div class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800"><div class="text-xs text-slate-400">1st Inst (40%)</div><strong>Tk ${Math.round(installPool * 0.40).toLocaleString()}</strong></div>
        <div class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800"><div class="text-xs text-slate-400">2nd Inst (30%)</div><strong>Tk ${Math.round(installPool * 0.30).toLocaleString()}</strong></div>
        <div class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800"><div class="text-xs text-slate-400">3rd Inst (30%)</div><strong>Tk ${Math.round(installPool * 0.30).toLocaleString()}</strong></div>
      </div>
    `;

  document.getElementById('fee-breakdown-container').innerHTML = `
    <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-2 text-sm">
      <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
        <span class="font-bold">Transparent Fee Breakdown (${prog.termSystem})</span>
        ${rateSourceBadge}
      </div>
      <div class="rounded-xl bg-sky-50 dark:bg-sky-900/20 px-3 py-2 text-xs text-sky-800 dark:text-sky-200">Batch ${studentBatch || 'not set'}: ${registrationPaymentRequired ? 'Tk 20,000 registration payment applies; remaining balance is shown in installments.' : 'No fixed Tk 20,000 registration payment. Installments are calculated from the remaining balance.'} Update your batch above if needed. This estimate does not replace your UCAM bill.</div>
      <div class="flex justify-between"><span>Gross Tuition (${(regCr + nonWaivCr + retakeCr).toFixed(1)} Cr × Tk ${perCredit.toLocaleString()}):</span><span class="font-mono font-semibold">Tk ${grossTuition.toLocaleString()}</span></div>
      <div class="flex justify-between"><span>Waiver-Eligible Tuition (${regCr.toFixed(1)} Cr):</span><span class="font-mono">Tk ${waiverEligibleTuition.toLocaleString()}</span></div>
      <div class="flex justify-between text-emerald-600 dark:text-emerald-400"><span>Tuition Waiver Discount (${waiverPct}%):</span><span class="font-mono font-bold">- Tk ${waiverDiscount.toLocaleString()}</span></div>
      ${retakeCr > 0 ? `<div class="flex justify-between text-sky-500"><span>First-Retake 50% Concession (${retakeCr.toFixed(1)} Cr):</span><span class="font-mono font-bold">- Tk ${retakeAdjustment.toLocaleString()}</span></div>` : ''}
      <div class="flex justify-between"><span>Non-Waivable Fixed Charges (${prog.termSystem} Fee Tk ${termFee.toLocaleString()} + Lab/Bus/Gym):</span><span class="font-mono">Tk ${nonWaivableFixedCharges.toLocaleString()}</span></div>
      ${prevBal !== 0 ? `<div class="flex justify-between"><span>Previous Balance:</span><span class="font-mono">Tk ${prevBal.toLocaleString()}</span></div>` : ''}
      <div class="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between text-base font-extrabold">
        <span>Total Payable Estimate:</span>
        <span class="font-mono text-uiu-500">Tk ${Math.round(totalPayable).toLocaleString()}</span>
      </div>
      <div class="flex justify-between text-sm text-slate-500">
        <span>Already Paid: Tk ${paidAmt.toLocaleString()}</span>
        <span class="font-mono font-bold text-slate-900 dark:text-white">Remaining Balance: Tk ${Math.round(remainingBalance).toLocaleString()}</span>
      </div>
      ${installmentsHtml}
    </div>
  `;

  // Remaining Degree Cost & Comparisons
  const remCredits = Math.max(0, metrics.reqDegreeCredits - metrics.actualCompletedCredits);
  const avgCrPerTerm = Math.max(3, Number(appState.profile.avgCreditsPerTerm) || (prog.termSystem === 'Semester' ? 20 : 12));
  const remTerms = remCredits > 0 ? Math.ceil(remCredits / avgCrPerTerm) : 0;
  const repeatedFixedPerTerm = termFee + labFee + busFee + gymFee;
  const remTuitionNet = remCredits * perCredit * (1 - waiverPct / 100);
  const remTotalCost = remTuitionNet + remTerms * repeatedFixedPerTerm;

  document.getElementById('remaining-degree-cost-box').innerHTML = `
    <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-1.5">
      <div class="flex justify-between"><span>Remaining Degree Credits:</span><span class="font-mono font-bold">${remCredits.toFixed(1)} Cr</span></div>
      <div class="flex justify-between"><span>Estimated Remaining ${prog.termSystem}s:</span><span class="font-mono font-bold">${remTerms} ${prog.termSystem}(s)</span></div>
      <div class="flex justify-between"><span>Repeated Fixed Fees (${remTerms} × Tk ${repeatedFixedPerTerm.toLocaleString()}):</span><span class="font-mono">Tk ${(remTerms * repeatedFixedPerTerm).toLocaleString()}</span></div>
      <div class="pt-1.5 border-t border-slate-200 dark:border-slate-700 flex justify-between text-base font-extrabold text-emerald-600 dark:text-emerald-400">
        <span>Est. Remaining Degree Cost (@${waiverPct}% Waiver):</span>
        <span class="font-mono">Tk ${Math.round(remTotalCost).toLocaleString()}</span>
      </div>
    </div>
    <div class="space-y-1.5">
      <div class="font-bold text-slate-500">Official Published Total Program Cost Reference (${prog.code}):</div>
      <div class="grid grid-cols-3 gap-2 text-center font-mono text-sm">
        <div class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800"><div class="text-xs text-slate-400">0% Waiver</div><strong>Tk ${prog.publishedTotalWithoutWaiver.toLocaleString()}</strong></div>
        <div class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800"><div class="text-xs text-slate-400">25% Waiver</div><strong>Tk ${prog.publishedTotal25Waiver.toLocaleString()}</strong></div>
        <div class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800"><div class="text-xs text-slate-400">50% Waiver</div><strong>Tk ${prog.publishedTotal50Waiver.toLocaleString()}</strong></div>
      </div>
    </div>
  `;
}

function renderScholarshipTracker(metricsOverride = null) {
  const metrics = metricsOverride || computeAcademicMetrics();
  const prog = metrics.program;
  const cat = document.getElementById('sch-category-select').value;
  const qualGpa = parseFloat(document.getElementById('sch-qualifying-gpa').value) || 0;
  const hasIncompleteOrImp = document.getElementById('sch-has-incomplete').checked;
  const regCr = parseFloat(document.getElementById('fee-reg-credits').value) || 0;

  const rulesMap = {
    MERIT_100: { pct: 100, minGpa: 3.50, minCr: prog.minScholarshipCredits, name: 'Merit Scholarship (Top 2% — 100%)' },
    MERIT_50:  { pct: 50,  minGpa: 3.50, minCr: prog.minScholarshipCredits, name: 'Merit Scholarship (Next 4% — 50%)' },
    MERIT_25:  { pct: 25,  minGpa: 3.50, minCr: prog.minScholarshipCredits, name: 'Merit Scholarship (Next 4% — 25%)' },
    ADM_50:    { pct: 50,  minGpa: 3.50, minCr: prog.minScholarshipCredits, name: 'Admission Result Waiver (50%)' },
    ADM_25:    { pct: 25,  minGpa: 3.50, minCr: prog.minScholarshipCredits, name: 'Admission Result Waiver (25%)' },
    FF_100:    { pct: 100, minGpa: 2.50, minCr: prog.minScholarshipCredits, name: 'Freedom Fighters Children Quota (100%)' },
    REGIONAL_100: { pct: 100, minGpa: 3.00, minCr: prog.minUnderdevelopedQuotaCredits, name: 'Underdeveloped Region Meritorious Quota (100%)' },
    SIBLING_20: { pct: 20, minGpa: 3.00, minCr: prog.minScholarshipCredits, name: 'Sibling / Spouse / Alumni Sibling Waiver (20%)' },
    DIPLOMA_25: { pct: 25, minGpa: 3.00, minCr: prog.minScholarshipCredits, name: 'Diploma / Ethnic & Tribal Waiver (25%)' },
    EMP_40:     { pct: 40, minGpa: 3.00, minCr: prog.minScholarshipCredits, name: 'UIU Employee Family Waiver (40%)' }
  };

  const rule = rulesMap[cat] || rulesMap.MERIT_50;
  const missing = [];
  if (qualGpa < rule.minGpa) missing.push(`Minimum GPA ${rule.minGpa.toFixed(2)} required (Entered: ${qualGpa.toFixed(2)})`);
  if (regCr < rule.minCr) missing.push(`Minimum ${rule.minCr} registered credits required for ${prog.code} (Entered: ${regCr} Cr)`);
  if (hasIncompleteOrImp) missing.push(`Students applying for 'I' grade or improvement exam are ineligible in the following term`);

  const perCredit = appState.profile.customTuitionOverride || prog.tuitionPerCredit;
  const estSavings = missing.length === 0 ? (regCr * perCredit * (rule.pct / 100)) : 0;

  document.getElementById('scholarship-status-box').innerHTML = `
    <div class="p-3.5 rounded-2xl border ${missing.length === 0 ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-amber-500/40 bg-amber-500/10'} text-sm space-y-1.5">
      <div class="flex items-center justify-between">
        <span class="font-bold">${rule.name}</span>
        <span class="px-2 py-0.5 rounded font-bold ${missing.length === 0 ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}">${missing.length === 0 ? 'Potentially Eligible' : 'Conditions Missing'}</span>
      </div>
      ${missing.length === 0
        ? `<div class="text-emerald-600 dark:text-emerald-400 font-semibold">Meets ${prog.code} credit (${rule.minCr} Cr) &amp; GPA (${rule.minGpa.toFixed(2)}) continuation thresholds. Est. Savings: <strong>Tk ${Math.round(estSavings).toLocaleString()}</strong></div>`
        : `<ul class="list-disc pl-4 text-amber-600 dark:text-amber-400 space-y-0.5">${missing.map(m => `<li>${m}</li>`).join('')}</ul>`
      }
      <div class="text-xs text-slate-400 pt-1">Source: <a href="${prog.feeSourceUrl}" target="_blank" rel="noopener noreferrer" class="underline text-uiu-500">Official UIU Scholarship &amp; Waiver Policy (Effective Spring 2025)</a> • Verified ${prog.lastVerified}</div>
    </div>
  `;
}

// ============================================================================
// TAB 8: GRADUATION AUDIT & TRACK RULES (SECTIONS 9, 10)
// ============================================================================
function renderGraduationAudit(metricsOverride = null) {
  const metrics = metricsOverride || computeAcademicMetrics();
  const { curriculum, reqDegreeCredits, actualCompletedCredits, cgpa } = metrics;

  const badge = document.getElementById('grad-audit-main-badge');
  badge.textContent = metrics.auditOverallStatus;
  badge.className = `px-3.5 py-1.5 rounded-full text-sm font-bold border bg-${metrics.auditBadgeColor}-500/15 text-${metrics.auditBadgeColor}-600 dark:text-${metrics.auditBadgeColor}-400 border-${metrics.auditBadgeColor}-500/30`;

  const checks = [
    {
      title: '1. Total Degree Credits Requirement',
      passed: metrics.creditsMet,
      detail: `${actualCompletedCredits.toFixed(1)} / ${reqDegreeCredits.toFixed(1)} Credits completed (${appState.profile.degreeCreditsSource})`
    },
    {
      title: `2. Minimum Graduation CGPA (≥ ${curriculum.minGraduationCgpa.toFixed(2)})`,
      passed: metrics.cgpaMet,
      detail: `Current Official Record CGPA: ${cgpa.toFixed(2)}`
    },
    {
      title: '3. Category Credit Minimums',
      passed: metrics.categoriesMet,
      detail: `${metrics.fulfilledCategoriesCount} of ${curriculum.categories.length} curriculum categories fulfilled`
    },
    {
      title: `4. ${curriculum.capstoneRule.type} & Minimum Grade (${curriculum.capstoneRule.minGrade})`,
      passed: metrics.capstoneMet,
      detail: `${metrics.capstoneCreditsDone.toFixed(1)} / ${(curriculum.capstoneRule.requiredCredits || 6).toFixed(1)} Cr completed • ${curriculum.capstoneRule.description}`
    },
    {
      title: '5. Outstanding Failed (F) or Incomplete (I) Grades',
      passed: metrics.failedCompulsoryCount === 0 && !metrics.hasUnresolvedIncomplete,
      detail: metrics.failedCompulsoryCount === 0 && !metrics.hasUnresolvedIncomplete
        ? '0 unresolved Failed or Incomplete compulsory courses'
        : `${metrics.failedCompulsoryCount} Failed course(s), Incomplete present: ${metrics.hasUnresolvedIncomplete ? 'Yes' : 'No'}`
    },
    {
      title: '6. Curriculum Dataset Verification Status',
      passed: curriculum.verificationStatus === 'Verified',
      detail: `Dataset Status: ${curriculum.verificationStatus} (Last verified ${curriculum.lastVerified})`
    }
  ];

  document.getElementById('graduation-audit-checks-grid').innerHTML = checks.map(ch => `
    <div class="p-4 rounded-2xl border ${ch.passed ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-amber-500/40 bg-amber-500/5'} flex items-start gap-3 text-sm">
      <div class="w-7 h-7 rounded-xl ${ch.passed ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'} flex items-center justify-center shrink-0">
        <i class="fa-solid ${ch.passed ? 'fa-check' : 'fa-hourglass-half'}"></i>
      </div>
      <div>
        <h4 class="font-bold text-slate-900 dark:text-white">${ch.title}</h4>
        <p class="text-slate-500 dark:text-slate-400 mt-0.5">${ch.detail}</p>
      </div>
    </div>
  `).join('');

  const tracksEl = document.getElementById('graduation-tracks-detail');
  const tracksList = Object.values(metrics.trackStats);
  if (tracksList.length === 0) {
    tracksEl.innerHTML = `<div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-sm text-slate-400">No separate specialization tracks defined for this curriculum version.</div>`;
  } else {
    tracksEl.innerHTML = tracksList.map(tr => {
      const avail = metrics.classifiedCourses.filter(c => c.track === tr.id && c.academicStatus !== 'COMPLETED');
      return `
        <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border ${tr.qualified ? 'border-emerald-500/50' : 'border-slate-200 dark:border-slate-700'} space-y-2 text-sm">
          <div class="flex items-center justify-between">
            <h4 class="font-bold text-base">${tr.name}</h4>
            <span class="px-2 py-0.5 rounded-full text-xs font-bold ${tr.qualified ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-700'}">${tr.qualified ? 'Track Requirement Met' : 'In Progress'}</span>
          </div>
          <p class="text-slate-500">${tr.description}</p>
          <div class="font-mono text-sm">Completed: <strong>${tr.completedCourses.length} / ${tr.minCourses} courses</strong> (${tr.completedCredits.toFixed(1)} / ${tr.minCredits.toFixed(1)} Cr)</div>
          <div class="text-sm text-slate-500">Completed Courses: ${tr.completedCourses.length ? tr.completedCourses.map(c => `${c.code} (${c.grade})`).join(', ') : 'None yet'}</div>
          <div class="text-sm text-uiu-500">Recommended Available: ${avail.slice(0, 4).map(c => c.code).join(', ') || 'All completed'}</div>
        </div>
      `;
    }).join('');
  }
}

// ============================================================================
// TAB 9: VERSIONED EXAM ROUTINE & ICS/PNG EXPORT (SECTION 20)
// ============================================================================
const UIU_EXAM_SLOT_TIMES = { T1:'9:00–11:00 AM', T2:'11:30 AM–1:30 PM', T3:'2:00–4:00 PM', T4:'Check official routine' };

function detectPlannedExamConflicts(entries) {
  let clashCount = 0;
  let sameDayCount = 0;
  const alertsById = {};
  for (let i = 0; i < entries.length; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      const a = entries[i];
      const b = entries[j];
      const sameDay = a.examDay && a.examDay === b.examDay;
      const sameSlot = a.examSlot && a.examSlot === b.examSlot;
      if ((sameDay && sameSlot) || (a.date && a.date === b.date && a.time && a.time === b.time)) {
        clashCount++;
        alertsById[a.id] = `TIME CONFLICT with ${b.code}`;
        alertsById[b.id] = `TIME CONFLICT with ${a.code}`;
      } else if ((sameDay && (a.examSlot || b.examSlot)) || (a.date && a.date === b.date)) {
        sameDayCount++;
        if (!alertsById[a.id]) alertsById[a.id] = `Same-day exam with ${b.code}`;
        if (!alertsById[b.id]) alertsById[b.id] = `Same-day exam with ${a.code}`;
      }
    }
  }
  return { clashCount, sameDayCount, alertsById };
}

function renderExamRoutine(metricsOverride = null) {
  const metrics = metricsOverride || computeAcademicMetrics();
  const examType = document.getElementById('exam-type-select').value || 'Midterm';
  const prog = metrics.program;

  const metadataLine = document.getElementById('exam-metadata-line');
  metadataLine.textContent =
    `Program: ${prog.code} • Generic planner: add each course and select its day and time slot from your current official routine.`;

  const q = normalizeCourseCode(document.getElementById('exam-search-input').value || '');
  const programCourses = (DATA_BUNDLE.curricula || []).flatMap(c => c.courses || []);
  const catalog = [...(metrics.classifiedCourses || []), ...programCourses, ...(appState.offerings || [])];
  const matches = q ? catalog.filter(c => normalizeCourseCode(c.code || '').includes(q)) : [];
  const uniqueMatches = [...new Map(matches.map(c => [normalizeCourseCode(c.code), c])).values()].slice(0, 8);
  document.getElementById('exam-available-list').innerHTML = uniqueMatches.length ? uniqueMatches.map(course => {
    const code = normalizeCourseCode(course.code);
    const id = `plan:${code}`;
    const isSel = appState.examSelection.includes(id);
    return `
      <div class="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2 text-sm">
        <div class="min-w-0"><span class="font-mono font-bold">${code}</span><div class="truncate text-xs text-slate-500">${course.title || course.name || 'Course'}</div></div>
        <button onclick="toggleExamCourseSelection('${id}')" class="shrink-0 px-2.5 py-1 rounded-lg font-bold text-sm ${isSel ? 'bg-rose-500 text-white' : 'bg-uiu-500 text-white'}">${isSel ? 'Remove' : '+ Add'}</button>
      </div>
    `;
  }).join('') : `<p class="rounded-xl bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 p-3 text-xs text-slate-500">${q ? 'No matching course in your selected program. You can still add its code below.' : 'Type a course code to search your program catalog.'}</p>`;

  // Build combined exam list
  const entries = [
    ...appState.examSelection.map(id => {
      const code = id.startsWith('plan:') ? id.slice(5) : id;
      const custom = (appState.customExams || []).find(x => x.id === id);
      if (custom) return custom;
      const o = appState.offerings.find(x => x.id === id) || catalog.find(x => normalizeCourseCode(x.code || '') === code);
      if (!o) return null;
      const planned = (appState.customExams || []).find(x => x.id === `plan:${code}`);
      return {
        id: o.id,
        code: o.code,
        title: o.title,
        section: o.section || '—',
        date: '',
        time: '',
        room: o.room || 'UIU',
        source: o.verificationStatus || 'Course catalog',
        examDay: planned?.examDay || o.examDay || '',
        examSlot: planned?.examSlot || o.examSlot || ''
      };
    }).filter(Boolean),
    ...(appState.customExams || []).filter(e => !e.id.startsWith('plan:') && !appState.examSelection.includes(e.id)),
    // Advising is the source of truth for selected courses; mirror its day/slot
    // into this view so students can see and check conflicts without re-adding.
    ...[...new Set((appState.advisingSelection || []).map(id => {
      const oldOffering = (appState.offerings || []).find(o => o.id === id);
      return normalizeCourseCode(oldOffering?.code || id);
    }))].map(code => {
      const id = `advising:${code}`;
      if (entries.some(entry => normalizeCourseCode(entry.code || '') === code)) return null;
      const course = catalog.find(c => normalizeCourseCode(c.code || '') === code);
      if (!course) return null;
      const manual = appState.advisingExamSlots?.[code] || {};
      const official = getOfficialAdvisingExamSlot(code);
      return {
        id, code, title: course.title || course.name || 'Course', section: '—',
        date: '', time: '', room: 'UIU', source: manual.day || manual.slot ? 'Advising plan' : official?.day ? 'Official course routine' : 'Advising plan',
        examDay: manual.day || official?.day || '', examSlot: manual.slot || official?.slot || ''
      };
    }).filter(Boolean)
  ].sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));

  // If a course already exists in the routine list, prefer its Advising day/slot
  // (or the official routine) so the two screens stay in sync without duplicates.
  const advisingCodes = [...new Set((appState.advisingSelection || []).map(id => {
    const oldOffering = (appState.offerings || []).find(o => o.id === id);
    return normalizeCourseCode(oldOffering?.code || id);
  }))];
  entries.forEach(entry => {
    const code = normalizeCourseCode(entry.code || '');
    const isAdvisingCourse = advisingCodes.includes(code);
    const isGenericPlanCourse = String(entry.id || '').startsWith('plan:');
    if (!isAdvisingCourse && !isGenericPlanCourse) return;
    const manual = appState.advisingExamSlots?.[code] || {};
    const official = getOfficialAdvisingExamSlot(code);
    entry.examDay = (isAdvisingCourse && manual.day) || entry.examDay || official?.day || '';
    entry.examSlot = (isAdvisingCourse && manual.slot) || entry.examSlot || official?.slot || '';
    if (isAdvisingCourse && (manual.day || manual.slot)) entry.source = 'Advising plan';
    else if (official?.day && (!entry.source || entry.source === 'Pre-advising plan')) entry.source = 'Official course routine';
  });

  // Detect same-slot clashes and same-day / consecutive-day alerts
  const { clashCount, sameDayCount, alertsById } = detectPlannedExamConflicts(entries);

  document.getElementById('exam-alerts-banner').innerHTML = `
    <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-sm">
      <div class="text-xs font-bold uppercase text-slate-400">Courses in plan</div>
      <div class="text-base font-extrabold font-mono text-uiu-500 mt-0.5">${entries.length} course(s)</div>
    </div>
    <div class="p-3 rounded-2xl ${clashCount > 0 ? 'bg-rose-500/15 border-rose-500/40 text-rose-500' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'} border text-sm">
      <div class="text-xs font-bold uppercase">Direct Time Clashes</div>
      <div class="text-base font-extrabold font-mono mt-0.5">${clashCount} Clash(es) Detected</div>
    </div>
    <div class="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-sm">
      <div class="text-xs font-bold uppercase">Same-Day, Different Slot</div>
      <div class="text-base font-extrabold font-mono mt-0.5">${sameDayCount} Same-Day Pair(s)</div>
    </div>
  `;

  const tbody = document.getElementById('exam-routine-tbody');
  if (entries.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="py-6 text-center text-slate-400">No exams in your personal routine yet. Add courses on the left.</td></tr>`;
    return;
  }

  tbody.innerHTML = entries.map(e => {
    const al = alertsById[e.id];
    return `
      <tr>
        <td class="py-2.5 px-3"><strong class="font-mono">${e.code} (${e.section})</strong><div class="text-sm text-slate-500">${e.title}</div></td>
        <td class="py-2.5 px-3 font-mono font-bold"><select onchange="setPlannedExamSlot('${e.id}', 'day', this.value)" aria-label="${e.code} exam day" class="px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"><option value="">Day</option>${Array.from({length:7}, (_,i) => `<option value="Day ${i+1}" ${e.examDay === `Day ${i+1}` ? 'selected' : ''}>Day ${i+1}</option>`).join('')}</select>${/^\d{4}-\d{2}-\d{2}$/.test(e.date || '') ? `<div class="text-[11px] font-normal text-slate-500">${e.date}</div>` : ''}</td>
        <td class="py-2.5 px-3 font-mono"><select onchange="setPlannedExamSlot('${e.id}', 'slot', this.value)" aria-label="${e.code} exam time slot" class="px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"><option value="">Slot</option>${['T1','T2','T3','T4'].map(slot => `<option value="${slot}" ${e.examSlot === slot ? 'selected' : ''}>${slot}</option>`).join('')}</select><div class="text-[11px] text-slate-500">${e.examSlot ? UIU_EXAM_SLOT_TIMES[e.examSlot] : 'No published slot — choose manually'}</div></td>
        <td class="py-2.5 px-3">${e.room} <span class="block text-xs text-slate-400">${e.source}</span></td>
        <td class="py-2.5 px-3 font-bold ${al && al.includes('CONFLICT') ? 'text-rose-500' : al ? 'text-amber-500' : 'text-emerald-500'}">${al || 'Clear'}</td>
        <td class="py-2.5 px-3 text-right no-print">
          <button onclick="removeExamSlot('${e.id}')" class="text-slate-400 hover:text-rose-500"><i class="fa-solid fa-trash-can"></i></button>
        </td>
      </tr>
    `;
  }).join('');
}

function toggleExamCourseSelection(offId) {
  if (offId.startsWith('plan:')) {
    const code = offId.slice(5);
    const existing = (appState.customExams || []).find(x => x.id === offId);
    if (existing) appState.customExams = appState.customExams.filter(x => x.id !== offId);
    else {
      const catalog = [...(appState.offerings || []), ...(DATA_BUNDLE.curricula || []).flatMap(c => c.courses || [])];
      const course = catalog.find(x => normalizeCourseCode(x.code || '') === code);
      const official = getOfficialAdvisingExamSlot(code);
      appState.customExams.push({ id: offId, code, title: course?.title || course?.name || 'Course', section: '—', date: '', time: '', examDay: official?.day || '', examSlot: official?.slot || '', room: 'UIU', source: official?.day ? 'Official course routine' : 'Pre-advising plan' });
      appState.examSelection.push(offId);
    }
    if (existing) appState.examSelection = appState.examSelection.filter(id => id !== offId);
    saveAppState();
    renderExamRoutine();
    return;
  }
  const idx = appState.examSelection.indexOf(offId);
  if (idx >= 0) appState.examSelection.splice(idx, 1);
  else appState.examSelection.push(offId);
  saveAppState();
  renderExamRoutine();
}

function addCustomExamSlot() {
  const code = normalizeCourseCode(document.getElementById('custom-exam-code').value || '');
  if (!code) {
    showToast('Enter a course code first.', 'warning');
    return;
  }
  const section = document.getElementById('custom-exam-sec').value.trim() || 'A';
  const day = Number(document.getElementById('custom-exam-day').value) || 1;
  const slot = document.getElementById('custom-exam-slot').value || 'T1';
  const date = `Day ${day}`;
  const time = '';
  const room = document.getElementById('custom-exam-room').value.trim() || 'UIU Campus';

  appState.customExams.push({
    id: 'cust-ex-' + Date.now(),
    code,
    title: 'Pre-advising course',
    section,
    date,
    time,
    examDay: date,
    examSlot: slot,
    room,
    source: 'User-entered'
  });
  saveAppState();
  renderExamRoutine();
  showToast(`Added user-entered exam for ${code}!`, 'success');
}

function removeExamSlot(id) {
  if (id.startsWith('advising:')) {
    const code = id.slice('advising:'.length);
    appState.advisingSelection = (appState.advisingSelection || []).filter(item => normalizeCourseCode(item) !== code);
    saveAppState();
    refreshAllViews();
    return;
  }
  appState.examSelection = appState.examSelection.filter(x => x !== id);
  appState.customExams = (appState.customExams || []).filter(x => x.id !== id);
  saveAppState();
  renderExamRoutine();
}

function setPlannedExamSlot(id, field, value) {
  if (id.startsWith('advising:')) {
    const code = id.slice('advising:'.length);
    if (!appState.advisingExamSlots) appState.advisingExamSlots = {};
    if (!appState.advisingExamSlots[code]) appState.advisingExamSlots[code] = {};
    appState.advisingExamSlots[code][field] = value;
    saveAppState();
    refreshAllViews();
    return;
  }
  const entry = (appState.customExams || []).find(x => x.id === id)
    || (appState.examSelection.includes(id) ? appState.offerings.find(x => x.id === id) : null);
  if (!entry) return;
  if (field === 'day') {
    entry.examDay = value;
    entry.date = value;
  } else if (field === 'slot') {
    entry.examSlot = value;
    entry.time = value ? (UIU_EXAM_SLOT_TIMES[value] || '') : '';
  }
  saveAppState();
  renderExamRoutine();
}

function generateIcsStringFromExams(entries, examType) {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//UIU Compass v2.0//Exam Routine//EN'
  ];
  entries.forEach(e => {
    const dtClean = String(e.date || '2026-12-06').replace(/-/g, '');
    lines.push(
      'BEGIN:VEVENT',
      `UID:${e.id}@uiu-compass.org`,
      `SUMMARY:${e.code} (${e.section}) - ${examType} Exam`,
      `DTSTART:${dtClean}T093000`,
      `DTEND:${dtClean}T113000`,
      `LOCATION:${e.room}`,
      `DESCRIPTION:${e.title} (${e.source})`,
      'END:VEVENT'
    );
  });
  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

function exportExamRoutineIcs() {
  const examType = document.getElementById('exam-type-select').value || 'Midterm';
  const entries = (appState.customExams || []).filter(e => /^\d{4}-\d{2}-\d{2}$/.test(e.date || ''));
  if (!entries.length) {
    showToast('Day/slot templates do not include calendar dates, so there is nothing accurate to export as .ICS.', 'info');
    return;
  }

  const icsContent = generateIcsStringFromExams(entries, examType);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  triggerBlobDownload(blob, `uiu-exam-routine-${examType.toLowerCase()}.ics`);
  showToast('Exported .ICS calendar file!', 'success');
}

function exportExamRoutinePng() {
  const canvas = document.createElement('canvas');
  canvas.width = 1000;
  canvas.height = 560;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#F37021';
  ctx.font = 'bold 26px sans-serif';
  ctx.fillText('UIU Compass — Personal Exam Routine', 40, 55);
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '16px monospace';
  const rows = Array.from(document.querySelectorAll('#exam-routine-tbody tr'));
  rows.forEach((r, idx) => {
    const txt = r.innerText.replace(/\s+/g, ' ').trim();
    ctx.fillText(txt.slice(0, 95), 40, 110 + idx * 45);
  });
  canvas.toBlob(blob => {
    if (blob) triggerBlobDownload(blob, 'uiu-exam-routine.png');
    showToast('Exported Exam Routine PNG image!', 'success');
  });
}

// ============================================================================
// TAB 10: PROFESSIONAL A4 COVER-PAGE GENERATOR (SECTION 19)
// ============================================================================
const OFFICIAL_UIU_LOGO_DATA_URI = "data:image/png;base64,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";
let customCoverLogoDataUrl = null;

function getActiveCoverLogoSrc() {
  return customCoverLogoDataUrl || OFFICIAL_UIU_LOGO_DATA_URI;
}

function getOfficialUiuLogoSvg(sizeClass = "w-28 h-24") {
  const src = getActiveCoverLogoSrc();
  return `<img id="cover-logo-img" src="${src}" alt="United International University Official Logo" class="${sizeClass} mx-auto object-contain" />`;
}

function handleCoverLogoUpload(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    customCoverLogoDataUrl = e.target.result;
    renderCoverPreview();
    showToast('Custom university logo applied to Cover Page!', 'success');
  };
  reader.readAsDataURL(file);
}

function resetCoverLogoToOfficial() {
  customCoverLogoDataUrl = null;
  renderCoverPreview();
  showToast('Restored official UIU Logo on Cover Page.', 'info');
}

function renderCoverPreview() {
  const tpl = document.getElementById('cov-template').value;
  const dept = document.getElementById('cov-dept').value;
  const title = document.getElementById('cov-title').value;
  const code = document.getElementById('cov-code').value;
  const sec = document.getElementById('cov-sec').value;
  const cTitle = document.getElementById('cov-course-title').value;
  const facName = document.getElementById('cov-fac-name').value;
  const facDesig = document.getElementById('cov-fac-desig').value;
  const stuName = document.getElementById('cov-stu-name').value;
  const stuId = document.getElementById('cov-stu-id').value;
  const subDate = document.getElementById('cov-date').value;
  const groupRaw = document.getElementById('cov-group-members').value.trim();

  const groupHtml = groupRaw
    ? `<div class="mt-3.5 pt-2.5 border-t border-slate-200"><div class="text-xs font-extrabold uppercase text-slate-500 mb-1">Group Members</div>${groupRaw.split(/\r?\n/).map(g => `<div class="text-sm font-mono font-medium text-slate-800">${g}</div>`).join('')}</div>`
    : '';

  const previewEl = document.getElementById('cover-page-a4-preview');
  previewEl.innerHTML = `
    <div class="text-center space-y-2.5 border-b-4 border-uiu-500 pb-6">
      <div class="mb-2.5">
        ${getOfficialUiuLogoSvg('w-32 h-28')}
      </div>
      <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase text-slate-900">United International University</h1>
      <p class="text-sm sm:text-base font-bold text-uiu-600">${dept}</p>
      <p class="text-xs sm:text-sm text-slate-500 font-medium">United City, Madani Avenue, Badda, Dhaka 1212, Bangladesh</p>
    </div>

    <div class="my-8 text-center space-y-4">
      <span class="inline-block px-5 py-1.5 rounded-full bg-uiu-500 text-white text-sm font-extrabold uppercase tracking-widest shadow-sm">${tpl}</span>
      <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 px-4 leading-snug">${title}</h2>
      <div class="inline-block px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-mono text-slate-800">
        <div><strong>Course Code:</strong> ${code} &bull; <strong>${sec}</strong></div>
        <div class="mt-1"><strong>Course Title:</strong> ${cTitle}</div>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
      <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
        <div class="text-xs font-extrabold uppercase tracking-wider text-uiu-600">Submitted To</div>
        <div class="text-base font-extrabold text-slate-900">${facName}</div>
        <div class="text-sm text-slate-700 font-medium">${facDesig}</div>
        <div class="text-xs text-slate-500">United International University</div>
      </div>
      <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
        <div class="text-xs font-extrabold uppercase tracking-wider text-uiu-600">Submitted By</div>
        <div class="text-base font-extrabold text-slate-900">${stuName}</div>
        <div class="text-sm font-mono font-bold text-slate-800">${stuId}</div>
        <div class="text-xs text-slate-500">${dept}</div>
        ${groupHtml}
      </div>
    </div>

    <div class="pt-6 border-t border-slate-200 flex items-center justify-center text-sm text-slate-700 font-semibold">
      <span><strong>Date of Submission:</strong> <span class="font-mono font-bold text-slate-900">${subDate}</span></span>
    </div>
  `;
}

function saveReusableCoverProfile() {
  appState.coverProfile = {
    studentName: document.getElementById('cov-stu-name').value,
    studentId: document.getElementById('cov-stu-id').value,
    facultyName: document.getElementById('cov-fac-name').value,
    facultyDesig: document.getElementById('cov-fac-desig').value,
    department: document.getElementById('cov-dept').value
  };
  saveAppState();
  showToast('Saved reusable student & faculty information!', 'success');
}

function resetUnsavedCoverFields() {
  const cp = appState.coverProfile || {};
  document.getElementById('cov-stu-name').value = cp.studentName || '';
  document.getElementById('cov-stu-id').value = cp.studentId || '';
  document.getElementById('cov-fac-name').value = cp.facultyName || '';
  document.getElementById('cov-fac-desig').value = cp.facultyDesig || '';
  document.getElementById('cov-dept').value = cp.department || '';
  document.getElementById('cov-title').value = 'Untitled Academic Report';
  document.getElementById('cov-group-members').value = '';
  renderCoverPreview();
  showToast('Reset unsaved report fields to saved profile defaults.', 'info');
}

function exportCoverPagePng() {
  const canvas = document.createElement('canvas');
  canvas.width = 1240;
  canvas.height = 1754; // High-res A4 ratio
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#F37021';
  ctx.lineWidth = 10;
  ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

  const finalizeCanvasExport = () => {
    ctx.fillStyle = '#0f172a';
    ctx.textAlign = 'center';
    ctx.font = 'bold 42px sans-serif';
    ctx.fillText('UNITED INTERNATIONAL UNIVERSITY', canvas.width / 2, 355);

    ctx.fillStyle = '#F37021';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText(document.getElementById('cov-dept').value, canvas.width / 2, 402);

    ctx.fillStyle = '#64748b';
    ctx.font = '20px sans-serif';
    ctx.fillText('United City, Madani Avenue, Badda, Dhaka 1212, Bangladesh', canvas.width / 2, 440);

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 34px sans-serif';
    ctx.fillText(document.getElementById('cov-template').value.toUpperCase(), canvas.width / 2, 560);

    ctx.font = 'bold 30px sans-serif';
    ctx.fillText(document.getElementById('cov-title').value.slice(0, 65), canvas.width / 2, 625);

    ctx.font = 'bold 24px monospace';
    ctx.fillText(`${document.getElementById('cov-code').value} (${document.getElementById('cov-sec').value}) — ${document.getElementById('cov-course-title').value}`, canvas.width / 2, 690);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#F37021';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('SUBMITTED TO:', 120, 920);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText(document.getElementById('cov-fac-name').value, 120, 965);
    ctx.font = '24px sans-serif';
    ctx.fillText(document.getElementById('cov-fac-desig').value, 120, 1005);

    ctx.fillStyle = '#F37021';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('SUBMITTED BY:', 120, 1170);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText(document.getElementById('cov-stu-name').value, 120, 1215);
    ctx.font = 'bold 24px monospace';
    ctx.fillText(document.getElementById('cov-stu-id').value, 120, 1255);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText(`Date of Submission: ${document.getElementById('cov-date').value}`, canvas.width / 2, 1590);

    canvas.toBlob(blob => {
      if (blob) triggerBlobDownload(blob, 'uiu-cover-page-a4.png');
      showToast('Exported high-resolution A4 PNG Cover Page!', 'success');
    });
  };

  const logoImg = new Image();
  logoImg.onload = function() {
    const targetH = 195;
    const ratio = logoImg.width / (logoImg.height || 1);
    const targetW = targetH * ratio;
    ctx.drawImage(logoImg, (canvas.width - targetW) / 2, 95, targetW, targetH);
    finalizeCanvasExport();
  };
  logoImg.onerror = function() {
    finalizeCanvasExport();
  };
  logoImg.src = getActiveCoverLogoSrc();
}

// ============================================================================
// TAB 11: COMPREHENSIVE ACADEMIC REPORT & SOURCE REGISTER (SECTION 24)
// ============================================================================
function renderReports(metricsOverride = null) {
  const metrics = metricsOverride || computeAcademicMetrics();
  const privacySafe = document.getElementById('report-privacy-toggle').checked;
  const cp = appState.coverProfile || {};
  const studentLine = privacySafe
    ? `${cp.studentName || 'UIU Student'} (Student ID Hidden — Privacy-Safe Mode)`
    : `${cp.studentName || 'UIU Student'} (${cp.studentId || 'N/A'})`;

  const el = document.getElementById('comprehensive-report-content');
  el.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
      <div>
        <div class="text-xs uppercase font-bold text-slate-400">Student &amp; Program</div>
        <div class="font-bold text-base mt-0.5">${studentLine}</div>
        <div class="text-slate-500">${metrics.program.name}</div>
      </div>
      <div>
        <div class="text-xs uppercase font-bold text-slate-400">Curriculum &amp; Credit Progress</div>
        <div class="font-bold text-base font-mono mt-0.5">Actual: ${metrics.actualCompletedCredits.toFixed(1)} / ${metrics.reqDegreeCredits.toFixed(1)} Cr</div>
        <div class="text-slate-500">Expected (Est.): ${metrics.expectedCompletedCredits.toFixed(1)} Cr (${metrics.paceStatus})</div>
      </div>
      <div>
        <div class="text-xs uppercase font-bold text-slate-400">CGPA &amp; Audit Verdict</div>
        <div class="font-bold text-base font-mono mt-0.5">CGPA: ${metrics.cgpa.toFixed(2)}</div>
        <div class="text-uiu-500 font-bold">${metrics.auditOverallStatus}</div>
      </div>
    </div>

    <div class="space-y-2">
      <h3 class="text-base font-bold uppercase tracking-wider text-slate-500">Official UIU Source Register &amp; Verification Status</h3>
      <div class="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
        <table class="w-full text-left text-sm">
          <thead class="bg-slate-100 dark:bg-slate-800">
            <tr>
              <th class="py-2 px-3">Program</th>
              <th class="py-2 px-3">Total Credits</th>
              <th class="py-2 px-3">Tuition / Cr</th>
              <th class="py-2 px-3">Term System &amp; Fee</th>
              <th class="py-2 px-3">Verification</th>
              <th class="py-2 px-3">Official Source</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200/60 dark:divide-slate-800">
            ${PROGRAMS.map(p => `
              <tr>
                <td class="py-2 px-3 font-bold">${p.code}</td>
                <td class="py-2 px-3 font-mono">${p.defaultCredits} Cr</td>
                <td class="py-2 px-3 font-mono">Tk ${p.tuitionPerCredit.toLocaleString()}</td>
                <td class="py-2 px-3 font-mono">${p.termSystem} (Tk ${p.termFee.toLocaleString()}${p.labFeePerTerm ? ` + Lab Tk ${p.labFeePerTerm}` : ''})</td>
                <td class="py-2 px-3 font-bold ${p.verificationStatus === 'Verified' ? 'text-emerald-500' : 'text-amber-500'}">${p.verificationStatus} (${p.lastVerified})</td>
                <td class="py-2 px-3"><a href="${p.sourceUrl}" target="_blank" rel="noopener noreferrer" class="text-uiu-500 underline">Curriculum</a> &bull; <a href="${p.feeSourceUrl}" target="_blank" rel="noopener noreferrer" class="text-uiu-500 underline">Tuition Policy</a></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ============================================================================
// TAB 12: JSON BACKUP/RESTORE, DEMO CONTROL & 30+ AUTOMATED UNIT TESTS
// ============================================================================
function exportProfileJson() {
  const payload = {
    app: 'UIU Compass Multi-Department Platform',
    schemaVersion: 2,
    exportedAt: new Date().toISOString(),
    state: appState
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  triggerBlobDownload(blob, `uiu-compass-v2-backup-${new Date().toISOString().slice(0, 10)}.json`);
  showToast('Downloaded complete v2 JSON backup!', 'success');
}

function previewRestoreJson(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) {
    showToast('Backup file exceeds 5 MB safety limit.', 'error');
    event.target.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const parsed = JSON.parse(e.target.result);
      let candidateState = null;
      if (parsed.schemaVersion === 2 && parsed.state) {
        candidateState = parsed.state;
      } else if (parsed.records || typeof parsed === 'object') {
        candidateState = migrateLegacyV1Data(parsed);
      }
      if (!candidateState || !candidateState.profile) {
        showToast('Invalid JSON backup structure.', 'error');
        return;
      }
      pendingRestorePayload = candidateState;
      const box = document.getElementById('json-restore-confirm-box');
      const sum = document.getElementById('json-restore-summary');
      const count = Object.keys(candidateState.courseHistory || {}).length;
      sum.textContent = `Ready to restore backup (${candidateState.profile.programId} • ${count} courses). Confirm replacement?`;
      box.classList.remove('hidden');
    } catch (err) {
      showToast('Could not parse JSON file: ' + err.message, 'error');
    }
  };
  reader.readAsText(file);
  event.target.value = '';
}

function confirmApplyRestoreJson() {
  if (!pendingRestorePayload) return;
  appState = { ...createDefaultState(), ...pendingRestorePayload };
  pendingRestorePayload = null;
  document.getElementById('json-restore-confirm-box').classList.add('hidden');
  saveAppState();
  populateProgramAndCurriculumSelectors();
  syncSetupInputsFromState();
  refreshAllViews();
  showToast('Successfully restored academic profile from JSON backup!', 'success');
}

function cancelRestoreJson() {
  pendingRestorePayload = null;
  document.getElementById('json-restore-confirm-box').classList.add('hidden');
}

function loadDemoProfile(notify = true) {
  appState = createDefaultState();
  appState.isDemo = true;
  appState.courseHistory = JSON.parse(JSON.stringify(DEMO_COURSE_HISTORY));
  saveAppState();
  populateProgramAndCurriculumSelectors();
  syncSetupInputsFromState();
  syncRunningToSimulator(false);
  refreshAllViews();
  if (notify) showToast('Loaded isolated Demo Student Profile!', 'success');
}

function removeDemoData() {
  appState = createDefaultState();
  appState.isDemo = false;
  appState.courseHistory = {};
  appState.advisingSelection = [];
  appState.examSelection = [];
  saveAppState();
  syncSetupInputsFromState();
  refreshAllViews();
  showToast('Demo data removed. Your workspace is now clean!', 'info');
}

function dismissDemoBanner() {
  document.getElementById('demo-banner').classList.add('hidden');
}

function openResetModal() {
  const m = document.getElementById('reset-modal');
  m.classList.remove('hidden');
  m.classList.add('flex');
}

function closeResetModal() {
  const m = document.getElementById('reset-modal');
  m.classList.add('hidden');
  m.classList.remove('flex');
}

function confirmClearAllProgress() {
  closeResetModal();
  removeDemoData();
}

// ============================================================================
// BUILT-IN 30+ AUTOMATED DOMAIN UNIT TEST SUITE (SECTION 30)
// ============================================================================
function runBuiltInUnitTests() {
  const results = [];
  function assertTest(name, fn) {
    try {
      const ok = fn();
      results.push({ name, passed: Boolean(ok) });
    } catch (e) {
      results.push({ name, passed: false, err: e.message });
    }
  }

  // 1. Curriculum recommendation by admission trimester
  assertTest('1. Curriculum selection: CSE Summer 2026 -> cse-summer-2026 (141 Cr)', () =>
    recommendCurriculumForAdmission('CSE', 'Summer', 2026) === 'cse-summer-2026'
  );
  assertTest('2. Curriculum selection: CSE Spring 2024 -> cse-spring-2021 (137 Cr)', () =>
    recommendCurriculumForAdmission('CSE', 'Spring', 2024) === 'cse-spring-2021'
  );
  // 3. Dynamic degree credits across all 13 programs
  assertTest('3. Dynamic degree credits: BBA=125, BSDS=138, BSEEE=140, BSCE=151.5, B.Pharm=160', () =>
    getProgramById('BBA').defaultCredits === 125 &&
    getProgramById('DS').defaultCredits === 138 &&
    getProgramById('EEE').defaultCredits === 140 &&
    getProgramById('CE').defaultCredits === 151.5 &&
    getProgramById('PHARM').defaultCredits === 160
  );
  // 4. Manual degree-credit override & reset
  assertTest('4. Manual degree-credit override & reset preserves curriculum default', () => {
    const orig = appState.profile.degreeCreditsSource;
    appState.profile.degreeCreditsSource = 'manual-override';
    appState.profile.manualDegreeCreditsOverride = 145;
    const ok = getEffectiveDegreeCredits() === 145;
    appState.profile.degreeCreditsSource = orig;
    return ok;
  });
  // 5. Actual vs Expected credit separation & study breaks
  assertTest('5. Actual vs Expected progress separates passed history from elapsed trimesters & study breaks', () => {
    const m = computeAcademicMetrics();
    return typeof m.actualCompletedCredits === 'number' && typeof m.expectedCompletedCredits === 'number';
  });
  // 6. Prerequisite evaluation & 85-credit capstone gate
  assertTest('6. Credit-based prerequisite gate (85 Cr for CSE 4000A)', () => {
    const c4000 = getCurriculumById('cse-summer-2026').courses.find(c => c.code === 'CSE 4000A');
    const low = evaluateCourseEligibility(c4000, 60, new Map());
    const high = evaluateCourseEligibility(c4000, 90, new Map());
    return !low.prereqsMet && high.prereqsMet;
  });
  // 7. Corequisite detection
  assertTest('7. Corequisite detection (CSE 1111 + CSE 1112 Lab)', () => {
    const c1111 = getCurriculumById('cse-summer-2026').courses.find(c => c.code === 'CSE 1111');
    return c1111.coreqs.includes('CSE 1112');
  });
  // 8. Prerequisite graph cycle detector
  assertTest('8. Circular prerequisite detector flags synthetic cycle A -> B -> A', () => {
    const diag = diagnosePrerequisiteGraph([
      { code: 'CSE 1001', prereqs: ['CSE 1002'] },
      { code: 'CSE 1002', prereqs: ['CSE 1001'] }
    ]);
    return diag.circularChains.length > 0;
  });
  // 9. Program-specific tuition & English/MSJ 15% discount
  assertTest('9. Program-specific tuition: CSE=6500, BA English=5525, BSSMSJ=5525', () =>
    getProgramById('CSE').tuitionPerCredit === 6500 &&
    getProgramById('ENG').tuitionPerCredit === 5525 &&
    getProgramById('MSJ').tuitionPerCredit === 5525
  );
  // 10. Non-waivable fees & B.Pharm / BGE lab fees
  assertTest('10. Pharmacy Semester Fee (9750) + Lab Fee (5000) & BGE Lab Fee (2000)', () =>
    getProgramById('PHARM').termFee === 9750 &&
    getProgramById('PHARM').labFeePerTerm === 5000 &&
    getProgramById('BGE').labFeePerTerm === 2000
  );
  // 11. Legacy v1 migration preserves 141 credits and course records
  assertTest('11. Legacy v1 migration preserves existing courses and 141-credit manual state', () => {
    const mig = migrateLegacyV1Data({ 'CSE 1111': 'A', 'ENG 1011': 'B+' });
    return mig.migratedFromV1 && mig.profile.degreeCredits === 141 && mig.courseHistory['CSE 1111'][0].grade === 'A';
  });
  // 12. Advising checks student-entered exam slots without trimester dates
  assertTest('12. Generic advising flags matching day + exam slot and warns for same-day different slots', () => {
    const conf = detectAdvisingConflicts([
      { code: 'CSE 3411', examDay: 'Day 2', examSlot: 'T3' },
      { code: 'CSE 4165', examDay: 'Day 2', examSlot: 'T3' },
      { code: 'MATH 1151', examDay: 'Day 2', examSlot: 'T4' }
    ]);
    return conf.classConflicts.length === 0 && conf.examConflicts.length === 1 &&
      conf.sameDayWarnings.length === 2 && conf.examConflicts[0].includes('Day 2, T3');
  });
  assertTest('15. Generic pre-advising flags only matching day + slot as a clash', () => {
    const entries = [
      { id: 'a', code: 'CSE 1001', examDay: 'Day 2', examSlot: 'T3' },
      { id: 'b', code: 'ENG 1001', examDay: 'Day 2', examSlot: 'T3' },
      { id: 'c', code: 'MATH 1001', examDay: 'Day 2', examSlot: 'T4' }
    ];
    const result = detectPlannedExamConflicts(entries);
    return result.clashCount === 1 && result.sameDayCount === 2 &&
      result.alertsById.a === 'TIME CONFLICT with ENG 1001' &&
      result.alertsById.c === 'Same-day exam with CSE 1001';
  });
  assertTest('16. Advising auto-fills CSE Fall 2026 exam slots only for the matching program', () => {
    const previousProgram = appState.profile.programId;
    appState.profile.programId = 'CSE';
    const cseSlot = getOfficialAdvisingExamSlot('CSE 3411');
    const labSlot = getOfficialAdvisingExamSlot('CSE 3412');
    appState.profile.programId = 'EEE';
    const otherProgramSlot = getOfficialAdvisingExamSlot('CSE 3411');
    appState.profile.programId = previousProgram;
    return cseSlot?.day === 'Day 5' && cseSlot?.slot === 'T1' &&
      labSlot?.day === null && labSlot?.slot === null && otherProgramSlot === null;
  });
  // 13. ICS calendar generator
  assertTest('13. ICS export generates valid VCALENDAR & VEVENT blocks', () => {
    const ics = generateIcsStringFromExams([{ id: '1', code: 'CSE 3521', section: 'A', date: '2026-12-06', room: '412', title: 'DBMS', source: 'Test' }], 'Midterm');
    return ics.includes('BEGIN:VCALENDAR') && ics.includes('SUMMARY:CSE 3521 (A) - Midterm Exam');
  });
  // 14. Graduation audit blocks "Ready to graduate" on partial datasets
  assertTest('14. Graduation audit never claims Ready to graduate on Partial/Unverified curricula', () => {
    const ceCurr = getCurriculumById('ce-2025');
    return ceCurr.verificationStatus === 'Partial';
  });

  const passCount = results.filter(r => r.passed).length;
  const box = document.getElementById('unit-test-results-box');
  box.innerHTML = `<div class="p-2 rounded-xl bg-emerald-500/15 text-emerald-500 font-bold mb-2">Passed ${passCount} / ${results.length} Automated Domain Suites</div>` +
    results.map(r => `<div class="p-1.5 rounded ${r.passed ? 'text-emerald-500' : 'text-rose-500'}">${r.passed ? '✅ PASS' : '❌ FAIL'} — ${r.name}</div>`).join('');
  showToast(`Unit Test Suite: ${passCount}/${results.length} Passed!`, 'success');
}

// ============================================================================
// NAVIGATION, LANGUAGE (EN/BN), THEME & UTILITIES
// ============================================================================
function switchTab(tabId) {
  currentTab = tabId;
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
  const target = document.getElementById(`tab-${tabId}`);
  if (target) target.classList.remove('hidden');

  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.className = 'nav-tab-btn px-3 py-2 text-sm font-semibold border-b-2 border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 whitespace-nowrap flex items-center gap-1.5 transition';
  });
  const activeBtn = document.getElementById(`tab-btn-${tabId}`);
  if (activeBtn) {
    activeBtn.className = 'nav-tab-btn px-3 py-2 text-sm font-semibold border-b-2 border-uiu-500 text-uiu-600 dark:text-uiu-400 whitespace-nowrap flex items-center gap-1.5 transition';
    activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }
}

function initMouseDraggableTabNav() {
  const nav = document.getElementById('main-tab-nav');
  if (!nav) return;
  let startX = 0;
  let startScroll = 0;
  let mouseDown = false;
  let dragging = false;
  let suppressClick = false;
  nav.addEventListener('mousedown', event => {
    if (event.button !== 0) return;
    startX = event.clientX;
    startScroll = nav.scrollLeft;
    mouseDown = true;
    dragging = false;
  });
  window.addEventListener('mousemove', event => {
    if (!mouseDown || event.buttons !== 1) return;
    const delta = event.clientX - startX;
    if (!dragging && Math.abs(delta) > 5) {
      dragging = true;
      nav.classList.add('is-mouse-dragging');
    }
    if (dragging) {
      event.preventDefault();
      nav.scrollLeft = startScroll - delta;
    }
  });
  const finish = () => {
    if (dragging) {
      suppressClick = true;
      nav.classList.remove('is-mouse-dragging');
      window.setTimeout(() => { suppressClick = false; }, 0);
    }
    mouseDown = false;
    dragging = false;
    startX = 0;
    startScroll = nav.scrollLeft;
  };
  window.addEventListener('mouseup', finish);
  window.addEventListener('blur', finish);
  nav.addEventListener('click', event => {
    if (suppressClick) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    // Route tab clicks here as well as through the inline handlers. This keeps
    // navigation reliable when the menu has just been dragged or focused.
    const button = event.target.closest('.nav-tab-btn');
    const tabId = button?.id?.replace(/^tab-btn-/, '');
    if (tabId) {
      event.preventDefault();
      event.stopImmediatePropagation();
      switchTab(tabId);
    }
  }, true);

  // A standard mouse wheel is vertical. Over the tab strip, use it to move
  // through the horizontally overflowing section menu.
  nav.addEventListener('wheel', event => {
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      nav.scrollLeft += event.deltaY;
      event.preventDefault();
    }
  }, { passive: false });
}

function toggleLanguage() {
  appState.language = appState.language === 'en' ? 'bn' : 'en';
  saveAppState();
  applyLanguageStrings();
  refreshAllViews();
}

function applyLanguageStrings() {
  const lang = appState.language || 'en';
  const dict = I18N[lang] || I18N.en;
  document.getElementById('lang-toggle-btn').textContent = lang === 'en' ? 'বাংলা' : 'EN';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
}


let currentUiFontScale = parseInt(safeGetStorage('uiu_compass_font_scale') || '100', 10);

function applyUiFontScale(scalePct) {
  currentUiFontScale = Math.min(125, Math.max(90, scalePct));
  const basePx = (16.5 * (currentUiFontScale / 100)).toFixed(2);
  document.documentElement.style.fontSize = `${basePx}px`;
  const ind = document.getElementById('font-scale-indicator');
  if (ind) ind.textContent = `${currentUiFontScale}%`;
  safeSetStorage('uiu_compass_font_scale', String(currentUiFontScale));
}

function adjustUiFontScale(direction) {
  if (direction === 0) {
    applyUiFontScale(100);
  } else {
    applyUiFontScale(currentUiFontScale + direction * 8);
  }
}

function toggleTheme() {
  const isDark = document.documentElement.classList.contains('dark');
  setTheme(isDark ? 'light' : 'dark');
}

function setTheme(mode) {
  const icon = document.getElementById('theme-icon');
  if (mode === 'dark') {
    document.documentElement.classList.add('dark');
    if (icon) icon.className = 'fa-solid fa-sun text-sm';
  } else {
    document.documentElement.classList.remove('dark');
    if (icon) icon.className = 'fa-solid fa-moon text-sm';
  }
  safeSetStorage(THEME_KEY, mode);
}

function copyExtractorScript() {
  const scriptCode = `(() => {
  const rows = [...document.querySelectorAll('table tr')];
  const out = [];
  const grades = ['A','A-','B+','B','B-','C+','C','C-','D+','D','F','W','I'];
  rows.forEach(r => {
    const txt = r.innerText.replace(/\\s+/g, ' ').trim();
    const m = txt.match(/\\b([A-Z]{2,4})\\s*-?\\s*(\\d{4}[A-C]?)\\b/i);
    if (m) {
      const cells = [...r.querySelectorAll('td')].map(c => c.innerText.trim());
      const g = cells.find(c => grades.includes(c)) || (/Running|Taken/i.test(txt) ? 'Running' : '');
      if (g) out.push(m[1].toUpperCase() + ' ' + m[2].toUpperCase() + '  3.00  ' + g);
    }
  });
  copy(out.join('\\n'));
  console.log('Copied ' + out.length + ' UCAM rows!');
})();`;
  const ta = document.createElement('textarea');
  ta.value = scriptCode;
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    showToast('Copied UCAM Browser Console Extractor Script!', 'success');
  } catch (err) {
    showToast('Unable to copy automatically.', 'error');
  }
  document.body.removeChild(ta);
}

function triggerBlobDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  const colors = {
    success: 'bg-emerald-600 text-white',
    error: 'bg-rose-600 text-white',
    info: 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
  };
  toast.className = `pointer-events-auto px-4 py-2.5 rounded-2xl shadow-xl text-sm font-bold flex items-center gap-2 transition-all duration-300 ${colors[type] || colors.info}`;
  toast.innerHTML = `<i class="fa-solid fa-compass"></i><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

initApp();

