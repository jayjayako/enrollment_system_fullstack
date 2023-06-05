let manageuseraccessvar;
function ManageUserAccess() {
  let errortimeout1 = 0,
    errortimeout2 = 0,
    errortimeout3 = 0,
    errortimeout4 = 0,
    errortimeout5 = 0,
    errortimeout6 = 0,
    errortimeout7 = 0,
    errortimeout8 = 0,
    errortimeout9 = 0;
  let modules, positions;
  let userid;
  let manageuseraccmodulevar = [],
    manageuseracccurriculummodule = [];
  async function displayadmin() {
    modules = [];
    positions = [];
    try {
      let response = await fetch(
        "/api/users/superadmin/manageuseraccess/getadmin",
        {
          method: "GET",
        }
      );
      let myresult = await response.json();
      let output = "";
      let value = document.getElementById(
        "table_tbodytmplt_manageuseracc"
      ).innerHTML;
      if (myresult.status == "success") {
        for (let i in myresult.allresults) {
          output += eval("`" + value.toString() + "`");
        }
        document.getElementById("table_tbody_manageuseracc").innerHTML = output;
      } else {
        alert("Error");
      }
      errortimeout1 = 0;
    } catch (error) {
      errortimeout1 += 1;
      if (errortimeout1 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout1 = 0;
        setTimeout(displayadmin, 1000);
      }
    }
  }

  async function displaystaff() {
    modules = [];
    positions = [];
    try {
      let response = await fetch(
        "/api/users/superadmin/manageuseraccess/getstaff",
        {
          method: "GET",
        }
      );
      let myresult = await response.json();
      let output = "";
      let value = document.getElementById(
        "table_tbodytmplt_manageuseracc"
      ).innerHTML;
      if (myresult.status == "success") {
        for (let i in myresult.allresults) {
          output += eval("`" + value.toString() + "`");
        }
        document.getElementById("table_tbody_manageuseracc").innerHTML = output;
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
        setTimeout(displaystaff, 1000);
      }
    }
  }

  async function displayspecificadmin(id) {
    userid = id.firstElementChild.innerHTML;
    try {
      let response = await fetch(
        `/api/users/superadmin/manageuseraccess/displayspecificadmin/${userid}`,
        {
          method: "GET",
        }
      );
      let myresult = await response.json();
      if (myresult.status == "success") {
        document.getElementById("manageuseracciddisplay").innerHTML = userid;
        document.getElementById("manageuseraccfirstnamedisplay").innerHTML =
          myresult.firstname;
        document.getElementById("manageuseracclastnamedisplay").innerHTML =
          myresult.lastname;

        let text = "";
        for (let x in myresult.positions) {
          text += " " + myresult.positions[x];
        }
        document.getElementById("manageuseraccpositionsdisplay").innerHTML =
          text;
        document.getElementById("manageuseraccschoolleveldisplay").innerHTML =
          myresult.schoollevel;
        document.getElementById("manageuseraccyearleveldisplay").innerHTML =
          myresult.yearlevel;
        document.getElementById("manageuseraccsectiondisplay").innerHTML =
          myresult.section;
        document.getElementById("manageuseracccurstatsdisplay").innerHTML =
          myresult.accessibility;
        modules = myresult.modules;
        positions = myresult.positions;
      }
      errortimeout3 = 0;
    } catch (error) {
      errortimeout3 += 1;
      if (errortimeout3 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout3 = 0;
        setTimeout(displayspecificadmin, 1000);
      }
    }
  }

  async function displayadminmodule() {
    if (modules.find((x) => x == "addstaff") != undefined) {
      document.getElementById("mangeuseradmincheckboxid1").checked = true;
    } else {
      document.getElementById("mangeuseradmincheckboxid1").checked = false;
    }

    if (modules.find((x) => x == "audittrail") != undefined) {
      document.getElementById("mangeuseradmincheckboxid2").checked = true;
    } else {
      document.getElementById("mangeuseradmincheckboxid2").checked = false;
    }

    if (modules.find((x) => x == "managestudent") != undefined) {
      document.getElementById("mangeuseradmincheckboxid3").checked = true;
    } else {
      document.getElementById("mangeuseradmincheckboxid3").checked = false;
    }

    if (modules.find((x) => x == "curriculum") != undefined) {
      document.getElementById("mangeuseradmincheckboxid4").checked = true;
    } else {
      document.getElementById("mangeuseradmincheckboxid4").checked = false;
    }

    if (modules.find((x) => x == "manageuseraccess") != undefined) {
      document.getElementById("mangeuseradmincheckboxid5").checked = true;
    } else {
      document.getElementById("mangeuseradmincheckboxid5").checked = false;
    }

    if (positions.find((x) => x == "registrar") != undefined) {
      document.getElementById("mangeuseradmincheckboxid6").checked = true;
    } else {
      document.getElementById("mangeuseradmincheckboxid6").checked = false;
    }

    if (positions.find((x) => x == "accounting") != undefined) {
      document.getElementById("mangeuseradmincheckboxid7").checked = true;
    } else {
      document.getElementById("mangeuseradmincheckboxid7").checked = false;
    }

    if (positions.find((x) => x == "cashier") != undefined) {
      document.getElementById("mangeuseradmincheckboxid8").checked = true;
    } else {
      document.getElementById("mangeuseradmincheckboxid8").checked = false;
    }

    if (positions.find((x) => x == "enlistment") != undefined) {
      document.getElementById("mangeuseradmincheckboxid9").checked = true;
    } else {
      document.getElementById("mangeuseradmincheckboxid9").checked = false;
    }

    if (modules.find((x) => x == "reports") != undefined) {
      document.getElementById("mangeuseradmincheckboxid10").checked = true;
    } else {
      document.getElementById("mangeuseradmincheckboxid10").checked = false;
    }

    if (modules.find((x) => x == "logyearspan") != undefined) {
      document.getElementById("mangeuseradmincheckboxid11").checked = true;
    } else {
      document.getElementById("mangeuseradmincheckboxid11").checked = false;
    }
  }

  async function displayspecificstaff(id) {
    userid = id.firstElementChild.innerHTML;
    try {
      let response = await fetch(
        `/api/users/superadmin/manageuseraccess/displayspecificstaff/${userid}`,
        {
          method: "GET",
        }
      );
      let myresult = await response.json();
      if (myresult.status == "success") {
        document.getElementById("manageuseracciddisplay").innerHTML = userid;
        document.getElementById("manageuseraccfirstnamedisplay").innerHTML =
          myresult.firstname;
        document.getElementById("manageuseracclastnamedisplay").innerHTML =
          myresult.lastname;

        let text = "";
        for (let x in myresult.positions) {
          text += " " + myresult.positions[x];
        }
        document.getElementById("manageuseraccpositionsdisplay").innerHTML =
          text;
        document.getElementById("manageuseraccschoolleveldisplay").innerHTML =
          myresult.schoollevel;
        document.getElementById("manageuseraccyearleveldisplay").innerHTML =
          myresult.yearlevel;
        document.getElementById("manageuseraccsectiondisplay").innerHTML =
          myresult.section;
        document.getElementById("manageuseracccurstatsdisplay").innerHTML =
          myresult.accessibility;
        modules = myresult.modules;
        positions = myresult.positions;
      }
      errortimeout4 = 0;
    } catch (error) {
      errortimeout4 += 1;
      if (errortimeout4 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout4 = 0;
        setTimeout(displayspecificstaff, 1000);
      }
    }
  }

  async function displaystaffmodule() {
    if (modules.find((x) => x == "audittrail") != undefined) {
      document.getElementById("manageuserstaffcheckboxid5").checked = true;
    } else {
      document.getElementById("manageuserstaffcheckboxid5").checked = false;
    }

    if (modules.find((x) => x == "managestudent") != undefined) {
      document.getElementById("manageuserstaffcheckboxid6").checked = true;
    } else {
      document.getElementById("manageuserstaffcheckboxid6").checked = false;
    }

    if (positions.find((x) => x == "registrar") != undefined) {
      document.getElementById("manageuserstaffcheckboxid1").checked = true;
    } else {
      document.getElementById("manageuserstaffcheckboxid1").checked = false;
    }

    if (positions.find((x) => x == "accounting") != undefined) {
      document.getElementById("manageuserstaffcheckboxid2").checked = true;
    } else {
      document.getElementById("manageuserstaffcheckboxid2").checked = false;
    }

    if (positions.find((x) => x == "cashier") != undefined) {
      document.getElementById("manageuserstaffcheckboxid3").checked = true;
    } else {
      document.getElementById("manageuserstaffcheckboxid3").checked = false;
    }

    if (positions.find((x) => x == "enlistment") != undefined) {
      document.getElementById("manageuserstaffcheckboxid4").checked = true;
    } else {
      document.getElementById("manageuserstaffcheckboxid4").checked = false;
    }

    if (modules.find((x) => x == "reports") != undefined) {
      document.getElementById("manageuserstaffcheckboxid7").checked = true;
    } else {
      document.getElementById("manageuserstaffcheckboxid7").checked = false;
    }
  }

  async function displayspecificuser(id) {
    if (
      document.getElementById("manageuseraccesspositionid").value == "Admin"
    ) {
      displayspecificadmin(id);
    }
    if (
      document.getElementById("manageuseraccesspositionid").value == "Staff"
    ) {
      displayspecificstaff(id);
    }
  }

  async function displayallcurriculum() {
    try {
      let response = await fetch(
        "/api/users/superadmin/manageuseraccess/getallcurriculum",
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
        document.getElementById("mangeuseraccschoollevel").innerHTML = text;
      } else {
        document.getElementById("mangeuseraccschoollevel").innerHTML = "";
      }

      if (myresult.status == "success" && myresult.yearlevel != "empty") {
        let text = "";
        for (let x in myresult.yearlevel) {
          text += "<option>" + myresult.yearlevel[x].yearlvl + "</option>";
        }
        document.getElementById("mangeuseraccyearlevel").innerHTML = text;
      } else {
        document.getElementById("mangeuseraccyearlevel").innerHTML = "";
      }

      if (myresult.status == "success" && myresult.section != "empty") {
        let text = "";
        for (let x in myresult.section) {
          text += "<option>" + myresult.section[x].section + "</option>";
        }
        document.getElementById("mangeuseraccsection").innerHTML = text;
      } else {
        document.getElementById("mangeuseraccsection").innerHTML = "";
      }
      errortimeout5 = 0;
    } catch (error) {
      errortimeout5 += 1;
      if (errortimeout5 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout5 = 0;
        setTimeout(displayallcurriculum, 1000);
      }
    }
  }

  async function displayspecificyearlevel() {
    try {
      let getdata = {
        schoollevel: document.getElementById("mangeuseraccschoollevel").value,
      };
      const response = await axios.post(
        "/api/users/superadmin/manageuseraccess/getallspecificcurriculum",
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
        document.getElementById("mangeuseraccyearlevel").innerHTML = text;
        displayspecificsection();
      } else {
        document.getElementById("mangeuseraccyearlevel").innerHTML = "";
        displayspecificsection();
      }
      errortimeout6 = 0;
    } catch (error) {
      errortimeout6 += 1;
      if (errortimeout6 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout6 = 0;
        setTimeout(displayspecificyearlevel, 1000);
      }
    }
  }

  async function displayspecificsection() {
    try {
      let getdata = {
        schoollevel: document.getElementById("mangeuseraccschoollevel").value,
        yearlevel: document.getElementById("mangeuseraccyearlevel").value,
      };
      const response = await axios.post(
        "/api/users/superadmin/manageuseraccess/getallspecificcurriculum",
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
        document.getElementById("mangeuseraccsection").innerHTML = text;
      } else {
        document.getElementById("mangeuseraccsection").innerHTML = "";
      }
      errortimeout7 = 0;
    } catch (error) {
      errortimeout7 += 1;
      if (errortimeout7 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout7 = 0;
        setTimeout(displayspecificsection, 1000);
      }
    }
  }

  async function updateadminmodule() {
    try {
      let getdata = {
        adminmodule: manageuseraccmodulevar,
        admincurriculum: manageuseracccurriculummodule,
      };
      const response = await axios.post(
        `/api/users/superadmin/manageuseraccess/manageuseraccount/updateadminmodule/${userid}`,
        getdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status == "success") {
        alert("Module Updated Successfully");
        displayadmin();
      }
      errortimeout8 = 0;
    } catch (error) {
      errortimeout8 += 1;
      if (errortimeout8 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout8 = 0;
        setTimeout(updateadminmodule, 1000);
      }
    }
  }

  async function updatestaffmodule() {
    try {
      let getdata = {
        staffmodule: manageuseraccmodulevar,
        staffcurriculum: manageuseracccurriculummodule,
      };
      const response = await axios.post(
        `/api/users/superadmin/manageuseraccess/manageuseraccount/updatestaffmodule/${userid}`,
        getdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status == "success") {
        alert("Module Updated Successfully");
        displaystaff();
      }
      errortimeout9 = 0;
    } catch (error) {
      errortimeout9 += 1;
      if (errortimeout9 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout9 = 0;
        setTimeout(updatestaffmodule, 1000);
      }
    }
  }

  async function loadadminmodule() {
    manageuseraccmodulevar = [];
    manageuseracccurriculummodule = [];
    let list = document.getElementById("manageuseraccadminmodalmoduledivlist");
    let items = list.getElementsByTagName("div");
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      let checkboxelem = item.getElementsByTagName("label")[0];
      if (checkboxelem) {
        let checkboxid = checkboxelem.getAttribute("for");
        manageuseraccmodulevar.push(
          document.getElementById(checkboxid).checked
        );
      }
      let dropdownelem = item.getElementsByTagName("select")[0];
      if (dropdownelem) {
        let dropdownid = dropdownelem.getAttribute("id");
        manageuseracccurriculummodule.push(
          document.getElementById(dropdownid).value
        );
      }
    }
    alert("admin module saved");
  }

  async function loadstaffmodule() {
    manageuseraccmodulevar = [];
    manageuseracccurriculummodule = [];
    let list = document.getElementById(
      "manageuseraccstaffmodalmodulepositiondivlist"
    );
    let list2 = document.getElementById(
      "manageuseraccstaffmodalmoduleotherdivlist"
    );
    let items = list.getElementsByTagName("div");
    let items2 = list2.getElementsByTagName("div");
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      let checkboxelem = item.getElementsByTagName("label")[0];
      if (checkboxelem) {
        let checkboxid = checkboxelem.getAttribute("for");
        manageuseraccmodulevar.push(
          document.getElementById(checkboxid).checked
        );
      }
    }
    for (let i = 0; i < items2.length; i++) {
      let item = items2[i];
      let checkboxelem = item.getElementsByTagName("label")[0];
      if (checkboxelem) {
        let checkboxid = checkboxelem.getAttribute("for");
        manageuseraccmodulevar.push(
          document.getElementById(checkboxid).checked
        );
      }
      let dropdownelem = item.getElementsByTagName("select")[0];
      if (dropdownelem) {
        let dropdownid = dropdownelem.getAttribute("id");
        manageuseracccurriculummodule.push(
          document.getElementById(dropdownid).value
        );
      }
    }
    alert("staff module saved");
  }

  return {
    displayadmin,
    displaystaff,
    displayspecificuser,
    displayallcurriculum,
    displayspecificyearlevel,
    displayspecificsection,
    displayadminmodule,
    displaystaffmodule,
    updateadminmodule,
    updatestaffmodule,
    loadadminmodule,
    loadstaffmodule,
  };
}

manageuseraccessvar = ManageUserAccess();
