let curriculumvar;
function Curriculum() {
  //// school level //
  let errortimeout1 = 0,
    errortimeout2 = 0,
    errortimeout3 = 0,
    ////////////////////
    //// year level ////
    errortimeout4 = 0,
    errortimeout4_1 = 0,
    errortimeout5 = 0,
    errortimeout6 = 0,
    ////////////////////
    ////// section /////
    errortimeout7 = 0,
    errortimeout7_1 = 0,
    errortimeout8 = 0,
    errortimeout9 = 0;
  ////////////////////
  //////////////////////// for school level ////////////////////////
  async function displayschoollevel() {
    try {
      let response = await fetch(
        "/api/users/superadmin/curriculum/getallcurriculum",
        {
          method: "GET",
        }
      );
      let myresult = await response.json();
      if (myresult.status == "success" && myresult.schoollevel != "empty") {
        let text = "";
        for (let x in myresult.schoollevel) {
          text += "<option>" + myresult.schoollevel[x].schoollvl + "</option>";
        }
        document.getElementById("modalcurriculum_schoollevelid").innerHTML =
          text;
      } else {
        document.getElementById("modalcurriculum_schoollevelid").innerHTML = "";
      }
      errortimeout1 = 0;
    } catch (error) {
      errortimeout1 += 1;
      if (errortimeout1 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout1 = 0;
        setTimeout(displayschoollevel, 1000);
      }
    }
  }
  async function addnewschoollevel() {
    try {
      let getdata = {
        schoollevel: document.getElementById(
          "modalcurriculum_inputschoollevelid"
        ).value,
      };
      const response = await axios.post(
        "/api/users/superadmin/curriculum/insertschoollevel",
        getdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status == "success") {
        displayschoollevel();
        document.getElementById("modalcurriculum_inputschoollevelid").value =
          "";
      } else {
        alert("Error");
      }
      errortimeout2 = 0;
    } catch (error) {
      errortimeout2 += 1;
      if (errortimeout2 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout2 = 0;
        setTimeout(addnewschoollevel, 1000);
      }
    }
  }

  async function deleteschoollevel() {
    try {
      let getdata = {
        schoollevel: document.getElementById("modalcurriculum_schoollevelid")
          .value,
      };
      const response = await axios.post(
        "/api/users/superadmin/curriculum/deleteschoollevel",
        getdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status == "success") {
        displayschoollevel();
      } else {
        alert("Error");
      }
      errortimeout3 = 0;
    } catch (error) {
      errortimeout3 += 1;
      if (errortimeout3 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout3 = 0;
        setTimeout(deleteschoollevel, 1000);
      }
    }
  }
  /////////////////////////////////////////////////////////////
  //////////////////////// for year level /////////////////////
  async function displayyearlevel() {
    try {
      let response = await fetch(
        "/api/users/superadmin/curriculum/getallcurriculum",
        {
          method: "GET",
        }
      );
      let myresult = await response.json();
      if (myresult.status == "success" && myresult.schoollevel != "empty") {
        let text = "";
        for (let x in myresult.schoollevel) {
          text += "<option>" + myresult.schoollevel[x].schoollvl + "</option>";
        }
        document.getElementById("modalcurriculum_schoollevelid").innerHTML =
          text;
      } else {
        document.getElementById("modalcurriculum_schoollevelid").innerHTML = "";
      }
      if (myresult.status == "success" && myresult.yearlevel != "empty") {
        let text = "";
        for (let x in myresult.yearlevel) {
          text += "<option>" + myresult.yearlevel[x].yearlvl + "</option>";
        }
        document.getElementById("modalcurriculum_yearlevelid").innerHTML = text;
      } else {
        document.getElementById("modalcurriculum_yearlevelid").innerHTML = "";
      }
      errortimeout4 = 0;
    } catch (error) {
      errortimeout4 += 1;
      if (errortimeout4 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout4 = 0;
        setTimeout(displayyearlevel, 1000);
      }
    }
  }

  async function displayspecificyearlevel() {
    try {
      let getdata = {
        schoollevel: document.getElementById("modalcurriculum_schoollevelid")
          .value,
      };
      const response = await axios.post(
        "/api/users/superadmin/curriculum/getallspecificcurriculum",
        getdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (
        response.data.status == "success" &&
        response.data.yearlevel != "empty"
      ) {
        let text = "";
        for (let x in response.data.yearlevel) {
          text += "<option>" + response.data.yearlevel[x].yearlvl + "</option>";
        }
        document.getElementById("modalcurriculum_yearlevelid").innerHTML = text;
        displayspecificsection();
      } else {
        document.getElementById("modalcurriculum_yearlevelid").innerHTML = "";
        displayspecificsection();
      }
      errortimeout4_1 = 0;
    } catch (error) {
      errortimeout4_1 += 1;
      if (errortimeout4_1 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout4_1 = 0;
        setTimeout(displayspecificyearlevel, 1000);
      }
    }
  }
  async function addnewyearlevel() {
    try {
      let getdata = {
        schoollevel: document.getElementById("modalcurriculum_schoollevelid")
          .value,
        yearlevel: document.getElementById("modalcurriculum_inputyearlevelid")
          .value,
      };
      const response = await axios.post(
        "/api/users/superadmin/curriculum/insertyearlevel",
        getdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status == "success") {
        displayyearlevel();
        document.getElementById("modalcurriculum_inputyearlevelid").value = "";
      } else {
        alert("Error");
      }
      errortimeout5 = 0;
    } catch (error) {
      errortimeout5 += 1;
      if (errortimeout5 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout5 = 0;
        setTimeout(addnewyearlevel, 1000);
      }
    }
  }

  async function deleteyearlevel() {
    try {
      let getdata = {
        yearlevel: document.getElementById("modalcurriculum_yearlevelid").value,
      };
      const response = await axios.post(
        "/api/users/superadmin/curriculum/deleteyearlevel",
        getdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status == "success") {
        displayyearlevel();
      } else {
        alert("Error");
      }
      errortimeout6 = 0;
    } catch (error) {
      errortimeout6 += 1;
      if (errortimeout6 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout6 = 0;
        setTimeout(deleteyearlevel, 1000);
      }
    }
  }
  /////////////////////////////////////////////////////////////
  ///////////////////////// for section ///////////////////////
  async function displaysection() {
    try {
      let response = await fetch(
        "/api/users/superadmin/curriculum/getallcurriculum",
        {
          method: "GET",
        }
      );
      let myresult = await response.json();
      if (myresult.status == "success" && myresult.schoollevel != "empty") {
        let text = "";
        for (let x in myresult.schoollevel) {
          text += "<option>" + myresult.schoollevel[x].schoollvl + "</option>";
        }
        document.getElementById("modalcurriculum_schoollevelid").innerHTML =
          text;
      } else {
        document.getElementById("modalcurriculum_schoollevelid").innerHTML = "";
      }
      if (myresult.status == "success" && myresult.yearlevel != "empty") {
        let text = "";
        for (let x in myresult.yearlevel) {
          text += "<option>" + myresult.yearlevel[x].yearlvl + "</option>";
        }
        document.getElementById("modalcurriculum_yearlevelid").innerHTML = text;
      } else {
        document.getElementById("modalcurriculum_yearlevelid").innerHTML = "";
      }
      if (myresult.status == "success" && myresult.section != "empty") {
        let text = "";
        for (let x in myresult.section) {
          text += "<option>" + myresult.section[x].section + "</option>";
        }
        document.getElementById("modalcurriculum_sectionid").innerHTML = text;
      } else {
        document.getElementById("modalcurriculum_sectionid").innerHTML = "";
      }
      errortimeout7 = 0;
    } catch (error) {
      errortimeout7 += 1;
      if (errortimeout7 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout7 = 0;
        setTimeout(displaysection, 1000);
      }
    }
  }

  async function displayspecificsection() {
    try {
      let getdata = {
        schoollevel: document.getElementById("modalcurriculum_schoollevelid")
          .value,
        yearlevel: document.getElementById("modalcurriculum_yearlevelid").value,
      };
      const response = await axios.post(
        "/api/users/superadmin/curriculum/getallspecificcurriculum",
        getdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (
        response.data.status == "success" &&
        response.data.section != "empty"
      ) {
        let text = "";
        for (let x in response.data.section) {
          text += "<option>" + response.data.section[x].section + "</option>";
        }
        console.log(text);
        document.getElementById("modalcurriculum_sectionid").innerHTML = text;
      } else {
        document.getElementById("modalcurriculum_sectionid").innerHTML = "";
      }
      errortimeout7_1 = 0;
    } catch (error) {
      errortimeout7_1 += 1;
      if (errortimeout7_1 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout7_1 = 0;
        setTimeout(displayspecificsection, 1000);
      }
    }
  }
  async function addnewsection() {
    try {
      let getdata = {
        schoollevel: document.getElementById("modalcurriculum_schoollevelid")
          .value,
        yearlevel: document.getElementById("modalcurriculum_yearlevelid").value,
        section: document.getElementById("modalcurriculum_inputsectionid")
          .value,
      };
      const response = await axios.post(
        "/api/users/superadmin/curriculum/insertsection",
        getdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status == "success") {
        displaysection();
        document.getElementById("modalcurriculum_inputsectionid").value = "";
      } else {
        alert("Error");
      }
      errortimeout8 = 0;
    } catch (error) {
      errortimeout8 += 1;
      if (errortimeout8 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout8 = 0;
        setTimeout(addnewsection, 1000);
      }
    }
  }

  async function deletesection() {
    try {
      let getdata = {
        section: document.getElementById("modalcurriculum_sectionid").value,
      };
      const response = await axios.post(
        "/api/users/superadmin/curriculum/deletesection",
        getdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status == "success") {
        displaysection();
      } else {
        alert("Error");
      }
      errortimeout9 = 0;
    } catch (error) {
      errortimeout9 += 1;
      if (errortimeout9 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout9 = 0;
        setTimeout(deletesection, 1000);
      }
    }
  }
  /////////////////////////////////////////////////////////////
  return {
    displayschoollevel,
    addnewschoollevel,
    deleteschoollevel,
    displayyearlevel,
    displayspecificyearlevel,
    addnewyearlevel,
    deleteyearlevel,
    displaysection,
    displayspecificsection,
    addnewsection,
    deletesection,
  };
}
curriculumvar = Curriculum();
