'use client';

import { useState } from 'react';
import { GraduationCap, Plus, Trash2, Download } from 'lucide-react';
import jsPDF from 'jspdf';

interface Subject {
  name: string;
  credits: number;
  marks: number;
}

interface Semester {
  semesterNumber: number;
  subjects: Subject[];
}

// VTU Grading System: Convert marks to grade points
const getGradePoint = (marks: number): number => {
  if (marks >= 90) return 10;
  if (marks >= 80) return 9;
  if (marks >= 70) return 8;
  if (marks >= 60) return 7;
  if (marks >= 50) return 6;
  if (marks >= 40) return 5;
  return 0;
};

const getGrade = (marks: number): string => {
  if (marks >= 90) return 'S';
  if (marks >= 80) return 'A';
  if (marks >= 70) return 'B';
  if (marks >= 60) return 'C';
  if (marks >= 50) return 'D';
  if (marks >= 40) return 'E';
  return 'F';
};

export default function VTUCGPACalculator() {
  const [semesters, setSemesters] = useState<Semester[]>([
    { semesterNumber: 1, subjects: [] }
  ]);
  const [currentSemester, setCurrentSemester] = useState(0);
  const [newSubject, setNewSubject] = useState<Subject>({
    name: '',
    credits: 3,
    marks: 0,
  });
  const [studentName, setStudentName] = useState('');
  const [usn, setUsn] = useState('');

  const addSemester = () => {
    setSemesters([...semesters, { semesterNumber: semesters.length + 1, subjects: [] }]);
  };

  const removeSemester = (index: number) => {
    if (semesters.length > 1) {
      const updatedSemesters = semesters.filter((_, i) => i !== index);
      setSemesters(updatedSemesters.map((sem, i) => ({ ...sem, semesterNumber: i + 1 })));
      if (currentSemester >= updatedSemesters.length) {
        setCurrentSemester(updatedSemesters.length - 1);
      }
    }
  };

  const addSubject = () => {
    if (newSubject.name && newSubject.credits > 0 && newSubject.marks >= 0 && newSubject.marks <= 100) {
      const updatedSemesters = [...semesters];
      updatedSemesters[currentSemester].subjects.push({ ...newSubject });
      setSemesters(updatedSemesters);
      setNewSubject({ name: '', credits: 3, marks: 0 });
    }
  };

  const removeSubject = (semesterIndex: number, subjectIndex: number) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].subjects = updatedSemesters[semesterIndex].subjects.filter(
      (_, i) => i !== subjectIndex
    );
    setSemesters(updatedSemesters);
  };

  const calculateSGPA = (semester: Semester): string => {
    if (semester.subjects.length === 0) return '0.00';
    
    let totalCredits = 0;
    let totalPoints = 0;

    semester.subjects.forEach(subject => {
      const gradePoint = getGradePoint(subject.marks);
      totalCredits += subject.credits;
      totalPoints += gradePoint * subject.credits;
    });

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  const calculateCGPA = (): string => {
    let totalCredits = 0;
    let totalPoints = 0;

    semesters.forEach(semester => {
      semester.subjects.forEach(subject => {
        const gradePoint = getGradePoint(subject.marks);
        totalCredits += subject.credits;
        totalPoints += gradePoint * subject.credits;
      });
    });

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  const getTotalCredits = (): number => {
    return semesters.reduce((total, semester) => {
      return total + semester.subjects.reduce((sum, subject) => sum + subject.credits, 0);
    }, 0);
  };

  const getSemesterCredits = (semester: Semester): number => {
    return semester.subjects.reduce((sum, subject) => sum + subject.credits, 0);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPos = 20;

    // Add decorative header background
    doc.setFillColor(255, 127, 80); // Orange
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    doc.setFillColor(147, 51, 234); // Purple
    doc.rect(0, 40, pageWidth, 5, 'F');

    // Title with white text on colored background
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('VTU CGPA REPORT', pageWidth / 2, 25, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Visvesvaraya Technological University', pageWidth / 2, 35, { align: 'center' });

    yPos = 55;
    doc.setTextColor(0, 0, 0);

    // Student Details Box
    if (studentName || usn) {
      doc.setFillColor(249, 250, 251);
      doc.roundedRect(15, yPos, pageWidth - 30, 25, 3, 3, 'F');
      
      doc.setDrawColor(255, 127, 80);
      doc.setLineWidth(0.5);
      doc.roundedRect(15, yPos, pageWidth - 30, 25, 3, 3, 'S');
      
      yPos += 8;
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 127, 80);
      doc.text('STUDENT INFORMATION', 20, yPos);
      
      yPos += 7;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      
      if (studentName) {
        doc.setFont('helvetica', 'bold');
        doc.text('Name:', 20, yPos);
        doc.setFont('helvetica', 'normal');
        doc.text(studentName, 45, yPos);
        yPos += 6;
      }
      if (usn) {
        doc.setFont('helvetica', 'bold');
        doc.text('USN:', 20, yPos);
        doc.setFont('helvetica', 'normal');
        doc.text(usn, 45, yPos);
      }
      yPos += 12;
    }

    // Overall Summary Box
    doc.setFillColor(255, 237, 213); // Light orange
    doc.roundedRect(15, yPos, pageWidth - 30, 45, 3, 3, 'F');
    
    doc.setDrawColor(255, 127, 80);
    doc.setLineWidth(0.5);
    doc.roundedRect(15, yPos, pageWidth - 30, 45, 3, 3, 'S');
    
    yPos += 8;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 127, 80);
    doc.text('OVERALL PERFORMANCE SUMMARY', 20, yPos);
    
    yPos += 10;
    
    // Three columns for metrics
    const col1X = 25;
    const col2X = 85;
    const col3X = 145;
    
    // CGPA Box
    doc.setFillColor(255, 127, 80);
    doc.roundedRect(col1X, yPos, 45, 20, 2, 2, 'F');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text('CGPA', col1X + 22.5, yPos + 5, { align: 'center' });
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(calculateCGPA(), col1X + 22.5, yPos + 13, { align: 'center' });
    doc.setFontSize(7);
    doc.text('Out of 10.0', col1X + 22.5, yPos + 18, { align: 'center' });
    
    // Credits Box
    doc.setFillColor(59, 130, 246); // Blue
    doc.roundedRect(col2X, yPos, 45, 20, 2, 2, 'F');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text('TOTAL CREDITS', col2X + 22.5, yPos + 5, { align: 'center' });
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(getTotalCredits().toString(), col2X + 22.5, yPos + 13, { align: 'center' });
    doc.setFontSize(7);
    doc.text('Credits Earned', col2X + 22.5, yPos + 18, { align: 'center' });
    
    // Percentage Box
    doc.setFillColor(34, 197, 94); // Green
    doc.roundedRect(col3X, yPos, 45, 20, 2, 2, 'F');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text('PERCENTAGE', col3X + 22.5, yPos + 5, { align: 'center' });
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(`${(parseFloat(calculateCGPA()) * 10).toFixed(1)}%`, col3X + 22.5, yPos + 13, { align: 'center' });
    doc.setFontSize(7);
    doc.text('Approximate', col3X + 22.5, yPos + 18, { align: 'center' });
    
    yPos += 30;

    // Semester-wise Details
    semesters.forEach((semester, semIndex) => {
      if (semester.subjects.length === 0) return;

      // Check if we need a new page
      if (yPos > 240) {
        doc.addPage();
        yPos = 20;
      }

      // Semester Header
      doc.setFillColor(147, 51, 234); // Purple
      doc.roundedRect(15, yPos, pageWidth - 30, 12, 2, 2, 'F');
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text(`SEMESTER ${semester.semesterNumber}`, 20, yPos + 8);
      
      const sgpa = calculateSGPA(semester);
      const credits = getSemesterCredits(semester);
      doc.text(`SGPA: ${sgpa}  |  Credits: ${credits}`, pageWidth - 20, yPos + 8, { align: 'right' });
      
      yPos += 18;

      // Table Header
      doc.setFillColor(243, 244, 246);
      doc.rect(15, yPos, pageWidth - 30, 8, 'F');
      
      doc.setDrawColor(209, 213, 219);
      doc.setLineWidth(0.3);
      doc.rect(15, yPos, pageWidth - 30, 8, 'S');
      
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(75, 85, 99);
      doc.text('Subject Name', 20, yPos + 5.5);
      doc.text('Credits', 120, yPos + 5.5, { align: 'center' });
      doc.text('Marks', 145, yPos + 5.5, { align: 'center' });
      doc.text('Grade', 165, yPos + 5.5, { align: 'center' });
      doc.text('Points', 185, yPos + 5.5, { align: 'center' });
      
      yPos += 8;

      // Table Content
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      
      semester.subjects.forEach((subject, subIndex) => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }

        const grade = getGrade(subject.marks);
        const gradePoint = getGradePoint(subject.marks);
        
        // Alternating row colors
        if (subIndex % 2 === 0) {
          doc.setFillColor(249, 250, 251);
          doc.rect(15, yPos, pageWidth - 30, 8, 'F');
        }
        
        // Row border
        doc.setDrawColor(229, 231, 235);
        doc.setLineWidth(0.2);
        doc.rect(15, yPos, pageWidth - 30, 8, 'S');

        doc.setFontSize(9);
        doc.text(subject.name.substring(0, 35), 20, yPos + 5.5);
        doc.text(subject.credits.toString(), 120, yPos + 5.5, { align: 'center' });
        doc.text(subject.marks.toString(), 145, yPos + 5.5, { align: 'center' });
        
        // Color-coded grade
        if (grade === 'S' || grade === 'A') {
          doc.setTextColor(34, 197, 94); // Green
        } else if (grade === 'B' || grade === 'C') {
          doc.setTextColor(59, 130, 246); // Blue
        } else if (grade === 'D' || grade === 'E') {
          doc.setTextColor(251, 146, 60); // Orange
        } else {
          doc.setTextColor(239, 68, 68); // Red
        }
        doc.setFont('helvetica', 'bold');
        doc.text(grade, 165, yPos + 5.5, { align: 'center' });
        
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
        doc.text(gradePoint.toString(), 185, yPos + 5.5, { align: 'center' });
        
        yPos += 8;
      });

      yPos += 5;
    });

    // Footer
    if (yPos > 260) {
      doc.addPage();
      yPos = 20;
    }
    
    // Decorative footer
    const footerY = pageHeight - 20;
    doc.setDrawColor(147, 51, 234);
    doc.setLineWidth(0.5);
    doc.line(15, footerY, pageWidth - 15, footerY);
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(107, 114, 128);
    doc.text('Generated by ToolSphere - VTU CGPA Calculator', pageWidth / 2, footerY + 5, { align: 'center' });
    doc.text(`Generated on: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}`, pageWidth / 2, footerY + 10, { align: 'center' });

    // Save PDF
    const fileName = usn ? `${usn}_CGPA_Report.pdf` : `VTU_CGPA_Report_${new Date().getTime()}.pdf`;
    doc.save(fileName);
  };

  const hasAnySubjects = semesters.some(sem => sem.subjects.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-purple-600 rounded-2xl shadow-xl mb-4 transform hover:scale-110 transition-transform">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            VTU CGPA Calculator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Calculate your SGPA & CGPA with precision using VTU's 10-point grading system
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">

          {/* Student Details Section */}
          <div className="bg-gradient-to-r from-orange-500/10 to-purple-500/10 dark:from-orange-500/20 dark:to-purple-500/20 p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="w-2 h-8 bg-gradient-to-b from-orange-500 to-purple-600 rounded-full mr-3"></span>
              Student Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Student Name
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  USN (University Seat Number)
                </label>
                <input
                  type="text"
                  value={usn}
                  onChange={(e) => setUsn(e.target.value.toUpperCase())}
                  placeholder="e.g., 1XX21CS001"
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all uppercase"
                />
              </div>
            </div>
          </div>

          {/* Results Dashboard */}
          <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition"></div>
                <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-semibold uppercase tracking-wider opacity-90">Overall CGPA</div>
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-6xl font-black mb-2">{calculateCGPA()}</div>
                  <div className="text-sm opacity-90 font-medium">Out of 10.0 Scale</div>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="flex items-center justify-between text-sm">
                      <span className="opacity-90">Grade</span>
                      <span className="font-bold text-lg">{getGrade(parseFloat(calculateCGPA()) * 10)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition"></div>
                <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-semibold uppercase tracking-wider opacity-90">Total Credits</div>
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold">📚</span>
                    </div>
                  </div>
                  <div className="text-6xl font-black mb-2">{getTotalCredits()}</div>
                  <div className="text-sm opacity-90 font-medium">Credits Completed</div>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="flex items-center justify-between text-sm">
                      <span className="opacity-90">Semesters</span>
                      <span className="font-bold text-lg">{semesters.filter(s => s.subjects.length > 0).length}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition"></div>
                <div className="relative bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-semibold uppercase tracking-wider opacity-90">Percentage</div>
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold">📊</span>
                    </div>
                  </div>
                  <div className="text-6xl font-black mb-2">{(parseFloat(calculateCGPA()) * 10).toFixed(1)}%</div>
                  <div className="text-sm opacity-90 font-medium">Approximate Score</div>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="flex items-center justify-between text-sm">
                      <span className="opacity-90">Status</span>
                      <span className="font-bold text-lg">{parseFloat(calculateCGPA()) >= 6.0 ? '✓ Pass' : '✗ Fail'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Button */}
            {hasAnySubjects && (
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition"></div>
                <button
                  onClick={downloadPDF}
                  className="relative w-full flex items-center justify-center space-x-3 px-8 py-5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl hover:from-purple-600 hover:to-pink-700 transition-all shadow-xl transform hover:scale-105 font-bold text-lg"
                >
                  <Download className="w-6 h-6" />
                  <span>Download CGPA Report (PDF)</span>
                  <span className="absolute top-0 right-0 -mt-2 -mr-2 px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full shadow-lg">
                    FREE
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Grade Scale Reference */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-gradient-to-r from-orange-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 border-2 border-orange-200 dark:border-orange-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="text-2xl mr-3">📋</span>
                VTU Grading Scale Reference
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                {[
                  { grade: 'S', range: '90-100', points: 10, color: 'from-green-500 to-green-600' },
                  { grade: 'A', range: '80-89', points: 9, color: 'from-blue-500 to-blue-600' },
                  { grade: 'B', range: '70-79', points: 8, color: 'from-indigo-500 to-indigo-600' },
                  { grade: 'C', range: '60-69', points: 7, color: 'from-purple-500 to-purple-600' },
                  { grade: 'D', range: '50-59', points: 6, color: 'from-yellow-500 to-yellow-600' },
                  { grade: 'E', range: '40-49', points: 5, color: 'from-orange-500 to-orange-600' },
                  { grade: 'F', range: '0-39', points: 0, color: 'from-red-500 to-red-600' },
                ].map((item) => (
                  <div key={item.grade} className="relative group">
                    <div className={`bg-gradient-to-br ${item.color} text-white rounded-xl p-4 shadow-lg transform hover:scale-110 transition-all`}>
                      <div className="text-3xl font-black mb-1">{item.grade}</div>
                      <div className="text-xs opacity-90 font-semibold mb-2">{item.range}</div>
                      <div className="text-lg font-bold">{item.points} pts</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Semester Management */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="w-2 h-8 bg-gradient-to-b from-orange-500 to-purple-600 rounded-full mr-3"></span>
              Semester Management
            </h2>
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-gray-200">
              {semesters.map((semester, index) => (
                <div key={index} className="flex items-center space-x-1 flex-shrink-0">
                  <button
                    onClick={() => setCurrentSemester(index)}
                    className={`relative px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all transform hover:scale-105 ${
                      currentSemester === index
                        ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-lg">Sem {semester.semesterNumber}</span>
                      {semester.subjects.length > 0 && (
                        <span className="text-xs mt-1 opacity-90">
                          SGPA: {calculateSGPA(semester)}
                        </span>
                      )}
                    </div>
                    {currentSemester === index && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                    )}
                  </button>
                  {semesters.length > 1 && (
                    <button
                      onClick={() => removeSemester(index)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                      title="Remove Semester"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addSemester}
                className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg transform hover:scale-105 font-bold flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Semester</span>
              </button>
            </div>
          </div>

          {/* Add Subject Form */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-br from-orange-50/50 to-purple-50/50 dark:from-gray-800/50 dark:to-gray-900/50">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="text-2xl mr-2">➕</span>
              Add Subject to Semester {semesters[currentSemester].semesterNumber}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Subject Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Data Structures"
                  value={newSubject.name}
                  onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Credits
                </label>
                <input
                  type="number"
                  placeholder="Credits"
                  min="1"
                  max="10"
                  value={newSubject.credits}
                  onChange={(e) => setNewSubject({ ...newSubject, credits: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Marks (0-100)
                </label>
                <input
                  type="number"
                  placeholder="Marks"
                  min="0"
                  max="100"
                  value={newSubject.marks}
                  onChange={(e) => setNewSubject({ ...newSubject, marks: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                />
              </div>
            </div>
            <button
              onClick={addSubject}
              className="mt-4 w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-xl hover:from-orange-600 hover:to-purple-700 transition-all shadow-lg transform hover:scale-105 font-bold"
            >
              <Plus className="w-5 h-5" />
              <span>Add Subject</span>
            </button>
          </div>

          {/* Subjects List */}
          {semesters[currentSemester].subjects.length > 0 && (
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <span className="text-2xl mr-2">📚</span>
                  Semester {semesters[currentSemester].semesterNumber} Subjects
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold shadow-lg">
                    SGPA: {calculateSGPA(semesters[currentSemester])}
                  </div>
                  <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold shadow-lg">
                    {getSemesterCredits(semesters[currentSemester])} Credits
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                {semesters[currentSemester].subjects.map((subject, index) => (
                  <div
                    key={index}
                    className="group relative bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-5 border-2 border-gray-200 dark:border-gray-600 hover:border-orange-400 dark:hover:border-orange-500 transition-all hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-2xl">{index + 1}.</span>
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white">{subject.name}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            getGrade(subject.marks) === 'S' ? 'bg-green-500 text-white' :
                            getGrade(subject.marks) === 'A' ? 'bg-blue-500 text-white' :
                            getGrade(subject.marks) === 'B' ? 'bg-indigo-500 text-white' :
                            getGrade(subject.marks) === 'C' ? 'bg-purple-500 text-white' :
                            getGrade(subject.marks) === 'D' ? 'bg-yellow-500 text-white' :
                            getGrade(subject.marks) === 'E' ? 'bg-orange-500 text-white' :
                            'bg-red-500 text-white'
                          }`}>
                            Grade {getGrade(subject.marks)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold">Credits:</span>
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded font-bold">
                              {subject.credits}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold">Marks:</span>
                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded font-bold">
                              {subject.marks}/100
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold">Grade Points:</span>
                            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded font-bold">
                              {getGradePoint(subject.marks)}/10
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeSubject(currentSemester, index)}
                        className="p-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all transform hover:scale-110"
                        title="Remove Subject"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
