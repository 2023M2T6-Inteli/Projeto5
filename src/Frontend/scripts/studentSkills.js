function getTokenFromLocalStorage() {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        return token;
      }
      throw new Error('Token not found in localStorage');
    } catch (error) {
      console.error('Error retrieving token from localStorage:', error);
      throw error;
    }
  }

function getStudentIdFromUrl() {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('id');
  }

  function postClassGrade() {

    const grades = {
      grade1: document.getElementById("grade1").value,
      grade2: document.getElementById("grade2").value,
      grade3: document.getElementById("grade3").value,
      grade4: document.getElementById("grade4").value,
      grade5: document.getElementById("grade5").value
    };

    const studentId = getStudentIdFromUrl(); 

    const data = new URLSearchParams(grades).toString();
    token = getTokenFromLocalStorage();
    console.log(data);
    console.log(studentId);

    fetch(`http://localhost:3000/studentGrades/student/${studentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`
      },
      body: data
    })
    .then(response => response.json())
    .then(data => {
        window.history.back();
    })
    .catch(error => {
      console.error(error);
    });
  }

  function goBack() {
    window.history.back();
  }