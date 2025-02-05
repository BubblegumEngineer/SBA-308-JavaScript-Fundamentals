// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];


// try-catch
try {
  validateCourseId();
  validatePointsPossible();

} catch (error) {
  console.error(error.message);
}


// FUNCTION #1 THAT WORKS 
function validateCourseId() {
  //checks that assignment group course id and course info id are the same
  if (AssignmentGroup.course_id !== CourseInfo.id) {
      // if not, throw an error
      throw new Error("Assignment Group and Course ID do not match;");
  } else if (AssignmentGroup.course_id === CourseInfo.id) {
      console.log(`Assignment Group Course ID ${AssignmentGroup.course_id} and course Info ID ${CourseInfo.id} are the same. Valid Course Id`);
  }
}
// validateCourseId();

// FUNCTION #2 THAT WORKS
// validatePointsPossible() to be called under validateAssignments()
function validatePointsPossible() {
  // Makes sure points possible are more than 0
  // no negative numbers
  // no undefined numbers or blank numbers
  // points_possible
  // for...of or forEach()?
  // WRONG: for (const points of points_possible){
  for (const assignment of AssignmentGroup.assignments) {
      const pointsPossible = assignment.points_possible;
      // if it's 0 or a negative number
      if (pointsPossible <= 0 || pointsPossible === undefined) {
          throw new Error("Points Possible - Invalid Number")
      }
      // if it's symbols or a word
      // isInteger checks to see if it's a number -- if not, throw an error
      if (!Number.isInteger(pointsPossible)) {
          throw new Error("Points Possible - Invalid Entry");
      }
  }
}

// FUNCTION #3 
// filter - array method that goes through each element in the array (like map() does) and checks some criteria of the element and if the element passes the check, it returns things that are true conditions
// filters false condition
// this will filter it out from the results AND from the average
function filterValidAssignments(AssignmentsArray) {
  // arrow function will take in each element(assignment) in the array and apply the test to it, if true, return it 
  // first try to filter out future dates
  //  => is the same thing as the word function
  // {} inside there is the function
  //new Date() -> always today's date
  // new Date('2234-10-19')<= new Date() -> defining new date and comparing it to today's date 
  let AssignmentsDueNow = AssignmentsArray.filter(element => new Date(element.due_at) <= new Date());
  return AssignmentsDueNow;
}

console.log(filterValidAssignments(AssignmentGroup.assignments));


  // DOES NOT WORK
//   function validateData(course, group) {
//     if (group.course_id !== course.id) {
//       throw new Error(`Invalid data: AssignmentGroup ${group.id} does not belong to Course ${course.id}`);
//     }
//     group.assignments.forEach(assignment => {
//       if(assignment.points_possible === 0) {
//         throw new Error(`Invalid data: Assignment ${assignment.id} has zero possible points.`);
//       }
//     });
//   } 
//   //const now = new Date();
//  //console.log(now);
//   function filterValidAssignments(assignments) {
//     const now = new Date();
//     return assignments.filter(assignment => new Date(assignment.due_at) < now);

//   }

//   function calculateAssignmentScores(submissions, assignments) {
//     const scores = {}; 
//     assignments.forEach(assignment => {
//       const submission = submissions.find(sub => sub.assignment_id === assignment.id);
//       if (submission) {
//         let score = submission.submission.score;
//         if (new Date(submission.submission.submitted_at) > new Date (assignment.due_at)) {
//           score -= assignment.points_possible * 0.1; // Deduct 10% for late submissions
//         }
//         score[assignment.id] = (score / assignment.points_possible) * 100;
//       }
//     });
//     return scores;
//   }

//   function calculateWeightedAverage(scores, assignments) {
//     let totalPoints = 0;
//     let weightedScore = 0;

//     assignments.forEach(assignment => {
//       if (scores[assignment.id] !== undefined) {
//         totalPoints += assignment.points_possible;
//         weightedScore += (scores[assignment.id] / 100) * assignment.points_possible;
//       }
//     });
//     return (weightedScore / totalPoints) * 100;
//   }
  
//   function getLearnerData(course, ag, submissions) {
//     // here, we would process this data to achieve the desired result.
//     try {
//       validateData(course, group);
//       const validAssignments = filterValidAssignments(group.assignments);
//       // Step 3: Process each learner's submissions
//       const learners = {};
//       submissions.forEach(submission => {
//         if (!learners[submission.learner_id]) {
//           learners[submission.learner_id] = { id:    submission.learner_id, scores: {} };
//         }
//         learners[submission.learner_id].scores =  calculateAssignmentScores(
//           submissions.filter(sub => sub.learner_id === submission.learner_id),
//           validAssignments
//         );
//       });
//       // Step 4: Calculate weighted averages and format results
//     const results = Object.values(learners).map(learner => {
//       const learnerScores = learner.scores;
//       const average = calculateWeightedAverage(learnerScores, validAssignments);

//       return {
//         id: learner.id,
//         avg: average,
//         ...learnerScores
//       };
//     });

//     return results;

//     } catch (error) {
//       console.error(`Error processing data: ${error.message}`);
//     return [];
//     }
//   }
  
//   const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
//   console.log(result);


//   const result = [
//     {
//       id: 125,
//       avg: 0.985, // (47 + 150) / (50 + 150)
//       1: 0.94, // 47 / 50
//       2: 1.0 // 150 / 150
//     },
//     {
//       id: 132,
//       avg: 0.82, // (39 + 125) / (50 + 150)
//       1: 0.78, // 39 / 50
//       2: 0.833 // late: (140 - 15) / 150
//     }
//   ];

//   return result;